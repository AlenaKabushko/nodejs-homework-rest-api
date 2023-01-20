const bcrypt = require("bcrypt");

async function hashedPassw(password) {
    const salt = await bcrypt.genSalt()
    return await bcrypt.hash(password, salt)
}

async function checkPass(password, hashed) {    
    return await bcrypt.compareSync(password, hashed);
}

module.exports = {
    hashedPassw,
    checkPass
};