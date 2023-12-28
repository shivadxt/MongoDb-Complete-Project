const mongosse = require("mongoose");

mongosse.connect("mongodb://127.0.0.1:27017/MongoDBComplete");

const userSchema = mongosse.Schema({
    userName:String,
    nickName:String,
    description:String,
    categories: {
        type:Array,
        default:[]
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
}); 

module.exports  = mongosse.model("user",userSchema);

