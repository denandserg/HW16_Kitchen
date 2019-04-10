import express from 'express';
import { userRouter } from './resources/user';
import { recipeRouter } from './resources/recipe';
import { stepRouter } from './resources/step';
import { friendRouter } from './resources/friend';

export const restRouter = express.Router();

restRouter.use('/user', userRouter);
restRouter.use('/recipe', recipeRouter);
restRouter.use('/step', stepRouter);
restRouter.use('/friend', friendRouter);
