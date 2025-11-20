# Dokumentasi Teknis - Platform Quiz Aksara Jawa

## 1. Arsitektur Aplikasi

### Diagram Alur Aplikasi

```
┌─────────────────────────────────────────────────────────────┐
│                    index.html (Entry Point)                  │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Navigation Bar (Sticky)                               │ │
│  └────────────────────────────────────────────────────────┘ │
│                          ↓                                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Page Router (data-content)                            │ │
│  │  - home              (Hero + Stats + About)            │ │
│  │  - quiz-categories   (Quiz Selection)                  │ │
│  │  - quiz              (Quiz Interface)                  │ │
│  │  - learn             (Learning Mode)                   │ │
│  │  - about             (About Page)                      │ │
│  └────────────────────────────────────────────────────────┘ │
│                          ↓                                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  JavaScript Engine (app.js)                            │ │
│  │  - QuizApp Class                                       │ │
│  │  - Event Listeners                                     │ │
│  │  - Data Management (localStorage)                      │ │
│  └────────────────────────────────────────────────────────┘ │
│                          ↓                                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Data Layer (assets/data/)                             │ │
│  │  - quizzes.json (21 soal + metadata)                   │ │
│  │  - characters.json (20 karakter)                       │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 2. File Structure Detail

### HTML Files
- **index.html** (450+ lines)
  - Navbar & Navigation
  - 5 main content sections (data-content)
  - Footer
  - Single Page Application approach

### CSS Files
#### main.css (400+ lines)
- CSS Variables (color palette, shadows, transitions)
- Global typography
- Navigation styling
- Hero section
- Buttons
- Cards
- Animations (@keyframes)
- Utility classes
- Responsive media queries

#### components.css (500+ lines)
- Quiz container styles
- Progress bar
- Question section
- Options styling
- Action buttons
- Feedback alerts
- Results screen
- Flashcard 3D effect
- Canvas drawing area
- Leaderboard table
- Category cards
- Modal windows
- Loading spinner
- Responsive breakpoints

### JavaScript Files
#### app.js (500+ lines)
```javascript
class QuizApp {
  constructor() {
    // Initialize state
    this.currentPage = 'home'
    this.currentQuiz = null
    this.currentQuestion = 0
    this.userAnswers = []
    this.score = 0
    this.quizData = null
    this.charactersData = null
    this.startTime = null
    this.endTime = null
    this.init()
  }

  // Core Methods:
  // - init(): Initialization
  // - loadData(): Fetch JSON files
  // - setupEventListeners(): Event delegation
  // - showPage(page): Router
  // - renderQuizCategories(): Quiz list view
  // - startQuiz(quizId): Quiz initialization
  // - displayQuestion(): Question renderer
  // - submitAnswer(): Answer handler
  // - showResults(): Results view
  // - showReview(): Review view
  // - renderLearningMode(): Learning view
  // - showCharacterDetail(): Modal character
  // - saveScore(): localStorage persistence
  // - formatTime(): Utility function
}
```

### Data Files
#### quizzes.json
```json
{
  "quizzes": [
    {
      "id": "quiz_id",
      "name": "Quiz Name",
      "description": "Description",
      "difficulty": "Easy|Medium|Hard",
      "questions": [
        {
          "id": 1,
          "question": "Question text",
          "image": "path/to/image.svg",
          "options": ["Option 1", "Option 2", ...],
          "correct_answer": 0,
          "explanation": "Why this answer is correct"
        }
      ]
    }
  ]
}
```

#### characters.json
```json
{
  "aksara_legena": [
    {
      "id": "ha",
      "name": "Ha",
      "latin": "ha",
      "description": "Penjelasan karakter",
      "image": "assets/images/aksara/ha.svg",
      "audio": "assets/audio/pronunciation/ha.mp3",
      "example_word": "Harjo",
      "meaning": "Artinya"
    }
  ]
}
```

### Assets

#### Aksara SVG (20 files)
- **Naming**: `{latin_name}.svg`
- **Format**: SVG with viewBox="0 0 200 200"
- **Colors**: Unique color per karakter untuk identifikasi
- **Size**: ~2-5 KB per file
- **Content**:
  - Background rectangle (#F5F3EE)
  - Circle border (colored)
  - SVG path dengan stroke
  - Text label dengan transliterasi

## 3. Fitur & Implementation Details

### Quiz System

#### Flow
```
startQuiz(quizId)
  ↓
