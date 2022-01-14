import { ethers } from "ethers";
import INFO_JSON from "../contracts/OraklerInfo.json";
import { INFO, MARKET_COVENS, MARKET_WIZARDS, MARKET_SCEPTERS } from "../contracts/config.js";
import {Wizards, Covens, Scepters} from "../models/index.js";

export const storeData = async (req, res) => {
    try {        
        const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/');
        
        const contractInfo = new ethers.Contract(INFO, INFO_JSON.abi, provider);
        const instanceInfo = await contractInfo.deployed();

        const wizards = await instanceInfo.getAllWizardsOfMarket(MARKET_WIZARDS); 
        const scepters = await instanceInfo.getAllSceptersOfMarket(MARKET_SCEPTERS);
        const covens = await instanceInfo.getAllCovensOfMarket(MARKET_COVENS);

        await Wizards.find().deleteMany().exec();
        await Scepters.find().deleteMany().exec();
        await Covens.find().deleteMany().exec();


        const insertingWizards = insertOnBatches(wizards.map((value)=> {
            return {
                id: value.id,
                creationTime: parseInt(value.creationTime),
                scepters: parseInt(value.scepters),
                durability: parseInt(value.durability),
                seller: value.seller,
                time: parseInt(value.time),
                startingPrice: parseInt(Math.floor(value.startingPrice/ 10**14)) / 10**4,
                endingPrice: parseInt(Math.floor(value.endingPrice/ 10**14)) / 10**4,
                duration: parseInt(value.duration),
                price: parseInt(Math.floor(value.price/ 10**14)) / 10**4,
            }
        }), Wizards, 100)
        
        const insertingScepters = insertOnBatches(scepters.map((value)=> {
            return {
                id: value.id,
                creationTime: parseInt(value.creationTime),
                durability: parseInt(value.durability),
                seller: value.seller,
                time: parseInt(value.time),
                researchCapacity: parseInt(value.researchCapacity),
                startingPrice: parseInt(Math.floor(value.startingPrice/ 10**14)) / 10**4,
                endingPrice: parseInt(Math.floor(value.endingPrice/ 10**14)) / 10**4,
                duration: parseInt(value.duration),
                price: parseInt(Math.floor(value.price/ 10**14)) / 10**4,
            }
        }), Scepters, 100)
        const inserting = insertOnBatches(covens.map((value)=> {
            console.log(Object(value).keys());
            return {
                id: value.id,
                creationTime: parseInt(value.creationTime),
                totalResearchCapacity: parseInt(value.totalResearchCapacity),
                maxScepters: parseInt(value.maxScepters),
                latestPotionTime: parseInt(value.latestPotionTime),
                wizards: value.wizards.map((value)=> {
                    return {
                        id: parseInt(value.id),
                        creationTime: parseInt(value.creationTime),
                        scepters: parseInt(value.scepters),
                        durability: parseInt(value.durability),
                    }
                }),
                scepters: value.scepters.map((value)=> {
                    return {
                        id: parseInt(value.id),
                        creationTime: parseInt(value.creationTime),
                        durability: parseInt(value.durability),
                        researchCapacity: parseInt(value.researchCapacity),
                    }
                }),
                seller: value.seller,
                time: parseInt(value.time),
                startingPrice: parseInt(Math.floor(value.startingPrice/ 10**14)) / 10**4,
                endingPrice: parseInt(Math.floor(value.endingPrice/ 10**14)) / 10**4,
                duration: parseInt(value.duration),
                price: parseInt(Math.floor(value.price/ 10**14)) / 10**4,
            }
        }), Covens, 1000)

        await Promise.all([insertingWizards, insertingScepters, inserting]).then(() => {
            console.log("Inserted all done");
        }).catch((e) => {
            console.log(e);
        })
    } catch (error) {
        console.log({error});
    }
};

const insertOnBatches = async (arr, model, batchSize) => {
    const promises = [];
    for (let i = 0; i < arr.length; i += batchSize) {
        promises.push(model.insertMany(arr.slice(i, i + batchSize)));
    }
    return Promise.all(promises);
}