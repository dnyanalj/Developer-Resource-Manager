const mongoose = require("mongoose");
const { encrypt, decrypt } = require("../utils/encryption");

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }, // will be encrypted
    tags: { type: [String], default: [] },
    isPinned: { type: Boolean, default: false },
    userId: { type: String, required: true },
    createdOn: { type: Date, default: new Date().getTime() },
});


// Encrypt content before saving
noteSchema.pre("save", function (next) {
    if (this.isModified("content")) {
        this.content = encrypt(this.content);
    }
    next();
});

// Decrypt content after fetching
noteSchema.methods.getDecryptedContent = function () {
    try {
        return decrypt(this.content);
    } catch (e) {
        return "[Decryption Failed]";
    }
};

module.exports = mongoose.model("Note", noteSchema);

