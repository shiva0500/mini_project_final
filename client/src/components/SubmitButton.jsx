import React from 'react';

const SubmitButton = ({ onSubmit }) => {
    return (
        <button
            onClick={onSubmit}
            className="btn btn-primary w-full max-w-xs mt-4"
        >
            Analyze Resume
        </button>
    );
};

export default SubmitButton;
