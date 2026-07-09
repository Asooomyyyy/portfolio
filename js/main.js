// Hero scroll split — ASMA left, SULIMAN right (instant on scroll)
const heroScroll = document.querySelector('.hero-scroll');
const hero = document.querySelector('.hero');
let heroTicking = false;

function updateHeroScroll() {
  if (!heroScroll) return;

  const splitDistance = window.innerHeight * 0.45;
  const progress = Math.min(window.scrollY / splitDistance, 1);

  heroScroll.style.setProperty('--hero-progress', progress);
  hero?.classList.toggle('hero--scrolling', progress > 0.02);

  const codeRainEl = document.getElementById('codeRain');
  if (codeRainEl) codeRainEl.style.opacity = String(Math.max(0, 0.75 - progress * 0.7));
}

window.addEventListener('scroll', () => {
  if (!heroTicking) {
    heroTicking = true;
    requestAnimationFrame(() => {
      updateHeroScroll();
      heroTicking = false;
    });
  }
}, { passive: true });

updateHeroScroll();

function initHeroEffects() {
  initCodeRain();
  initTypewriter();
}

// ---- Matrix code rain ----
function initCodeRain() {
  const codeRainCanvas = document.getElementById('codeRain');
  if (!codeRainCanvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = codeRainCanvas.getContext('2d');
  const parent = codeRainCanvas.parentElement;
  const rainChars = '01<>{}[]=;:/SwiftPHPCSSSQLGitUIfuncletvarimportstructasyncawait@mainViewApp';
  const rainKeywords = ['Swift', 'SwiftUI', 'func', 'let', 'var', 'import', 'struct', 'View', 'App', 'async', 'git', 'build'];
  let rainDrops = [];
  const rainFontSize = 16;

  function resizeRain() {
    const w = parent.offsetWidth;
    const h = parent.offsetHeight;
    if (!w || !h) return false;

    codeRainCanvas.width = w;
    codeRainCanvas.height = h;
    const cols = Math.floor(w / rainFontSize);
    rainDrops = Array.from({ length: cols }, () => Math.random() * -40);
    return true;
  }

  function drawRain() {
    if (!resizeRain()) {
      requestAnimationFrame(drawRain);
      return;
    }

    ctx.fillStyle = 'rgba(12, 16, 23, 0.18)';
    ctx.fillRect(0, 0, codeRainCanvas.width, codeRainCanvas.height);
    ctx.font = `${rainFontSize}px "JetBrains Mono", monospace`;

    for (let i = 0; i < rainDrops.length; i++) {
      const isKeyword = Math.random() > 0.9;
      const text = isKeyword
        ? rainKeywords[Math.floor(Math.random() * rainKeywords.length)]
        : rainChars[Math.floor(Math.random() * rainChars.length)];

      const x = i * rainFontSize;
      const y = rainDrops[i] * rainFontSize;

      if (Math.random() > 0.98) {
        ctx.fillStyle = '#5EEAD4';
        ctx.shadowColor = '#5EEAD4';
        ctx.shadowBlur = 10;
      } else {
        ctx.fillStyle = `rgba(94, 234, 212, ${0.25 + Math.random() * 0.4})`;
        ctx.shadowBlur = 0;
      }

      ctx.fillText(text, x, y);
      ctx.shadowBlur = 0;

      if (y > codeRainCanvas.height && Math.random() > 0.95) {
        rainDrops[i] = 0;
      }
      rainDrops[i] += 0.5 + Math.random() * 0.8;
    }

    requestAnimationFrame(drawRain);
  }

  drawRain();
  window.addEventListener('resize', resizeRain);
}

// ---- Hero terminal typewriter ----
function initTypewriter() {
  const heroTyping = document.getElementById('heroTyping');
  if (!heroTyping) return;

  const codeLines = [
    { text: 'import SwiftUI', color: '#818CF8' },
    { text: '@main struct PortfolioApp: App', color: '#F05138' },
    { text: 'struct Developer: View {', color: '#5AC8FA' },
    { text: 'func shipProject() async -> App', color: '#5EEAD4' },
    { text: 'let passion = true', color: '#F472B6' },
    { text: 'while learning { build() }', color: '#F7DF1E' },
    { text: 'git commit -m "portfolio live"', color: '#34D399' },
    { text: 'const create = async () => {', color: '#F7DF1E' },
    { text: 'SELECT * FROM projects', color: '#E38C00' },
    { text: 'print("Hello, I\'m Asma")', color: '#5EEAD4' },
    { text: '// Crafting iOS & Web apps', color: '#8B9CB8' },
    { text: 'npm run deploy ✓', color: '#34D399' },
  ];

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    heroTyping.textContent = codeLines[0].text;
    heroTyping.style.color = codeLines[0].color;
    return;
  }

  let lineIndex = 0;
  let charIndex = codeLines[0].text.length;
  let isDeleting = false;

  heroTyping.textContent = codeLines[0].text;
  heroTyping.style.color = codeLines[0].color;

  function typeCodeLines() {
    const current = codeLines[lineIndex];
    heroTyping.style.color = current.color;

    if (!isDeleting) {
      heroTyping.textContent = current.text.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.text.length) {
        setTimeout(() => { isDeleting = true; typeCodeLines(); }, 2200);
        return;
      }
    } else {
      heroTyping.textContent = current.text.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        lineIndex = (lineIndex + 1) % codeLines.length;
      }
    }

    setTimeout(typeCodeLines, isDeleting ? 35 : 70);
  }

  setTimeout(() => {
    isDeleting = true;
    typeCodeLines();
  }, 2500);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroEffects);
} else {
  initHeroEffects();
}

