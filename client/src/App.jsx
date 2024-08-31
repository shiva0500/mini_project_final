import { useState } from 'react';
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
                console.log(response.data.result);
            } catch (error) {
                console.error('Error analyzing resume:', error);
                setAnalysisResult('Error analyzing resume.');
            }
        } else {
            alert('Please upload a job description, resume, and select an analysis type.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-base-200 text-base-content">
            <nav className="bg-base-100 p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">Personal ATS Resume Scanner</h1>
                </div>
            </nav>

            <main className="flex-grow p-6">
                <div className="container mx-auto flex">
                    <div className="w-2/5 p-4 bg-base-100 rounded-lg shadow-lg">
                        <div className="form-control w-full">
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

                        <div className="form-control w-full mt-4">
                            <label className="label">
                                <span className="label-text">Upload Resume (PDF)</span>
                            </label>
                            <input
                                type="file"
                                className="file-input file-input-bordered w-full"
                                accept=".pdf"
                                onChange={handleFileUpload}
                            />
                        </div>

                        <div className="form-control w-full mt-4">
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
                            className="btn btn-primary w-full mt-4"
                        >
                            Analyze Resume
                        </button>
                    </div>

                    <div className="w-3/5 p-4 bg-base-100 rounded-lg shadow-lg ml-6">
                        <h2 className="text-lg font-bold mb-4">Analysis Result</h2>
                        {analysisResult ? (
                            <div dangerouslySetInnerHTML={{ __html: analysisResult }} />
                        ) : (
                            <p>No analysis available yet. Please upload a resume and job description, then click "Analyze Resume".</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
