"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const likeSchema = new mongoose_1.Schema({
    tweet: { type: mongoose_1.Types.ObjectId, ref: "Tweet", required: true },
    user: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
}, {
    timestamps: true,
});
const Like = (0, mongoose_1.model)("Like", likeSchema);
exports.default = Like;
