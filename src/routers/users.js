const express = require('express');
const router = express.Router();
const app = express();
const helper = require('../helpers/helper');
const validateSchema = require('../helpers/validator');

const users = [];

app.use(express.json());

router.get('/', (req, res) => {
    if (users.length > 0) {
        res.json(users);
    } else {
        res.send('No users found!');
    }
});

router.get('/:id', (req, res) => {
    const userId = req.params.id;
    helper.findUser(users, userId)
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.status(404).send(err);
        });
});

router.get('/autosuggest/:loginSubstring/:limit', (req, res) => {
    const loginSubstring = req.params.loginSubstring;
    const limit = req.params.limit;
    const loginNames = [];
    users.forEach(user => {
        if (user.login.indexOf(loginSubstring) !== -1) {
            loginNames.push(user.login);
        }
    });
    if (loginNames.length === 0) {
        res.send('No matching login IDs');
    }
    res.json(loginNames.slice(0, limit));
});

router.post('/', validateSchema(), (req, res) => {
    const user = req.body;
    const userId = helper.getNewId(users);
    user.id = userId;
    user.isDeleted = false;
    users.push(user);
    helper.sortOnLoginName(users);
    res.send('Added user sucessfully.');
});

router.put('/:id', validateSchema(), (req, res) => {
    const userId = req.params.id;
    helper.findUser(users, userId)
        .then(user => {
            const newUser = req.body;
            const index = users.findIndex(p => p.id === userId);
            users[index] = helper.update(user, newUser);
            res.send('Updated user successfully');
        })
        .catch(err => {
            res.status(404).send(err);
        });
});

router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    helper.findUser(users, userId)
        .then(() => {
            const index = users.findIndex(p => p.id === userId);
            users[index].isDeleted = true;
            res.send('Deleted User Successfully.');
        })
        .catch(err => {
            res.status(404).send(err);
        });
});

module.exports = router;
