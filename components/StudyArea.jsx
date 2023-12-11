'use client';

import { useState, useEffect } from 'react';

const StudyArea = () => {

  const [currentCard, setCurrentCard] = useState({});
  const [showingFront, setShowingFront] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRandomCard = async () =>{
    const response = await fetch('/api/cards/random');
    const data = await response.json();
    return data;
  }

  const fetchStats = async () => {
    const response = await fetch('/api/cards');
    const data = await response.json();
    const stats = data.map(item => `${item.score} - ${item.front}, ${item.back}`).join('\n');
    return stats;
  }

  const initialLoad = async () => {
    setIsLoading(true);
    var newCard = await fetchRandomCard();
    setCurrentCard(newCard);
    setIsLoading(false);
  }

  useEffect(() => {
    initialLoad();
  },[]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      
      switch (event.key) {
        case ' ':
          flipCard();
          break;
        case 'ArrowLeft':
          if(!showingFront) pressButton("btn-didnt-get-it");
          break;
        case 'ArrowDown':
          if(!showingFront) pressButton("btn-hard");
          break;
        case 'ArrowRight':
          if(!showingFront) pressButton("btn-easy");
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [showingFront]);

  const pressButton = async (buttonId) => {
    // Show button pressed animation
    const button = document.getElementById(buttonId);
    const animationTime = 300;
    if (button) {
      button.classList.add('button-clicked');
      setTimeout(() => {
        button.classList.remove('button-clicked');
      }, animationTime);
    }

    // Figure out new score based on which button was clicked
    const newScore = getScoreByButtonId(buttonId);

    // Update card score
    const start = Date.now();
    await updateCardScore(newScore);
    const end = Date.now();
    const updateDuration = end - start;
    
    var waitTime = animationTime;
    if(updateDuration > animationTime) waitTime = 0;
    else waitTime = animationTime - updateDuration;

    // Fetch next card and fetch stats about cards with the new updated score of the previous one
    const fetchCardPromise = fetchRandomCard();
    const fetchStatsPromise = fetchStats();
    const timeoutPromise = new Promise(resolve => setTimeout(resolve, waitTime));
    const[newCard, stats, _] = await Promise.all([fetchCardPromise, fetchStatsPromise, timeoutPromise]);

    // Show data
    setCurrentCard(null);
    setShowingFront(true);
    setCurrentCard(newCard)
    console.log(stats);
  }

  const getScoreByButtonId = (buttonId) => {
    if (buttonId == 'btn-didnt-get-it') return 0;
    if (buttonId == 'btn-hard') return 0.5;
    if (buttonId == 'btn-easy') return 1;
    return 0;
  }

  const flipCard = () => {
    setShowingFront(prevShowingFront => {
      return !prevShowingFront;
    }); 
  }

  const updateCardScore = async (newScore) => {
    const response = await fetch(`/api/cards/${currentCard._id}`, {
      method: "PATCH",
      body: JSON.stringify({
        score: newScore
      }),
    });
  };

  if(isLoading)
  {
    return (<div className="text-4xl font-bold text-white">Loading...</div>);
  }

  return (
    <div>
      { currentCard ? (
            <div className='flex flex-col items-center justify-center'>
              <h1 className="text-4xl font-bold text-white mb-4 mt-4" onClick={flipCard}>{showingFront ? currentCard.front : currentCard.back}</h1>
              
              {showingFront ? (
                <div className="space-x-2 h-10"></div>
              ) : (
                <div className="space-x-2 h-10">
                  <button id="btn-didnt-get-it" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-32" onClick={(e)=>pressButton(e.target.id)}>
                    Didn't get it
                  </button>
                  <button id="btn-hard" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-32" onClick={(e)=>pressButton(e.target.id)}>
                    Hard
                  </button>
                  <button id="btn-easy" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-32" onClick={(e)=>pressButton(e.target.id)}>
                    Easy
                  </button>
                </div>
            )}
          </div>
        ) : 
        (<div></div>)
      }
    </div>
  )
}
  
export default StudyArea