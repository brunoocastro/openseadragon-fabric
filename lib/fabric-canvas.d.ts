import { fabric } from "fabric";
import { Viewer } from "openseadragon";
export interface FabricOverlayConfig {
    fabricCanvasOptions: fabric.ICanvasOptions;
}
export declare class FabricOverlay {
    private _viewer;
    private _canvas;
    private _fabricCanvas;
    private _id;
    private _containerWidth;
    private _containerHeight;
    private _canvasDiv;
    viewer(): Viewer;
    canvas(): HTMLCanvasElement;
    fabricCanvas(): fabric.Canvas;
    clearFabric(): void;
    renderAllFabric(): void;
    resizeCanvas(): void;
    resizeFabric(): void;
    clearFabricSelection(): void;
    setViewerMouseNavEnabled(state?: boolean): void;
    updateCanvasRotation(deg: number): void;
    constructor(viewer: Viewer, { fabricCanvasOptions }: FabricOverlayConfig, id: number);
}