displayQuestion()
  ├─ Render progress bar
  ├─ Render question text
  ├─ Render aksara image (jika ada)
  ├─ Render options (radio buttons)
  └─ Setup event listeners

User selects answer
  ↓
showFeedback(selectedIndex, question)
  ├─ Check if correct
  ├─ Update score
  ├─ Display explanation
  ├─ Highlight correct/incorrect options
  └─ Save to userAnswers[]

submitAnswer()
  ├─ Check if answer selected
  ├─ Increment question counter
  ├─ Display next question OR
  └─ Call showResults()

showResults()
  ├─ Calculate percentage
  ├─ Generate message
  ├─ Display score card
  ├─ Show time taken
  ├─ Display buttons (Retry/Home/Review)
  └─ saveScore() to localStorage

showReview()
  ├─ Loop through questions
  ├─ Show user answer vs correct
  ├─ Display explanation
  └─ Highlight correct/incorrect
```

#### State Management
```javascript
// Current Quiz State
this.currentQuiz = {
  id, name, description, difficulty, questions[]
}

// Current Progress
this.currentQuestion = 0 // 0-indexed
this.score = 0
this.userAnswers = [
  {
    questionIndex: 0,
    selected: 1,
    correct: 0,
    isCorrect: false
  }
]

// Timing
this.startTime = Date object
this.endTime = Date object
```

### Learning Mode

#### Flashcard System
- Click to flip animation (CSS 3D transform)
- Front: Aksara image + label
- Back: Latin + meaning + description

#### Character Detail Modal
- Popup window with full information
- Close button dengan rotate animation
- Responsive sizing

### Scoring System

```javascript
// Calculation
const percentage = (score / totalQuestions) * 100

// Message Logic
100% → "Sempurna!"
80-99% → "Luar biasa!"
60-79% → "Bagus!"
40-59% → "Butuh latihan"
< 40% → "Jangan menyerah!"

// Time Format
seconds → "Xm Ys"
example: 125 seconds → "2m 5s"
```

## 4. Browser APIs & Features

### Fetch API
```javascript
fetch('assets/data/quizzes.json')
  .then(response => response.json())
  .then(data => {
    this.quizData = data
  })
```

### DOM Manipulation
```javascript
// Query Selectors
document.querySelector()
document.querySelectorAll()
document.getElementById()

// Manipulation
innerHTML, textContent, classList
addEventListener()
removeEventListener()
```

### localStorage API
```javascript
// Save
localStorage.setItem('key', JSON.stringify(data))

// Load
JSON.parse(localStorage.getItem('key'))

// Limit: ~5-10MB per domain
// Cleared manually or on browser data clear
```

## 5. CSS3 Features Used

### Gradients
```css
background: linear-gradient(135deg, color1 0%, color2 100%)
background: radial-gradient(circle, color1 0%, color2 100%)
```

### Transforms & Transitions
```css
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
transform: translateY(-3px)
transform: translateX(5px)
transform: rotateY(180deg) /* 3D flashcard */
transform-style: preserve-3d
backface-visibility: hidden
```

### Animations
```css
@keyframes slideUp { from: translateY(50px); to: translateY(0); }
@keyframes fadeIn { from: opacity 0; to: opacity 1; }
@keyframes confetti { ... 720deg rotate ... }
@keyframes shake { ... translateX variations ... }
```

### Flexbox & Grid
```css
display: flex
display: grid
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
gap: 2rem
justify-content, align-items
```

### Glassmorphism
```css
background: rgba(255, 255, 255, 0.95)
backdrop-filter: blur(10px)
border: 1px solid rgba(5, 150, 105, 0.1)
```

## 6. Responsive Design

### Breakpoints
```css
/* Mobile First */
Default: 320px+
Tablet: 768px+
Desktop: 1024px+
Large: 1200px+

