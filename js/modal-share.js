// Share Modal
const shareBtn = document.getElementById('share-btn');
const shareModal = document.getElementById('share-modal');
const modalClose = document.getElementById('modal-close');
const copyLinkInput = document.getElementById('copy-link-input');
const copyBtn = document.getElementById('copy-btn');
const pageUrl = window.location.href;
const pageTitle = document.title;
const shareText = `Check out ${pageTitle}`;

// Set up share links
copyLinkInput.value = pageUrl;

document.getElementById('share-twitter').href =
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`;
document.getElementById('share-bluesky').href =
    `https://bsky.app/intent/compose?text=${encodeURIComponent(shareText + ' ' + pageUrl)}`;
document.getElementById('share-reddit').href =
    `https://reddit.com/submit?url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent(shareText)}`;
document.getElementById('share-facebook').href =
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
document.getElementById('share-instagram').addEventListener('click', (e) => {
    e.preventDefault();
    // Instagram doesn't support direct URL sharing, copy link instead
    navigator.clipboard.writeText(pageUrl);
    alert('Link copied! You can paste it in Instagram.');
});
document.getElementById('share-tiktok').addEventListener('click', (e) => {
    e.preventDefault();
    // TikTok doesn't support direct URL sharing, copy pre-composed text
    const tiktokText = `${shareText} ${pageUrl}`;
    navigator.clipboard.writeText(tiktokText);
    alert('Text copied! You can paste it in TikTok.');
});

shareBtn.addEventListener('click', () => {
    shareModal.classList.add('active');
});

modalClose.addEventListener('click', () => {
    shareModal.classList.remove('active');
});

shareModal.addEventListener('click', (e) => {
    if (e.target === shareModal) {
        shareModal.classList.remove('active');
    }
});

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(pageUrl).then(() => {
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.classList.add('copied');
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
            copyBtn.classList.remove('copied');
        }, 2000);
    });
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && shareModal.classList.contains('active')) {
        shareModal.classList.remove('active');
    }
});
