import express from 'express';
import controller from './user.controller';

export const userRouter = express.Router({});

userRouter.param('id', controller.findByParam);
userRouter.param('id', controller.getFriends);
userRouter.param('token', controller.getUserByToken);

userRouter.route('/')
    .post(controller.createOne)
    .get(controller.getAll);

userRouter.route('/token/:token')
    .get(controller.getUserByToken);

userRouter.route('/:id')
    .put(controller.updateOne)
    .delete(controller.deleteOne)
    .get(controller.getOne);

userRouter.route('/friends/:id')
    .get(controller.getFriends);