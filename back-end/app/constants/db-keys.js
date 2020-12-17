const users = {
    first_name: 'first_name',
    last_name: 'last_name',
    created_at: 'created_at',
    role: 'role',
    ph_num: 'ph_num',
    id: 'id'
}

const events = {
    name: 'name',
    starts_at: 'starts_at',
    ends_at: 'ends_at',
    venue_id: 'venue_id',
    id: 'id',
    created_at: 'created_at'
}

const venue = {
    name: 'name',
    address: 'address',
    id: 'id',
    created_at: 'created_at'
}

exports.users_db_keys = users;
exports.events_db_keys = events;
exports.venue_db_keys = venue;