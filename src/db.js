import appConfig from './config';
import Sequelize from 'sequelize';

let instance = null;

export const connect = (config = appConfig) => {
    if (instance !== null) {
        return instance;
    }

    const sequelize = new Sequelize(
        config.db.database,
        config.db.username,
        config.db.password,
        {
            host: config.db.host,
            dialect: config.db.dialect,
            operatorsAliases: false,
            pool: {
                max: config.db.max,
                min: config.db.pool.min,
                idle: config.db.pool.idle,
                acquire: config.db.pool.acquire
            },
            define: {
                createdAt: 'createdat',
                updatedAt: 'updatedat'
            }
        }
    );

    instance = {
        Sequelize,
        sequelize,
    };

    return instance;
};