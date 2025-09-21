import OpenSeadragon from 'openseadragon';
import { FabricOverlay, FabricOverlayConfig } from './fabric-canvas';
import {
  FabricObject,
  Canvas,
  TPointerEvent,
  StaticCanvasEvents,
} from 'fabric';
declare module 'openseadragon' {
  interface Viewer {
    fabricOverlay: (props: FabricOverlayConfig) => FabricOverlay;
  }
}

declare module 'fabric' {
  interface StaticCanvas<
    EventSpec extends StaticCanvasEvents = StaticCanvasEvents
  > {
    setActiveObject(object: FabricObject, e?: TPointerEvent): boolean;
  }
  interface Canvas<EventSpec = any> {
    setActiveObject(object: FabricObject, e?: TPointerEvent): boolean;
  }
}

function initOSDFabricJS() {
  if (!OpenSeadragon) {
    console.error('[openseadragon-canvas-overlay] requires OpenSeadragon');
    return;
  }
  if (!Canvas) {
    console.error('[fabric-js] requires FabricJS');
    console.error('Please import FabricJS before importing this package');
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
    const fabricOverlay = new FabricOverlay(this, options, newInstanceID);

    return fabricOverlay;
  };
}

export { FabricOverlay, FabricOverlayConfig, initOSDFabricJS };

