const router = require("express").Router();

const { login, registerUser } = require("../controllers/users");

router.post("/register", registerUser);
router.post("/login", login);

module.exports = router;
