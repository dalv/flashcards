import { connectToDb } from '@utils/database';
import Card from '@models/card';

export const DELETE = async (request) => {
    await connectToDb();
    const result = await Card.deleteMany({});
    return result;
}
