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
  name: "name",
  starts_at: "starts_at",
  ends_at: "ends_at",
  venueID: "venueID",
  eventID: "eventID",
  created_at: "created_at",
};

const venue = {
  name: "name",
  address: "address",
  venueID: "venueID",
  created_at: "created_at",
};

exports.users_db_keys = users;
exports.events_db_keys = events;
exports.venue_db_keys = venue;
