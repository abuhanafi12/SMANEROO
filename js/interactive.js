// Interactive Features untuk Platform Quiz Aksara Jawa

// Konfetti animasi untuk skor sempurna
function createConfetti() {
  const colors = ['#059669', '#0891B2', '#F59E0B', '#10B981', '#EF4444'];
  const confettiCount = 50;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animation = `confettiFall ${2 + Math.random() * 2}s linear forwards`;
    confetti.style.animationDelay = Math.random() * 0.5 + 's';
    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 4000);
  }
}

// Sound effects (using Web Audio API)
class SoundEffects {
  constructor() {
    this.audioContext = null;
  }

  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playCorrect() {
    this.init();
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = 523.25;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.3);

    setTimeout(() => {
      const oscillator2 = this.audioContext.createOscillator();
      const gainNode2 = this.audioContext.createGain();
      oscillator2.connect(gainNode2);
      gainNode2.connect(this.audioContext.destination);
      oscillator2.frequency.value = 659.25;
      oscillator2.type = 'sine';
      gainNode2.gain.setValueAtTime(0.3, this.audioContext.currentTime);
      gainNode2.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
      oscillator2.start(this.audioContext.currentTime);
      oscillator2.stop(this.audioContext.currentTime + 0.3);
    }, 100);
  }

  playIncorrect() {
    this.init();
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = 200;
    oscillator.type = 'sawtooth';

    gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.2);
  }

  playClick() {
    this.init();
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.05);
  }
}

const soundEffects = new SoundEffects();

// Enhanced card flip animation
function addCardFlipAnimation() {
  document.querySelectorAll('.aksara-card').forEach(card => {
    card.addEventListener('click', function() {
      this.classList.add('flip');
      setTimeout(() => this.classList.remove('flip'), 600);
    });
  });
}

// Tooltip functionality
function createTooltip(element, text) {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = text;
  document.body.appendChild(tooltip);

  element.addEventListener('mouseenter', (e) => {
    const rect = element.getBoundingClientRect();
    tooltip.style.top = rect.top - 40 + 'px';
    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
    tooltip.classList.add('show');
  });

  element.addEventListener('mouseleave', () => {
    tooltip.classList.remove('show');
  });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.querySelector('.modal.active');
    if (modal) {
      modal.remove();
    }
  }

  if (e.key >= '1' && e.key <= '4') {
    const options = document.querySelectorAll('input[name="answer"]');
    const index = parseInt(e.key) - 1;
    if (options[index]) {
      options[index].click();
    }
  }

  if (e.key === 'Enter') {
    const submitBtn = document.querySelector('.btn-submit:not(:disabled)');
    if (submitBtn) {
      submitBtn.click();
    }
  }
});

// Enhanced statistics animation
function animateStatNumbers() {
  document.querySelectorAll('.stat-number').forEach(stat => {
    const target = parseInt(stat.textContent);
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        stat.textContent = target;
        clearInterval(timer);
      } else {
        stat.textContent = Math.floor(current);
      }
    }, 20);
  });
}

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Initialize scroll animations
function initScrollAnimations() {
  document.querySelectorAll('.card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.6s, transform 0.6s';
    observer.observe(el);
  });
}

// Progress tracking
function updateProgressIndicator() {
  const scores = JSON.parse(localStorage.getItem('quizScores') || '{}');
  let totalQuizzes = 0;
  let completedQuizzes = 0;

  Object.keys(scores).forEach(key => {
    totalQuizzes++;
    if (scores[key].length > 0) {
      completedQuizzes++;
    }
  });

  const progressIndicator = document.querySelector('.progress-indicator');
  if (progressIndicator) {
    const percentage = totalQuizzes > 0 ? Math.round((completedQuizzes / totalQuizzes) * 100) : 0;
    progressIndicator.textContent = percentage + '%';
  }
}

// Auto-save progress
function autoSaveProgress() {
  setInterval(() => {
    const currentState = {
      lastPage: window.app ? window.app.currentPage : 'home',
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('appState', JSON.stringify(currentState));
  }, 30000);
}

// Load saved progress
function loadSavedProgress() {
  const savedState = localStorage.getItem('appState');
  if (savedState) {
    try {
      const state = JSON.parse(savedState);
      console.log('Progress terakhir:', state.lastPage);
    } catch (e) {
      console.error('Error loading progress:', e);
    }
  }
}

// Interactive button effects
function addButtonEffects() {
  document.querySelectorAll('.btn, .btn-primary, .btn-secondary, .btn-submit').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.5)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s ease-out';
      ripple.style.pointerEvents = 'none';

      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// CSS untuk ripple effect
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Initialize semua fitur interaktif saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    animateStatNumbers();
    initScrollAnimations();
    addButtonEffects();
    loadSavedProgress();
    autoSaveProgress();
    updateProgressIndicator();
  }, 100);
});

// Export functions untuk digunakan di app.js
window.interactiveFeatures = {
  createConfetti,
  soundEffects,
  addCardFlipAnimation,
  createTooltip,
  updateProgressIndicator
};
