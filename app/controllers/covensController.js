import { paginate } from "../lib/paginator.js";
import {Covens} from "../models/index.js";


export const getCovens = async (req, res) => {
    try {        
        const query = {}
        let per_page = 25;
        let page = 1;
        let sort = {};
        if (req.query.min_rc || req.query.max_rc) {
            query.totalResearchCapacity = { $gte: parseInt(req.query.min_rc) || 0 }
            if (req.query.max_rc) {
                query.totalResearchCapacity = { ...query.totalResearchCapacity , $lte: parseInt(req.query.max_rc) || 999999999 }
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
                    sort = {totalResearchCapacity: 1}
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

        const covens = await Covens.find(query).sort(sort).exec();

        console.log(query);
        const paginated = paginate(per_page, page, covens);
    
        res.send(paginated);
    } catch (error) {
        console.log({error});
        res.status(500).send("error getting the covens");
    }
  };
  



