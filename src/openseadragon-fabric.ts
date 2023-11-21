import { fabric } from "fabric";
import OpenSeadragon from "openseadragon";
import { FabricOverlay, FabricOverlayConfig } from "./fabric-canvas";

function initOSDFabricJS() {
  if (!OpenSeadragon) {
    console.error("[openseadragon-canvas-overlay] requires OpenSeadragon");
    return;
  }
  if (!fabric) {
    console.error("[fabric-js] requires FabricJS");
    return;
  }

  OpenSeadragon.Viewer.prototype.fabricOverlay = function (
    options: FabricOverlayConfig
  ) {
    const fabricOverlay = new FabricOverlay(this, options);

    return fabricOverlay;
  };
}

export { initOSDFabricJS };
