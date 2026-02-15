import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import './LiveCodeEditorUltimate.css';

const LiveCodeEditorUltimate = ({ initialHtml = '', initialCss = '', initialJs = '' }) => {
    const [htmlCode, setHtmlCode] = useState(initialHtml || '<div class="container">\n  <h1>Welcome to AI-Powered Editor!</h1>\n  <button id="btn">Click Me</button>\n</div>');
    const [cssCode, setCssCode] = useState(initialCss || 'body {\n  font-family: "Inter", sans-serif;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.container {\n  text-align: center;\n  padding: 40px;\n  background: white;\n  border-radius: 20px;\n  box-shadow: 0 20px 60px rgba(0,0,0,0.3);\n}');
    const [jsCode, setJsCode] = useState(initialJs || 'console.log("AI Editor Ready!");\n\nconst btn = document.getElementById("btn");\nbtn.addEventListener("click", () => {\n  alert("Hello from AI Editor!");\n});');

    const [consoleOutput, setConsoleOutput] = useState('');
    const [activeTab, setActiveTab] = useState('html');
    const [isRunning, setIsRunning] = useState(false);
    const [fontSize, setFontSize] = useState(14);
    const [theme, setTheme] = useState('vs-dark');
    const [showAiPanel, setShowAiPanel] = useState(false);
    const [aiSuggestion, setAiSuggestion] = useState('');
    const [codeHistory, setCodeHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [projectName, setProjectName] = useState('My Project');
    const [savedProjects, setSavedProjects] = useState([]);

    const iframeRef = useRef(null);

    // Load saved projects from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('savedProjects');
        if (saved) {
            setSavedProjects(JSON.parse(saved));
        }
    }, []);

    // Save to history whenever code changes
    useEffect(() => {
        const saveToHistory = setTimeout(() => {
            const newHistory = {
                html: htmlCode,
                css: cssCode,
                js: jsCode,
                timestamp: new Date().toISOString()
            };

            setCodeHistory(prev => {
                const updated = [...prev.slice(0, historyIndex + 1), newHistory];
                return updated.slice(-20); // Keep last 20 versions
            });
            setHistoryIndex(prev => Math.min(prev + 1, 19));
        }, 2000);

        return () => clearTimeout(saveToHistory);
    }, [htmlCode, cssCode, jsCode]);

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
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { padding: 20px; background: #ffffff; }
        ${cssCode}
    </style>
</head>
<body>
    ${htmlCode}
    <script>
        const sendToParent = (type, ...args) => {
            const message = args.map(arg => {
                if (typeof arg === 'object') {
                    try { return JSON.stringify(arg, null, 2); }
                    catch (e) { return String(arg); }
                }
                return String(arg);
            }).join(' ');
            
            parent.postMessage({ type: type, data: message, timestamp: Date.now() }, "*");
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
                let icon = '▶', className = 'log';

                if (type === 'error') { icon = '❌'; className = 'error'; }
                else if (type === 'warn') { icon = '⚠️'; className = 'warn'; }
                else if (type === 'info') { icon = 'ℹ️'; className = 'info'; }

                setConsoleOutput(prev =>
                    prev + `<div class="${className}">${icon} ${data}</div>\n`
                );
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const clearConsole = () => setConsoleOutput('');
    const runCode = () => { setConsoleOutput(''); setHtmlCode(htmlCode); };
    const increaseFontSize = () => setFontSize(prev => Math.min(prev + 2, 24));
    const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 2, 10));
    const toggleTheme = () => setTheme(prev => prev === 'vs-dark' ? 'light' : 'vs-dark');

    // Save Project
    const saveProject = () => {
        const project = {
            id: Date.now(),
            name: projectName,
            html: htmlCode,
            css: cssCode,
            js: jsCode,
            savedAt: new Date().toISOString()
        };

        const updated = [...savedProjects, project];
        setSavedProjects(updated);
        localStorage.setItem('savedProjects', JSON.stringify(updated));
        alert(`✅ Project "${projectName}" saved successfully!`);
    };

    // Load Project
    const loadProject = (project) => {
        setHtmlCode(project.html);
        setCssCode(project.css);
        setJsCode(project.js);
        setProjectName(project.name);
    };

    // Delete Project
    const deleteProject = (id) => {
        const updated = savedProjects.filter(p => p.id !== id);
        setSavedProjects(updated);
        localStorage.setItem('savedProjects', JSON.stringify(updated));
    };

    // Download as HTML File
    const downloadCode = () => {
        const fullCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
    <style>
        ${cssCode}
    </style>
</head>
<body>
    ${htmlCode}
    <script>
        ${jsCode}
    </script>
</body>
</html>`;

        const blob = new Blob([fullCode], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${projectName.replace(/\s+/g, '_')}.html`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // AI Code Analysis
    const analyzeCode = () => {
        setShowAiPanel(true);
        let suggestions = [];

        // Simple AI-like analysis
        if (!htmlCode.includes('<!DOCTYPE')) suggestions.push('Add <!DOCTYPE html> for HTML5 compliance');
        if (!cssCode.includes('*')) suggestions.push('Consider adding CSS reset (* { margin: 0; padding: 0; })');
        if (jsCode.includes('var ')) suggestions.push('Use const or let instead of var for modern JavaScript');
        if (!htmlCode.includes('meta')) suggestions.push('Add meta tags for better SEO');
        if (!cssCode.includes('responsive')) suggestions.push('Consider adding responsive design with media queries');

        const suggestion = suggestions.length > 0
            ? `🤖 AI Analysis:\n\n${suggestions.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n✅ Code structure looks good overall!`
            : '✅ Your code looks great! No major issues detected.';

        setAiSuggestion(suggestion);
    };

    // Version History Navigation
    const goToPreviousVersion = () => {
        if (historyIndex > 0) {
            const prev = codeHistory[historyIndex - 1];
            setHtmlCode(prev.html);
            setCssCode(prev.css);
            setJsCode(prev.js);
            setHistoryIndex(historyIndex - 1);
        }
    };

    const goToNextVersion = () => {
        if (historyIndex < codeHistory.length - 1) {
            const next = codeHistory[historyIndex + 1];
            setHtmlCode(next.html);
            setCssCode(next.css);
            setJsCode(next.js);
            setHistoryIndex(historyIndex + 1);
        }
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
        <div className="live-code-editor-ultimate">
            {/* AI Assistant Panel */}
            {showAiPanel && (
                <div className="ai-panel-overlay" onClick={() => setShowAiPanel(false)}>
                    <div className="ai-panel" onClick={(e) => e.stopPropagation()}>
                        <div className="ai-panel-header">
                            <h3>🤖 AI Code Assistant</h3>
                            <button onClick={() => setShowAiPanel(false)}>✕</button>
                        </div>
                        <div className="ai-panel-content">
                            <pre>{aiSuggestion}</pre>
                        </div>
                    </div>
                </div>
            )}

            {/* Top Toolbar */}
            <div className="ultimate-toolbar">
                <input
                    type="text"
                    className="project-name-input"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Project Name"
                />
                <button className="toolbar-btn" onClick={saveProject} title="Save Project">
                    💾 Save
                </button>
                <button className="toolbar-btn" onClick={downloadCode} title="Download HTML">
                    ⬇️ Download
                </button>
                <button className="toolbar-btn" onClick={analyzeCode} title="AI Analysis">
                    🤖 AI Analyze
                </button>
                <button
                    className="toolbar-btn"
                    onClick={goToPreviousVersion}
                    disabled={historyIndex <= 0}
                    title="Previous Version"
                >
                    ← Undo
                </button>
                <button
                    className="toolbar-btn"
                    onClick={goToNextVersion}
                    disabled={historyIndex >= codeHistory.length - 1}
                    title="Next Version"
                >
                    Redo →
                </button>
            </div>

            <div className="editor-content-wrapper">
                {/* Editor Panel */}
                <div className="editor-panel-ultimate">
                    <div className="editor-header-ultimate">
                        <div className="editor-tabs-ultimate">
                            <button
                                className={`tab-ultimate ${activeTab === 'html' ? 'active' : ''}`}
                                onClick={() => setActiveTab('html')}
                            >
                                🌐 HTML
                            </button>
                            <button
                                className={`tab-ultimate ${activeTab === 'css' ? 'active' : ''}`}
                                onClick={() => setActiveTab('css')}
                            >
                                🎨 CSS
                            </button>
                            <button
                                className={`tab-ultimate ${activeTab === 'js' ? 'active' : ''}`}
                                onClick={() => setActiveTab('js')}
                            >
                                ⚡ JS
                            </button>
                        </div>

                        <div className="editor-controls-ultimate">
                            <button onClick={decreaseFontSize} title="Decrease Font">A-</button>
                            <button onClick={increaseFontSize} title="Increase Font">A+</button>
                            <button onClick={toggleTheme} title="Toggle Theme">
                                {theme === 'vs-dark' ? '☀️' : '🌙'}
                            </button>
                            <button className={`run-btn-ultimate ${isRunning ? 'running' : ''}`} onClick={runCode}>
                                {isRunning ? '⏸ Running...' : '▶ Run'}
                            </button>
                        </div>
                    </div>

                    <div className="monaco-editors-ultimate">
                        <div className={`monaco-wrapper-ultimate ${activeTab === 'html' ? 'active' : ''}`}>
                            <Editor height="100%" language="html" value={htmlCode} onChange={(v) => setHtmlCode(v || '')} theme={theme} options={editorOptions} />
                        </div>
                        <div className={`monaco-wrapper-ultimate ${activeTab === 'css' ? 'active' : ''}`}>
                            <Editor height="100%" language="css" value={cssCode} onChange={(v) => setCssCode(v || '')} theme={theme} options={editorOptions} />
                        </div>
                        <div className={`monaco-wrapper-ultimate ${activeTab === 'js' ? 'active' : ''}`}>
                            <Editor height="100%" language="javascript" value={jsCode} onChange={(v) => setJsCode(v || '')} theme={theme} options={editorOptions} />
                        </div>
                    </div>
                </div>

                {/* Preview Panel */}
                <div className="preview-panel-ultimate">
                    <div className="preview-header-ultimate">
                        <h3>👁️ Live Preview</h3>
                        {isRunning && <span className="compiling-badge-ultimate">● Compiling...</span>}
                    </div>

                    <iframe ref={iframeRef} className="preview-iframe-ultimate" title="Live Preview" sandbox="allow-scripts allow-modals allow-forms allow-popups allow-same-origin" frameBorder="0" />

                    <div className="console-panel-ultimate">
                        <div className="console-header-ultimate">
                            <h4>💻 Console</h4>
                            <button onClick={clearConsole}>Clear</button>
                        </div>
                        <div className="console-output-ultimate" dangerouslySetInnerHTML={{ __html: consoleOutput || '<div class="placeholder">Console output will appear here...</div>' }} />
                    </div>
                </div>
            </div>

            {/* Saved Projects Sidebar */}
            {savedProjects.length > 0 && (
                <div className="saved-projects">
                    <h4>💾 Saved Projects</h4>
                    {savedProjects.map(project => (
                        <div key={project.id} className="saved-project-item">
                            <span onClick={() => loadProject(project)}>{project.name}</span>
                            <button onClick={() => deleteProject(project.id)}>🗑️</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LiveCodeEditorUltimate;
