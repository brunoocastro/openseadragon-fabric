import "openseadragon";
import { FabricOverlay, FabricOverlayConfig } from "./src/fabric-canvas";

declare module "openseadragon" {
  interface Viewer {
    fabricOverlay: (props: FabricOverlayConfig) => FabricOverlay;
  }
}

export declare function initOSDFabricJS(): void;
