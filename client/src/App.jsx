import React, { useState } from 'react';
import JobDescriptionInput from './components/JobDescriptionInput';
import ResumeUploader from './components/ResumeUploader';
import AnalysisOutput from './components/AnalysisOutput';
import SubmitButton from './components/SubmitButton';
import { analyzeResume } from './services/api';
import './index.css';

function App() {
    const [jobDescription, setJobDescription] = useState('');
    const [resume, setResume] = useState(null);
    const [analysisResult, setAnalysisResult] = useState('');

    const handleSubmit = async () => {
        if (jobDescription && resume) {
            const result = await analyzeResume(jobDescription, resume);
            setAnalysisResult(result);
        } else {
            alert('Please upload both a job description and a resume.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-200">
            <h1 className="text-3xl font-bold mb-8">ATS Resume Analyzer</h1>
            <div className="w-full max-w-lg">
                <JobDescriptionInput jobDescription={jobDescription} setJobDescription={setJobDescription} />
                <ResumeUploader setResume={setResume} />
                <SubmitButton onSubmit={handleSubmit} />
                <AnalysisOutput analysisResult={analysisResult} />
            </div>
        </div>
    );
}

export default App;
