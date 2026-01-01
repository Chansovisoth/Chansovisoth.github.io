// Art Background Pattern Generator
const artBgPattern = document.getElementById('art-bg-pattern');

// Generate art background pattern tiles
function generateArtBgPattern() {
    if (!artBgPattern) return;
    
    const tileSize = 110;
    const cols = Math.ceil(window.innerWidth / tileSize) + 2;
    const rows = Math.ceil(window.innerHeight / tileSize) + 2;

    artBgPattern.innerHTML = '';

    // Paw SVG (inline)
    const pawSvg = `<img src="assets/paw-white.svg" alt="" />`;

    // Fox SVG (inline) - you can replace this with your actual fox SVG content
    const foxSvg = `<img src="assets/fox-white.svg" alt="" />`;
    const catSvg = `<img src="assets/cat-white.svg" alt="" />`;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const tile = document.createElement('div');
            tile.className = 'art-bg-tile';

            // Offset pattern: even rows start at col 0, odd rows shift by 1
            const offset = row % 2;
            const showIcon = (col % 2 === offset);

            if (showIcon) {
                const rowType = row % 3;
                if (rowType === 0) {
                    tile.innerHTML = pawSvg;
                } else if (rowType === 1) {
                    tile.innerHTML = foxSvg;
                } else {
                    tile.innerHTML = catSvg;
                }
            }

            artBgPattern.appendChild(tile);
        }
    }

    artBgPattern.style.gridTemplateColumns = `repeat(${cols}, ${tileSize}px)`;
}

// Generate on load and resize
generateArtBgPattern();
window.addEventListener('resize', generateArtBgPattern);

// Smooth scroll for navigation (only on pages with nav-links)
const navLinks = document.querySelectorAll('.nav-link');
if (navLinks.length > 0) {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }

            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        const sections = ['portfolios', 'contact'];
        const scrollPos = window.scrollY + 100;

        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const top = section.offsetTop;
                const height = section.offsetHeight;

                if (scrollPos >= top && scrollPos < top + height) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    });
}

// Dark Mode Toggle (only if not handled elsewhere)
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle && !themeToggle.dataset.initialized) {
    themeToggle.dataset.initialized = 'true';
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');

        if (themeIcon) {
            if (isLight) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'light');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'dark');
            }
        }
    });
}

// Add intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe timeline items and tech cards for animation
document.querySelectorAll('.timeline-item, .tech-card, .art-card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(el);
});