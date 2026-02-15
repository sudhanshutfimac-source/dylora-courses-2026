import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar';
import InternshipCard from '../components/InternshipCard';
import RecommendedWidget from '../components/RecommendedWidget';
import RecentlyViewedWidget from '../components/RecentlyViewedWidget';
import '../styles/Internships.css';

const Internships = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [bookmarkedJobs, setBookmarkedJobs] = useState(new Set());
    const [appliedJobs, setAppliedJobs] = useState(new Set());
    const [recentlyViewed, setRecentlyViewed] = useState([]);

    // Multi-filter state
    const [filters, setFilters] = useState({
        category: [],
        role: [],
        worktime: [],
        compensation: []
    });

    // Check if we came back from application form with applied status
    useEffect(() => {
        if (location.state?.appliedInternshipId) {
            setAppliedJobs(prev => new Set(prev).add(location.state.appliedInternshipId));
        }
    }, [location.state]);

    // Load recently viewed from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('recentlyViewedInternships');
        if (saved) {
            setRecentlyViewed(JSON.parse(saved));
        }
    }, []);

    const internships = [
        {
            id: 1,
            title: 'Content Writing',
            company: 'Dylog',
            location: 'Mumbai',
            duration: '3 Months',
            salary: '₹8,000-12,000/month',
            badge: 'Beginner',
            responsibilities: [
                'Research and create engaging content',
                'Edit and proofread articles',
                'Manage content calendar'
            ],
            skills: 'English Proficiency • MS Word • Creative Writing',
            category: 'Non-Tech',
            role: 'Content Writing',
            worktime: 'Full-time',
            compensation: 'Paid'
        },
        {
            id: 2,
            title: 'Campus Ambassador',
            company: 'TechCorp',
            location: 'Bangalore',
            duration: '6 Months',
            salary: '₹5,000-8,000/month + Incentives',
            badge: 'Learner',
            responsibilities: [
                'Represent company on campus',
                'Organize events and workshops',
                'Build student community'
            ],
            skills: 'Communication Skills • Social Media • Event Management',
            category: 'Non-Tech',
            role: 'Campus Ambassador',
            worktime: 'Part-time',
            compensation: 'Paid'
        },
        {
            id: 3,
            title: 'Marketing',
            company: 'BrandYess',
            location: 'Mumbai',
            duration: '4 Months',
            salary: '₹9,000-15,000/month',
            badge: 'Beginner',
            responsibilities: [
                'Assist in marketing campaigns',
                'Social media management',
                'Market research and analysis'
            ],
            skills: 'English Proficiency • MS Excel • Marketing Basics',
            category: 'Non-Tech',
            role: 'Marketing',
            worktime: 'Full-time',
            compensation: 'Paid'
        },
        {
            id: 4,
            title: 'Business Development',
            company: 'GlobalTech',
            location: 'Delhi',
            duration: '5 Months',
            salary: '₹10,000-18,000/month',
            badge: 'Learner',
            responsibilities: [
                'Client acquisition and outreach',
                'Lead generation activities',
                'Sales presentations and demos'
            ],
            skills: 'Communication • MS Office • Sales Skills',
            category: 'Non-Tech',
            role: 'Business Development',
            worktime: 'WFH',
            compensation: 'Paid'
        },
        {
            id: 5,
            title: 'Software Engineering Intern',
            company: 'TechFlow',
            location: 'Pune',
            duration: '6 Months',
            salary: '₹15,000-25,000/month',
            badge: 'Learner',
            responsibilities: [
                'Develop and test software applications',
                'Collaborate with senior developers',
                'Write clean, maintainable code'
            ],
            skills: 'JavaScript • React • Node.js • Git',
            category: 'Tech',
            role: 'Software Engineering',
            worktime: 'Full-time',
            compensation: 'Paid'
        }
    ];

    const handleFilterChange = (filterType, values) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: values
        }));
    };

    const handleClearFilters = () => {
        setFilters({
            category: [],
            role: [],
            worktime: [],
            compensation: []
        });
    };

    const toggleBookmark = (id) => {
        setBookmarkedJobs(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const handleApplyClick = (internship) => {
        if (!appliedJobs.has(internship.id)) {
            // Track as recently viewed before navigating
            trackRecentlyViewed(internship);
            navigate('/apply', { state: { internship } });
        }
    };

    const trackRecentlyViewed = (internship) => {
        setRecentlyViewed(prev => {
            const filtered = prev.filter(item => item.id !== internship.id);
            const updated = [internship, ...filtered].slice(0, 5);
            localStorage.setItem('recentlyViewedInternships', JSON.stringify(updated));
            return updated;
        });
    };

    const handleInternshipClick = (id) => {
        const internship = internships.find(i => i.id === id);
        if (internship) {
            trackRecentlyViewed(internship);
            // Scroll to the internship card
            const element = document.getElementById(`internship-${id}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    };

    // Apply filters
    const filteredInternships = internships.filter(internship => {
        // Category filter
        if (filters.category.length > 0 && !filters.category.includes(internship.category)) {
            return false;
        }
        // Role filter
        if (filters.role.length > 0 && !filters.role.includes(internship.role)) {
            return false;
        }
        // Worktime filter
        if (filters.worktime.length > 0 && !filters.worktime.includes(internship.worktime)) {
            return false;
        }
        // Compensation filter
        if (filters.compensation.length > 0 && !filters.compensation.includes(internship.compensation)) {
            return false;
        }
        return true;
    });

    return (
        <div className="internships-page">
            {/* Header Section */}
            <div className="internships-header">
                <span className="section-tag">CAREER OPPORTUNITIES</span>
                <h1 className="internships-title gradient-text">Latest Internships</h1>
                <p className="internships-subtitle">Shape your future with us</p>
            </div>

            {/* Three-Column Layout */}
            <div className="internships-layout">
                {/* Left Sidebar - Filters */}
                <FilterSidebar
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                />

                {/* Middle Column - Internship Cards */}
                <div className="internships-main">
                    <div className="internships-count">
                        <h2 className="section-heading">
                            {filteredInternships.length} {filteredInternships.length === 1 ? 'Internship' : 'Internships'} Available
                        </h2>
                    </div>

                    <div className="internships-list-modern">
                        {filteredInternships.map((internship) => (
                            <div key={internship.id} id={`internship-${internship.id}`}>
                                <InternshipCard
                                    internship={internship}
                                    isBookmarked={bookmarkedJobs.has(internship.id)}
                                    isApplied={appliedJobs.has(internship.id)}
                                    onBookmark={toggleBookmark}
                                    onApply={handleApplyClick}
                                />
                            </div>
                        ))}
                    </div>

                    {filteredInternships.length === 0 && (
                        <div className="no-results">
                            <i className="fa-solid fa-inbox" style={{ fontSize: '3rem', color: 'var(--text-muted)', marginBottom: '16px' }}></i>
                            <h3>No internships found</h3>
                            <p>Try adjusting your filters to see more opportunities</p>
                        </div>
                    )}

                    {filteredInternships.length > 0 && (
                        <div className="view-more-container">
                            <button
                                className="view-more-link"
                                onClick={() => console.log('Load more internships')}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
                            >
                                View 100+ more opportunities ›
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Sidebar - Widgets */}
                <div className="internships-sidebar">
                    <RecommendedWidget
                        internships={internships}
                        onInternshipClick={handleInternshipClick}
                    />
                    <RecentlyViewedWidget
                        recentlyViewed={recentlyViewed}
                        onInternshipClick={handleInternshipClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default Internships;