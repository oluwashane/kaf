import pkg from 'x-hub-signature';
const { signer } = pkg
const sign = signer({
    algorithm: 'sha1',
    secret: 'super-secret-string'
})

const signature = sign(new Buffer('random-signature-body'));

console.log(signature)