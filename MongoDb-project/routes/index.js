var express = require('express');
var router = express.Router();
const userModel = require('./users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/create', async function(req,res){
  const user = await userModel.create({
    userName:"Shivam",
    nickName:"Shiv",
    description:"I love travel",
    categories: ['UK','HP']
  })
  res.send(user);
});

//How to perform a case-insensitive search in Mongoose?
router.get('/find', async function(req,res){

  try{
  const regex = new RegExp("^shiVam$",'i');
  const user  = await userModel.find({
    userName:regex
  });

  if(user.length === 0){
    //(users.length === 0) is a condition that checks whether the users array returned 
    //by the userModel.find() method is empty.
    res.send("User Not Found !");
  }
  else{
    res.send(user);
  }
}
  catch (error) {
    // Handle any potential errors (e.g., database connection issues)
    res.status(500).send("Error fetching user: " + error.message);
  }
});


//How to find documents where an array field contains all of a set of values?
router.get('/findUser',async function(req,res){
  const prop = await userModel.find({categories: {$all:'TVS'}});
  res.send(prop);
})

//How to search for documents with a specific date range in Mongoose?
router.get('/findDate', async function(req,res){
  const date1 = new Date('2023-12-29');
  const date2 = new Date('2023-12-30');
  const dateData = await userModel.find({dateCreated: {$gte:date1,$lte:date2}});
  res.send(dateData);
});

//How can I filter documents based on the existence of a field in Mongoose?
router.get('/findField',async function(req,res){
 const field = await userModel.find({ nickName:{ $exists: true}});
 res.send(field);
});

//How to filter documents based on a specific field's length in Mongoose? 
router.get('/findInRange', async function(req,res){
  const filterData = await userModel.find({
    $expr:{
      $and:[
        {$gte:[{$strLenCP:'$userName'},1]},
        {$lte:[{$strLenCP:'$userName'},10]}
      ]
    }
  });
  res.send(filterData);
})

module.exports = router;
