import express from 'express';
import controller from './friend.controller';

export const friendRouter = express.Router({});

//friendRouter.param('id', controller.findByParam);
friendRouter.param('user_id', controller.getByUser);
/*friendRouter.param('user_id2', controller.getByUser);*/

friendRouter.route('/')
    .post(controller.createOne);//+

friendRouter.route('/')
    .get(controller.getAll); //+

friendRouter.route('/')
    .delete(controller.deleteOne);

/*user_id1/:user_id1*/
friendRouter.route('/:user_id')
    .get(controller.getByUser);