# Personal-Resume-Scanner-using-Google-Gemini

**ATS Resume Analyzer** is a web application designed to evaluate resumes against job descriptions using advanced AI technology. Built with React.js for the frontend and Flask for the backend, this tool integrates with Google’s Gemini API to provide insightful analysis on how well a resume matches a given job description.

## Features

- **Job Description Input**: Users can input a job description to be analyzed.
- **Resume Upload**: Users can upload a resume in PDF format for analysis.
- **Resume Analysis**: Provides detailed feedback on resume alignment with job requirements.
  - **Evaluation**: Highlights strengths and weaknesses of the resume in relation to the job description.
  - **Percentage Match**: Calculates the percentage match between the resume and job description, including missing keywords and overall thoughts.

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Flask (Python)
- **AI Integration**: Google Gemini API
- **PDF Processing**: pdf2image for PDF to image conversion
- **Environment Management**: Python-dotenv for managing API keys

## Setup and Installation

### Frontend

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mini_project_final.git
   cd mini_project_final/client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend

1. Navigate to the backend directory:
   ```bash
   cd mini_project_final/server
   ```


2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` file in the `backend` directory and add your Google API key:
   ```
   GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
   ```

4. Start the Flask server:
   ```bash
   python app.py
   ```

## API Endpoints

- **POST /api/analyze**: Analyze a resume against a job description.
  - **Request Body**:
    ```json
    {
      "job_description": "string",
      "resume": "base64-encoded PDF",
      "analysis_type": "tell_me_about_resume" | "percentage_match"
    }
    ```
  - **Response**:
    ```json
    {
      "result": "string"
    }
    ```

## Error Handling

- **400 Bad Request**: Indicates missing or invalid input data.
- **500 Internal Server Error**: Indicates server-side issues, such as invalid API keys or processing errors.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request to help improve the ATS Resume Analyzer.


## Contact

For questions or feedback, please reach out to [doddishivads@gmail.com].

---

Feel free to adjust the details to better fit your specific project and repository setup!
