// initiate-payment.js

const profiles = [
    {"name": "Dess 1", "passcode": "2356"},
    {"name": "Dess 2", "passcode": "3456"},
    {"name": "Dess 3", "passcode": "4567"},
    {"name": "Dess 4", "passcode": "9876"},
    {"name": "Dess 5", "passcode": "2345"},
];

function get_random_profile() {
    return profiles[Math.floor(Math.random() * profiles.length)];
}

module.exports = async (req, res) => {
    const { name, phone } = req.body;

    const profile = get_random_profile();
    const transaction_id = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);

    // You can store this data in a database or another storage solution
    const transaction_data = {
        [transaction_id]: { profile, name },
    };

    res.status(200).json({ transaction_id });
};

