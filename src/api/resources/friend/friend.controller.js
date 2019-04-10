import Friend from './friend.model';
import User from '../user/user.model';

const getAll = model => (req, res, next) => {
    return model.findAll({})
        .then(entities => res.status(200).json(entities))
        .catch(error => next(error));
};

 const getFriends = () => (req, res, next, id) => {
    return User.findAll({
        where: {
            id: id
        }
    })
        .then(entities => res.status(200).json(entities))
    //.catch(error => res.status(500).json(error))
};

const getByUser = model => (req, res, next, user_id) => {

    //console.log(model);
    const getFriendsIds = model.findAll({
        where: {
            user_id: user_id
        }
    }).then(entities=>{
        let promises=[];
        entities.forEach((el)=>promises.push(User.findAll({
        where: {
            id: el.dataValues.user2_id
        }
    } )));
        return Promise.all(promises);
    }).then(entities => res.status(200).json(entities));
    //.catch(error => res.status(500).json(error))
    return getFriendsIds;
};

const createOne = model => (req, res, next) => {
    console.log('createOne', req.body);
    return model.create(req.body)
        .then(entity => res.status(201).json(entity))
        .catch(error => next(error));
};

const deleteOne = model => (req, res, next) => {
    return model.destroy({
        where: { user_id: req.body.user_id, user2_id: req.body.user2_id },
        limit: 1,
        force: true
    })
        .then(entity => res.status(201).json(entity))
        .catch(error => next(error));
};

export default {
    getByUser: getByUser(Friend),
    createOne: createOne(Friend),
    deleteOne: deleteOne(Friend),
    getAll: getAll(Friend)
}