const bcrypt = require("bcrypt")

const hash = async function hashPassword(password) {
    const salt = 10; //n. di iterazioni di hashing della password 
    const hash = await bcrypt.hash(password, salt);

    return hash;
}

const compare = async function comparePassword(password, hashedPassowrd) {
    const match = await bcrypt.compare(password, hashedPassowrd);

    return match
}

module.exports = { hash, compare }