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
  swift: ['swiftui', 'xcode', 'coremotion'],
  swiftui: ['swift', 'xcode', 'uiux', 'figma'],
  xcode: ['swift', 'swiftui', 'git'],
  coremotion: ['swift', 'swiftui'],
  php: ['html', 'css', 'javascript', 'sql', 'wordpress'],
  html: ['css', 'javascript', 'php'],
  css: ['html', 'javascript', 'figma'],
  javascript: ['html', 'css', 'php', 'firebase'],
  wordpress: ['php', 'html', 'css'],
  sql: ['php', 'java', 'firebase'],
  firebase: ['javascript', 'swift', 'sql'],
  java: ['sql', 'git'],
  uiux: ['figma', 'sketch', 'miro', 'swiftui'],
  figma: ['uiux', 'sketch', 'miro', 'css'],
  sketch: ['figma', 'uiux'],
  miro: ['figma', 'uiux', 'agile'],
  git: ['xcode', 'java', 'agile'],
  agile: ['git', 'miro'],
  office: []
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
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('.project-card, .skill-row, .accordion-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
