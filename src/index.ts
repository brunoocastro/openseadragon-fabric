// /**
//  * OpenSeadragon canvas Overlay plugin based on svg overlay plugin and fabric.js
//  * @version 0.0.2

import OpenSeadragon from "openseadragon";
import { FabricOverlay, FabricOverlayConfig } from "./fabric-canvas";

type FabricOverlayType = (props: FabricOverlayConfig) => FabricOverlay;

declare module "openseadragon" {
  interface Viewer {
    /**
     * start a fabric overlay instance
     */
    fabricOverlay: FabricOverlayType;
  }
}

function initFabricJSOverlay() {
  if (!OpenSeadragon) {
    console.error("[openseadragon-canvas-overlay] requires OpenSeadragon");
    return;
  }

  // /**
  //  * Adds fabric.js overlay capability to your OpenSeadragon Viewer
  //  *
  //  * @param {Object} options
  //  *     Allows configurable properties to be entirely specified by passing
  //  *     an options object to the constructor.
  //  *
  //  * @returns {FabricOverlay}
  //  */
  OpenSeadragon.Viewer.prototype.fabricOverlay = function (
    options: FabricOverlayConfig
  ) {
    const fabricOverlay = new FabricOverlay(this, options);

    return fabricOverlay;
  };
}

module.exports = initFabricJSOverlay;
