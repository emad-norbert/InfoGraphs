const cards = [...document.querySelectorAll('.gallery-card')];
const filters = [...document.querySelectorAll('.filter')];
const searchInput = document.getElementById('searchInput');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const closeLightbox = document.getElementById('closeLightbox');
document.getElementById('year').textContent = new Date().getFullYear();
let currentFilter = 'all';
function applyFilters() {
  const term = searchInput.value.trim().toLowerCase();
  cards.forEach(card => {
    const matchesFilter = currentFilter === 'all' || card.dataset.category === currentFilter;
    const matchesSearch = card.dataset.title.toLowerCase().includes(term);
    card.style.display = matchesFilter && matchesSearch ? '' : 'none';
  });
}
filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    currentFilter = button.dataset.filter;
    applyFilters();
  });
});
searchInput.addEventListener('input', applyFilters);
cards.forEach(card => {
  card.addEventListener('click', () => {
    const img = card.querySelector('img');
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxTitle.textContent = card.dataset.title;
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});
function hideLightbox() {
  lightbox.classList.remove('show');
  lightbox.setAttribute('aria-hidden', 'true');
}
closeLightbox.addEventListener('click', hideLightbox);
lightbox.addEventListener('click', event => { if (event.target === lightbox) hideLightbox(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') hideLightbox(); });
