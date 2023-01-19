const bcrypt = require("bcrypt");

async function hashedPassw(password) {
    const salt = await bcrypt.genSalt()
    return await bcrypt.hash(password, salt)
}


module.exports = {
    hashedPassw
};