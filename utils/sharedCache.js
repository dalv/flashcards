let cachedCards = null;

export const getCachedCards = () => cachedCards;
export const setCachedCards = (newData) => { cachedCards = newData; };
export const updateCachedCard = (cardId, front, back, score) => {
    if(cachedCards)
    {
        const cardIndex = cachedCards.findIndex(card => card._id.toString() === cardId);
        if (cardIndex > -1) {

            let isValidFront = typeof front === 'string';
            let isValidBack = typeof back === 'string';
            let isValidScore = typeof score === 'number' && !isNaN(score);

            if(isValidFront) cachedCards[cardIndex].front = front;
            if(isValidBack) cachedCards[cardIndex].back = back;
            
            if(isValidScore) { 
                var currentScore = cachedCards[cardIndex].score ?? 0;
                var newScore = (currentScore + score) / 2
                cachedCards[cardIndex].score = newScore;
            }
        }
    }
  };