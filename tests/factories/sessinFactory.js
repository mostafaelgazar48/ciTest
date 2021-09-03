
const Buffer = require('safe-buffer').Buffer;
const Keygrip = require('keygrip');
const keys = require('../../config/keys');
const keygrip = new Keygrip([keys.cookieKey]);

module.exports = (user) => {
    const sessionObj = {
        passport: {
            user: user._id.toString() // that is because mongoose id  is object type
        }
    }
    const sessionString = Buffer.from(JSON.stringify(sessionObj)).toString('base64');

    const signture = keygrip.sign('session=' + sessionString);

    return{
        sessionString,signture
    }

}