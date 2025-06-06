// const crypto = require("crypto");

// const algorithm = "aes-256-cbc";
// const secretKey = process.env.ENCRYPTION_KEY || '12345678901234567890123456789012'; // 32 bytes
// const ivLength = 16; // AES block size

// function encrypt(text) {
//     const iv = crypto.randomBytes(ivLength);
//     const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
//     let encrypted = cipher.update(text, "utf8", "hex");
//     encrypted += cipher.final("hex");
//     return iv.toString("hex") + ":" + encrypted;
// }

// function decrypt(text) {
//     const [ivHex, encryptedText] = text.split(":");
//     const iv = Buffer.from(ivHex, "hex");
//     const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
//     let decrypted = decipher.update(encryptedText, "hex", "utf8");
//     decrypted += decipher.final("utf8");
//     return decrypted;
// }

// module.exports = { encrypt, decrypt };


const crypto = require("crypto");

const algorithm = "aes-256-cbc";
// const secret = process.env.ENCRYPTION_KEY || 'default_secret_key';
const secret ='12345678901234567890123456789012';
const secretKey = crypto.createHash('sha256').update(secret).digest(); // Derives a 32-byte key
const ivLength = 16; // AES block size in bytes

function encrypt(text) {
    const iv = crypto.randomBytes(ivLength);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return iv.toString("hex") + ":" + encrypted;
}

function decrypt(text) {
    const [ivHex, encryptedText] = text.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

module.exports = { encrypt, decrypt };
