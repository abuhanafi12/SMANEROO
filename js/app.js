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
    this.updateStatistics();
  }

  loadData() {
    fetch('assets/data/quizzes.json')
      .then(response => response.json())
      .then(data => {
        this.quizData = data;
        this.updateStatistics();
      });

    fetch('assets/data/characters.json')
      .then(response => response.json())
      .then(data => {
        this.charactersData = data;
      });
  }

  updateStatistics() {
    if (!this.quizData) return;

    let totalQuestions = 0;
    this.quizData.quizzes.forEach(quiz => {
      totalQuestions += quiz.questions.length;
    });

    const statQuestions = document.getElementById('stat-questions');
    if (statQuestions) {
      let current = 0;
      const increment = totalQuestions / 30;
      const timer = setInterval(() => {
        current += increment;
        if (current >= totalQuestions) {
          statQuestions.textContent = totalQuestions;
          clearInterval(timer);
        } else {
          statQuestions.textContent = Math.floor(current);
        }
      }, 30);
    }
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

    // Play sound effect
    if (window.interactiveFeatures) {
      if (isCorrect) {
        window.interactiveFeatures.soundEffects.playCorrect();
      } else {
        window.interactiveFeatures.soundEffects.playIncorrect();
      }
    }

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
      if (window.interactiveFeatures) {
        window.interactiveFeatures.createConfetti();
      }
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

    this.saveScore();

    if (window.interactiveFeatures) {
      window.interactiveFeatures.updateProgressIndicator();
    }
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
        <h2 style="margin-bottom: 1rem; text-align: center;">Mode Belajar - 20 Aksara Hanacaraka</h2>
        <p style="text-align: center; color: var(--text-secondary); margin-bottom: 3rem;">
          Klik pada setiap karakter untuk mempelajari lebih detail
        </p>
        <div class="learning-grid">
    `;

    this.charactersData.aksara_legena.forEach((char, index) => {
      html += `
        <div class="aksara-card" onclick="app.showCharacterDetail('${char.id}'); window.interactiveFeatures.soundEffects.playClick();" data-index="${index + 1}">
          <div class="aksara-image-wrapper">
            <img src="${char.image}" alt="${char.name}">
          </div>
          <h4 class="aksara-name">${char.name}</h4>
          <p class="aksara-latin">${char.latin}</p>
        </div>
      `;
    });

    html += `</div></div>`;
    container.innerHTML = html;

    setTimeout(() => {
      if (window.interactiveFeatures) {
        window.interactiveFeatures.addCardFlipAnimation();
      }
    }, 100);
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

        <div class="character-detail-image">
          <img src="${char.image}" alt="${char.name}">
        </div>

        <div class="info-section">
          <h4>Transliterasi Latin</h4>
          <p style="font-size: 1.3rem; font-weight: 700; color: var(--primary);">${char.latin}</p>
        </div>

        <div class="info-section">
          <h4>Penjelasan</h4>
          <p>${char.description}</p>
        </div>

        <div class="info-section">
          <h4>Contoh Penggunaan</h4>
          <p><strong>${char.example_word}</strong> - ${char.meaning}</p>
        </div>

        <button class="btn btn-primary pulse" onclick="this.closest('.modal').remove()" style="width: 100%;">
          Tutup
        </button>
      </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
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
