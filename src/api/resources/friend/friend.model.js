import Sequelize from 'sequelize';
import { connect } from '../../../db';
import User from "../user/user.model";


const schema = {

};

const Friend = connect().sequelize.define('friend', schema, {
    underscored: true,
    freezeTableName: true,
});

//User.belongsToMany(User, {as: 'user2', through: Friend});
//Friend.belongsTo(User);

export default Friend;