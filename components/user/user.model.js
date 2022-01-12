const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const userSchema=new Schema({
        uid:{type:String,required:true},
        favourites:{type:Map,of:String,default:{}},
        recipes:[{ type: String, ref: 'Recipe' }],
        displayName:{type:String,minlength:3,maxlength:25,trim:true,required:true},
        avatar:{type:String,trim:true,required:true},
        email:{type:String,trim:true,required:true}
    },{timestamps:true}
);
const User= mongoose.model('User',userSchema)

module.exports = User;