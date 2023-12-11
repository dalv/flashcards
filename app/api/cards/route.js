import { connectToDb } from '@utils/database';
import Card from '@models/card';
import { getCachedCards, setCachedCards } from '@utils/sharedCache'; 

export async function fetchCards() {
    let cards = getCachedCards();
    if (cards) {
        console.log("Fetched cards from cache");
    }
    else {
        await connectToDb();
        cards = await Card.find({})
        setCachedCards(cards); 
        console.log("Fetched cards from db");
    }
    return cards;
}

export const GET = async(request) => {
    try {
        let cards = await fetchCards();
        return new Response(JSON.stringify(cards), { status: 200 });
    } 
    catch(error)
    {
        return new Response("Failed to fetch cards: " + error, { status: 500 });
    }
}