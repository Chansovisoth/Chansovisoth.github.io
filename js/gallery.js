/**
 * Gallery Functions
 * Requires gallery-data.js to be loaded first
 */

/**
 * Get all artwork (personal + commissions) sorted by date
 */
function getAllArtwork() {
    const all = [...galleryData.personal, ...galleryData.commissions];
    return all.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Get featured artwork only
 */
function getFeaturedArtwork() {
    const all = getAllArtwork();
    return all.filter(art => art.featured);
}

/**
 * Get artwork by category
 */
function getArtworkByCategory(category) {
    if (category === 'all') return getAllArtwork();
    if (category === 'personal') return galleryData.personal.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (category === 'commissions') return galleryData.commissions.sort((a, b) => new Date(b.date) - new Date(a.date));
    return [];
}

/**
 * Get artwork by tag
 */
function getArtworkByTag(tag) {
    const all = getAllArtwork();
    return all.filter(art => art.tags.includes(tag));
}

/**
 * Get single artwork by ID
 */
function getArtworkById(id) {
    const all = getAllArtwork();
    return all.find(art => art.id === id);
}

/**
 * Get all unique tags
 */
function getAllTags() {
    const all = getAllArtwork();
    const tags = new Set();
    all.forEach(art => art.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
}

/**
 * Render featured gallery on homepage
 */
function renderFeaturedGallery(containerId = 'featured-gallery-grid') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const featured = getFeaturedArtwork();
    
    if (featured.length === 0) {
        container.innerHTML = `
            <div class="art-card no-art-card">
                <div class="art-image">
                    <i class="fas fa-image"></i>
                    <span>No featured artwork yet!</span>
                </div>
            </div>
        `;
        return;
    }

    container.innerHTML = featured.map(art => `
        <div class="art-card" data-id="${art.id}">
            <div class="art-image">
                <i class="fas fa-image"></i>
                <span>No Image</span>
                <img src="${art.thumbnail || art.image}" alt="${art.title}" loading="lazy" onerror="this.style.display='none'">
            </div>
            <div class="art-info">
                <h3 class="art-title">${art.title}</h3>
                <span class="art-category"><i class="fas fa-heart"></i> ${art.tags[0] || 'Art'}</span>
            </div>
        </div>
    `).join('');

    // Add click handlers for lightbox/modal
    container.querySelectorAll('.art-card').forEach(item => {
        item.addEventListener('click', () => openArtModal(item.dataset.id));
    });
}

/**
 * Render full gallery page (for gallery.html)
 */
function renderGalleryPage(containerId, category) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const artwork = getArtworkByCategory(category);
    
    if (artwork.length === 0) {
        container.innerHTML = `
            <div class="gallery-item no-art-item">
                <div class="gallery-item-image">
                    <i class="fas fa-image"></i>
                    <span>No artwork yet!</span>
                </div>
            </div>
        `;
        return;
    }

    container.innerHTML = artwork.map((art, index) => `
        <div class="gallery-item${art.tall ? ' tall' : ''}" data-id="${art.id}">
            <div class="gallery-item-image">
                <i class="fas fa-image"></i>
                <span>No Image</span>
                <img src="${art.thumbnail || art.image}" alt="${art.title}" loading="lazy" onerror="this.style.display='none'">
            </div>
            <div class="gallery-item-info">
                <h3 class="gallery-item-title">${art.title}</h3>
                <div class="gallery-item-meta">
                    <span class="gallery-item-category"><i class="fas fa-heart"></i> ${art.tags[0] || 'Art'}</span>
                    <span class="gallery-item-date">${formatDateShort(art.date)}</span>
                </div>
            </div>
        </div>
    `).join('');

    // Add click handlers for lightbox/modal
    container.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => openArtModal(item.dataset.id));
    });

    // Add staggered animation
    addGalleryAnimations(container);
}

/**
 * Add staggered fade-in animations to gallery items
 */
