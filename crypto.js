const crypto = require('node:crypto');
const { iv, cryptopass } = require('./extradata')

const encrypt = function encryptor(va) {
    const key = crypto.scryptSync(cryptopass, 'tomal', 32);
    
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv, 'hex'));
    var mystr = cipher.update(va, 'utf8', 'hex')
    mystr += cipher.final('hex');

    //console.log(mystr);
  
    return mystr;
  }

  const decrypt = function decryptor(va) {
    const decryptData = {
      error: true,
      message: 'Invalid verification code'
    };

    const password = crypto.scryptSync(cryptopass, "tomal", 32);
    try {

      const decryptValue = crypto.createDecipheriv('aes-256-cbc', Buffer.from(password), Buffer.from(iv, 'hex'))
      let decrypted = decryptValue.update(va, 'hex', 'utf-8');
      decrypted += decryptValue.final('utf-8');
      //console.log(decrypted);

      
      return decrypted
    } catch (error) {
      return JSON.stringify(decryptData);
    }
    
    //console.log(decrypted);
    
  }

module.exports = {
    encrypt,
    decrypt,

}