import { fabric } from 'fabric';
import { Viewer } from 'openseadragon';
export interface FabricOverlayConfig {
    staticCanvas: boolean;
    fabricCanvasOptions: fabric.ICanvasOptions | fabric.IStaticCanvasOptions;
}
export declare class FabricOverlay {
    private _viewer;
    private _canvas;
    private _fabricCanvas;
    private _id;
    private _containerWidth;
    private _containerHeight;
    private _canvasDiv;
    canvas(): HTMLCanvasElement;
    fabricCanvas(): fabric.StaticCanvas | fabric.Canvas;
    clear(): void;
    render(): void;
    resize(): void;
    resizeCanvas(): void;
    constructor(viewer: Viewer, { staticCanvas, fabricCanvasOptions, }: FabricOverlayConfig, id: number);
}
