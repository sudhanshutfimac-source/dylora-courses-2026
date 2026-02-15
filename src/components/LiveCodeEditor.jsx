import React, { useState, useEffect, useRef } from 'react';
import './LiveCodeEditor.css';

const LiveCodeEditor = ({ initialHtml = '', initialCss = '', initialJs = '' }) => {
    const [htmlCode, setHtmlCode] = useState(initialHtml || '<h1>Hello World!</h1>\n<p>Start coding...</p>');
    const [cssCode, setCssCode] = useState(initialCss || 'body {\n  font-family: Arial, sans-serif;\n  padding: 20px;\n}\n\nh1 {\n  color: #667eea;\n}');
    const [jsCode, setJsCode] = useState(initialJs || 'console.log("JavaScript loaded!");\n\n// Try this:\n// document.querySelector("h1").onclick = () => {\n//   alert("Clicked!");\n// };');
    const [consoleOutput, setConsoleOutput] = useState('');
    const [activeTab, setActiveTab] = useState('html');
    const [isRunning, setIsRunning] = useState(false);

    const iframeRef = useRef(null);

    // Live Preview with Debounced Auto-Run (400ms delay)
    useEffect(() => {
        setIsRunning(true);

        const timeout = setTimeout(() => {
            if (!iframeRef.current) return;

            const finalHTML = `<!DOCTYPE html>
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
            padding: 20px;
            background: #ffffff;
        }
        ${cssCode}
    </style>
</head>
<body>
    ${htmlCode}
    <script>
        // Console capture
        const sendToParent = (type, ...args) => {
            const message = args.map(arg => {
                if (typeof arg === 'object') {
                    try {
                        return JSON.stringify(arg, null, 2);
                    } catch (e) {
                        return String(arg);
                    }
                }
                return String(arg);
            }).join(' ');
            
            parent.postMessage({ 
                type: type,
                data: message,
                timestamp: Date.now()
            }, "*");
        };

        // Override console methods
        console.log = (...args) => sendToParent('log', ...args);
        console.error = (...args) => sendToParent('error', ...args);
        console.warn = (...args) => sendToParent('warn', ...args);
        console.info = (...args) => sendToParent('info', ...args);

        // Error handling
        window.onerror = (msg, source, line, col, error) => {
            sendToParent('error', \`Error at line \${line}: \${msg}\`);
            return true;
        };

        // Execute user's JavaScript
        try {
            ${jsCode}
        } catch (err) {
            sendToParent('error', \`Execution Error: \${err.message}\`);
        }
    </script>
</body>
</html>`;

            iframeRef.current.srcdoc = finalHTML;
            setIsRunning(false);
        }, 400);

        return () => clearTimeout(timeout);
    }, [htmlCode, cssCode, jsCode]);

    // Capture Console Output from iframe
    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data && event.data.type) {
                const { type, data } = event.data;

                let icon = '▶';
                let className = 'log';

                if (type === 'error') {
                    icon = '❌';
                    className = 'error';
                } else if (type === 'warn') {
                    icon = '⚠️';
                    className = 'warn';
                } else if (type === 'info') {
                    icon = 'ℹ️';
                    className = 'info';
                }

                setConsoleOutput(prev =>
                    prev + `<div class="${className}">${icon} ${data}</div>\n`
                );
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const clearConsole = () => {
        setConsoleOutput('');
    };

    const runCode = () => {
        setConsoleOutput('');
        // Trigger re-render by updating state
        setHtmlCode(htmlCode);
    };

    return (
        <div className="live-code-editor">
            <div className="editor-panel">
                <div className="editor-tabs">
                    <button
                        className={`tab ${activeTab === 'html' ? 'active' : ''}`}
                        onClick={() => setActiveTab('html')}
                    >
                        <span className="tab-icon">🌐</span> HTML
                    </button>
                    <button
                        className={`tab ${activeTab === 'css' ? 'active' : ''}`}
                        onClick={() => setActiveTab('css')}
                    >
                        <span className="tab-icon">🎨</span> CSS
                    </button>
                    <button
                        className={`tab ${activeTab === 'js' ? 'active' : ''}`}
                        onClick={() => setActiveTab('js')}
                    >
                        <span className="tab-icon">⚡</span> JavaScript
                    </button>

                    <button
                        className={`run-btn-live ${isRunning ? 'running' : ''}`}
                        onClick={runCode}
                    >
                        <span className="run-icon">{isRunning ? '⏸' : '▶'}</span>
                        {isRunning ? 'Running...' : 'Run'}
                    </button>
                </div>

                <div className="editor-content-area">
                    <div className={`code-editor ${activeTab === 'html' ? 'active' : ''}`}>
                        <textarea
                            value={htmlCode}
                            onChange={(e) => setHtmlCode(e.target.value)}
                            placeholder="Write your HTML here..."
                            spellCheck="false"
                        />
                    </div>

                    <div className={`code-editor ${activeTab === 'css' ? 'active' : ''}`}>
                        <textarea
                            value={cssCode}
                            onChange={(e) => setCssCode(e.target.value)}
                            placeholder="Write your CSS here..."
                            spellCheck="false"
                        />
                    </div>

                    <div className={`code-editor ${activeTab === 'js' ? 'active' : ''}`}>
                        <textarea
                            value={jsCode}
                            onChange={(e) => setJsCode(e.target.value)}
                            placeholder="Write your JavaScript here..."
                            spellCheck="false"
                        />
                    </div>
                </div>
            </div>

            <div className="preview-panel">
                <div className="preview-header">
                    <h3>👁️ Live Preview</h3>
                    {isRunning && <span className="compiling-badge">● Compiling...</span>}
                </div>

                <iframe
                    ref={iframeRef}
                    className="preview-iframe"
                    title="Live Preview"
                    sandbox="allow-scripts allow-modals allow-forms allow-popups allow-same-origin"
                    frameBorder="0"
                />

                <div className="console-panel">
                    <div className="console-header">
                        <h4>💻 Console</h4>
                        <button className="clear-btn" onClick={clearConsole}>Clear</button>
                    </div>
                    <div
                        className="console-output"
                        dangerouslySetInnerHTML={{
                            __html: consoleOutput || '<div class="placeholder">Console output will appear here...</div>'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default LiveCodeEditor;
