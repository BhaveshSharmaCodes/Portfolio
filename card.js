 const cards = document.querySelectorAll('.Projectcard');
const largerCard = document.getElementById('largerCard');

cards.forEach(card => {
  card.addEventListener('mouseover', () => {
    largerCard.innerText = card.innerText;
    largerCard.style.display = 'block'; // Make sure larger card is visible
    animateLargerCard(card);
  });
});
function fun(){
  largerCard.style.display = 'none'; 
  largerCard.style.transition = "all 0.3s ease";
}

function animateLargerCard(card) {
  const cardRect = card.getBoundingClientRect();
  const largerCardRect = largerCard.getBoundingClientRect();

  const startX = largerCardRect.left;
  const startY = largerCardRect.top;
  const endX = cardRect.left;
  const endY = cardRect.top;

  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = performance.now();

  function animate(currentTime) {
    const elapsedTime = currentTime - startTime;
    const duration = 300; // milliseconds
    const progress = Math.min(elapsedTime / duration, 1);

    largerCard.style.left = startX + distanceX * progress + 'px';
    largerCard.style.top = startY + distanceY * progress + 'px';

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}