/* Media Queries in main.css & components.css */
@media (max-width: 768px) { ... }
@media (max-width: 480px) { ... }
```

### Responsive Elements
- Navbar menu becomes flexible
- Grid changes to 1 column on mobile
- Hero text size reduces
- Buttons become full-width
- Canvas/quiz container adjusts width

## 7. Performance Optimization

### CSS
- No external dependencies (no Bootstrap, Tailwind)
- Minimal file size (~15KB total CSS)
- CSS variables untuk reusability
- Efficient selectors

### JavaScript
- Vanilla JS (no jQuery, React, Vue)
- Event delegation pada navbar
- No unnecessary DOM updates
- Efficient data structures

### Image Optimization
- SVG format (scalable, small file size)
- Lazy loading ready
- Base64 inline untuk simple patterns

### Overall
- Single HTML file
- Progressive enhancement
- No network calls except JSON fetch
- Works offline after first load

## 8. Accessibility

### Keyboard Navigation
```html
<a href="#" data-page="quiz">Quiz</a>
<!-- Tab key navigates -->
<!-- Enter key triggers action -->
```

### ARIA Labels
```html
<input type="radio" name="answer" value="0" required>
<label for="answer-0">Option Text</label>
```

### Focus Indicators
```css
:focus {
  outline: 2px solid var(--primary)
}
```

### Color Contrast
- WCAG AA compliant
- Text contrast ratio ≥ 4.5:1

### Semantic HTML
```html
<nav>, <section>, <article>
<button>, <input type="radio">
<label> for form elements
```

## 9. Data Flow

### User Quiz Session
```
User Click "Mulai Quiz"
↓
startQuiz(quizId)
  - Find quiz by ID
  - Reset counters
  - Load quiz data
  - Call displayQuestion()
↓
displayQuestion()
  - Render question UI
  - Setup event listeners
↓
User Selects Option
  - Trigger change event
  - Call showFeedback()
  - Check answer
  - Update score
  - Highlight option
↓
User Clicks "Lanjut"
  - submitAnswer()
  - Save answer to userAnswers[]
  - Increment counter
  - If more questions → displayQuestion()
  - Else → showResults()
↓
saveScore()
  - Get quizScores from localStorage
  - Add new score entry
  - Save back to localStorage
```

## 10. Debugging Tips

### Console Logging
```javascript
console.log('Current quiz:', this.currentQuiz)
console.log('User answers:', this.userAnswers)
console.log('Score:', this.score)
console.log('Storage:', localStorage.getItem('quizScores'))
```

### Check Data
```javascript
// In browser console
window.app.currentQuiz
window.app.quizData
window.app.charactersData
localStorage.getItem('quizScores')
```

### Network Tab
- Check JSON file loads correctly
- Check SVG images load
- Monitor fetch calls

## 11. Testing Checklist

### Functional Testing
- [ ] All 5 quiz categories load
- [ ] All questions display correctly
- [ ] Scoring works accurately
- [ ] Feedback displays correctly
- [ ] Results show accurate percentage
- [ ] Review shows all answers
- [ ] Learning mode displays all characters
- [ ] Modal opens/closes properly
- [ ] localStorage persists data

### Cross-browser Testing
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Responsive Testing
- [ ] Desktop 1920x1080
- [ ] Tablet 768x1024
- [ ] Mobile 375x667
- [ ] Mobile 414x896

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast sufficient
- [ ] Focus indicators visible

## 12. Future Enhancement Paths

### Phase 2 - Advanced Features
1. Canvas Drawing Practice
   ```javascript
   // HTML5 Canvas API
   // Stroke detection
   // Overlay comparison
   ```

2. Audio Integration
   ```javascript
   // Web Audio API
   // Play pronunciation
   // Waveform visualization
   ```

3. Gamification
   ```javascript
   // Badge system
   // XP tracking
   // Level progression
   ```

4. Service Worker (PWA)
   ```javascript
   // Cache API
   // Offline functionality
   // Background sync
   ```

5. Backend Integration
   ```javascript
   // API calls instead of JSON
   // User authentication
   // Cloud storage
   // Real-time leaderboard
   ```

---

**Dokumentasi ini akan di-update seiring pengembangan project**
