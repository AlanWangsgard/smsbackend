const { check } = require("express-validator");

exports.userValidation = [
    check("userName", "username is required")
      .escape()
      .trim()
      .not()
      .isEmpty(),
    check("password", "password is required")
      .escape()
      .trim()
      .not()
      .isEmpty(),
    check("email", "email is required")
      .escape()
      .trim()
      .not()
      .isEmpty(),
    check("firstName", "first name is required")
      .escape()
      .trim()
      .not()
      .isEmpty(),
    check("lastName", "The last name must be included")
      .escape()
      .trim()
      .not()
      .isEmpty(),
    check("birthDate", "The birthdate is required")
      .escape()
      .trim()
      .not()
      .isEmpty(),
  ];
  