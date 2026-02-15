import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import './LiveCodeEditorPro.css';

const LiveCodeEditorPro = ({ initialHtml = '', initialCss = '', initialJs = '' }) => {
    const [htmlCode, setHtmlCode] = useState(initialHtml || '<div class="container">\n  <h1>🚀 Monaco Editor</h1>\n  <p>VSCode-style editor with syntax highlighting!</p>\n  <button id="btn" class="btn">Click Me</button>\n  <div id="output"></div>\n</div>');

    const [cssCode, setCssCode] = useState(initialCss || 'body {\n  margin: 0;\n  font-family: "Segoe UI", sans-serif;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.container {\n  text-align: center;\n  padding: 40px;\n  background: rgba(255, 255, 255, 0.95);\n  border-radius: 20px;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n}\n\n.btn {\n  padding: 12px 24px;\n  background: #667eea;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 1rem;\n  transition: transform 0.3s;\n}\n\n.btn:hover {\n  transform: translateY(-3px);\n}');

    const [jsCode, setJsCode] = useState(initialJs || 'console.log("🎉 Monaco Editor Ready!");\nconsole.log("Try IntelliSense with Ctrl+Space");\n\nconst btn = document.getElementById("btn");\nconst output = document.getElementById("output");\n\nlet count = 0;\n\nbtn.addEventListener("click", () => {\n  count++;\n  output.textContent = `Clicked ${count} times! 🎯`;\n  console.log("Button clicked:", count);\n});');

    const [consoleOutput, setConsoleOutput] = useState('');
    const [activeTab, setActiveTab] = useState('html');
    const [isRunning, setIsRunning] = useState(false);
    const [fontSize, setFontSize] = useState(14);
    const [theme, setTheme] = useState('vs-dark');

    const iframeRef = useRef(null);

    // Live Preview with Debounced Auto-Run
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

        console.log = (...args) => sendToParent('log', ...args);
        console.error = (...args) => sendToParent('error', ...args);
        console.warn = (...args) => sendToParent('warn', ...args);
        console.info = (...args) => sendToParent('info', ...args);

        window.onerror = (msg, source, line, col, error) => {
            sendToParent('error', \`Error at line \${line}: \${msg}\`);
            return true;
        };

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
        }, 500);

        return () => clearTimeout(timeout);
    }, [htmlCode, cssCode, jsCode]);

    // Capture Console Output
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
        setHtmlCode(htmlCode);
    };

    const increaseFontSize = () => {
        setFontSize(prev => Math.min(prev + 2, 24));
    };

    const decreaseFontSize = () => {
        setFontSize(prev => Math.max(prev - 2, 10));
    };

    const toggleTheme = () => {
        setTheme(prev => prev === 'vs-dark' ? 'light' : 'vs-dark');
    };

    const editorOptions = {
        minimap: { enabled: false },
        fontSize: fontSize,
        lineNumbers: 'on',
        roundedSelection: true,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        wordWrap: 'on',
        quickSuggestions: true,
        suggestOnTriggerCharacters: true,
    };

    return (
        <div className="live-code-editor-pro">
            <div className="editor-panel-pro">
                <div className="editor-header-pro">
                    <div className="editor-tabs-pro">
                        <button
                            className={`tab-pro ${activeTab === 'html' ? 'active' : ''}`}
                            onClick={() => setActiveTab('html')}
                        >
                            <span className="tab-icon">🌐</span> HTML
                        </button>
                        <button
                            className={`tab-pro ${activeTab === 'css' ? 'active' : ''}`}
                            onClick={() => setActiveTab('css')}
                        >
                            <span className="tab-icon">🎨</span> CSS
                        </button>
                        <button
                            className={`tab-pro ${activeTab === 'js' ? 'active' : ''}`}
                            onClick={() => setActiveTab('js')}
                        >
                            <span className="tab-icon">⚡</span> JavaScript
                        </button>
                    </div>

                    <div className="editor-controls">
                        <button className="control-btn" onClick={decreaseFontSize} title="Decrease Font">A-</button>
                        <button className="control-btn" onClick={increaseFontSize} title="Increase Font">A+</button>
                        <button className="control-btn" onClick={toggleTheme} title="Toggle Theme">
                            {theme === 'vs-dark' ? '☀️' : '🌙'}
                        </button>
                        <button
                            className={`run-btn-pro ${isRunning ? 'running' : ''}`}
                            onClick={runCode}
                        >
                            <span className="run-icon">{isRunning ? '⏸' : '▶'}</span>
                            {isRunning ? 'Running...' : 'Run'}
                        </button>
                    </div>
                </div>

                <div className="monaco-editors">
                    <div className={`monaco-wrapper ${activeTab === 'html' ? 'active' : ''}`}>
                        <Editor
                            height="100%"
                            language="html"
                            value={htmlCode}
                            onChange={(value) => setHtmlCode(value || '')}
                            theme={theme}
                            options={editorOptions}
                        />
                    </div>

                    <div className={`monaco-wrapper ${activeTab === 'css' ? 'active' : ''}`}>
                        <Editor
                            height="100%"
                            language="css"
                            value={cssCode}
                            onChange={(value) => setCssCode(value || '')}
                            theme={theme}
                            options={editorOptions}
                        />
                    </div>

                    <div className={`monaco-wrapper ${activeTab === 'js' ? 'active' : ''}`}>
                        <Editor
                            height="100%"
                            language="javascript"
                            value={jsCode}
                            onChange={(value) => setJsCode(value || '')}
                            theme={theme}
                            options={editorOptions}
                        />
                    </div>
                </div>
            </div>

            <div className="preview-panel-pro">
                <div className="preview-header-pro">
                    <h3>👁️ Live Preview</h3>
                    {isRunning && <span className="compiling-badge-pro">● Compiling...</span>}
                </div>

                <iframe
                    ref={iframeRef}
                    className="preview-iframe-pro"
                    title="Live Preview"
                    sandbox="allow-scripts allow-modals allow-forms allow-popups allow-same-origin"
                    frameBorder="0"
                />

                <div className="console-panel-pro">
                    <div className="console-header-pro">
                        <h4>💻 Console</h4>
                        <button className="clear-btn-pro" onClick={clearConsole}>Clear</button>
                    </div>
                    <div
                        className="console-output-pro"
                        dangerouslySetInnerHTML={{
                            __html: consoleOutput || '<div class="placeholder">Console output will appear here...</div>'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default LiveCodeEditorPro;
