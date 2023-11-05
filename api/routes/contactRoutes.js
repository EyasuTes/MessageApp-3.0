const express = require("express");
const { addContact, getContacts } = require("../controllers/contactController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, addContact);
router.route("/").get(protect, getContacts);

module.exports = router;
