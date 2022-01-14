import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    id:                     String,
    creationTime:           String,
    durability:             Number,
    researchCapacity:       Number,
    seller:                 String,
    time:                   String,
    startingPrice:          Number,
    endingPrice:            Number,
    duration:               String,
    price:                  Number,
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});


const Scepters = mongoose.model( 'Scepters', Schema );

export default Scepters;