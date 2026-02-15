import React, { useState } from 'react';
import './MasterTechSkills.css';

const MasterTechSkills = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [codeOutput, setCodeOutput] = useState('');

    const stats = [
        { number: '100+', label: 'Courses' },
        { number: '50+', label: 'Expert Instructors' },
        { number: '100k+', label: 'Active Learners' }
    ];

    const courses = [
        {
            id: 1,
            title: 'What does HTML stand for?',
            description: 'Learn the fundamentals of HTML',
            topics: [
                'HTML Basics',
                'HTML Semantics',
                'HTML Forms'
            ],
            difficulty: 'Beginner',
            code: `<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Hello World!</h1>
    <p>This is HTML</p>
</body>
</html>`
        },
        {
            id: 2,
            title: 'What does CSS stand for?',
            description: 'Master styling with CSS',
            topics: [
                'CSS Selectors',
                'Box Model',
                'Flexbox & Grid'
            ],
            difficulty: 'Intermediate',
            code: `body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    font-family: Arial, sans-serif;
    color: white;
}

h1 {
    font-size: 2.5rem;
    animation: slideIn 0.5s ease;
}

@keyframes slideIn {
    from { opacity: 0; }
    to { opacity: 1; }
}`
        },
        {
            id: 3,
            title: 'What is JavaScript used for?',
            description: 'Build interactive web applications',
            topics: [
                'Variables & Operators',
                'Functions & Scope',
                'DOM Manipulation'
            ],
            difficulty: 'Intermediate',
            code: `function greet(name) {
    return \`Hello, \${name}!\`;
}

const message = greet('Developer');
console.log(message);

// Event listener
document.addEventListener('click', () => {
    console.log('Page clicked!');
});`
        }
    ];

    const handleCourseClick = (course) => {
        setSelectedCourse(course);
        setCodeOutput(course.code);
    };

    const handleRunCode = () => {
        try {
            // For HTML/CSS, show the code
            if (selectedCourse?.id === 1) {
                setCodeOutput('✓ HTML rendered successfully!');
            } else if (selectedCourse?.id === 2) {
                setCodeOutput('✓ CSS applied successfully!');
            } else {
                // For JavaScript, try to execute
                eval(selectedCourse?.code);
                setCodeOutput('✓ Code executed successfully! Check console.');
            }
        } catch (error) {
            setCodeOutput(`Error: ${error.message}`);
        }
    };

    return (
        <div className="master-tech-skills" style={{ paddingTop: '80px' }}>
            {/* Header Section */}
            <section className="mts-header">
                <div className="mts-header-content">
                    <h1 className="mts-title">Master Tech Skills</h1>
                    <p className="mts-subtitle">Learn Top Skills. Land Top Roles.</p>
                    <p className="mts-description">
                        Elevate your coding journey with industry-leading courses designed by experts.
                    </p>
                </div>

                {/* Stats Section */}
                <div className="mts-stats">
                    {stats.map((stat, index) => (
                        <div key={index} className="mts-stat-card">
                            <div className="stat-number">{stat.number}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Courses Section */}
            <section className="mts-courses-section">
                <div className="courses-container">
                    <div className="courses-grid">
                        {courses.map((course) => (
                            <div 
                                key={course.id} 
                                className={`course-card ${selectedCourse?.id === course.id ? 'active' : ''}`}
                                onClick={() => handleCourseClick(course)}
                            >
                                <div className="course-header">
                                    <div className="course-icon">📚</div>
                                    <span className="course-difficulty">{course.difficulty}</span>
                                </div>
                                
                                <h3 className="course-title">{course.title}</h3>
                                <p className="course-description">{course.description}</p>
                                
                                <div className="course-topics">
                                    {course.topics.map((topic, index) => (
                                        <div key={index} className="topic-item">
                                            <span className="topic-check">✓</span>
                                            <span>{topic}</span>
                                        </div>
                                    ))}
                                </div>
                                
                                <p className="course-note">
                                    Comprehensive learning path with hands-on projects and real-world examples.
                                </p>
                                
                                <button className="course-btn">Explore Course →</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Code Editor Section */}
                {selectedCourse && (
                    <div className="code-editor-section">
                        <div className="editor-container">
                            <div className="editor-header">
                                <h3>Try it Yourself</h3>
                                <div className="editor-language">
                                    {selectedCourse.id === 1 ? 'HTML' : selectedCourse.id === 2 ? 'CSS' : 'JavaScript'}
                                </div>
                            </div>
                            
                            <div className="editor-content">
                                <div className="code-input">
                                    <pre><code>{selectedCourse.code}</code></pre>
                                </div>
                                
                                <div className="code-output">
                                    <div className="output-header">Output</div>
                                    <pre><code>{codeOutput || selectedCourse.code}</code></pre>
                                </div>
                            </div>
                            
                            <button className="run-btn" onClick={handleRunCode}>
                                ▶ Run Code
                            </button>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default MasterTechSkills;
