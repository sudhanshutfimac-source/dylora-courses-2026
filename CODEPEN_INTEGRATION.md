# How to Integrate CodePen into Quizzes Page

If you want to add the CodePen editor to your Quizzes page instead of the current code editor, here's how:

## Option 1: Replace Current Editor

In `Quizzes.jsx`, replace the current code editor section with:

```jsx
import CodePen from '../components/CodePen';

// Inside the quiz view, replace the "Try It Yourself" section with:
<div className="code-editor-section">
  <div className="try-yourself-header">
    <h3>🚀 Try It Yourself</h3>
    <p>Edit the code and see the results instantly!</p>
  </div>
  
  <CodePen 
    initialHtml={selectedQuiz.code || ''}
    initialCss=""
    initialJs=""
    autoRun={true}
  />
</div>
```

## Option 2: Use as a Standalone Feature

Keep the current quiz functionality and add a link to the CodePen page in your navigation or as a separate feature.

## Option 3: Hybrid Approach

Add a toggle button to switch between the current simple editor and the full CodePen editor:

```jsx
const [useCodePen, setUseCodePen] = useState(false);

// In your JSX:
<button onClick={() => setUseCodePen(!useCodePen)}>
  {useCodePen ? 'Simple Editor' : 'Advanced Editor'}
</button>

{useCodePen ? (
  <CodePen initialHtml={editableCode} />
) : (
  // Your current editor
)}
```

## Current Setup

The CodePen editor is already accessible at:
**http://localhost:3000/codepen**

You can link to it from anywhere in your app!
