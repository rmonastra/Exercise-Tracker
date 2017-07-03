app.get("/api/exercise/log/", (req,res) =>{

let user = req.query.userIdGet

  userDB.findById(req.query.userIdGet, (err, doc) =>{
    if(doc) {
       res.json({
          _id: doc._id,
          user_name: doc.user_name,
          exerc_desc: doc.exerc_desc,
          exerc_dura: doc.exerc_dura,
          exerc_date: doc.exerc_date
        })
    }
  })
})
