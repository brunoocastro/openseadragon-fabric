import { FabricOverlay, FabricOverlayConfig } from './fabric-canvas';
declare module 'openseadragon' {
    interface Viewer {
        fabricOverlay: (props: FabricOverlayConfig) => FabricOverlay;
    }
}
declare module 'fabric' {
    interface StaticCanvas {
        setActiveObject: (object: fabric.Object) => void;
    }
    interface Canvas {
        setActiveObject: (object: fabric.Object) => void;
    }
}
declare function initOSDFabricJS(): void;
export { FabricOverlay, FabricOverlayConfig, initOSDFabricJS };
