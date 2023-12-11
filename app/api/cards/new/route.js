import { connectToDb } from '@utils/database';
import Card from '@models/card';

export const POST = async (request) => {
    const { front, back } = await request.json();

    try {
        await connectToDb();
        
        const newCard = new Card({ front: front, back: back });
        await newCard.save();

        return new Response(JSON.stringify(newCard), { status: 201 })
    } catch (error) {
        console.log(error);
        return new Response("Failed to create a new card", { status: 500 });
    }
}