function addGalleryAnimations(container) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    container.querySelectorAll('.gallery-item').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
        observer.observe(el);
    });
}

/**
 * Update category counts in tabs
 */
function updateCategoryCounts() {
    const personalCount = galleryData.personal.length;
    const commissionsCount = galleryData.commissions.length;
    
    const personalCountEl = document.querySelector('[data-category="personal"] .category-count');
    const commissionsCountEl = document.querySelector('[data-category="commissions"] .category-count');
    
    if (personalCountEl) personalCountEl.textContent = personalCount;
    if (commissionsCountEl) commissionsCountEl.textContent = commissionsCount;
}

/**
 * Format date for short display (e.g., "Dec 2025")
 */
function formatDateShort(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short'
    });
}

/**
 * Open art modal/lightbox
 */
function openArtModal(artId) {
    const art = getArtworkById(artId);
    if (!art) return;

    // Create modal if it doesn't exist
    let modal = document.getElementById('art-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'art-modal';
        modal.className = 'art-modal';
        modal.innerHTML = `
            <div class="art-modal-backdrop"></div>
            <div class="art-modal-content">
                <button class="art-modal-close">&times;</button>
                <div class="art-modal-image-container">
                    <div class="art-modal-placeholder">
                        <i class="fas fa-image"></i>
                        <span>No Image</span>
                    </div>
                    <img class="art-modal-image" src="" alt="">
                </div>
                <div class="art-modal-info">
                    <h3 class="art-modal-title"></h3>
                    <p class="art-modal-description"></p>
                    <div class="art-modal-meta">
                        <span class="art-modal-date"></span>
                        <div class="art-modal-tags"></div>
                    </div>
                    <a class="art-modal-link" href="" target="_blank" rel="noopener">View Original</a>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Close handlers
        modal.querySelector('.art-modal-backdrop').addEventListener('click', closeArtModal);
        modal.querySelector('.art-modal-close').addEventListener('click', closeArtModal);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeArtModal();
        });
    }

    // Get image elements
    const imgEl = modal.querySelector('.art-modal-image');
    const placeholderEl = modal.querySelector('.art-modal-placeholder');
    
    // Reset state - show placeholder, hide image until loaded
    placeholderEl.style.display = 'flex';
    imgEl.style.display = 'none';
    
    // Set up image load handlers
    imgEl.onload = function() {
        placeholderEl.style.display = 'none';
        imgEl.style.display = 'block';
    };
    imgEl.onerror = function() {
        placeholderEl.style.display = 'flex';
        imgEl.style.display = 'none';
    };

    // Populate modal
    imgEl.src = art.image;
    imgEl.alt = art.title;
    modal.querySelector('.art-modal-title').textContent = art.title;
    modal.querySelector('.art-modal-description').textContent = art.description || '';
    modal.querySelector('.art-modal-date').textContent = formatDate(art.date);
    modal.querySelector('.art-modal-tags').innerHTML = art.tags.map(tag => 
        `<span class="tag">${tag}</span>`
    ).join('');
    
    const linkEl = modal.querySelector('.art-modal-link');
    if (art.link) {
        linkEl.href = art.link;
        linkEl.style.display = 'inline-block';
    } else {
        linkEl.style.display = 'none';
    }

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close art modal
 */
function closeArtModal() {
    const modal = document.getElementById('art-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * Format date for display
 */
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Homepage: Render featured gallery
    if (document.getElementById('featured-gallery-grid')) {
        renderFeaturedGallery();
    }
    
    // Gallery page: Render both galleries and update counts
    if (document.getElementById('personal-gallery-grid')) {
        renderGalleryPage('personal-gallery-grid', 'personal');
    }
    if (document.getElementById('commissions-gallery-grid')) {
        renderGalleryPage('commissions-gallery-grid', 'commissions');
    }
    
    // Update category counts if tabs exist
    updateCategoryCounts();
});
