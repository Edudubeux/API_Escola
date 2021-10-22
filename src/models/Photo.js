import { Model, DataTypes } from 'sequelize';

class Photo extends Model {
	static init(sequelize) {
		super.init({
			original_name: {
        type: DataTypes.STRING(255),
        validate: {
          notEmpty: { msg: "This field can't be empty."}
        }
      },
      file_name: {
        type: DataTypes.STRING(255),
        validate: {
          notEmpty: { msg: "This field can't be empty."}
        }
      },
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
      tableName: "photos"
		});
		return this;
	}
  static associate(model) {
    this.belongsTo(model.Student, { foreignKey: 'student_id', as: 'student' })
  }
}

export default Photo;
