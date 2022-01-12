const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const recipeSchema=new Schema({
        postedBy:{type: Schema.Types.ObjectId, ref: 'User'},
        recipeName:{type:String,minlength:3,maxlength:70,trim:true,rrequired:true},
        preparationDescription:{type:String,minlength:3,maxlength:70,required:true},
        photoUrl:{type:String,required:true},
        ingredients:{type:String,minlength:3,maxlength:70,required:true},
    },{timestamps:true}
);
const Recipe= mongoose.model('Recipe',recipeSchema)

module.exports = Recipe;