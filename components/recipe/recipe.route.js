const router = require('express').Router();
const {ApiErr} = require('../../helpers')
let Recipe = require('./recipe.model')
let User = require('../user/user.model')

router.route('/').get((req, res) => {
    Recipe.find()
        .then(async recipes => {
            let arr = []
            for (const recipe of recipes) {
                let user = await User.findById(recipe.postedBy).then()
                    .catch(err => res.status(400).json('(user)Err:' + err));
                arr.push({
                    id: recipe.id,
                    recipeName: recipe.recipeName,
                    preparationDescription: recipe.preparationDescription,
                    user: user,
                    photoUrl: recipe.photoUrl,
                    ingredients: recipe.ingredients,
                    time: recipe.timestamps
                })
            }
            res.json(arr)
        }).catch(err => res.status(400).json('Err:' + err));
})


router.route('/:id').get(async (req, res) => {
    Recipe.findById(req.params.id)
        .then(async recipe => {
            let user = await User.findById(recipe.postedBy).then()
                .catch(err => res.status(400).json('(user)Err:' + err));
            res.json({
                recipeName: recipe.recipeName,
                preparationDescription: recipe.preparationDescription,
                user: user,
                photoUrl: recipe.photoUrl,
                ingredients: recipe.ingredients,
                time: recipe.timestamps
            })
        })
        .catch(err => res.status(400).json('Err:' + err));
});

router.route('/').post(async (req, res) => {
    let {recipeName, photoUrl, preparationDescription, postedBy, ingredients} = req.body;
    const newRecipe = await new Recipe({recipeName, photoUrl, preparationDescription, postedBy, ingredients})

    newRecipe.save().then(async () => {
        let user = await User.findById(postedBy)
        user.recipes.push(newRecipe.id);
        await user.save();
        res.json('recipe created')
    })
        .catch(err => res.status(400).json('Err:' + err));
});

router.route('/:id').put(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id)

    if (!recipe) {
        res.status(404)

    }
    recipe.recipeName = req.body.recipeName;
    recipe.photoUrl = req.body.photoUrl;
    recipe.preparationDescription = req.body.preparationDescription;
    recipe.ingredients = req.body.ingredients;

    await recipe.save().then(() => res.status(201).json('updated'))
        .catch(err => res.status(400).json(err));
});

router.route('/:id').delete(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id)
    if (!recipe) {
        return res.status(400).json('(recipe)Err:')
    }

    const user = await User.findById(recipe.postedBy)
    if (!user) {
        return res.status(400).json('(user)Err:')
    }
    user.recipes = user.recipes.filter((value) => value !== req.params.id);

    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id)
    if (!deletedRecipe) {
        return res.status(400).json('ree')
    }
    res.send('deleted')
});

module.exports = router