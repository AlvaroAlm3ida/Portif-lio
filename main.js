// ==========================================================================
// PORTFOLIO LOGIC
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHeaderScroll();
  initMobileMenu();
  initTypingEffect();
  initSkillsProgress();
  initProjectsFilter();
  initTerminal();
  initContactForm();
  initScrollSpy();
});

// ==========================================================================
// THEME SWITCHER
// ==========================================================================
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Check for saved theme preference, otherwise check system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'light') {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    themeIcon.className = 'ph ph-sun';
  } else if (savedTheme === 'dark') {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    themeIcon.className = 'ph ph-moon';
  } else {
    // Default to system preference
    if (systemPrefersDark) {
      document.body.classList.add('dark-theme');
      themeIcon.className = 'ph ph-moon';
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      themeIcon.className = 'ph ph-sun';
    }
  }

  themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
  const themeIcon = document.getElementById('theme-icon');
  
  if (document.body.classList.contains('dark-theme')) {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    themeIcon.className = 'ph ph-sun';
    localStorage.setItem('theme', 'light');
  } else {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    themeIcon.className = 'ph ph-moon';
    localStorage.setItem('theme', 'dark');
  }
}

// ==========================================================================
// HEADER SCROLL EFFECT
// ==========================================================================
function initHeaderScroll() {
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ==========================================================================
// MOBILE MENU TOGGLE
// ==========================================================================
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const menuIcon = document.getElementById('menu-icon');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    if (navMenu.classList.contains('open')) {
      menuIcon.className = 'ph ph-x';
    } else {
      menuIcon.className = 'ph ph-list';
    }
  });

  // Close menu when links are clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuIcon.className = 'ph ph-list';
    });
  });
}

// ==========================================================================
// HERO TYPING EFFECT
// ==========================================================================
function initTypingEffect() {
  const words = ['Fullstack', 'Frontend', 'Backend', 'Responsivo', 'Criativo'];
  const typingText = document.getElementById('typing-text');
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 150;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typingText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      delay = 75; // Faster deleting
    } else {
      typingText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      delay = 150; // Normal typing speed
    }

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at full word
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 500; // Pause before next word
    }

    setTimeout(type, delay);
  }

  // Start typing
  setTimeout(type, delay);
}

