const crypto = require('crypto');

const ts = '1'; // Your timestamp
const privateKey = '300825694558033a4e9c3473e3828db9b8771e98';
const publicKey = '4906069c197e411cb19caa044c992842';

const dataToHash = ts + privateKey + publicKey;

const hash = crypto.createHash('md5').update(dataToHash).digest('hex');

console.log('Timestamp (ts):', ts);
console.log('MD5 Hash:', hash);

