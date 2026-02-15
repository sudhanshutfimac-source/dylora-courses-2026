import React from 'react';
import { Link } from 'react-router-dom';
import CodePen from '../components/CodePen';
import './CodePenDemo.css';

const CodePenDemo = () => {
    // Example starter code
    const exampleHtml = `<div class="container">
  <h1>Welcome to CodePen!</h1>
  <p>Edit the code and see live results.</p>
  <button class="btn">Click Me!</button>
</div>`;

    const exampleCss = `.container {
  text-align: center;
  padding: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  animation: slideIn 0.6s ease;
}

.btn {
  padding: 12px 32px;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.btn:hover {
  transform: scale(1.1);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`;

    const exampleJs = `// Add interactivity to your page
const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
  alert('Hello from CodePen! 🚀');
  console.log('Button clicked!');
});

console.log('✅ JavaScript is running!');`;

    return (
        <div className="codepen-demo-page">
            {/* Navigation */}
            <div className="demo-nav">
                <Link to="/" className="nav-home-btn">
                    ← Back to Home
                </Link>
            </div>

            {/* Header Section */}
            <div className="demo-header">
                <h1 className="demo-title">
                    <span className="title-icon">💻</span>
                    CodePen Editor
                </h1>
                <p className="demo-subtitle">
                    Edit HTML, CSS & JavaScript and see live results instantly
                </p>
                <div className="demo-badges">
                    <span className="badge">🌐 HTML</span>
                    <span className="badge">🎨 CSS</span>
                    <span className="badge">⚡ JavaScript</span>
                    <span className="badge">👁️ Live Preview</span>
                </div>
            </div>

            {/* CodePen Component */}
            <div className="demo-content">
                <CodePen
                    initialHtml={exampleHtml}
                    initialCss={exampleCss}
                    initialJs={exampleJs}
                    autoRun={true}
                />
            </div>

            {/* Features Section */}
            <div className="demo-features">
                <h2 className="features-title">Features</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3>Live Preview</h3>
                        <p>See your changes instantly as you type</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🎨</div>
                        <h3>Beautiful UI</h3>
                        <p>Modern, clean interface with smooth animations</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📱</div>
                        <h3>Responsive</h3>
                        <p>Works perfectly on all screen sizes</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🚀</div>
                        <h3>Easy to Embed</h3>
                        <p>Simple component that works anywhere</p>
                    </div>
                </div>
            </div>

            {/* Usage Instructions */}
            <div className="demo-usage">
                <h2 className="usage-title">How to Use</h2>
                <div className="usage-steps">
                    <div className="usage-step">
                        <div className="step-number">1</div>
                        <div className="step-content">
                            <h3>Import the Component</h3>
                            <pre className="code-block">
                                <code>{`import CodePen from './components/CodePen';`}</code>
                            </pre>
                        </div>
                    </div>
                    <div className="usage-step">
                        <div className="step-number">2</div>
                        <div className="step-content">
                            <h3>Use in Your App</h3>
                            <pre className="code-block">
                                <code>{`<CodePen 
  initialHtml="<h1>Hello</h1>"
  initialCss="h1 { color: blue; }"
  initialJs="console.log('Hi!');"
  autoRun={true}
/>`}</code>
                            </pre>
                        </div>
                    </div>
                    <div className="usage-step">
                        <div className="step-number">3</div>
                        <div className="step-content">
                            <h3>Start Coding!</h3>
                            <p>Edit code in any tab and see live results in the preview panel</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodePenDemo;
