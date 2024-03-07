import { fabric } from "fabric";
import OpenSeadragon from "openseadragon";
import { initOSDFabricJS } from "../openseadragon-fabric";
const tileSource = new OpenSeadragon.TileSource({
  tileOverlap: 2,
  tileSize: 256,
  url: "http://openseadragon.github.io/example-images/highsmith/highsmith_files/",
  tileHeight: 256,
  tileWidth: 256,
});

function initializePlugin() {
  initOSDFabricJS();

  const viewer = OpenSeadragon({
    id: "openseadragon",
    prefixUrl: "openseadragon/images/",
    tileSources: [tileSource],
  });

  const fabricOverlay = viewer.fabricOverlay({ fabricCanvasOptions: {} });

  const fabricCanvas = fabricOverlay.fabricCanvas();

  fabricCanvas.add(new fabric.Circle({ radius: 100, fill: "red" }));
}

export { initializePlugin };
