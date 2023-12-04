module.exports = {
    email: {
      in: ["body"],
      isEmail: {
        errorMessage: "Email invalida!",
      },
      notEmpty: {
        options: {},
        errorMessage: "Email obbligatoria",
      },
    },
    password: {
      in: ["body"],
      notEmpty: {
        options: {},
        errorMessage: "Password obbligatoria!",
      },
    },
  };