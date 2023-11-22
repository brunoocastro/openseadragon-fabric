# openseadragon-fabric

Adds a **[FabricJS](http://fabricjs.com/)** overlay to **[OpenSeaDragon](https://openseadragon.github.io/)**.
Feel free to contribute.

Installation

```bash
npm i openseadragon-fabric
```

## How to use

You just need to import this library after the OpenSeaDragon import.

```ts
import OpenSeadragon from 'openseadragon';
import { initOSDFabricJS } from 'openseadragon-fabric';
```

Then, init the fabric plugin like this, before the creation of your viewers:

```ts
initOSDFabricJS();

const viewer = OpenSeadragon(config);

const fabricOverlay = viewer.fabricOverlay({
  fabricCanvasOptions: { selection: false },
  staticCanvas: false,
});
```

The `fabricCanvasOptions` relates to Static (or not) Canvas options, depending on the next parameter `staticCanvas`.

## How to contribute

When finishing a new implementation, update the package version in `package.json`, check the documentation and do a new build.

```bash
npm run build
```

## How to test

After the new build, manually copy all files to the `node_modules/openseadragon-fabric` folder on a project that already uses this library.
After ensuring that everything is working correctly, run the above instruction to publish the new package version on [NPM](https://www.npmjs.com/package/openseadragon-fabric):

```bash
npm publish
```

# Thanks

Thanks, [CapybaHub](https://github.com/CapybaHub), for allowing this open-source plugin.

This version was inspired by the:

- [altert/OpenseadragonFabricjsOverlay](https://github.com/altert/OpenseadragonFabricjsOverlay) - Thanks, @altert
- [damjarling/openseadragon-fabricjs-overlay](https://www.npmjs.com/package/@adamjarling/openseadragon-fabricjs-overlay) - Thanks, @adamjarling
