import React from 'react';
import '../styles/SidebarWidgets.css';

const RecommendedWidget = ({ internships, onInternshipClick }) => {
    // Mock recommended logic - in production, this would be based on user's interests/history
    const recommendedInternships = internships.slice(0, 3);

    return (
        <div className="sidebar-widget">
            <div className="widget-header">
                <i className="fa-solid fa-star widget-icon"></i>
                <h3 className="widget-title">Recommended For You</h3>
            </div>
            <div className="widget-content">
                {recommendedInternships.map((internship) => (
                    <div
                        key={internship.id}
                        className="widget-card"
                        onClick={() => onInternshipClick(internship.id)}
                    >
                        <div className="widget-card-header">
                            <h4 className="widget-card-title">{internship.title}</h4>
                            <span className={`widget-badge ${internship.badge.toLowerCase()}`}>
                                {internship.badge}
                            </span>
                        </div>
                        <p className="widget-card-company">{internship.company}</p>
                        <div className="widget-card-meta">
                            <span>{internship.location}</span>
                            <span className="widget-divider">•</span>
                            <span>{internship.duration}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendedWidget;
