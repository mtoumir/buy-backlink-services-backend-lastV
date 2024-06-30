import { Request, Response } from 'express';
import Backlink from '../models/backlink';

const searchBacklink = async (req: Request, res: Response) => {
    try {
        const url = req.params.url;
        const searchQuery = (req.query.searchQuery as string) || '';
        const selectedCategories = (req.query.selectedCategories as string) || '';
        const sortOption = (req.query.sortOption as string) || 'traffic';
        const page = parseInt(req.query.page as string) || 1;

        let query : any = {};

        query['url'] = new RegExp(url, 'i');
        const urlCheck = await Backlink.countDocuments(query);
        if (urlCheck === 0) {
            return res.status(404).json({
                data: [],
                pagination: {
                    total: 0,
                    page: 1,
                    pages: 1,
                }
            });
        }

        if (selectedCategories) {
            const categoriesArray = selectedCategories.split(',').map((category) => new RegExp(category, 'i'));
            query['categories'] = { $all: categoriesArray };
        }

        if (req.query.selectedLanguage) {
            const selectedLanguages = (req.query.selectedLanguage as string).split(',');
            query['language'] = { $in: selectedLanguages };
        }


        if (searchQuery) {
            const searchRegex = new RegExp(searchQuery, 'i');
            query['$or'] = [
                { url: searchRegex },
            ];     
        }

        const pageSize = 10;
        const skip = (page - 1) * pageSize;
        const sortDirection = (sortOption.includes('HighToLow') || sortOption.includes('NewestToOldest')) ? -1 : 1;
        const sortKey = sortOption.replace(/(HighToLow|LowToHigh|NewestToOldest|OldestToNewest)$/, '');

        const backlinks = await Backlink.find(query).sort({ [sortKey]: sortDirection }).skip(skip).limit(pageSize).lean();
        const total = await Backlink.countDocuments(query);

        const response = {
            data: backlinks,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / pageSize),
            }
        };

        res.json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export default {
    searchBacklink
};
