"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FabricOverlay = void 0;
const fabric_1 = require("fabric");
const openseadragon_1 = __importStar(require("openseadragon"));
class FabricOverlay {
    _viewer;
    _canvas;
    _fabricCanvas;
    _id;
    _containerWidth;
    _containerHeight;
    _canvasDiv;
    viewer() {
        return this._viewer;
    }
    canvas() {
        return this._canvas;
    }
    fabricCanvas() {
        return this._fabricCanvas;
    }
    clearFabric() {
        this._fabricCanvas.clear();
    }
    renderAllFabric() {
        this._fabricCanvas.renderAll();
    }
    resizeCanvas() {
        if (this._containerWidth !== this._viewer.container.clientWidth) {
            this._containerWidth = this._viewer.container.clientWidth;
            this._canvasDiv.setAttribute("width", String(this._containerWidth));
            this._canvas.setAttribute("width", String(this._containerWidth));
        }
        if (this._containerHeight !== this._viewer.container.clientHeight) {
            this._containerHeight = this._viewer.container.clientHeight;
            this._canvasDiv.setAttribute("height", String(this._containerHeight));
            this._canvas.setAttribute("height", String(this._containerHeight));
        }
    }
    resizeFabric() {
        let origin = new openseadragon_1.Point(0, 0);
        let viewportZoom = this._viewer.viewport.getZoom(true);
        let viewportToImageZoom = this._viewer.viewport.viewportToImageZoom(viewportZoom);
        this._fabricCanvas.setWidth(this._containerWidth);
        this._fabricCanvas.setHeight(this._containerHeight);
        this._fabricCanvas.setZoom(viewportZoom);
        this._fabricCanvas.setZoom(viewportToImageZoom);
        let viewportWindowPoint = this._viewer.viewport.viewportToWindowCoordinates(origin);
        let x = Math.round(viewportWindowPoint.x);
        let y = Math.round(viewportWindowPoint.y);
        let canvasOffset = this._canvasDiv.getBoundingClientRect();
        let pageScroll = openseadragon_1.default.getPageScroll();
        this._fabricCanvas.absolutePan(new fabric_1.fabric.Point(canvasOffset.left - x + pageScroll.x, canvasOffset.top - y + pageScroll.y));
    }
    clearFabricSelection() {
        if (this._fabricCanvas.isDrawingMode) {
            this._fabricCanvas.isDrawingMode = false;
            this._fabricCanvas.clearContext(this._fabricCanvas.getContext());
        }
        else {
            this._fabricCanvas.discardActiveObject();
        }
        this._fabricCanvas.requestRenderAll();
    }
    setViewerMouseNavEnabled(state = true) {
        if (!this._viewer)
            return;
        this._viewer.setMouseNavEnabled(state);
    }
    updateCanvasRotation(deg) {
        if (deg < 0 || deg > 360)
            return;
        this._viewer.world.getItemAt(0).setRotation(deg, true);
    }
    constructor(viewer, { fabricCanvasOptions = { selection: false } }, id) {
        let self = this;
        this._viewer = viewer;
        this._containerWidth = 0;
        this._containerHeight = 0;
        this._canvasDiv = document.createElement("div");
        this._canvasDiv.style.position = "absolute";
        this._canvasDiv.style.left = "0px";
        this._canvasDiv.style.top = "0px";
        this._canvasDiv.style.width = "100%";
        this._canvasDiv.style.height = "100%";
        this._viewer.canvas.appendChild(this._canvasDiv);
        this._canvas = document.createElement("canvas");
        this._id = "osd-canvas-" + id;
        this._canvas.setAttribute("id", this._id);
        this._canvasDiv.appendChild(this._canvas);
        this.resizeCanvas();
        this._fabricCanvas = new fabric_1.fabric.Canvas(this._canvas, fabricCanvasOptions);
        this._fabricCanvas.on("mouse:down", function (options) {
            if (options.target) {
                options.e.preventDefault();
                options.e.stopPropagation();
            }
        });
        this._fabricCanvas.on("mouse:up", function (options) {
            if (options.target) {
                options.e.preventDefault();
                options.e.stopPropagation();
            }
        });
        this._viewer.addHandler("update-viewport", function () {
            self.resizeFabric();
            self.resizeCanvas();
            self.renderAllFabric();
        });
        this._viewer.addHandler("open", function () {
            self.resizeFabric();
            self.resizeCanvas();
        });
        window.addEventListener("resize", function () {
            self.resizeFabric();
            self.resizeCanvas();
        });
    }
}
exports.FabricOverlay = FabricOverlay;
