module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    wordsTotal: {
      type: Sequelize.BIGINT(11),
      defaultValue: 0,
      allowNull: false
    }
  });
  return User;
};