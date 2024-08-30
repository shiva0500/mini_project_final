import os
import base64
import io
from flask import Flask, request, jsonify
from flask_cors import CORS
import pdf2image
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure the Generative AI model with the API key
api_key = "GOOGLE_API_KEY"
genai.configure(api_key=api_key)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def get_gemini_response(input_text, pdf_content, prompt):
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content([input_text, pdf_content[0], prompt])
    return response.text

def process_pdf(uploaded_file):
    # Convert the uploaded PDF to an image
    images = pdf2image.convert_from_bytes(uploaded_file.read())

    # Get the first page of the PDF
    first_page = images[0]

    # Convert the image to a byte array
    img_byte_arr = io.BytesIO()
    first_page.save(img_byte_arr, format='JPEG')
    img_byte_arr = img_byte_arr.getvalue()

    # Encode the image in base64
    pdf_part = {
        "mime_type": "image/jpeg",
        "data": base64.b64encode(img_byte_arr).decode()  # encode to base64
    }
    
    return [pdf_part]

@app.route('/api/analyze', methods=['POST'])
def analyze_resume():
    try:
        # Get the job description and resume from the request
        job_description = request.json.get('job_description')
        resume_base64 = request.json.get('resume')
        analysis_type = request.json.get('analysis_type')
        
        # Decode the base64-encoded resume
        resume_bytes = base64.b64decode(resume_base64)
        resume_file = io.BytesIO(resume_bytes)
        
        # Process the resume PDF
        pdf_content = process_pdf(resume_file)
        
        # Define the prompt based on analysis type
        if analysis_type == "tell_me_about_resume":
            input_prompt = """
            You are an experienced Technical Human Resource Manager. Your task is to review the provided resume against the job description. 
            Please share your professional evaluation on whether the candidate's profile aligns with the role. 
            Highlight the strengths and weaknesses of the applicant in relation to the specified job requirements.
            """
        elif analysis_type == "percentage_match":
            input_prompt = """
            You are a skilled ATS (Applicant Tracking System) scanner with a deep understanding of data science and ATS functionality. 
            Your task is to evaluate the resume against the provided job description. Provide the percentage match if the resume matches
            the job description. First, the output should come as a percentage, followed by missing keywords, and finally, your overall thoughts.
            """
        else:
            return jsonify({"error": "Invalid analysis type"}), 400
        
        # Get the response from the Gemini model
        response_text = get_gemini_response(job_description, pdf_content, input_prompt)
        
        # Return the response as JSON
        return jsonify({"result": response_text})
    
    except Exception as e:
        app.logger.error(f"Error analyzing resume: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
