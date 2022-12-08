const express = require("express");
const bodyparser = require("body-parser");
const { check, validationResult } = require("express-validator");

const app = express();

const PORT = process.env.PORT || 5000;

// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyparser.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post(
  "/register",
  [
    check("name", "The name should be more then 3 characters")
      .exists()
      .isLength({ min: 3 }),
    check("email", "Please use correct email address")
      .isEmail()
      .normalizeEmail(),
  ],
  (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      //   return res.status(422).jsonp(err.array());
      const alert = err.array();
      res.render("register", {
        alert,
      });
    }
  }
);

app.listen(PORT, (req, res) => {
  console.log(`The server is now running on port : ${PORT}`);
});
