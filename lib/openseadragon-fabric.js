"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initOSDFabricJS = void 0;
const fabric_1 = require("fabric");
const openseadragon_1 = __importDefault(require("openseadragon"));
const fabric_canvas_1 = require("./fabric-canvas");
function initOSDFabricJS() {
    if (!openseadragon_1.default) {
        console.error("[openseadragon-canvas-overlay] requires OpenSeadragon");
        return;
    }
    if (!fabric_1.fabric) {
        console.error("[fabric-js] requires FabricJS");
        return;
    }
    openseadragon_1.default.Viewer.prototype.fabricOverlay = function (options) {
        const fabricOverlay = new fabric_canvas_1.FabricOverlay(this, options);
        return fabricOverlay;
    };
}
exports.initOSDFabricJS = initOSDFabricJS;