// ==========================================================================
// SKILLS PROGRESS ANIMATION
// ==========================================================================
function initSkillsProgress() {
  const skillsGrid = document.getElementById('skills-grid');
  const progressBars = document.querySelectorAll('.skill-progress-bar');
  
  // Store target widths
  progressBars.forEach(bar => {
    bar.dataset.width = bar.style.width;
    bar.style.width = '0'; // Start at 0
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressBars.forEach(bar => {
          bar.style.width = bar.dataset.width;
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  if (skillsGrid) {
    observer.observe(skillsGrid);
  }

  // Handle skills category tab switching
  const tabs = document.querySelectorAll('.btn-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const selectedCategory = tab.dataset.tab;

      skillCards.forEach(card => {
        const cardCategory = card.dataset.category;
        
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// ==========================================================================
// PROJECTS FILTER
// ==========================================================================
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.btn-filter');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.dataset.filter;

      projectCards.forEach(card => {
        const cardType = card.dataset.type;

        if (filterValue === 'all' || cardType === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// ==========================================================================
// INTERACTIVE TERMINAL
// ==========================================================================
function initTerminal() {
  const terminalInput = document.getElementById('terminal-input');
  const terminalHistory = document.getElementById('terminal-history');
  const terminalBody = document.getElementById('terminal-body');

  if (!terminalInput) return;

  // Keep terminal focused on click anywhere in body
  terminalBody.addEventListener('click', () => {
    terminalInput.focus();
  });

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = terminalInput.value.trim();
      processCommand(command);
      terminalInput.value = '';
    }
  });

  function processCommand(rawCommand) {
    const command = rawCommand.toLowerCase();
    
    // Add command line to history
    createLine(`alvaro@portfolio:~$ ${rawCommand}`);

    if (command === '') {
      return;
    }

    switch (command) {
      case 'ajuda':
      case 'help':
        createLine(`Comandos disponíveis:
  <span class="highlight">sobre</span>     - Exibe uma breve biografia.
  <span class="highlight">skills</span>    - Lista as habilidades técnicas.
  <span class="highlight">projetos</span>  - Mostra os projetos recentes.
  <span class="highlight">contato</span>   - Informações para contato.
  <span class="highlight">tema</span>      - Altera o tema visual (Claro/Escuro).
  <span class="highlight">limpar</span>    - Limpa a tela do terminal.`, 'info');
        break;

      case 'sobre':
        createLine(`Sou um Desenvolvedor Fullstack com +4 anos de experiência criando sistemas Web.
Gosto de construir interfaces modernas, rápidas e limpas, além de APIs escaláveis com Node.js e bancos SQL/NoSQL.
Escrevo código buscando sempre boas práticas, DRY e simplicidade de manutenção.`);
        break;

      case 'skills':
        createLine(`Habilidades Técnicas:
  <span class="accent">Frontend:</span> React.js, Next.js, TypeScript, JavaScript (ES6+), CSS3, TailwindCSS, HTML5.
  <span class="accent">Backend:</span> Node.js, Express, NestJS, REST APIs.
  <span class="accent">Bancos de Dados:</span> PostgreSQL, MongoDB, Redis.
  <span class="accent">Devops & Ferramentas:</span> Docker, Git, CI/CD, AWS.`);
        break;

      case 'projetos':
        createLine(`Projetos Recentes:
  1. <span class="highlight">Nexus E-Commerce:</span> API moderna com microsserviços usando NestJS e PostgreSQL.
  2. <span class="highlight">Financely Dashboard:</span> Dashboard financeiro interativo em React e Tailwind.
  3. <span class="highlight">Kryptos:</span> Landing page animada para mercado de NFTs com design futurista.`);
        break;

      case 'contato':
        createLine(`Entre em contato através dos canais:
  - <span class="accent">E-mail:</span> contato@exemplo.com
  - <span class="accent">LinkedIn:</span> linkedin.com/in/exemplo
  - <span class="accent">GitHub:</span> github.com/exemplo
  - <span class="accent">Localização:</span> São Paulo, Brasil`);
        break;

      case 'tema':
        toggleTheme();
        createLine(`Tema alterado com sucesso!`, 'success');
        break;

      case 'limpar':
      case 'clear':
        terminalHistory.innerHTML = '';
        return;

      case 'sudo':
      case 'sudo su':
        createLine(`Acesso negado: Você não é o administrador de sistemas do Álvaro!`, 'error');
        break;

      default:
        createLine(`Comando não reconhecido: "${rawCommand}". Digite <span class="highlight">ajuda</span> para ver os comandos.`, 'error');
    }

    // Scroll to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function createLine(text, type = '') {
    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;
    line.innerHTML = text;
    terminalHistory.appendChild(line);
  }
}

// ==========================================================================
// CONTACT FORM
// ==========================================================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const submitBtn = form.querySelector('.form-submit');
    const submitBtnText = submitBtn.querySelector('span');
    const submitBtnIcon = submitBtn.querySelector('i');

    // Simulate sending state
    submitBtn.style.opacity = '0.7';
    submitBtn.style.pointerEvents = 'none';
    submitBtnText.textContent = 'Enviando...';
    submitBtnIcon.className = 'ph ph-circle-notch animate-spin';

    setTimeout(() => {
      // Simulate success
      feedback.textContent = `Obrigado pelo contato, ${name}! Sua mensagem foi enviada com sucesso.`;
      feedback.className = 'form-feedback success';
      
      // Reset form
      form.reset();

      // Restore button
      submitBtn.style.opacity = '1';
      submitBtn.style.pointerEvents = 'all';
      submitBtnText.textContent = 'Enviar Mensagem';
      submitBtnIcon.className = 'ph ph-paper-plane';

      // Hide feedback after 5s
      setTimeout(() => {
        feedback.style.display = 'none';
      }, 5000);
    }, 1500);
  });
}

// ==========================================================================
// SCROLL SPY & LINK HIGHLIGHT
// ==========================================================================
function initScrollSpy() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 150)) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
}
