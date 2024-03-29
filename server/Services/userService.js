const UserModel = require("../Models/User");

exports.createUser = async (user) => {
  return await UserModel.create(user);
};

exports.getAllUsers = async () => {
  return await UserModel.find();
};

exports.getUserByName = async (username) => {
  return await UserModel.findOne({ username: username });
};

exports.getUserById = async (id) => {
  return await UserModel.findById(id);
};

exports.updateUser = async (id, user) => {
  return await UserModel.findByIdAndUpdate(id, user, { new: true });
};

exports.deleteUser = async (id) => {
  return await UserModel.findByIdAndDelete(id);
};
