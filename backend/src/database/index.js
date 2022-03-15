import Sequelize from 'sequelize';
import dbConfig from '../config/database';
import Fornecedor from '../models/Fornecedor';
import Produto from '../models/Produto';

const models = [ Fornecedor, Produto ];
const connection = new Sequelize(dbConfig);

connection.authenticate().then(() => {
  models.forEach(model => model.init(connection));
  models.forEach(model => {
    if (model.associate) {
      model.associate(connection.models);
    }
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});

export default connection;
