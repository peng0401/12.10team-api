var express = require('express');
var router = express.Router();

var {query} = require("../config/connection.js")
/* GET home page. */
router.get('/api/get/list', function(req, res, next) {
  let {page,page_size,type} = req.query;

  let start = (page - 1) * page_size;
  let sql = `select * from week where type=${type} limit ${start},${page_size}`
  let sqls = `select count(*) from week where type=${type}`

  query(sqls).then((data) => {
    var total = Math.ceil(data[0]['count(0)'])
    selectList(total)
  }).catch((err) => {
    res.json({code : 0,msg : err})
  })

  function selectList(total) {
    query(sql).then((data) => {
      res.json({code : 1,data : data,total : total})
    }).catch((err) => {
      res.json({code : 0, msg : err})
    })
  }
  
});

module.exports = router;
