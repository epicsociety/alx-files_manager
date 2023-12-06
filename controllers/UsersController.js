import sha1 from 'sha1';
import dbClient from '../utils/db';

const { ObjectId } = require('mongodb');


class UsersController {
    static async postNew (req, res) {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Missing email' });
        }

        if (!password) {
            return res.status(400).json({ error: 'Missing password' });
        }

        const user = await dbClient.db().collection('users').findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'Already exist' });
        }

        const hashedPassword = sha1(password);

        const newUser = {
            email,
            password: hashedPassword,
        };

        const result = await dbClient.db().collection('users').insertOne(newUser);
        const { insertedId } = result;
        const createdUser = {
            id: insertedId,
            email: newUser.email,
        };

        res.status(201).json(createdUser);
    }
}

export default UsersController;