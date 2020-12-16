function generateID() {
    min = Math.ceil(10);
    max = Math.floor(1000);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.generateID = generateID