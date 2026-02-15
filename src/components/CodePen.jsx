import React, { useState, useEffect, useRef, useCallback } from 'react';
import './CodePen.css';

const CodePen = ({ initialHtml = '', initialCss = '', initialJs = '', autoRun = true }) => {
    const [html, setHtml] = useState(initialHtml);
    const [css, setCss] = useState(initialCss);
    const [js, setJs] = useState(initialJs);
    const [activeTab, setActiveTab] = useState('html');
    const [isLoading, setIsLoading] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const iframeRef = useRef(null);

    const runCode = useCallback(() => {
        // Prevent multiple rapid clicks (debouncing)
        if (isRunning) return;

        setIsRunning(true);
        setIsLoading(true);

        // Simulate compilation/execution time with professional loading state
        setTimeout(() => {
            const code = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }
                        body {
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            padding: 20px;
                            background: #ffffff;
                        }
                        ${css}
                    </style>
                </head>
                <body>
                    ${html}
                    <script>
                        try {
                            ${js}
                        } catch (error) {
                            document.body.innerHTML += '<div style="color: #d32f2f; padding: 20px; background: #ffebee; border-radius: 8px; margin-top: 20px; border-left: 4px solid #d32f2f;"><strong>❌ Error:</strong> ' + error.message + '</div>';
                            console.error(error);
                        }
                    </script>
                </body>
                </html>
            `;

            // Use srcdoc for better security and performance
            if (iframeRef.current) {
                iframeRef.current.srcdoc = code;
            }

            // Wait for iframe to load, then hide loading with smooth transition
            setTimeout(() => {
                setIsLoading(false);
                setIsRunning(false);
            }, 300);
        }, 800); // Professional loading delay: 800ms
    }, [html, css, js, isRunning]);

    // Auto-run on mount and when auto-run is enabled
    useEffect(() => {
        if (autoRun && !isRunning) {
            const timeoutId = setTimeout(runCode, 500);
            return () => clearTimeout(timeoutId);
        }
    }, [html, css, js, autoRun, runCode, isRunning]);

    const tabs = [
        { id: 'html', label: 'HTML', icon: '🌐' },
        { id: 'css', label: 'CSS', icon: '🎨' },
        { id: 'js', label: 'JS', icon: '⚡' }
    ];

    return (
        <div className="codepen-container">
            <div className="codepen-editor">
                <div className="editor-header">
                    <div className="editor-tabs">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`editor-tab ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <span className="tab-icon">{tab.icon}</span>
                                <span className="tab-label">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                    <button
                        className={`run-button ${isRunning ? 'running' : ''}`}
                        onClick={runCode}
                        disabled={isRunning}
                    >
                        <span className="run-icon">{isRunning ? '⏸' : '▶'}</span>
                        {isRunning ? 'Running...' : 'Run'}
                    </button>
                </div>

                <div className="editor-body">
                    <div className={`editor-panel ${activeTab === 'html' ? 'active' : ''}`}>
                        <textarea
                            className="code-editor"
                            value={html}
                            onChange={(e) => setHtml(e.target.value)}
                            placeholder="<!-- Write your HTML here -->"
                            spellCheck="false"
                        />
                    </div>

                    <div className={`editor-panel ${activeTab === 'css' ? 'active' : ''}`}>
                        <textarea
                            className="code-editor"
                            value={css}
                            onChange={(e) => setCss(e.target.value)}
                            placeholder="/* Write your CSS here */"
                            spellCheck="false"
                        />
                    </div>

                    <div className={`editor-panel ${activeTab === 'js' ? 'active' : ''}`}>
                        <textarea
                            className="code-editor"
                            value={js}
                            onChange={(e) => setJs(e.target.value)}
                            placeholder="// Write your JavaScript here"
                            spellCheck="false"
                        />
                    </div>
                </div>
            </div>

            <div className="codepen-preview">
                <div className="preview-header">
                    <span className="preview-title">
                        <span className="preview-icon">👁️</span>
                        Live Preview
                    </span>
                    {isLoading && (
                        <span className="preview-status">
                            <span className="status-dot"></span>
                            Compiling...
                        </span>
                    )}
                </div>
                <div className="preview-body">
                    {isLoading && (
                        <div className="loading-overlay">
                            <div className="spinner-container">
                                <div className="spinner"></div>
                                <p className="loading-text">Compiling Code...</p>
                            </div>
                        </div>
                    )}
                    <iframe
                        ref={iframeRef}
                        className={`preview-frame ${isLoading ? 'loading' : ''}`}
                        title="Output"
                        sandbox="allow-scripts allow-modals allow-forms allow-popups allow-same-origin"
                        frameBorder="0"
                    />
                </div>
            </div>
        </div>
    );
};

export default CodePen;
