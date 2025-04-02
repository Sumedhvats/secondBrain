"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomGen = void 0;
const randomGen = (len) => {
    let options = "qwertyuiopasdfghjklzxcvbnm1234567890";
    let res = "";
    for (let i = 0; i < len; i++) {
        res += options[Math.floor((Math.random()) * len)];
    }
    return res;
};
exports.randomGen = randomGen;
