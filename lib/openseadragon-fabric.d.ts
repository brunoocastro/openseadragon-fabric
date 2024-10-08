import { FabricOverlay, FabricOverlayConfig } from './fabric-canvas';
import { FabricObject } from 'fabric';
declare module 'openseadragon' {
    interface Viewer {
        fabricOverlay: (props: FabricOverlayConfig) => FabricOverlay;
    }
}
declare module 'fabric' {
    interface StaticCanvas {
        setActiveObject: (object: FabricObject) => void;
    }
    interface Canvas {
        setActiveObject: (object: FabricObject) => boolean;
    }
}
declare function initOSDFabricJS(): void;
export { FabricOverlay, FabricOverlayConfig, initOSDFabricJS };
