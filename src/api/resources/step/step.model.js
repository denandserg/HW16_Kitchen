import Sequelize from 'sequelize';
import { connect } from '../../../db';


const schema = {
    title: Sequelize.STRING,
    photo_id: Sequelize.STRING,
    description: Sequelize.STRING,
    orderNumber: Sequelize.STRING,
};

const Step = connect().sequelize.define('step', schema, {
    underscored: true,
    freezeTableName: true,
});


export default Step;