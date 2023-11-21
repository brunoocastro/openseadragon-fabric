import { fabric } from "fabric";
import OpenSeadragon from "openseadragon";
import { FabricOverlay, FabricOverlayConfig } from "./fabric-canvas";

declare module "openseadragon" {
  interface Viewer {
    fabricOverlay: (props: FabricOverlayConfig) => FabricOverlay;
  }
}

function initOSDFabricJS() {
  if (!OpenSeadragon) {
    console.error("[openseadragon-canvas-overlay] requires OpenSeadragon");
    return;
  }
  if (!fabric) {
    console.error("[fabric-js] requires FabricJS");
    return;
  }

  let instanceCounter = 0;

  const getOverlayID = () => {
    instanceCounter += 1;
    return instanceCounter;
  };

  OpenSeadragon.Viewer.prototype.fabricOverlay = function (
    options: FabricOverlayConfig
  ) {
    const newInstanceID = getOverlayID();
    
    console.log("Initializing new instance with id:", newInstanceID);
    const fabricOverlay = new FabricOverlay(this, options, newInstanceID);

    return fabricOverlay;
  };
}

export { initOSDFabricJS };
