import express from 'express';
import validateInput from '../shared/validations/signup';
import bcrypt from 'bcrypt';

import User from '../models/user';

let router = express.Router();

router.post('/', (req, res) => {
    const { errors, isValid } = validateInput(req.body);

    if(isValid) {
        const { username, password, email, timezone } = req.body;
        let password_digest = bcrypt.hashSync(password, 10);

        User.forge({
            username, timezone, email, password_digest
        }, { hasTimestamps: true }).save()
            .then(user => res.send({ success: true, user: user }))
            .catch(err => res.status(500).send({ err: err }))
    } else {
        res.status(400).json(errors);
    }
});

export default router;