import { paginate } from "../lib/paginator.js";
import {Scepters} from "../models/index.js";


export const getScepters = async (req, res) => {
    try {        
        const query = {}
        let per_page = 25;
        let page = 1;
        let sort = {}
        if (req.query.min_rc || req.query.max_rc) {
            query.researchCapacity = { $gte: parseInt(req.query.min_rc) || 0 }
            if (req.query.max_rc) {
                query.researchCapacity = { ...query.researchCapacity , $lte: parseInt(req.query.max_rc) || 999999999 }
            }
        }
        if (req.query.max_price || req.query.min_price) {
            query.price = { $gte: parseInt(req.query.min_price) || 0 }
            if (req.query.max_price) {
                query.price = { ...query.price , $lte: parseInt(req.query.max_price) || 999999999 }
            }
        } 
        if (req.query.sort) {
            switch (req.query.sort) {
                case 'price':
                    sort = {price: 1}
                    break;
                case 'time':
                    sort = {time: 1}
                    break;
                case 'RC':
                    sort = {rc: 1}
            }
        }
        if (req.query.per_page) {
            per_page = parseInt(req.query.per_page)
        }
        if (req.query.page) {
            page = parseInt(req.query.page)
        }

        if (req.query.property !== 'all' && req.query.property !== undefined) {
            query.seller = req.query.property
        }

        console.log(query);

        const scepters = await Scepters.find(query).sort(sort).exec();
        const paginated = paginate(per_page, page, scepters);
    
        res.send(paginated);
    } catch (error) {
        console.log({error});
        res.status(500).send("error getting the scepters");
    }
  };
  



