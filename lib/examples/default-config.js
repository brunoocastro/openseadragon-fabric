"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializePlugin = void 0;
const fabric_1 = require("fabric");
const openseadragon_1 = __importDefault(require("openseadragon"));
const openseadragon_fabric_1 = require("../openseadragon-fabric");
const tileSource = new openseadragon_1.default.TileSource({
    tileOverlap: 2,
    tileSize: 256,
    url: "http://openseadragon.github.io/example-images/highsmith/highsmith_files/",
    tileHeight: 256,
    tileWidth: 256,
});
function initializePlugin() {
    (0, openseadragon_fabric_1.initOSDFabricJS)();
    const viewer = (0, openseadragon_1.default)({
        id: "openseadragon",
        prefixUrl: "openseadragon/images/",
        tileSources: [tileSource],
    });
    const fabricOverlay = viewer.fabricOverlay({ fabricCanvasOptions: {} });
    const fabricCanvas = fabricOverlay.fabricCanvas();
    fabricCanvas.add(new fabric_1.fabric.Circle({ radius: 100, fill: "red" }));
}
module.exports.initializePlugin = initializePlugin;
