import {connectToDb} from '@utils/database';
import Card from '@models/card';
import { updateCachedCard } from '@utils/sharedCache'; 

const updateCardInDb = async(id, front, back, score) => {
    try {
        await connectToDb();

        const existingCard = await Card.findById(id);

        if (existingCard) {
            let isValidFront = typeof front === 'string';
            let isValidBack = typeof back === 'string';

            if(isValidFront) existingCard.front = front;
            if(isValidBack) existingCard.back = back;

            let isValidScore = typeof score === 'number' && !isNaN(score);

            if(isValidScore) { 
                var currentScore = existingCard.score ?? 0;
                var newScore = (currentScore + score) / 2
                existingCard.score = newScore;
            }

            await existingCard.save();
        }
    } catch (err) {
        console.error('Error in background DB operation:', err);
    }
}

export const PATCH = async (request, { params }) => {
    const { front, back, score } = await request.json();

    try {

        await updateCachedCard(params.id, front, back, score);
        updateCardInDb(params.id, front, back, score);

        return new Response("Successfully updated the card", { status: 200 });
    } catch (error) {
        console.log("error");
        console.log(error);
        return new Response("Error updating card", { status: 500 });
    }
};