// Session timer (matches hero status bar)
const sessionStart = Date.now();
function updateTimer() {
  const elapsed = Math.floor((Date.now() - sessionStart) / 1000);
  const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const secs = String(elapsed % 60).padStart(2, '0');
  const el = document.getElementById('statusTime');
  if (el) el.textContent = `${mins}:${secs}`;
}
updateTimer();
setInterval(updateTimer, 1000);

// Mobile nav
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 50);
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function setActiveNav() {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navItems.forEach(item => {
        item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
      });
    }
  });
}

window.addEventListener('scroll', setActiveNav);
setActiveNav();

// Tabs
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(target)?.classList.add('active');
  });
});

// Accordion
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.closest('.accordion-item');
    const isOpen = item.classList.contains('open');

    item.closest('.accordion')?.querySelectorAll('.accordion-item').forEach(i => {
      i.classList.remove('open');
    });

    if (!isOpen) item.classList.add('open');
  });
});

// Skill connections
const skillRelations = {
  swift: ['swiftui', 'mvvm', 'coremotion', 'mapkit', 'swiftdata', 'healthkit', 'gamedev'],
  swiftui: ['swift', 'mvvm', 'uiux', 'figma', 'accessibility', 'gamedev'],
  mvvm: ['swift', 'swiftui', 'swiftdata'],
  coremotion: ['swift', 'swiftui', 'healthkit', 'mapkit'],
  mapkit: ['swift', 'swiftui', 'coremotion'],
  healthkit: ['swift', 'swiftui', 'coremotion'],
  gamedev: ['swift', 'swiftui', 'uiux'],
  accessibility: ['swiftui', 'uiux', 'swift'],
  php: ['html', 'css', 'javascript', 'sql', 'wordpress'],
  html: ['css', 'javascript', 'php', 'typescript'],
  css: ['html', 'javascript', 'figma', 'typescript'],
  javascript: ['html', 'css', 'php', 'firebase', 'typescript', 'apiintegration'],
  typescript: ['javascript', 'html', 'css', 'python', 'apiintegration'],
  python: ['javascript', 'typescript', 'sql', 'apiintegration', 'java'],
  java: ['sql', 'git', 'python'],
  apiintegration: ['javascript', 'typescript', 'python', 'swift', 'firebase'],
  wordpress: ['php', 'html', 'css'],
  swiftdata: ['swift', 'swiftui', 'mvvm', 'sql', 'firebase'],
  sql: ['php', 'java', 'firebase', 'swiftdata'],
  firebase: ['javascript', 'swift', 'sql', 'apiintegration', 'swiftdata'],
  uiux: ['figma', 'sketch', 'miro', 'swiftui'],
  figma: ['uiux', 'sketch', 'miro', 'css'],
  sketch: ['figma', 'uiux'],
  miro: ['figma', 'uiux', 'agile'],
  git: ['swift', 'java', 'agile'],
  agile: ['git', 'miro']
};

const skillTags = document.querySelectorAll('.tag--interactive');

skillTags.forEach(tag => {
  tag.addEventListener('click', () => {
    const skill = tag.dataset.skill;
    const isActive = tag.classList.contains('active');

    skillTags.forEach(t => t.classList.remove('active', 'related'));

    if (!isActive) {
      tag.classList.add('active');
      const related = skillRelations[skill] || [];
      related.forEach(rel => {
        document.querySelector(`[data-skill="${rel}"]`)?.classList.add('related');
      });
    }
  });
});

// Fade-in on scroll
function playProjectVideo(video) {
  if (!video) return;

  video.muted = true;
  video.defaultMuted = true;
  video.volume = 0;
  video.playsInline = true;
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');

  const attemptPlay = () => {
    const promise = video.play();
    if (promise) {
      promise.catch(() => {
        window.setTimeout(attemptPlay, 250);
      });
    }
  };

  if (video.readyState >= 2) {
    attemptPlay();
  } else {
    video.addEventListener('loadeddata', attemptPlay, { once: true });
    video.addEventListener('canplay', attemptPlay, { once: true });
    video.load();
  }
}

function initProjectVideos() {
  document.querySelectorAll('.phone-screen-video').forEach(video => {
    const videoObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) playProjectVideo(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px' }
    );

    videoObserver.observe(video);
    playProjectVideo(video);
  });
}

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.querySelectorAll('.phone-screen-video').forEach(video => {
          window.setTimeout(() => playProjectVideo(video), 150);
        });
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('.project-card, .skill-row').forEach(el => {
  const hasVideo = el.querySelector('.phone-screen-video');

  if (!hasVideo) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  }

  observer.observe(el);
});

initProjectVideos();
