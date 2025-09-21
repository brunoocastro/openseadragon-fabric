import { FabricOverlay, FabricOverlayConfig } from './fabric-canvas';
import { FabricObject, TPointerEvent, StaticCanvasEvents } from 'fabric';
declare module 'openseadragon' {
    interface Viewer {
        fabricOverlay: (props: FabricOverlayConfig) => FabricOverlay;
    }
}
declare module 'fabric' {
    interface StaticCanvas<EventSpec extends StaticCanvasEvents = StaticCanvasEvents> {
        setActiveObject(object: FabricObject, e?: TPointerEvent): boolean;
    }
    interface Canvas<EventSpec = any> {
        setActiveObject(object: FabricObject, e?: TPointerEvent): boolean;
    }
}
declare function initOSDFabricJS(): void;
export { FabricOverlay, FabricOverlayConfig, initOSDFabricJS };
