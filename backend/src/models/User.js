import { Model, DataTypes } from 'sequelize';
import bcryptjs from 'bcryptjs'

class User extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      email: {
        type: DataTypes.STRING,
        defaultValue: '',
        },
      password_hash: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      password: {
        type: DataTypes.VIRTUAL,
        defaultValue: '',
      }}, {
      sequelize,
      tableName: 'users',
    });

    this.addHook('beforeSave', async user => {
      if(user.password){
        user.password_hash = await bcryptjs.hash(user.password, 8)
      }
    });

    return this;
  }
  checkPassword(password) {
    return bcryptjs.compare(password, this.password_hash);
  }

  static associate(models) {
    this.hasMany(models.Student,{ foreignKey: 'user_id', as: 'user' })
  }
}

export default User;
