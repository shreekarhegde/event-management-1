const users = {
  first_name: "first_name",
  last_name: "last_name",
  created_at: "created_at",
  role: "role",
  ph_num: "ph_num",
  userID: "userID",
  eventID: "eventID",
};

const events = {
  eventName: "eventName",
  starts_at: "starts_at",
  ends_at: "ends_at",
  venueID: "venueID",
  eventID: "eventID",
  created_at: "created_at",
  userID: "userID",
};

const venue = {
  name: "name",
  address: "address",
  venueID: "venueID",
  created_at: "created_at",
};

const payment = {
  paymentID: "paymentID",
  result: "result",
  amount: "amount",
  created_at: "created_at",
  eventID: "eventID",
  userID: "userID",
};

exports.users_db_keys = users;
exports.events_db_keys = events;
exports.venue_db_keys = venue;
exports.payment_db_keys = payment;
