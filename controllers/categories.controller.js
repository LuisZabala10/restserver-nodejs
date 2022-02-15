const { response } = require("express");
const { request } = require("express");

const getCategories = (req = request, res = response) => {
  res.send("getCategories");
};

const getCategoryById = (req = request, res = response) => {
  res.send("getCategoryById");
};

const createCategory = (req = request, res = response) => {
  res.send("createCategory");
};

const updateCategory = (req = request, res = response) => {
  res.send("updateCategory");
};

const deleteCategory = (req = request, res = response) => {
  res.send("deleteCategory");
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
