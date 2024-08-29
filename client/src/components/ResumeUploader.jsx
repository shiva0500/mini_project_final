import React from 'react';

const ResumeUploader = ({ setResume }) => {
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setResume(reader.result); // Store base64 string
        };
    };

    return (
        <div className="form-control w-full max-w-xs">
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
    );
};

export default ResumeUploader;
