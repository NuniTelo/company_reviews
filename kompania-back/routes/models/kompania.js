const mongoose = require('mongoose')

const CompanySchema = new mongoose.Schema({
    company_name:String,
    company_description:String,
    company_url:String,
    company_icon: String,
    company_review:[{
        date:Date,
        review_from:String,
        review_from_position:String,
        review_pro:String,
        review_against:String,
        review_rating:String,
        review_final_comment:String
    }]
});

const CompanyModel = mongoose.model('companies',CompanySchema);

module.exports =  {
    CompanyModel:CompanyModel
}