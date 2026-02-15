import React from 'react';
import '../styles/FilterSidebar.css';

const FilterSidebar = ({ filters, onFilterChange, onClearFilters }) => {
    const handleCheckboxChange = (filterType, value) => {
        const currentValues = filters[filterType] || [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];
        onFilterChange(filterType, newValues);
    };

    const isChecked = (filterType, value) => {
        return (filters[filterType] || []).includes(value);
    };

    const hasActiveFilters = () => {
        return Object.values(filters).some(arr => arr.length > 0);
    };

    return (
        <div className="filter-sidebar">
            <div className="filter-header">
                <h3 className="filter-title">Filters</h3>
                {hasActiveFilters() && (
                    <button className="clear-filters-btn" onClick={onClearFilters}>
                        Clear All
                    </button>
                )}
            </div>

            {/* Category Filter */}
            <div className="filter-section">
                <h4 className="filter-section-title">Category</h4>
                <div className="filter-options">
                    <label className="filter-option">
                        <input
                            type="checkbox"
                            checked={isChecked('category', 'Tech')}
                            onChange={() => handleCheckboxChange('category', 'Tech')}
                        />
                        <span className="filter-label">Tech</span>
                    </label>
                    <label className="filter-option">
                        <input
                            type="checkbox"
                            checked={isChecked('category', 'Non-Tech')}
                            onChange={() => handleCheckboxChange('category', 'Non-Tech')}
                        />
                        <span className="filter-label">Non-Tech</span>
                    </label>
                </div>
            </div>

            {/* Role Filter */}
            <div className="filter-section">
                <h4 className="filter-section-title">Role</h4>
                <div className="filter-options">
                    <label className="filter-option">
                        <input
                            type="checkbox"
                            checked={isChecked('role', 'Content Writing')}
                            onChange={() => handleCheckboxChange('role', 'Content Writing')}
                        />
                        <span className="filter-label">Content Writing</span>
                    </label>
                    <label className="filter-option">
                        <input
                            type="checkbox"
                            checked={isChecked('role', 'Software Engineering')}
                            onChange={() => handleCheckboxChange('role', 'Software Engineering')}
                        />
                        <span className="filter-label">Software Engineering</span>
                    </label>
                    <label className="filter-option">
                        <input
                            type="checkbox"
                            checked={isChecked('role', 'Marketing')}
                            onChange={() => handleCheckboxChange('role', 'Marketing')}
                        />
                        <span className="filter-label">Marketing</span>
                    </label>
                    <label className="filter-option">
                        <input
                            type="checkbox"
                            checked={isChecked('role', 'Business Development')}
                            onChange={() => handleCheckboxChange('role', 'Business Development')}
                        />
                        <span className="filter-label">Business Development</span>
                    </label>
                    <label className="filter-option">
                        <input
                            type="checkbox"
                            checked={isChecked('role', 'Campus Ambassador')}
                            onChange={() => handleCheckboxChange('role', 'Campus Ambassador')}
                        />
                        <span className="filter-label">Campus Ambassador</span>
                    </label>
                </div>
            </div>

            {/* Worktime Filter */}
            <div className="filter-section">
                <h4 className="filter-section-title">Work Type</h4>
                <div className="filter-options">
                    <label className="filter-option">
                        <input
                            type="checkbox"
                            checked={isChecked('worktime', 'Part-time')}
                            onChange={() => handleCheckboxChange('worktime', 'Part-time')}
                        />
                        <span className="filter-label">Part-time</span>
                    </label>
                    <label className="filter-option">
                        <input
                            type="checkbox"
                            checked={isChecked('worktime', 'Full-time')}
                            onChange={() => handleCheckboxChange('worktime', 'Full-time')}
                        />
                        <span className="filter-label">Full-time</span>
                    </label>
                    <label className="filter-option">
                        <input
                            type="checkbox"
                            checked={isChecked('worktime', 'WFH')}
                            onChange={() => handleCheckboxChange('worktime', 'WFH')}
                        />
                        <span className="filter-label">Work From Home</span>
                    </label>
                </div>
            </div>

            {/* Compensation Filter */}
            <div className="filter-section">
                <h4 className="filter-section-title">Compensation</h4>
                <div className="filter-options">
                    <label className="filter-option">
                        <input
                            type="checkbox"
                            checked={isChecked('compensation', 'Paid')}
                            onChange={() => handleCheckboxChange('compensation', 'Paid')}
                        />
                        <span className="filter-label">Paid</span>
                    </label>
                    <label className="filter-option">
                        <input
                            type="checkbox"
                            checked={isChecked('compensation', 'Unpaid')}
                            onChange={() => handleCheckboxChange('compensation', 'Unpaid')}
                        />
                        <span className="filter-label">Unpaid</span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;
