import { FabricOverlay, FabricOverlayConfig } from "./fabric-canvas";
type FabricOverlayType = (props: FabricOverlayConfig) => FabricOverlay;
declare module "openseadragon" {
    interface Viewer {
        fabricOverlay: FabricOverlayType;
    }
}
export {};
