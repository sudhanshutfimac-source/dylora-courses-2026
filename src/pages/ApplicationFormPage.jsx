import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/ApplicationForm.css';

const ApplicationFormPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const internship = location.state?.internship;
    const [user, setUser] = useState(null); // For Navbar props

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        whatsapp: '',
        address: '',
        city: '',
        state: '', 
        pinCode: '',
        country: '',
        collegeName: '',
        degree: '',
        graduationYear: '',
        specialization: '',
        resume: null,
        motivation: '',
        availability: ''
    });

    const progressSections = [
        { id: 'personal', label: 'Personal Info', fields: ['firstName', 'lastName', 'email', 'phone', 'whatsapp'] },
        { id: 'address', label: 'Address', fields: ['address', 'city', 'state', 'pinCode', 'country'] },
        { id: 'education', label: 'Education', fields: ['collegeName', 'degree', 'graduationYear', 'specialization'] },
        { id: 'additional', label: 'Additional', fields: ['resume', 'motivation', 'availability'] }
    ];

    const calculateProgress = (sectionId) => {
        const section = progressSections.find(s => s.id === sectionId);
        if (!section) return 0;
        const filledFields = section.fields.filter(field => formData[field]).length;
        return Math.round((filledFields / section.fields.length) * 100);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            resume: e.target.files[0]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Application submitted:', internship?.id, formData);
        // Navigate back with success state
        navigate('/internships', {
            state: {
                appliedInternshipId: internship?.id
            }
        });
    };

    return (
        <>
            <Navbar user={user} setUser={setUser} />

            <div className="application-form-page">
                <div className="form-layout-container">
                    {/* Left Sidebar - Progress Tracker */}
                    <div className="form-left-sidebar">
                        <div className="progress-tracker">
                            <h3 className="tracker-title">
                                <i className="fa-solid fa-list-check"></i> Your Progress
                            </h3>

                            {progressSections.map((section, index) => {
                                const progress = calculateProgress(section.id);
                                const isCompleted = progress === 100;

                                return (
                                    <div
                                        key={section.id}
                                        className={`progress-step ${isCompleted ? 'completed' : ''}`}
                                    >
                                        <div className="step-indicator">
                                            {isCompleted ? (
                                                <i className="fa-solid fa-check"></i>
                                            ) : (
                                                <span>{index + 1}</span>
                                            )}
                                        </div>
                                        <div className="step-content">
                                            <div className="step-label">{section.label}</div>
                                            <div className="step-progress-bar">
                                                <div
                                                    className="step-progress-fill"
                                                    style={{ width: `${progress}%` }}
                                                ></div>
                                            </div>
                                            <div className="step-percentage">{progress}%</div>
                                        </div>
                                    </div>
                                );
                            })}

                            <div className="tracker-tip">
                                <i className="fa-solid fa-lightbulb"></i>
                                <p>Complete all sections to submit your application</p>
                            </div>
                        </div>
                    </div>

                    {/* Middle - Form Container */}
                    <div className="form-page-container">
                        {/* Form Badge */}
                        <div className="form-badge">
                            <span className="badge-text">
                                {internship?.title || 'Internship'} Application
                            </span>
                        </div>

                        {/* Form Title */}
                        <div className="form-title-section">
                            <h1 className="form-title">Application Form</h1>
                            <p className="form-subtitle">Fill in your details to apply for this internship</p>
                        </div>

                        {/* Application Form */}
                        <form onSubmit={handleSubmit} className="application-form">
                            {/* Name Fields */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="firstName">
                                        First Name <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="Enter your first name"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">
                                        Last Name <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Enter your last name"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="form-group">
                                <label htmlFor="email">
                                    Email Address <span className="required">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="yourname@example.com"
                                    required
                                />
                            </div>

                            {/* Phone Number */}
                            <div className="form-group">
                                <label htmlFor="phone">
                                    Phone Number <span className="required">*</span>
                                </label>
                                <div className="phone-input">
                                    <select className="country-code">
                                        <option value="+91">🇮🇳 +91</option>
                                    </select>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="9876543210"
                                        required
                                    />
                                </div>
                            </div>

                            {/* WhatsApp Number */}
                            <div className="form-group">
                                <label htmlFor="whatsapp">
                                    WhatsApp Number <span className="required">*</span>
                                </label>
                                <div className="phone-input">
                                    <select className="country-code">
                                        <option value="+91">🇮🇳 +91</option>
                                    </select>
                                    <input
                                        type="tel"
                                        id="whatsapp"
                                        name="whatsapp"
                                        value={formData.whatsapp}
                                        onChange={handleChange}
                                        placeholder="9876543210"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Full Address */}
                            <div className="form-group">
                                <label htmlFor="address">
                                    Full Address <span className="required">*</span>
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Street address, apartment/building/floor number"
                                    rows="3"
                                    required
                                />
                            </div>

                            {/* City and State */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="city">
                                        City <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Mumbai"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="state">
                                        State <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="state"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        placeholder="Maharashtra"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Pin Code and Country */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="pinCode">
                                        Pin Code <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="pinCode"
                                        name="pinCode"
                                        value={formData.pinCode}
                                        onChange={handleChange}
                                        placeholder="400001"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="country">
                                        Country <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        placeholder="India"
                                        required
                                    />
                                </div>
                            </div>

                            {/* College Name */}
                            <div className="form-group">
                                <label htmlFor="collegeName">
                                    College/University Name <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="collegeName"
                                    name="collegeName"
                                    value={formData.collegeName}
                                    onChange={handleChange}
                                    placeholder="Enter your college or university name"
                                    required
                                />
                            </div>

                            {/* Degree and Graduation Year */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="degree">
                                        Degree <span className="required">*</span>
                                    </label>
                                    <select
                                        id="degree"
                                        name="degree"
                                        value={formData.degree}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select your degree</option>
                                        <option value="btech">B.Tech</option>
                                        <option value="bsc">B.Sc</option>
                                        <option value="bcom">B.Com</option>
                                        <option value="ba">B.A</option>
                                        <option value="mtech">M.Tech</option>
                                        <option value="msc">M.Sc</option>
                                        <option value="mba">MBA</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="graduationYear">
                                        Expected Graduation Year <span className="required">*</span>
                                    </label>
                                    <select
                                        id="graduationYear"
                                        name="graduationYear"
                                        value={formData.graduationYear}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select year</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                        <option value="2027">2027</option>
                                        <option value="2028">2028</option>
                                    </select>
                                </div>
                            </div>

                            {/* Specialization */}
                            <div className="form-group">
                                <label htmlFor="specialization">
                                    Specialization/Major <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="specialization"
                                    name="specialization"
                                    value={formData.specialization}
                                    onChange={handleChange}
                                    placeholder="e.g. Computer Science, Marketing, English Literature"
                                    required
                                />
                            </div>

                            {/* Resume Upload */}
                            <div className="form-group">
                                <label htmlFor="resume">
                                    Upload Resume (PDF) <span className="required">*</span>
                                </label>
                                <div className="file-upload">
                                    <input
                                        type="file"
                                        id="resume"
                                        name="resume"
                                        onChange={handleFileChange}
                                        accept=".pdf"
                                        required
                                    />
                                    <label htmlFor="resume" className="file-upload-label">
                                        <i className="fa-solid fa-upload"></i> Choose PDF file
                                    </label>
                                    {formData.resume && (
                                        <span className="file-name">{formData.resume.name}</span>
                                    )}
                                </div>
                                <small className="file-info">No file selected</small>
                            </div>

                            {/* Motivation */}
                            <div className="form-group">
                                <label htmlFor="motivation">
                                    Why do you want this internship? <span className="required">*</span>
                                </label>
                                <textarea
                                    id="motivation"
                                    name="motivation"
                                    value={formData.motivation}
                                    onChange={handleChange}
                                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                                    rows="5"
                                    required
                                />
                            </div>

                            {/* Availability */}
                            <div className="form-group">
                                <label htmlFor="availability">
                                    When can you start? <span className="required">*</span>
                                </label>
                                <select
                                    id="availability"
                                    name="availability"
                                    value={formData.availability}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select availability</option>
                                    <option value="immediately">Immediately</option>
                                    <option value="1week">Within 1 week</option>
                                    <option value="2weeks">Within 2 weeks</option>
                                    <option value="1month">Within 1 month</option>
                                </select>
                            </div>

                            {/* Submit Button */}
                            <div className="form-actions">
                                <button type="submit" className="submit-btn">
                                    Submit Application
                                </button>
                            </div>

                            {/* Confirmation Note */}
                            <p className="confirmation-note">
                                <i className="fa-regular fa-envelope"></i>
                                You will receive a confirmation email once your application is submitted. We'll review your application and get back to you within 5-7 business days.
                            </p>
                        </form>
                    </div>

                    {/* Right Sidebar - Info Cards */}
                    <div className="form-right-sidebar">
                        {/* Quick Tips Card */}
                        <div className="info-card tips-card">
                            <div className="card-header">
                                <i className="fa-solid fa-circle-info"></i>
                                <h3>Application Tips</h3>
                            </div>
                            <ul className="tips-list">
                                <li>
                                    <i className="fa-solid fa-check"></i>
                                    Use a professional email address
                                </li>
                                <li>
                                    <i className="fa-solid fa-check"></i>
                                    Keep your resume updated and under 2MB
                                </li>
                                <li>
                                    <i className="fa-solid fa-check"></i>
                                    Write a personalized motivation statement
                                </li>
                                <li>
                                    <i className="fa-solid fa-check"></i>
                                    Double-check all information before submitting
                                </li>
                            </ul>
                        </div>

                        {/* Timeline Card */}
                        <div className="info-card timeline-card">
                            <div className="card-header">
                                <i className="fa-regular fa-calendar"></i>
                                <h3>What Happens Next?</h3>
                            </div>
                            <div className="timeline">
                                <div className="timeline-item">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-content">
                                        <strong>Step 1</strong>
                                        <p>Submit application</p>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-content">
                                        <strong>Step 2</strong>
                                        <p>Email confirmation (instant)</p>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-content">
                                        <strong>Step 3</strong>
                                        <p>Review by team (5-7 days)</p>
                                    </div>
                                </div>
                                <div className="timeline-item">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-content">
                                        <strong>Step 4</strong>
                                        <p>Interview invitation</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Support Card */}
                        <div className="info-card support-card">
                            <div className="card-header">
                                <i className="fa-solid fa-headset"></i>
                                <h3>Need Help?</h3>
                            </div>
                            <p className="support-text">
                                Have questions about the application process?
                            </p>
                            <button className="support-btn" type="button">
                                <i className="fa-solid fa-envelope"></i>
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ApplicationFormPage;
