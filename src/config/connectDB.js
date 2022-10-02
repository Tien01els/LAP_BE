const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('lap_db', 'root', 'root', {
<<<<<<< HEAD
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
})
=======
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});
>>>>>>> 4117cbb7126cf24e6e0358461b84d3e724c8b5b1

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = connectDB;
