const express = require("express");
const { validate } = require("../src/index");

const app = express();
app.use(express.json());

const userSchema = {
  name: { type: "string", required: true, minLength: 2 },
  email: { type: "email", required: true },
  age: { type: "number", required: true, min: 18 }
};

app.post("/users", validate(userSchema), (req, res) => {
  res.status(201).json({
    success: true,
    message: "User created",
    data: req.body
  });
});

app.listen(3000, () => {
  console.log("Demo server running on http://localhost:3000");
});