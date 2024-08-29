import React from 'react';

const JobDescriptionInput = ({ jobDescription, setJobDescription }) => {
    return (
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
    );
};

export default JobDescriptionInput;
