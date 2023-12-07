import sha1 from 'sha1';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';
// const { ObjectId } = require('mongodb');

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const user = await (await dbClient.usersConnection()).findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'Already exist' });
    }

    const hashedPassword = sha1(password);

    const newUser = {
      email,
      password: hashedPassword,
    };

    const result = await (await dbClient.usersConnection()).insertOne(newUser);
    const { insertedId } = result;
    const createdUser = {
      id: insertedId,
      email: newUser.email,
    };

    return res.status(201).json(createdUser);
  }

  static async getMe(request, response) {
    const token = request.header('X-Token') || null;
    if (!token) return response.status(401).send({ error: 'Unauthorized' });

    const redisToken = await redisClient.get(`auth_${token}`);
    if (!redisToken) return response.status(401).send({ error: 'Unauthorized' });

    // eslint-disable-next-line no-undef
    const user = await dbClient.db.collection('users').findOne({ _id: ObjectId(redisToken) });
    if (!user) return response.status(401).send({ error: 'Unauthorized' });
    delete user.password;

    return response.status(200).send({ id: user._id, email: user.email });
  }
}

export default UsersController;
