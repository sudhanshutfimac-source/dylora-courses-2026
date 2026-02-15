import React from 'react';
import '../styles/InternshipCard.css';

const InternshipCard = ({ internship, isBookmarked, isApplied, onBookmark, onApply }) => {
    return (
        <div className="internship-card-modern">
            {/* Card Header */}
            <div className="card-header-modern">
                <div>
                    <h3 className="card-title-modern">
                        {internship.title}
                        <span className={`badge-inline ${internship.badge.toLowerCase()}`}>
                            {internship.badge}
                        </span>
                    </h3>
                    <p className="card-company">{internship.company} - {internship.location}</p>
                </div>
            </div>

            {/* Meta Info - No Icons, Just Text */}
            <div className="card-meta-modern">
                <span className="meta-text">{internship.duration}</span>
                <span className="meta-divider">•</span>
                <span className="meta-text">{internship.salary}</span>
            </div>

            {/* Responsibilities */}
            <div className="card-responsibilities">
                {internship.responsibilities.map((resp, index) => (
                    <div key={index} className="responsibility-item-modern">
                        {index + 1}. {resp}
                    </div>
                ))}
            </div>

            {/* Skills */}
            <div className="card-skills">
                <p className="skills-text-modern">{internship.skills}</p>
            </div>

            {/* Actions - Single Save Button with Icon */}
            <div className="card-actions-modern">
                <button
                    className={`btn-save-modern ${isBookmarked ? 'saved' : ''}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onBookmark(internship.id);
                    }}
                >
                    <i className={`fa-${isBookmarked ? 'solid' : 'regular'} fa-bookmark`}></i>
                    {isBookmarked ? 'Saved' : 'Save'}
                </button>
                <button
                    className={`btn-apply-modern ${isApplied ? 'applied' : ''}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onApply(internship);
                    }}
                    disabled={isApplied}
                >
                    {isApplied ? (
                        <>
                            <i className="fa-solid fa-check"></i> Applied
                        </>
                    ) : (
                        'Apply'
                    )}
                </button>
            </div>
        </div>
    );
};

export default InternshipCard;
