class QuizApp {
  constructor() {
    this.currentPage = 'home';
    this.currentQuiz = null;
    this.currentQuestion = 0;
    this.userAnswers = [];
    this.score = 0;
    this.quizData = null;
    this.charactersData = null;
    this.startTime = null;
    this.endTime = null;
    this.init();
  }

  init() {
    this.loadData();
    this.setupEventListeners();
    this.showPage('home');
  }

  loadData() {
    fetch('assets/data/quizzes.json')
      .then(response => response.json())
      .then(data => {
        this.quizData = data;
      });

    fetch('assets/data/characters.json')
      .then(response => response.json())
      .then(data => {
        this.charactersData = data;
      });
  }

  setupEventListeners() {
    // Navigation
    document.querySelectorAll('[data-page]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const page = el.getAttribute('data-page');
        this.showPage(page);
      });
    });
  }

  showPage(page) {
    // Hide all pages
    document.querySelectorAll('[data-content]').forEach(el => {
      el.style.display = 'none';
    });

    // Show selected page
    const pageElement = document.querySelector(`[data-content="${page}"]`);
    if (pageElement) {
      pageElement.style.display = 'block';
      window.scrollTo(0, 0);

      if (page === 'quiz-categories') {
        this.renderQuizCategories();
      } else if (page === 'learn') {
        this.renderLearningMode();
      }
    }

    this.currentPage = page;
  }

  renderQuizCategories() {
    const container = document.getElementById('quiz-categories-container');
    if (!container || !this.quizData) return;

    container.innerHTML = '';

    this.quizData.quizzes.forEach(quiz => {
      const card = document.createElement('div');
      card.className = 'category-card';
      card.innerHTML = `
        <div class="category-icon">📚</div>
        <h3 class="category-name">${quiz.name}</h3>
        <p class="category-desc">${quiz.description}</p>
        <span class="difficulty-badge difficulty-${quiz.difficulty.toLowerCase()}">${quiz.difficulty}</span>
        <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center;">
          <button class="btn btn-primary" onclick="app.startQuiz('${quiz.id}')">
            Mulai Quiz
          </button>
        </div>
      `;
      container.appendChild(card);
    });
  }

  startQuiz(quizId) {
    const quiz = this.quizData.quizzes.find(q => q.id === quizId);
    if (!quiz) return;

    this.currentQuiz = quiz;
    this.currentQuestion = 0;
    this.userAnswers = [];
    this.score = 0;
    this.startTime = new Date();

    this.showPage('quiz');
    this.displayQuestion();
  }

  displayQuestion() {
    if (!this.currentQuiz) return;

    const question = this.currentQuiz.questions[this.currentQuestion];
    const container = document.getElementById('quiz-container');
    if (!container) return;

    const progress = ((this.currentQuestion + 1) / this.currentQuiz.questions.length) * 100;

    let optionsHTML = '';
    question.options.forEach((option, index) => {
      optionsHTML += `
        <label class="option">
          <input type="radio" name="answer" value="${index}" required>
          <div class="option-radio"></div>
          <span>${option}</span>
        </label>
      `;
    });

    container.innerHTML = `
      <div class="quiz-container">
        <div class="progress-wrapper">
          <div class="progress-label">
            <span>Soal ${this.currentQuestion + 1} dari ${this.currentQuiz.questions.length}</span>
            <span>${Math.round(progress)}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
        </div>

        <div class="question-section">
          <div class="question-number">Soal ${this.currentQuestion + 1}</div>
          <h3 class="question-text">${question.question}</h3>

          ${question.image ? `
            <div class="aksara-display">
              <img src="${question.image}" alt="Aksara" style="max-width: 200px; max-height: 150px;">
            </div>
          ` : ''}

          <div class="options-container">
            ${optionsHTML}
          </div>

          <div id="feedback" class="feedback"></div>

          <div class="action-buttons">
            <button class="btn-submit" onclick="app.submitAnswer()" style="grid-column: 1 / -1;">
              Lanjut
            </button>
          </div>
        </div>
      </div>
    `;

    // Add event listeners for options
    document.querySelectorAll('input[name="answer"]').forEach(radio => {
      radio.addEventListener('change', () => {
        this.showFeedback(parseInt(radio.value), question);
      });
    });
  }

  showFeedback(selectedIndex, question) {
    const feedback = document.getElementById('feedback');
    const isCorrect = selectedIndex === question.correct_answer;

    feedback.innerHTML = `
      <div class="feedback-title">
        ${isCorrect ? '✓ Benar!' : '✗ Salah!'}
      </div>
      <div class="feedback-text">${question.explanation}</div>
    `;

    feedback.className = `feedback show ${isCorrect ? 'correct' : 'incorrect'}`;

    // Highlight options
    document.querySelectorAll('.option').forEach((el, index) => {
      el.classList.remove('correct', 'incorrect');
      if (index === question.correct_answer) {
        el.classList.add('correct');
      } else if (index === selectedIndex && !isCorrect) {
        el.classList.add('incorrect');
      }
    });

    if (isCorrect) {
      this.score++;
    }

    this.userAnswers.push({
      questionIndex: this.currentQuestion,
      selected: selectedIndex,
      correct: question.correct_answer,
      isCorrect: isCorrect
    });
  }

  submitAnswer() {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
      alert('Pilih jawaban terlebih dahulu!');
      return;
    }

    this.currentQuestion++;

    if (this.currentQuestion < this.currentQuiz.questions.length) {
      setTimeout(() => {
        this.displayQuestion();
      }, 800);
    } else {
      this.endTime = new Date();
      this.showResults();
    }
  }

  showResults() {
    const totalQuestions = this.currentQuiz.questions.length;
    const percentage = (this.score / totalQuestions) * 100;
    const timeTaken = Math.round((this.endTime - this.startTime) / 1000);

    let message = '';
    if (percentage === 100) {
      message = '🎉 Sempurna! Anda menguasai semua soal!';
    } else if (percentage >= 80) {
      message = '🌟 Luar biasa! Anda sangat memahami aksara Jawa!';
    } else if (percentage >= 60) {
      message = '👍 Bagus! Terus belajar untuk lebih mahir!';
    } else if (percentage >= 40) {
      message = '📚 Butuh latihan lebih lanjut!';
    } else {
      message = '💪 Jangan menyerah! Mulai dari awal dan terus belajar!';
    }

    const container = document.getElementById('quiz-container');
    container.innerHTML = `
      <div class="quiz-container" style="text-align: center;">
        <div class="results-container">
          <div class="results-score">${this.score} / ${totalQuestions}</div>
          <div class="results-percentage">${Math.round(percentage)}% Benar</div>
          <div class="results-message">${message}</div>
          <div style="color: var(--text-secondary); margin-bottom: 2rem;">
            Waktu: ${this.formatTime(timeTaken)}
          </div>

          <div class="results-buttons">
            <button class="btn btn-primary" onclick="app.showPage('quiz-categories')" style="grid-column: 1 / -1;">
              Coba Quiz Lain
            </button>
            <button class="btn btn-secondary" onclick="app.showPage('home')" style="grid-column: 1 / -1;">
              Kembali ke Beranda
            </button>
          </div>

          <div style="margin-top: 2rem;">
            <button class="btn-submit" onclick="app.showReview()" style="width: 100%;">
              Review Jawaban
            </button>
          </div>
        </div>
      </div>
    `;

    // Save score to localStorage
    this.saveScore();
  }

  showReview() {
    const container = document.getElementById('quiz-container');
    let reviewHTML = `
      <div class="quiz-container">
        <h2 style="margin-bottom: 2rem; text-align: center;">Review Jawaban</h2>
    `;

    this.currentQuiz.questions.forEach((question, index) => {
      const userAnswer = this.userAnswers[index];
      const isCorrect = userAnswer.isCorrect;

      reviewHTML += `
        <div style="margin-bottom: 2rem; padding: 1.5rem; background: ${isCorrect ? '#d1fae5' : '#fee2e2'}; border-radius: 10px; border-left: 4px solid ${isCorrect ? 'var(--success)' : 'var(--error)'};">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
            <h4 style="margin: 0;">Soal ${index + 1}: ${question.question}</h4>
            <span style="font-weight: 600; color: ${isCorrect ? 'var(--success)' : 'var(--error)'};">
              ${isCorrect ? '✓ Benar' : '✗ Salah'}
            </span>
          </div>
          ${question.image ? `
            <div style="text-align: center; margin: 1rem 0;">
              <img src="${question.image}" alt="Aksara" style="max-width: 100px; max-height: 100px;">
            </div>
          ` : ''}
          <div style="margin: 0.5rem 0;">
            <strong>Pilihan Anda:</strong> ${question.options[userAnswer.selected]}
          </div>
          <div style="margin: 0.5rem 0;">
            <strong>Jawaban Benar:</strong> ${question.options[question.correct_answer]}
          </div>
          <div style="margin-top: 0.5rem; font-size: 0.95rem;">
            <strong>Penjelasan:</strong> ${question.explanation}
          </div>
        </div>
      `;
    });

    reviewHTML += `
      <button class="btn btn-primary" onclick="app.showResults()" style="width: 100%; margin-top: 2rem;">
        Kembali ke Hasil
      </button>
    </div>
    `;

    container.innerHTML = reviewHTML;
  }

  renderLearningMode() {
    const container = document.getElementById('learn-container');
    if (!container || !this.charactersData) return;

    let html = `
      <div class="container">
        <h2 style="margin-bottom: 2rem; text-align: center;">Mode Belajar - Aksara Dasar</h2>
        <div class="grid-3">
    `;

    this.charactersData.aksara_legena.forEach(char => {
      html += `
        <div class="card" onclick="app.showCharacterDetail('${char.id}')">
          <div style="text-align: center; margin-bottom: 1rem;">
            <img src="${char.image}" alt="${char.name}" style="max-width: 100%; max-height: 120px; cursor: pointer;">
          </div>
          <h4 style="text-align: center; margin-bottom: 0.5rem;">${char.name}</h4>
          <p style="text-align: center; margin: 0;">${char.latin}</p>
        </div>
      `;
    });

    html += `</div></div>`;
    container.innerHTML = html;
  }

  showCharacterDetail(characterId) {
    const char = this.charactersData.aksara_legena.find(c => c.id === characterId);
    if (!char) return;

    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Aksara ${char.name}</h3>
          <button class="modal-close" onclick="this.closest('.modal').remove()">×</button>
        </div>

        <div style="text-align: center; margin-bottom: 2rem;">
          <img src="${char.image}" alt="${char.name}" style="max-width: 100%; max-height: 200px; margin-bottom: 1rem;">
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: var(--primary); margin-bottom: 0.5rem;">Transliterasi:</h4>
          <p style="font-size: 1.2rem; font-weight: 600;">${char.latin}</p>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: var(--primary); margin-bottom: 0.5rem;">Penjelasan:</h4>
          <p>${char.description}</p>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: var(--primary); margin-bottom: 0.5rem;">Contoh Kata:</h4>
          <p><strong>${char.example_word}</strong> (${char.meaning})</p>
        </div>

        <button class="btn btn-primary" onclick="this.closest('.modal').remove()" style="width: 100%;">
          Tutup
        </button>
      </div>
    `;

    document.body.appendChild(modal);
  }

  saveScore() {
    if (!this.currentQuiz) return;

    let scores = JSON.parse(localStorage.getItem('quizScores') || '{}');
    if (!scores[this.currentQuiz.id]) {
      scores[this.currentQuiz.id] = [];
    }

    scores[this.currentQuiz.id].push({
      score: this.score,
      total: this.currentQuiz.questions.length,
      percentage: (this.score / this.currentQuiz.questions.length) * 100,
      date: new Date().toISOString(),
      time: Math.round((this.endTime - this.startTime) / 1000)
    });

    localStorage.setItem('quizScores', JSON.stringify(scores));
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new QuizApp();
});
