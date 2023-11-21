# openseadragon-fabric

Adds a FabricJS overlay to OpenSeaDragon
Installation

```bash
npm i openseadragon-fabric
```

## How to use

You just need to import this library after the OpenSeaDragon import.

```javascript
import OpenSeadragon from 'openseadragon';
import { initOSDFabricJS } from 'openseadragon-fabric'
```

Then, init the fabric plugin like this, before the creation of your viewers:

```js
initOSDFabricJS();

const viewer = OpenSeadragon(config);

const fabricOverlay = viewer.fabricOverlay({ fabricCanvasOptions: { selection: false }, staticCanvas: false });
```

The `fabricCanvasOptions` relates to Static (or not) Canvas options, depending on the next parameter `staticCanvas`.
