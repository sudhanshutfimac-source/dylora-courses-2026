import React from 'react';
import '../styles/SidebarWidgets.css';

const RecentlyViewedWidget = ({ recentlyViewed, onInternshipClick }) => {
    if (!recentlyViewed || recentlyViewed.length === 0) {
        return null; // Don't show widget if no recently viewed items
    }

    return (
        <div className="sidebar-widget">
            <div className="widget-header">
                <i className="fa-solid fa-clock-rotate-left widget-icon"></i>
                <h3 className="widget-title">Recently Viewed</h3>
            </div>
            <div className="widget-content">
                {recentlyViewed.map((internship) => (
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

export default RecentlyViewedWidget;
