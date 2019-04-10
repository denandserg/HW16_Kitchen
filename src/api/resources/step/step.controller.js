import Step from './step.model';
import merge from 'lodash.merge';

const getByRecipe = model => (req, res, next, recipeId) => {
    return model.findAll({
        where: {
            recipe_id: recipeId
        },
        order: [
            ['orderNumber', 'ASC'],
        ],
    })
        .then(entities => res.status(200).json(entities))
        .catch(error => res.status(500).json(error))
};

const createOne = model => (req, res, next) => {
    console.log('createOne', req.body);
    return model.create(req.body)
        .then(entity => res.status(201).json(entity))
        .catch(error => next(error));
};

const getOne = () => (req, res, next) => {
    return Promise.resolve(req.docFromId)
        .then(entity => res.status(200).json(entity))
        .catch(error => next(error));
};

const deleteOne = () => (req, res, next) => {
    return req.docFromId.destroy()
        .then(entity => res.status(201).json(entity))
        .catch(error => next(error));
};

const updateOne = () => (req, res, next) => {
    const update = req.body;
    merge(req.docFromId, update);
    return req.docFromId.save()
        .then(entity => res.status(201).json(entity))
        .catch(error => next(error));
};

export const findByParam = model => (req, res, next, id) => {
    return model.findById(id)
        .then(entity => {
            if (!entity) {
                next(new Error('Not Found Error'));
            } else {
                req.docFromId = entity;
                next();
            }
        })
        .catch(error => {
            next(error);
        });
};


export default {
    getByRecipe: getByRecipe(Step),
    createOne: createOne(Step),
    getOne: getOne(),
    findByParam: findByParam(Step),
    deleteOne: deleteOne(Step),
    updateOne: updateOne(Step),
}