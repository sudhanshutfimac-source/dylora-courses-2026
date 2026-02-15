import React from 'react';
import { Link } from 'react-router-dom';
import LiveCodeEditorPro from '../components/LiveCodeEditorPro';
import './LiveCodeEditorProDemo.css';

const LiveCodeEditorProDemo = () => {
    return (
        <div className="live-editor-pro-demo-page">
            {/* Navigation */}
            <div className="demo-nav-pro">
                <Link to="/" className="nav-home-btn-pro">← Back to Home</Link>
                <Link to="/live-editor" className="nav-basic-btn">Basic Editor →</Link>
            </div>

            {/* Header */}
            <div className="demo-header-pro">
                <div className="pro-badge">PRO</div>
                <h1 className="demo-title-pro">🚀 Monaco Code Editor</h1>
                <p className="demo-subtitle-pro">
                    VSCode-Powered Live Editor with IntelliSense
                </p>
                <p className="demo-description-pro">
                    Professional code editor with syntax highlighting, auto-complete, error detection, and more!
                </p>
            </div>

            {/* Features Showcase */}
            <div className="pro-features-showcase">
                <div className="pro-feature-card">
                    <div className="pro-feature-icon">✨</div>
                    <h3>Syntax Highlighting</h3>
                    <p>Color-coded syntax for HTML, CSS, and JavaScript</p>
                </div>
                <div className="pro-feature-card">
                    <div className="pro-feature-icon">🧠</div>
                    <h3>IntelliSense</h3>
                    <p>Smart auto-complete and code suggestions</p>
                </div>
                <div className="pro-feature-card">
                    <div className="pro-feature-icon">🔍</div>
                    <h3>Error Detection</h3>
                    <p>Real-time error highlighting with squiggly lines</p>
                </div>
                <div className="pro-feature-card">
                    <div className="pro-feature-icon">🎨</div>
                    <h3>Theme Toggle</h3>
                    <p>Switch between dark and light themes</p>
                </div>
                <div className="pro-feature-card">
                    <div className="pro-feature-icon">📏</div>
                    <h3>Font Control</h3>
                    <p>Adjust font size for better readability</p>
                </div>
                <div className="pro-feature-card">
                    <div className="pro-feature-icon">⚡</div>
                    <h3>Live Preview</h3>
                    <p>See changes instantly with auto-run</p>
                </div>
            </div>

            {/* Monaco Editor Component */}
            <div className="editor-wrapper-pro">
                <div className="editor-intro">
                    <h2>Try It Now!</h2>
                    <p>Edit the code below and see the magic happen ✨</p>
                </div>
                <LiveCodeEditorPro />
            </div>

            {/* Keyboard Shortcuts */}
            <div className="shortcuts-section">
                <h2>⌨️ Keyboard Shortcuts</h2>
                <div className="shortcuts-grid">
                    <div className="shortcut-item">
                        <kbd>Ctrl</kbd> + <kbd>Space</kbd>
                        <span>Trigger IntelliSense</span>
                    </div>
                    <div className="shortcut-item">
                        <kbd>Ctrl</kbd> + <kbd>F</kbd>
                        <span>Find</span>
                    </div>
                    <div className="shortcut-item">
                        <kbd>Ctrl</kbd> + <kbd>H</kbd>
                        <span>Find & Replace</span>
                    </div>
                    <div className="shortcut-item">
                        <kbd>Alt</kbd> + <kbd>↑</kbd> / <kbd>↓</kbd>
                        <span>Move Line Up/Down</span>
                    </div>
                    <div className="shortcut-item">
                        <kbd>Ctrl</kbd> + <kbd>D</kbd>
                        <span>Select Next Occurrence</span>
                    </div>
                    <div className="shortcut-item">
                        <kbd>Alt</kbd> + <kbd>Click</kbd>
                        <span>Multiple Cursors</span>
                    </div>
                </div>
            </div>

            {/* Monaco vs Basic Comparison */}
            <div className="comparison-section">
                <h2>Monaco vs Basic Editor</h2>
                <div className="comparison-table">
                    <div className="comparison-row header">
                        <div>Feature</div>
                        <div>Basic</div>
                        <div>Monaco Pro</div>
                    </div>
                    <div className="comparison-row">
                        <div>Syntax Highlighting</div>
                        <div>❌</div>
                        <div>✅</div>
                    </div>
                    <div className="comparison-row">
                        <div>Auto-Complete</div>
                        <div>❌</div>
                        <div>✅</div>
                    </div>
                    <div className="comparison-row">
                        <div>Error Detection</div>
                        <div>❌</div>
                        <div>✅</div>
                    </div>
                    <div className="comparison-row">
                        <div>Code Folding</div>
                        <div>❌</div>
                        <div>✅</div>
                    </div>
                    <div className="comparison-row">
                        <div>Multiple Cursors</div>
                        <div>❌</div>
                        <div>✅</div>
                    </div>
                    <div className="comparison-row">
                        <div>Find & Replace</div>
                        <div>❌</div>
                        <div>✅</div>
                    </div>
                    <div className="comparison-row">
                        <div>Theme Toggle</div>
                        <div>❌</div>
                        <div>✅</div>
                    </div>
                    <div className="comparison-row">
                        <div>Font Size Control</div>
                        <div>❌</div>
                        <div>✅</div>
                    </div>
                </div>
            </div>

            {/* Powered By */}
            <div className="powered-by">
                <h2>Powered By</h2>
                <div className="tech-logos">
                    <div className="tech-logo">
                        <span className="logo-icon">⚛️</span>
                        <span>React</span>
                    </div>
                    <div className="tech-logo">
                        <span className="logo-icon">💎</span>
                        <span>Monaco Editor</span>
                    </div>
                    <div className="tech-logo">
                        <span className="logo-icon">🚀</span>
                        <span>VSCode Engine</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveCodeEditorProDemo;
