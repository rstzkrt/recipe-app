const router = require('express').Router();
let User = require('./user.model')
const {auth, catchAsync} = require('../../middlewares')
const {allowIfLoggedIn} = auth

//get
router.route('/').get(allowIfLoggedIn, (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Err:' + err));
});

router.route('/me').get(allowIfLoggedIn, catchAsync(async (req, res) => {
        res.json(req.user)
    })
);


//get
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Err:' + err));
});

//add
router.route('/').post(async (req, res) => {


    const displayName = req.body.displayName;
    const avatar = req.body.avatar;
    const email = req.body.email;
    const phone = req.body.phone;
    const uid = req.body.uid;

    const newUser = await new User(
        {
            displayName: displayName,
            avatar: avatar,
            email: email,
            phone: phone,
            uid: uid
        })

    newUser.save()
        .then(() => res.status(201).json('created'))
        .catch(err => res.status(400).json(err));
});

//update
router.route('/:id').put(async (req, res) => {
    const User = await User.findById(req.params.id)

    if (!User) {
        res.status(404)
    }

    User.diplayName = req.body.displayName;
    User.email = req.body.email;
    User.avatar = req.body.avatar;
    User.phone = req.body.phone;

    User.save().then(() => res.status(201).json('updated'))
        .catch(err => res.status(400).json(err));
});


//delete
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(res.status(200).write('deleted'))
        .catch(err => res.status(400).json('Err:' + err));
});


//add to favourites


module.exports = router