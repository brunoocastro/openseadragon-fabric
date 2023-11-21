import { FabricOverlay, FabricOverlayConfig } from "./fabric-canvas";
declare module "openseadragon" {
    interface Viewer {
        fabricOverlay: (props: FabricOverlayConfig) => FabricOverlay;
    }
}
declare function initOSDFabricJS(): void;
export { initOSDFabricJS };
