const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

const visibleCards = 2;
const cards = track.querySelectorAll('.carousel-card');
const totalCards = cards.length;

// Fonction de calcul dynamique du scrollAmount
function getScrollAmount() {
  const card = track.querySelector('.carousel-card');
  return card.offsetWidth + parseInt(getComputedStyle(track).gap || 0);
}

// Scroll max
function getMaxScroll() {
  const cardWidth = getScrollAmount();
  return cardWidth * (totalCards - visibleCards);
}

nextBtn.addEventListener('click', () => {
  const scrollAmount = getScrollAmount() * visibleCards;
  const maxScroll = getMaxScroll();

  if (track.scrollLeft >= maxScroll) {
    track.scrollTo({ left: 0, behavior: 'smooth' });
  } else {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
});

prevBtn.addEventListener('click', () => {
  const scrollAmount = getScrollAmount() * visibleCards;
  const maxScroll = getMaxScroll();

  if (track.scrollLeft <= 0) {
    track.scrollTo({ left: maxScroll, behavior: 'smooth' });
  } else {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  }
});
