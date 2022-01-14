import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    id:                     String,
    creationTime:           String,
    scepters:               Number,
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


const Wizards = mongoose.model( 'Wizards', Schema );

export default Wizards;