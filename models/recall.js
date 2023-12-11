import {Schema} from 'mongoose';

const RecallSchema = new Schema({
    date: {
        type: Date
    },
    result: {
        type: Number
    }
}, { _id: false });

export default RecallSchema;