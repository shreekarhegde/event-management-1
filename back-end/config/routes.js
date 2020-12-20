const express = require("express");
const router = express.Router();
const { eventsController } = require("../app/controllers/eventsController");
const { paymentsController } = require("../app/controllers/paymentController");
const { usersController } = require("../app/controllers/usersController");
const { venueController } = require("../app/controllers/venueController");

router.use("/users", usersController);
router.use("/events", eventsController);
router.use("/venue", venueController);
router.use("/payment", paymentsController);

module.exports = {
  routes: router,
};
