import Sequelize from 'sequelize';
import { connect } from '../../../db';
import Recipe from '../recipe/recipe.model';
import Friend from "../friend/friend.model";

const schema = {
    name: Sequelize.STRING,
    token: Sequelize.STRING
};

const User = connect().sequelize.define('user', schema, {
    indexes: [{
        unique: true,
        fields: ['token']
    }],
    underscored: true,
    freezeTableName: true,    
});

User.hasMany(Recipe);
/*
User.hasMany(User, { as: 'posts', foreignKey: 'user_id' });
User.hasMany(User, { as: 'posts', foreignKey: 'user_id' });
*/

 //   User.belongsToMany(User, {as: 'user2', through: Friend});


User.belongsToMany(User, { as: 'user_id', through: 'friend', foreignKey: 'user_id2',  otherKey: 'user_id' });
User.belongsToMany(User, { as: 'user2_id', through: 'friend', foreignKey: 'user_id',  otherKey: 'user2_id' });

//User.belongsToMany(User, {as: 'parents', through: 'kids_parents',foreignKey: 'kid' , otherKey: 'parent'});
//User.belongsToMany(User, {as: 'kids', through: 'kids_parents', foreignKey: 'parent',otherKey: 'kid'});


//User.belongsToMany(User, { as: 'user_id1', foreignKey: 'user_id2', through: 'friend', otherKey: 'user_id1' });
//User.belongsToMany(User, { as: 'user_id2', foreignKey: 'user_id1', through: 'friend', otherKey: 'user_id2' });
//User.belongsToMany(User, {as: 'parents', through: 'kids_parents',foreignKey: 'kid' , otherKey: 'parent'});
//User.belongsToMany(User, {as: 'kids', through: 'kids_parents', foreignKey: 'parent',otherKey: 'kid'});
/*client.belongsToMany(models.client, {
    through: models.clientAccess,
    as: 'clientsWithAccess',
    foreignKey: 'ClientId',
    otherKey: 'AccessingClientId'
});*/
/*
client.belongsToMany(models.client, {through: models.clientAccess, as: 'accessToClients', foreignKey: 'AccessingClientId', otherKey: 'ClientId'
});*/
export default User;