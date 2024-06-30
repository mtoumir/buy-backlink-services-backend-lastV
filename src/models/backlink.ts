import mongoose from 'mongoose';

const backlinkSchema = new mongoose.Schema({
    url : { type: String, required: true },
    price : { type: Number, required: true },
    traffic : { type: Number, required: true },
    domainRanking : { type: Number, required: true },
    domainAuthority : { type: Number, required: true },
    language : { type: String, required: true },
    categories : [{ type: String, required: true }],
    description : { type: String, required: true },
    lastUpdated : { type: Date, required: true },
});

const Backlink = mongoose.model('Backlink', backlinkSchema);
export default Backlink;