import axios from 'axios';

// Define the base URL for your backend API
const API_URL = 'http://127.0.0.1:5000/api'; // Adjust if your backend is hosted elsewhere

/**
 * Sends the job description and resume to the backend for analysis.
 * @param {string} jobDescription - The job description text.
 * @param {string} resumeBase64 - The resume file encoded as a base64 string.
 * @returns {Promise<string>} The analysis result from the backend.
 */
export const analyzeResume = async (jobDescription, resumeBase64) => {
    try {
        const response = await axios.post(`${API_URL}/analyze`, {
            job_description: jobDescription,
            resume: resumeBase64,
        });

        return response.data.result;
    } catch (error) {
        console.error("Error analyzing resume:", error);
        throw error;
    }
};
