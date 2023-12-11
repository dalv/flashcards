import { Schema, model, models } from 'mongoose';

const CardSchema = new Schema({
    front: {
        type: String
    },
    back: {
        type: String
    },
    score: {
        type: Number
    }
})

const Card = models.Card || model("Card", CardSchema);

export default Card;