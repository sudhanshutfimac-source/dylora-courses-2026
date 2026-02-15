# CodePen-Style Editor Component

A beautiful, minimal CodePen-style editor that can be embedded anywhere in your website. Edit HTML, CSS, and JavaScript code and see live results instantly!

## 🎯 Features

- ✅ **Live Preview**: See changes in real-time as you type
- ✅ **Three Editor Tabs**: HTML, CSS, and JavaScript
- ✅ **Beautiful UI**: Modern design with gradients and smooth animations  
- ✅ **Responsive**: Works on all screen sizes
- ✅ **Auto-run**: Optional automatic code execution
- ✅ **Error Handling**: Catches and displays JavaScript errors gracefully
- ✅ **Easy to Embed**: Simple React component

## 🚀 Quick Start

### View the Demo

Navigate to **http://localhost:3000/codepen** in your browser to see the editor in action!

### Use in Your Own Page

```jsx
import CodePen from '../components/CodePen';

function MyPage() {
  return (
    <CodePen 
      initialHtml="<h1>Hello World!</h1>"
      initialCss="h1 { color: blue; }"
      initialJs="console.log('Hi!');"
      autoRun={true}
    />
  );
}
```

## 📝 Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialHtml` | string | `''` | Initial HTML code |
| `initialCss` | string | `''` | Initial CSS code |
| `initialJs` | string | `''` | Initial JavaScript code |
| `autoRun` | boolean | `true` | Auto-execute code on change |

## 💡 Usage Examples

### Example 1: Empty Editor
```jsx
<CodePen />
```

### Example 2: With Starter Code
```jsx
<CodePen 
  initialHtml="<div class='box'>Hello</div>"
  initialCss=".box { padding: 20px; background: #667eea; color: white; }"
  initialJs="console.log('Ready!');"
/>
```

### Example 3: Manual Run Only
```jsx
<CodePen 
  autoRun={false}
  initialHtml="<button>Click Me</button>"
/>
```

## 🎨 Customization

The component uses `CodePen.css` for styling. You can customize:
- Colors and gradients
- Editor height and layout
- Tab styling
- Button appearance

## 📱 Responsive Design

The editor automatically adapts to different screen sizes:
- **Desktop**: Side-by-side layout (editor left, preview right)
- **Tablet/Mobile**: Stacked layout (editor top, preview bottom)

## 🛡️ Security

The preview iframe uses the `sandbox` attribute with:
- `allow-scripts`: Enable JavaScript
- `allow-modals`: Enable alerts/confirms
- `allow-forms`: Allow form submissions
- `allow-popups`: Enable window.open()
- `allow-same-origin`: Access to storage APIs

## 📂 File Structure

```
src/
├── components/
│   ├── CodePen.jsx       # Main component
│   └── CodePen.css       # Styling
└── pages/
    ├── CodePenDemo.jsx   # Demo page
    └── CodePenDemo.css   # Demo page styling
```

## 🎉 Ready to Use!

Your CodePen editor is now ready! Visit **http://localhost:3000/codepen** to start coding!

---

Made with ❤️ for Dylora Courses
