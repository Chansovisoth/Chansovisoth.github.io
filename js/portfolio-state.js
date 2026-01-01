// Portfolio Switcher & State Management
const switcherTabs = document.querySelectorAll('.switcher-tab');
const businessPortfolio = document.getElementById('business-portfolio');
const artPortfolio = document.getElementById('art-portfolio');
const profileImage = document.getElementById('profile-image');
const heroName = document.getElementById('hero-name');
const heroSubtitle = document.getElementById('hero-subtitle');
const heroLinks = document.getElementById('hero-links');

// Profile data for each portfolio
const profileData = {
    business: {
        name: 'Chansovisoth Wattanak',
        image: 'https://avatars.githubusercontent.com/u/134577854?v=4',
        subtitle: 'Computer Science Major at Paragon International University',
        links: `
            <a href="https://github.com/Chansovisoth" target="_blank" rel="noopener noreferrer" class="hero-link">
                <i class="fab fa-github"></i>
                GitHub
            </a>
            <a href="mailto:cwattanak@paragoniu.edu.kh" class="hero-link">
                <i class="fas fa-envelope"></i>
                Email
            </a>
        `
    },
    art: {
        name: 'Klaude',
        image: 'assets/profile-iklaude.png',
        subtitle: 'Totally not a furry',
        links: `
            <a href="https://www.reddit.com/user/Klaude_Here/submitted/" class="hero-link">
                <i class="fab fa-reddit-alien"></i>
                Reddit
            </a>
            <a href="https://www.instagram.com/iklaude/" class="hero-link">
                <i class="fab fa-instagram"></i>
                Instagram
            </a>
            <a href="https://discordapp.com/users/1037786229225308180" class="hero-link">
                <i class="fab fa-discord"></i>
                Discord
            </a>
        `
    }
};

if (switcherTabs.length > 0) {
    // Function to switch portfolio
    function switchPortfolio(portfolio) {
        // Update active tab
        switcherTabs.forEach(t => {
            t.classList.remove('active');
            if (t.dataset.portfolio === portfolio) {
                t.classList.add('active');
            }
        });

        // Switch portfolio content
        if (portfolio === 'art') {
            document.body.classList.add('art-mode');
            if (businessPortfolio) businessPortfolio.classList.remove('active');
            if (artPortfolio) artPortfolio.classList.add('active');
            // Update profile
            if (heroName) heroName.textContent = profileData.art.name;
            if (profileImage) {
                profileImage.src = profileData.art.image;
                profileImage.alt = profileData.art.name;
            }
            if (heroSubtitle) heroSubtitle.textContent = profileData.art.subtitle;
            if (heroLinks) heroLinks.innerHTML = profileData.art.links;
            // Update URL hash
            history.replaceState(null, null, '#art');
        } else {
            document.body.classList.remove('art-mode');
            if (artPortfolio) artPortfolio.classList.remove('active');
            if (businessPortfolio) businessPortfolio.classList.add('active');
            // Update profile
            if (heroName) heroName.textContent = profileData.business.name;
            if (profileImage) {
                profileImage.src = profileData.business.image;
                profileImage.alt = profileData.business.name;
            }
            if (heroSubtitle) heroSubtitle.textContent = profileData.business.subtitle;
            if (heroLinks) heroLinks.innerHTML = profileData.business.links;
            // Update URL hash
            history.replaceState(null, null, '#business');
        }
    }

    // Check URL hash on load
    const hash = window.location.hash;
    if (hash === '#art') {
        switchPortfolio('art');
    } else if (hash === '#business') {
        switchPortfolio('business');
    }

    // Handle tab clicks
    switcherTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchPortfolio(tab.dataset.portfolio);
        });
    });

    // Handle browser back/forward
    window.addEventListener('hashchange', () => {
        const newHash = window.location.hash;
        if (newHash === '#art') {
            switchPortfolio('art');
        } else if (newHash === '#business') {
            switchPortfolio('business');
        }
    });
}
