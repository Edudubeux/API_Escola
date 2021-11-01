import { Model, DataTypes } from 'sequelize';

class Student extends Model {
	static init(sequelize) {
		super.init({
			name: DataTypes.STRING(255),
			surname: DataTypes.STRING(255),
			email: {
        type: DataTypes.STRING(255),
        unique: {
          msg: 'This email has already been created.'
        }
      },
			age: DataTypes.INTEGER,
			weight: DataTypes.FLOAT,
			height: DataTypes.FLOAT,
			created_at: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
			updated_at: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
		}, {
			sequelize,
      tableName: "students"
		});
		return this;
	}

  static associate(models) {
    this.hasMany(models.Photo, { foreignKey: 'student_id', as: 'photos' })
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
  }
}

export default Student;
