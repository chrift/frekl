"use strict";
exports.__esModule = true;
exports.frekl = void 0;
var frekl = process.env.NODE_ENV === 'production' ? require('./prod')["default"] : require('./dev')["default"];
exports.frekl = frekl;
exports["default"] = frekl;
module.exports = frekl;
