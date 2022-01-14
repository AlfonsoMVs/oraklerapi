import { paginate } from "../lib/paginator.js";
import {Wizards} from "../models/index.js";


export const getWizards = async (req, res) => {
    try {        
        const query = {}
        let per_page = 25;
        let page = 1;
        let sort = {};

        if (req.query.scepters ) {
            query.scepters = { $gte: parseInt(req.query.scepters) || 0 }
        }
        if (req.query.max_price || req.query.min_price) {
            query.price = { $gte: parseInt(req.query.min_price) || 0 }
            if (req.query.max_price) {
                query.price = { ...query.price , $lte: req.query.max_price }
            }
        } 
        if (req.query.sort) {
            switch (req.query.sort) {
                case 'price':
                    sort = {price: 1}
                    break;
                case 'scepters':
                    sort = {scepters: 1}
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

        const wizards = await Wizards.find(query).sort(sort).exec();
        const paginated = paginate(per_page, page, wizards);
    
        res.send(paginated);
    } catch (error) {
        console.log({error});
        res.status(500).send("error getting the wizards");
    }
  };
  



