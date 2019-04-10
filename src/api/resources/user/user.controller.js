import User from './user.model';
import merge from 'lodash.merge';
import Friend from "../friend/friend.model";

const getAll = model => (req, res, next) => {
    return model.findAll({})
        .then(entities => res.status(200).json(entities))
        .catch(error => next(error));
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

const getUserByToken = model => (req, res, next, token) => {
    return model.findAll({
        where: {
            token: token
        }
    })
        .then(entities => res.status(200).json(entities))
        .catch(error => res.status(500).json(error))
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
export const getFriends = model => (req, res, next, id) => {
    return model.findAll({
        where: {
            id: id
        }/*,
        include:[{
            model:Friend,
            as: "user2",
            through: {
                attributes: ['id'],
            },
            where:["id = user2_id"]
        }
        ]
*/
    })
        .then(entities => res.status(200).json(entities))
    //.catch(error => res.status(500).json(error))
};
/*export const createFriendship = model => (req, res, next, id) => {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!');
};
*/
export default {
    getAll: getAll(User),
    createOne: createOne(User),
    getOne: getOne(),
    findByParam: findByParam(User),
    deleteOne: deleteOne(User),
    updateOne: updateOne(User),
    getFriends: getFriends(User),
    getUserByToken: getUserByToken(User)
}