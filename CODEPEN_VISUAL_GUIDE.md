# 🎨 Visual Guide: Loading States

## Before Click (Idle State)
```
┌─────────────────────────────────────────────────────────────────┐
│  [🌐 HTML] [🎨 CSS] [⚡ JS]                    [▶ Run]         │
├─────────────────────────────────────────────────────────────────┤
│                                    │                             │
│  Code Editor (Dark)                │   👁️ Live Preview          │
│  ┌──────────────────────┐          │   ┌───────────────────┐   │
│  │ <h1>Hello</h1>       │          │   │                   │   │
│  │ <button>Click</button>│         │   │   Your Output     │   │
│  │                      │          │   │   Shows Here      │   │
│  │                      │          │   │                   │   │
│  └──────────────────────┘          │   └───────────────────┘   │
│                                    │                             │
└─────────────────────────────────────────────────────────────────┘
```

## During Execution (Loading State)
```
┌─────────────────────────────────────────────────────────────────┐
│  [🌐 HTML] [🎨 CSS] [⚡ JS]         [⏸ Running...] (DISABLED)  │
├─────────────────────────────────────────────────────────────────┤
│                                    │                             │
│  Code Editor (Dark)                │   👁️ Live Preview ● Compiling...│
│  ┌──────────────────────┐          │   ┌───────────────────┐   │
│  │ <h1>Hello</h1>       │          │   │                   │   │
│  │ <button>Click</button>│         │   │       ⭕         │   │
│  │                      │          │   │    (spinning)     │   │
│  │                      │          │   │                   │   │
│  └──────────────────────┘          │   │ Compiling Code... │   │
│                                    │   └───────────────────┘   │
│                                    │   (Dark overlay 95%)      │
└─────────────────────────────────────────────────────────────────┘
```

## After Execution (Output Displayed)
```
┌─────────────────────────────────────────────────────────────────┐
│  [🌐 HTML] [🎨 CSS] [⚡ JS]                    [▶ Run]         │
├─────────────────────────────────────────────────────────────────┤
│                                    │                             │
│  Code Editor (Dark)                │   👁️ Live Preview          │
│  ┌──────────────────────┐          │   ┌───────────────────┐   │
│  │ <h1>Hello</h1>       │          │   │                   │   │
│  │ <button>Click</button>│         │   │   Hello           │   │
│  │                      │          │   │   [Click Button]  │   │
│  │                      │          │   │                   │   │
│  └──────────────────────┘          │   └───────────────────┘   │
│                                    │   (Faded in smoothly)     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Animation Sequence

### Step 1: User Clicks Run (0ms)
- Button text: "Run" → "Running..."
- Button icon: ▶ → ⏸
- Button becomes disabled (grayed out)
- Button starts pulsing animation

### Step 2: Loading Overlay Appears (0-300ms)
- Dark overlay fades in over preview panel
- Spinner appears in center
- "Compiling Code..." text fades in
- Status indicator appears in header: "● Compiling..."

### Step 3: Code Compiles (300-800ms)
- Spinner rotates continuously
- Text pulses (fades between 100% and 60% opacity)
- Shimmer effect sweeps across background
- Code is being processed in background

### Step 4: Output Renders (800-1100ms)
- Loading overlay fades out
- Output iframe fades in
- Spinner disappears
- Status indicator disappears

### Step 5: Complete (1100ms)
- Button re-enables
- Button text: "Running..." → "Run"
- Button icon: ⏸ → ▶
- Ready for next execution

---

## 🎨 Color Scheme

### Primary Colors
- **Purple**: #667eea (tabs, spinner, gradients)
- **Pink**: #764ba2 (gradients, accents)
- **Dark Background**: #1e1e1e (editor, loading overlay)
- **White Text**: #ffffff (on colored backgrounds)
- **Gray Text**: #d4d4d4 (code editor text)

### State Colors
- **Active Button**: Purple-Pink gradient with shadow
- **Disabled Button**: Gray (#9e9e9e to #757575)
- **Loading Spinner**: Purple (#667eea) border
- **Status Dot**: Green (#4caf50) when active
- **Error Messages**: Red (#d32f2f) with light red background

---

## 📊 Timing Breakdown

```
Total Loading Time: ~1100ms

├─ [0ms]     Button click detected
├─ [0ms]     Button disabled
├─ [0-300ms] Loading overlay fades in
├─ [300ms]   Loading fully visible
├─ [800ms]   Code execution starts
├─ [800ms]   Output begins rendering
├─ [800-1100ms] Loading fades out, output fades in
└─ [1100ms]  Complete - button re-enabled
```

---

## 🎭 Animation Effects

### 1. Spinner Rotation
- **Type**: CSS animation
- **Duration**: 1s per full rotation
- **Timing**: Linear (constant speed)
- **Loop**: Infinite

### 2. Text Pulse
- **Type**: Opacity animation
- **Duration**: 1.5s per cycle
- **Range**: 100% → 60% → 100%
- **Timing**: Ease-in-out
- **Loop**: Infinite

### 3. Button Pulse
- **Type**: Box-shadow expansion
- **Duration**: 1.5s per cycle
- **Effect**: Shadow grows and shrinks
- **Timing**: Ease-in-out
- **Loop**: Infinite while running

### 4. Shimmer Sweep
- **Type**: Background gradient movement
- **Duration**: 2s per sweep
- **Direction**: Left to right
- **Timing**: Linear
- **Loop**: Infinite

### 5. Fade Transitions
- **In**: 300ms ease
- **Out**: 400ms ease
- **Opacity**: 0 → 1 (in), 1 → 0 (out)

---

## 🎯 User Interactions

### Can Do:
✅ Edit code in any tab
✅ Switch between HTML/CSS/JS tabs
✅ Click Run when button is enabled
✅ View output after compilation
✅ See loading states clearly

### Cannot Do:
❌ Click Run while code is executing
❌ Submit multiple rapid clicks (debounced)
❌ Interact with output during loading
❌ Skip the loading animation

---

This visual guide helps you understand exactly what happens when you click Run! 🚀
