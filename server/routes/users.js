import express from 'express';
import commonValidations from '../shared/validations/signup';
import bcrypt from 'bcrypt';
import Promise from 'bluebird';
import isEmpty from 'lodash/isEmpty';

import User from '../models/user';

let router = express.Router();

function validateInput(data, otherValidations) {
    let { errors } = otherValidations(data);

    return User.query( { where: { username: data.username },
                        orWhere: { email: data.email }})
        .fetch().then(user => {
            if(user.get('username') === data.username ) errors.username = 'There is user with such username';
            if(user.get('email') === data.email) errors.email = 'There is user with such email';

            return { errors, isValid: isEmpty(errors)};
    });
}

router.post('/', (req, res) => {
    validateInput(req.body, commonValidations).then(({ errors, isValid}) => {
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
});

export default router;