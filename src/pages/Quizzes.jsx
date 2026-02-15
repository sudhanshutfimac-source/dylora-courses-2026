import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Quizzes.css';
import './quiz-navigation.css';
import './code-editor-loading.css';

const Quizzes = () => {
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [codeOutput, setCodeOutput] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [stats, setStats] = useState({ questions: 0, topics: 0, learners: 0 });
    const [editableCode, setEditableCode] = useState('');
    const [userAnswers, setUserAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCodeRunning, setIsCodeRunning] = useState(false);
    const [isCodeLoading, setIsCodeLoading] = useState(false);
    const iframeRef = useRef(null);
    const questionRef = useRef(null);

    const staticStats = [
        { number: '500+', label: 'Quiz Questions' },
        { number: '50+', label: 'Quiz Topics' },
        { number: '10k+', label: 'Daily Participants' }
    ];

    const quizzes = [
        {
            id: 1,
            title: 'What does HTML stand for?',
            category: 'Web Fundamentals',
            difficulty: 'Beginner',
            icon: '🌐',
            questions: [
                {
                    question: 'What does HTML stand for?',
                    options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'],
                    correct: 0
                },
                {
                    question: 'Which tag is used for the largest heading?',
                    options: ['<h6>', '<h1>', '<head>', '<header>'],
                    correct: 1
                },
                {
                    question: 'What is the correct HTML element for inserting a line break?',
                    options: ['<lb>', '<br>', '<break>', '<line>'],
                    correct: 1
                }
            ],
            description: 'Test your knowledge on HTML basics and fundamentals.',
            code: `<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Hello World!</h1>
    <p>This is HTML</p>
</body>
</html>`,
            category: 'Web Fundamentals'
        },
        {
            id: 2,
            title: 'CSS Styling Basics',
            category: 'Styling',
            difficulty: 'Beginner',
            icon: '🎨',
            questions: [
                {
                    question: 'What does CSS stand for?',
                    options: ['Cascading Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets', 'Common Style Sheets'],
                    correct: 0
                },
                {
                    question: 'Which is the correct CSS syntax?',
                    options: ['{body: color=black;}', 'body {color: black;}', '{body; color: black;}', 'body: color: black;'],
                    correct: 1
                },
                {
                    question: 'How do you select an element with id "main"?',
                    options: ['.main', '#main', '*main', '@main'],
                    correct: 1
                }
            ],
            description: 'Master the basics of CSS styling and selectors.',
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
}`,
            category: 'Styling'
        },
        {
            id: 3,
            title: 'JavaScript Fundamentals',
            category: 'Programming',
            difficulty: 'Intermediate',
            icon: '⚡',
            questions: [
                {
                    question: 'What is the correct way to write a JavaScript array?',
                    options: ['var colors = "red", "green", "blue"', 'var colors = ["red", "green", "blue"]', 'var colors = 1 = ("red"), 2 = ("green")', 'var colors = {1: "red", 2: "green"}'],
                    correct: 1
                },
                {
                    question: 'How do you declare a JavaScript variable?',
                    options: ['v carName;', 'var carName;', 'variable carName;', 'declare carName;'],
                    correct: 1
                },
                {
                    question: 'What is the correct conditional statement?',
                    options: ['if i = 5 then', 'if i == 5 then', 'if (i == 5)', 'if i = 5'],
                    correct: 2
                }
            ],
            description: 'Test your JavaScript fundamentals and core concepts.',
            code: `function greet(name) {
    return \`Hello, \${name}!\`;
}

const message = greet('Developer');
console.log(message);

// Event listener
document.addEventListener('click', () => {
    console.log('Page clicked!');
});`,
            category: 'Programming'
        }
    ];

    const categories = ['All', 'Web Fundamentals', 'Styling', 'Programming'];

    // Animated Counter Effect
    useEffect(() => {
        const animateCounter = (target, duration = 2000) => {
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                setStats({
                    questions: Math.floor(current * (500 / target)),
                    topics: Math.floor(current * (50 / target)),
                    learners: Math.floor(current * (10000 / target))
                });
            }, 16);
        };

        animateCounter(100);
    }, []);

    // Scroll Animation Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('reveal');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
        );

        document.querySelectorAll('.scroll-reveal').forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, [selectedQuiz]);

    // Filter quizzes by category
    const filteredQuizzes = selectedCategory === 'All'
        ? quizzes
        : quizzes.filter(quiz => quiz.category === selectedCategory);

    const handleStartQuiz = (quiz) => {
        setSelectedQuiz(quiz);
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setCodeOutput(quiz.code);
        setEditableCode(quiz.code);
        setUserAnswers(new Array(quiz.questions.length).fill(null));
        setSelectedAnswer(null);
    };

    const handleAnswerClick = (optionIndex) => {
        // Save the selected answer
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestion] = optionIndex;
        setUserAnswers(newAnswers);
        setSelectedAnswer(optionIndex);
    };

    const handleNextQuestion = () => {
        // Scroll to top smoothly
        if (questionRef.current) {
            questionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Move to next question
        if (currentQuestion + 1 < selectedQuiz.questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(userAnswers[currentQuestion + 1]);
        }
    };

    const handlePreviousQuestion = () => {
        // Scroll to top smoothly
        if (questionRef.current) {
            questionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Move to previous question
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            setSelectedAnswer(userAnswers[currentQuestion - 1]);
        }
    };

    const handleSubmitQuiz = () => {
        // Calculate score based on saved answers
        let finalScore = 0;
        userAnswers.forEach((answer, index) => {
            if (answer === selectedQuiz.questions[index].correct) {
                finalScore++;
            }
        });
        setScore(finalScore);
        setShowResult(true);
    };

    const handleRetryQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setUserAnswers(new Array(selectedQuiz.questions.length).fill(null));
        setSelectedAnswer(null);
    };

    const handleRunCode = () => {
        // Prevent multiple rapid clicks
        if (isCodeRunning) return;

        setIsCodeRunning(true);
        setIsCodeLoading(true);
        setCodeOutput('');

        // Professional loading delay (800ms)
        setTimeout(() => {
            try {
                if (selectedQuiz?.id === 1) {
                    // HTML - render using iframe.srcDoc
                    if (iframeRef.current) {
                        try {
                            const htmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 20px;
            background: #ffffff;
        }
    </style>
</head>
<body>
    ${editableCode}
</body>
</html>`;

                            iframeRef.current.srcdoc = htmlCode;
                            setCodeOutput('✓ HTML rendered!');
                        } catch (err) {
                            console.error('HTML Error:', err);
                            setCodeOutput(`❌ Error: ${err.message}`);
                        }
                    }
                } else if (selectedQuiz?.id === 2) {
                    // CSS - render using iframe.srcDoc
                    if (iframeRef.current) {
                        try {
                            const cssCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            padding: 30px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f5f5f5;
        }
        ${editableCode}
    </style>
</head>
<body>
    <h1>CSS Styling Applied</h1>
    <p>Your styles are now active on this page.</p>
    <button>Sample Button</button>
    <div class="box">Styled Box</div>
</body>
</html>`;

                            iframeRef.current.srcdoc = cssCode;
                            setCodeOutput('✓ CSS applied!');
                        } catch (err) {
                            console.error('CSS Error:', err);
                            setCodeOutput(`❌ Error: ${err.message}`);
                        }
                    }
                } else if (selectedQuiz?.id === 3) {
                    // JavaScript - execute with console capture using iframe.srcDoc
                    if (iframeRef.current) {
                        try {
                            const jsCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Courier New', monospace;
            padding: 20px;
            background: #1e1e1e;
            color: #d4d4d4;
        }
        .log { padding: 5px 0; }
        .error { color: #f48771; }
        .warn { color: #dcdcaa; }
    </style>
</head>
<body>
    <div id="console"></div>
    <script>
        const consoleDiv = document.getElementById('console');
        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;

        console.log = function(...args) {
            const line = document.createElement('div');
            line.className = 'log';
            line.textContent = '▶ ' + args.join(' ');
            consoleDiv.appendChild(line);
            originalLog.apply(console, args);
        };

        console.error = function(...args) {
            const line = document.createElement('div');
            line.className = 'log error';
            line.textContent = '❌ ' + args.join(' ');
            consoleDiv.appendChild(line);
            originalError.apply(console, args);
        };

        console.warn = function(...args) {
            const line = document.createElement('div');
            line.className = 'log warn';
            line.textContent = '⚠️ ' + args.join(' ');
            consoleDiv.appendChild(line);
            originalWarn.apply(console, args);
        };

        try {
            ${editableCode}
            if (consoleDiv.children.length === 0) {
                console.log('Code executed successfully!');
            }
        } catch (error) {
            console.error(error.message);
        }
    </script>
</body>
</html>`;

                            iframeRef.current.srcdoc = jsCode;
                            setCodeOutput('✓ JavaScript executed!');
                        } catch (err) {
                            console.error('JS Error:', err);
                            setCodeOutput(`❌ Error: ${err.message}`);
                        }
                    }
                }
            } catch (error) {
                setCodeOutput(`❌ Fatal Error: ${error.message}`);
            }

            // Hide loading after execution
            setTimeout(() => {
                setIsCodeLoading(false);
                setIsCodeRunning(false);
            }, 300);
        }, 800);
    };

    const handleBackToQuizzes = () => {
        setSelectedQuiz(null);
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
    };

    if (selectedQuiz) {
        return (
            <div className="quizzes-page">
                <div className="quiz-navigation">
                    <button className="back-btn" onClick={handleBackToQuizzes}>
                        ← Back to Quizzes
                    </button>
                </div>

                {!showResult ? (
                    <div className="quiz-wrapper" ref={questionRef}>
                        <div className="quiz-container">
                            <div className="quiz-header">
                                <h2>{selectedQuiz.title}</h2>
                                <div className="quiz-progress">
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${((currentQuestion + 1) / selectedQuiz.questions.length) * 100}%` }}
                                        ></div>
                                    </div>
                                    <p className="progress-text">
                                        Question {currentQuestion + 1} of {selectedQuiz.questions.length}
                                    </p>
                                </div>
                            </div>

                            <div className="question-container">
                                <h3 className="question-text">
                                    {selectedQuiz.questions[currentQuestion].question}
                                </h3>

                                <div className="options-grid">
                                    {selectedQuiz.questions[currentQuestion].options.map((option, index) => (
                                        <button
                                            key={index}
                                            className={`option-btn ${selectedAnswer === index ? 'selected' : ''
                                                }`}
                                            onClick={() => handleAnswerClick(index)}
                                        >
                                            <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                                            <span className="option-text">{option}</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Navigation Buttons */}
                                <div className="quiz-navigation-buttons">
                                    <button
                                        className="nav-btn prev-btn"
                                        onClick={handlePreviousQuestion}
                                        disabled={currentQuestion === 0}
                                    >
                                        <span className="nav-icon">←</span>
                                        Previous
                                    </button>

                                    {currentQuestion === selectedQuiz.questions.length - 1 ? (
                                        <button
                                            className="nav-btn submit-btn"
                                            onClick={handleSubmitQuiz}
                                            disabled={userAnswers.some(answer => answer === null)}
                                        >
                                            Submit Quiz
                                            <span className="nav-icon">✓</span>
                                        </button>
                                    ) : (
                                        <button
                                            className="nav-btn next-btn"
                                            onClick={handleNextQuestion}
                                            disabled={currentQuestion === selectedQuiz.questions.length - 1}
                                        >
                                            Next
                                            <span className="nav-icon">→</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Try It Yourself Section */}
                        <div className="code-editor-section">
                            <div className="try-yourself-header">
                                <h3>🚀 Try It Yourself</h3>
                                <p>Edit the code and see the results instantly!</p>
                            </div>

                            <div className="editor-container">
                                <div className="editor-header">
                                    <h3>CODE EDITOR</h3>
                                    <button
                                        className={`run-btn ${isCodeRunning ? 'running' : ''}`}
                                        onClick={handleRunCode}
                                        disabled={isCodeRunning}
                                    >
                                        <span className="run-icon">{isCodeRunning ? '⏸' : '▶'}</span>
                                        {isCodeRunning ? 'Running...' : 'Run'}
                                    </button>
                                </div>

                                <div className="editor-content">
                                    <div className="code-input">
                                        <textarea
                                            className="code-textarea"
                                            value={editableCode}
                                            onChange={(e) => setEditableCode(e.target.value)}
                                            spellCheck="false"
                                        />
                                    </div>

                                    <div className="code-output">
                                        <div className="output-header">OUTPUT</div>

                                        {/* Loading Overlay */}
                                        {isCodeLoading && (
                                            <div className="code-loading-overlay">
                                                <div className="code-spinner"></div>
                                                <p className="loading-text">Compiling Code...</p>
                                            </div>
                                        )}

                                        {selectedQuiz.id === 1 || selectedQuiz.id === 2 ? (
                                            <iframe
                                                key={`iframe-${selectedQuiz.id}-${currentQuestion}`}
                                                ref={iframeRef}
                                                className={`output-iframe ${isCodeLoading ? 'loading' : ''}`}
                                                title="Code Output"
                                                sandbox="allow-scripts allow-modals allow-forms allow-popups allow-same-origin"
                                                frameBorder="0"
                                            />
                                        ) : selectedQuiz.id === 3 ? (
                                            <iframe
                                                key={`iframe-js-${selectedQuiz.id}-${currentQuestion}`}
                                                ref={iframeRef}
                                                className={`output-iframe ${isCodeLoading ? 'loading' : ''}`}
                                                title="JavaScript Output"
                                                sandbox="allow-scripts allow-modals allow-forms allow-popups allow-same-origin"
                                                frameBorder="0"
                                            />
                                        ) : (
                                            <div className="javascript-output">
                                                <pre><code>{codeOutput || 'Click Run to execute code'}</code></pre>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="result-container">
                        <div className="result-header">
                            <div className="result-score">
                                <div className="score-circle">
                                    <span className="score-number">{score}</span>
                                    <span className="score-total">/{selectedQuiz.questions.length}</span>
                                </div>
                            </div>

                            <h2>Quiz Completed!</h2>
                            <p className="result-message">
                                {score === selectedQuiz.questions.length
                                    ? '🎉 Perfect Score! You\'re a master!'
                                    : score >= selectedQuiz.questions.length * 0.8
                                        ? '🌟 Great Job! Almost there!'
                                        : score >= selectedQuiz.questions.length * 0.6
                                            ? '👍 Good Effort! Keep practicing!'
                                            : '💪 Keep practicing, you\'ll get better!'}
                            </p>

                            <div className="result-stats">
                                <div className="stat">
                                    <span className="stat-label">Correct Answers</span>
                                    <span className="stat-value">{score}</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-label">Wrong Answers</span>
                                    <span className="stat-value">{selectedQuiz.questions.length - score}</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-label">Accuracy</span>
                                    <span className="stat-value">{Math.round((score / selectedQuiz.questions.length) * 100)}%</span>
                                </div>
                            </div>

                            <div className="result-actions">
                                <button className="btn-retry" onClick={handleRetryQuiz}>
                                    🔄 Retake Quiz
                                </button>
                                <button className="btn-back" onClick={handleBackToQuizzes}>
                                    ← Back to Quizzes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="quizzes-page" style={{ paddingTop: '80px' }}>
            {/* Navigation Buttons */}
            <div className="quizzes-nav">
                <Link to="/" className="nav-home-btn">
                    ← Back to Home
                </Link>
            </div>

            {/* Header Section */}
            <section className="quizzes-header">
                <div className="quizzes-header-content">
                    <h1 className="quizzes-title">Master Tech Skills</h1>
                    <p className="quizzes-subtitle">Daily Quizzes & Challenges</p>
                    <p className="quizzes-description">
                        Test your knowledge with interactive quizzes. Learn, practice, and master tech skills.
                    </p>
                </div>

                {/* Stats Section */}
                <div className="quizzes-stats scroll-reveal">
                    {[
                        { number: stats.questions, label: 'Quiz Questions', icon: '❓' },
                        { number: stats.topics, label: 'Quiz Topics', icon: '📚' },
                        { number: stats.learners, label: 'Daily Participants', icon: '👥' }
                    ].map((stat, index) => (
                        <div key={index} className="quizzes-stat-card stat-card-hover">
                            <div className="stat-icon">{stat.icon}</div>
                            <div className="stat-number animated-number">{stat.number}+</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Quizzes Grid Section */}
            <section className="quizzes-grid-section">
                <div className="quizzes-container">
                    {/* Category Filter */}
                    <div className="category-filter scroll-reveal">
                        <h3 className="filter-title">Filter by Category</h3>
                        <div className="category-buttons">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    <span className="btn-ripple"></span>
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="quizzes-grid">
                        {filteredQuizzes.map((quiz) => (
                            <div key={quiz.id} className="quiz-card scroll-reveal card-hover">
                                <div className="card-glow"></div>
                                <div className="quiz-card-header">
                                    <div className="quiz-icon">{quiz.icon}</div>
                                    <span className="quiz-difficulty">{quiz.difficulty}</span>
                                </div>

                                <h3 className="quiz-card-title">{quiz.title}</h3>
                                <p className="quiz-card-description">{quiz.description}</p>

                                <div className="quiz-info">
                                    <span className="quiz-category">📚 {quiz.category}</span>
                                    <span className="quiz-count">❓ {quiz.questions.length} Questions</span>
                                </div>

                                <button
                                    className="quiz-start-btn"
                                    onClick={() => handleStartQuiz(quiz)}
                                >
                                    Start Quiz →
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Quizzes;
