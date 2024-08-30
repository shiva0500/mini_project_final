import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

function App() {
    const [jobDescription, setJobDescription] = useState('');
    const [resume, setResume] = useState(null);
    const [analysisResult, setAnalysisResult] = useState('');
    const [analysisType, setAnalysisType] = useState('');

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setResume(reader.result); // Store base64 string
        };
    };

    const handleSubmit = async () => {
        if (jobDescription && resume && analysisType) {
            try {
                const response = await axios.post('http://127.0.0.1:5000/api/analyze', {
                    job_description: jobDescription,
                    resume: resume.split(',')[1], // Remove the base64 header
                    analysis_type: analysisType
                });
                setAnalysisResult(response.data.result);
            } catch (error) {
                console.error('Error analyzing resume:', error);
                setAnalysisResult('Error analyzing resume.');
            }
        } else {
            alert('Please upload a job description, resume, and select an analysis type.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-200">
            <h1 className="text-3xl font-bold mb-8">ATS Resume Analyzer</h1>
            <div className="w-full max-w-lg">
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Job Description</span>
                    </label>
                    <textarea
                        className="textarea textarea-bordered h-24"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Enter the job description here..."
                    />
                </div>

                <div className="form-control w-full max-w-xs mt-4">
                    <label className="label">
                        <span className="label-text">Upload Resume (PDF)</span>
                    </label>
                    <input
                        type="file"
                        className="file-input file-input-bordered w-full max-w-xs"
                        accept=".pdf"
                        onChange={handleFileUpload}
                    />
                </div>

                <div className="form-control w-full max-w-xs mt-4">
                    <label className="label">
                        <span className="label-text">Select Analysis Type</span>
                    </label>
                    <select
                        className="select select-bordered"
                        value={analysisType}
                        onChange={(e) => setAnalysisType(e.target.value)}
                    >
                        <option value="" disabled>Select one</option>
                        <option value="tell_me_about_resume">Tell Me About the Resume</option>
                        <option value="percentage_match">Percentage Match</option>
                    </select>
                </div>

                <button
                    onClick={handleSubmit}
                    className="btn btn-primary w-full max-w-xs mt-4"
                >
                    Analyze Resume
                </button>

                <div className="mt-6 p-4 bg-base-100 rounded-lg shadow">
                    <h2 className="text-lg font-bold mb-2">Analysis Result</h2>
                    {analysisResult ? (
                        <p>{analysisResult}</p>
                    ) : (
                        <p>No analysis available yet. Please upload a resume and job description, then click "Analyze Resume".</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
