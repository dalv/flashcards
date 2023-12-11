import { connectToDb } from '@utils/database';
import Card from '@models/card';
import { parse } from 'papaparse';

export const POST = async (request) => {
    const csvString = await request.text();

    try {
        await connectToDb();

        const parsedData = parse(csvString, {
            header: false,
            skipEmptyLines: true
        });

        const cardsData = parsedData.data.map(item => ({
            front: item[0],
            back: item[1]
        }));

        const newCards = await Card.insertMany(cardsData);

        return new Response(JSON.stringify(newCards), { status: 201 })
    } catch (error) {
        console.log(error);
        return new Response("Failed to create new cards", { status: 500 });
    }
}
