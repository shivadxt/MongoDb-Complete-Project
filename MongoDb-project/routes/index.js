var express = require('express');
var router = express.Router();
const userModel = require('./users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/create', async function(req,res){
  const user = await userModel.create({
    userName:"Shivam Tiwari",
    nickName:"Tiwendra",
    description:"I love Food",
    categories: ['Momos','Liti chokha','Pepsi']
  })
  res.send(user);
});

module.exports = router;
