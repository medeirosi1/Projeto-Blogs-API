const createUser = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: DataTypes.INTEGER,
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    tableName: 'users',
    underscored: true,
    timestamps: false
  });

//   User.associate = (db) => {
//     User.hasMany(db.Pet, { as: 'pets', foreignKey: 'userId' });
//   }

  return User;
};

module.exports = createUser;