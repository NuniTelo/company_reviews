var express = require('express');
var router = express.Router();
const Kompania = require('./models/kompania')

router.post('/newCompany' , async = (req,res) => {
    const body = req.body;
    let companyBody = {
      company_name:body.cmp_name,
      company_description:body.cmp_descp,
      company_url:body.cmp_url,
      company_icon: body.cmp_icon,
      company_review : []
    }
    new Kompania.CompanyModel(companyBody).save().then(doc => res.json({'saved':true})).catch(err => res.json({'saved':false}))
})

router.get('/allCompanies' , async = (req,res) => {
    Kompania.CompanyModel.find({}).select({"company_name" : 1, "company_url":1 , "company_icon":1,"company_description" :1 }).then(docs => res.json(docs)).catch(err => res.send(err));
})


router.get('/specificCompany/:id', async(req,res) => {
  Kompania.CompanyModel.find({_id:req.params.id}).then(doc => res.json(doc)).catch(err => res.json(err));
})

router.post('/newComment' , async = (req,res) => {
  let companyID = req.body.id
  let commentReq = req.body.comment;

  let comment = {
        date:new Date(),
        review_from:commentReq.rf,
        review_from_position:commentReq.rff,
        review_pro:commentReq.rp,
        review_against:commentReq.ra,
        review_rating:commentReq.rr,
        review_final_comment:commentReq.rfc
  }
  Kompania.CompanyModel.update({ _id: companyID}, { $push: { company_review: comment } }).then(doc => res.json(doc)).catch(err => res.json(err));
})

module.exports = router;
