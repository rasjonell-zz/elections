import joi from 'joi';

import Serializer from '../serializers';
import * as UserController from '../controllers/user';

export default function user(Router: Foxx.Router): Foxx.Router {
  Router.get('/', (req: Foxx.Request, res: Foxx.Response): void => {
    const {
      limit = 10,
      offset = 0,
      region,
      address,
      birthDay,
      lastName,
      birthYear,
      firstName,
      community,
      birthMonth,
    } = req.queryParams;

    const users = UserController.findUsers(
      { limit, offset },
      {
        region,
        address,
        birthDay,
        lastName,
        birthYear,
        firstName,
        community,
        birthMonth,
      },
    );

    res.send(
      Serializer.serialize('users', users, null, {
        limit,
        region,
        address,
        birthDay,
        lastName,
        birthYear,
        firstName,
        community,
        birthMonth,
        count: users.length,
        offset: Number(limit) + Number(offset),
      }),
    );
  }).queryParam(
    'firstName',
    joi
      .string()
      .allow('')
      .optional(),
    'First Name',
  );

  return Router;
}
