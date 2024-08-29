import React from 'react';

const AnalysisOutput = ({ analysisResult }) => {
    return (
        <div className="mt-6 p-4 bg-base-100 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-2">Analysis Result</h2>
            {analysisResult ? (
                <p>{analysisResult}</p>
            ) : (
                <p>No analysis available yet. Please upload a resume and job description, then click "Analyze Resume".</p>
            )}
        </div>
    );
};

export default AnalysisOutput;
