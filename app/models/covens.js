import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    id:                     String,
    creationTime:           String,
    totalResearchCapacity:  Number,
    maxScepters:            Number,
    latestPotionTime:       String,
    wizards:                [{
        type: Object
    }],
    scepters:               [{
        type: Object
    }],
    powerCrystals:          String,
    durability:             Number,
    seller:                 String,
    time:                   String,
    startingPrice:          Number,
    endingPrice:            Number,
    duration:               String,
    price:                  Number,
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
const Covens = mongoose.model('Covens', Schema);

export default Covens;