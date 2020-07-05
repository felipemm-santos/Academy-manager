const cards = document.querySelectorAll('.card');

for (let cardIndex = 0; cardIndex < cards.length; cardIndex++) {
  const card = cards[cardIndex]

  card.addEventListener('click', () => {
    window.location.href = `/recipes/${cardIndex}`;    
  });  
}
