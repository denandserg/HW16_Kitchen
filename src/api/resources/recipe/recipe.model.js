import Sequelize from 'sequelize';
import { connect } from '../../../db';
import Step from "../step/step.model";


const schema = {
    title: Sequelize.STRING,
    photo_id: Sequelize.STRING,
    description: Sequelize.STRING,
    ingredients: Sequelize.STRING,

};

const Recipe = connect().sequelize.define('recipe', schema, {
    underscored: true,
    freezeTableName: true,
});

Recipe.hasMany(Step);

export default Recipe;