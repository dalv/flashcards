import { connectToDb } from '@utils/database';
import Card from '@models/card';
import { fetchCards } from '../route.js';

export const GET = async(req) => {
    try {
       
        var cards = await fetchCards();
        const randomCard = weightedRandomSelect(cards);

        return new Response(JSON.stringify(randomCard), { status: 200 });
    } 
    catch(error)
    {
        return new Response("Failed to fetch random card: " + error, { status: 500 });
    }
}

function weightedRandomSelect(items) {
    
    // Step 1: Normalize the scores
    const totalScore = items.reduce((sum, item) => sum + (1.00 - (item.score || 0)), 0);
    
    // If total score is 0, select a random item without weighting
    if (totalScore === 0 || totalScore === items.length) {
        const randomIndex = Math.floor(Math.random() * items.length);
        return items[randomIndex];
    }

    const normalizedItems = items.map(item => ({
        id: item.id,
        normalizedWeight: (1.00 - (item.score || 0)) / totalScore
    }));
   
    // Step 2: Create cumulative weights
    let cumulativeWeight = 0;
    const cumulativeWeights = normalizedItems.map(item => {
        cumulativeWeight += item.normalizedWeight;
        return {
            id: item.id,
            cumulativeWeight
        };
    });

    // Step 3: Random selection
    const randomNum = Math.random();
    const selectedItem = cumulativeWeights.find(item => item.cumulativeWeight >= randomNum);

    const selectedItemId = selectedItem ? selectedItem.id : null;
    return items.find(item => item.id == selectedItemId);
}