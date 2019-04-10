import express from 'express';
import controller from './step.controller';

export const stepRouter = express.Router({});

stepRouter.param('id', controller.findByParam);
stepRouter.param('recipeId', controller.getByRecipe);

stepRouter.route('/')
    .post(controller.createOne);//+


stepRouter.route('/:id')
    .put(controller.updateOne)//+
    .delete(controller.deleteOne)//+
    .get(controller.getOne); //+


stepRouter.route('/recipeid/:recipeId')
    .get(controller.getByRecipe); //+