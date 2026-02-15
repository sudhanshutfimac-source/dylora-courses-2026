import React from 'react';
import { Link } from 'react-router-dom';
import LiveCodeEditor from '../components/LiveCodeEditor';
import './LiveCodeEditorDemo.css';

const LiveCodeEditorDemo = () => {
    const exampleHtml = `<div class="container">
  <h1 class="title">🚀 Live Code Editor</h1>
  <p class="subtitle">Edit HTML, CSS, and JavaScript in real-time!</p>
  
  <button id="clickBtn" class="btn">Click Me!</button>
  
  <div id="output" class="output"></div>
</div>`;

    const exampleCss = `body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  text-align: center;
  padding: 40px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 500px;
}

.title {
  font-size: 2.5rem;
  margin: 0 0 10px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  color: #666;
  margin: 0 0 30px 0;
  font-size: 1.1rem;
}

.btn {
  padding: 12px 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.output {
  margin-top: 20px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 10px;
  min-height: 50px;
  font-weight: 600;
  color: #667eea;
}`;

    const exampleJs = `console.log("🎉 JavaScript is ready!");
console.log("Try editing the code and see the magic!");

// Button click event
const btn = document.getElementById('clickBtn');
const output = document.getElementById('output');

let clickCount = 0;

btn.addEventListener('click', () => {
  clickCount++;
  output.textContent = \`🎯 Button clicked \${clickCount} times!\`;
  console.log(\`Button clicked! Count: \${clickCount}\`);
  
  // Change button color on each click
  const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];
  btn.style.background = colors[clickCount % colors.length];
});

// Log a message every 3 seconds
setInterval(() => {
  console.log("⏰ 3 seconds passed... Still running!");
}, 3000);`;

    return (
        <div className="live-editor-demo-page">
            {/* Navigation */}
            <div className="demo-nav">
                <Link to="/" className="nav-home-btn">← Back to Home</Link>
            </div>

            {/* Header */}
            <div className="demo-header">
                <h1 className="demo-title">🚀 Live Code Editor</h1>
                <p className="demo-subtitle">
                    CodePen-Style Editor with Real-Time Preview
                </p>
                <p className="demo-description">
                    Edit HTML, CSS, and JavaScript in separate tabs. See your changes live with automatic updates!
                </p>
            </div>

            {/* Features Grid */}
            <div className="features-grid">
                <div className="feature-card">
                    <div className="feature-icon">⚡</div>
                    <h3>Live Preview</h3>
                    <p>See your changes instantly with 400ms debounced auto-run</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">💻</div>
                    <h3>Console Output</h3>
                    <p>View console.log, errors, and warnings in real-time</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">🎨</div>
                    <h3>Tabbed Interface</h3>
                    <p>Switch between HTML, CSS, and JavaScript editors</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">🔒</div>
                    <h3>Safe Sandbox</h3>
                    <p>Secure iframe sandbox for code execution</p>
                </div>
            </div>

            {/* Live Code Editor Component */}
            <div className="editor-wrapper">
                <LiveCodeEditor
                    initialHtml={exampleHtml}
                    initialCss={exampleCss}
                    initialJs={exampleJs}
                />
            </div>

            {/* Usage Instructions */}
            <div className="usage-section">
                <h2>How to Use</h2>
                <div className="usage-grid">
                    <div className="usage-step">
                        <div className="step-number">1</div>
                        <h3>Edit Code</h3>
                        <p>Click on HTML, CSS, or JS tabs to switch editors</p>
                    </div>
                    <div className="usage-step">
                        <div className="step-number">2</div>
                        <h3>See Live Preview</h3>
                        <p>Changes appear automatically after 400ms</p>
                    </div>
                    <div className="usage-step">
                        <div className="step-number">3</div>
                        <h3>Check Console</h3>
                        <p>View console output and errors below the preview</p>
                    </div>
                    <div className="usage-step">
                        <div className="step-number">4</div>
                        <h3>Run Manually</h3>
                        <p>Click 'Run' button to force re-execution</p>
                    </div>
                </div>
            </div>

            {/* Tech Stack */}
            <div className="tech-stack">
                <h2>Technologies Used</h2>
                <div className="tech-badges">
                    <span className="tech-badge">React Hooks</span>
                    <span className="tech-badge">useEffect</span>
                    <span className="tech-badge">useRef</span>
                    <span className="tech-badge">iframe.srcDoc</span>
                    <span className="tech-badge">postMessage API</span>
                    <span className="tech-badge">Debouncing</span>
                    <span className="tech-badge">Sandbox</span>
                </div>
            </div>
        </div>
    );
};

export default LiveCodeEditorDemo;
