# FabricJS Plugin - OpenSeaDragon

A plugin for **[OpenSeaDragon](https://openseadragon.github.io/)** that integrates **[FabricJS](http://fabricjs.com/)** as an overlay to enable the creation and display of many shapes (as rectangles, circles, texts and much more) on high-resolution zoomable images.

*Feel free to contribute*

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
});
```

The created `fabricOverlay` instance has many methods, with it, you can access the `fabricCanvas` and manipulate it, like adding a rectangle, as in the above example:

```ts
initOSDFabricJS();

const fabricOverlay = newViewer.fabricOverlay({
      fabricCanvasOptions: { selection: false },
    });

const newRect = new fabric.Rect({
    width: 200,
    height: 100,
    top: 1400,
    left: 1200,
    fill: 'rgba(0,0,0,0.1)',
    stroke: '#000000',
    strokeWidth: 5,
  })

fabricOverlay.fabricCanvas().add(newRect);
```

You also can use the FreeHand drawing mode, like this:

```ts
initOSDFabricJS();

const fabricOverlay = newViewer.fabricOverlay({
      fabricCanvasOptions: { selection: false },
    });

//Needs to be set to false to disable default mouse navigation in OSD.
newViewer.setMouseNavEnabled(false);

fabricOverlay.fabricCanvas().freeDrawingBrush = new fabric.PencilBrush(fabricOverlay.fabricCanvas());
fabricOverlay.fabricCanvas().freeDrawingBrush.width = 15;
fabricOverlay.fabricCanvas().freeDrawingBrush.color = selectedColor;
fabricOverlay.fabricCanvas().isDrawingMode = true;
```

Now, this lib doesn't support FabricJS static canvases. If you need a canvas without interactions, just disable it on the creation.

## How to contribute

When finishing a new implementation, update the package version in `package.json`, check the documentation and make a new build.

```bash
npm run build
```

## How to test

With the new build, manually copy all files (this entire repository) to the `node_modules/openseadragon-fabric` folder on a project that already uses this library.
After ensuring that every  is working correctly, run the above instruction to publish the new package version on [NPM](https://www.npmjs.com/package/openseadragon-fabric):

```bash
npm publish
```

### Thanks

Thanks, [CapybaHub](https://github.com/CapybaHub), for allowing this open-source plugin.

This version was inspired by:

- [altert/OpenseadragonFabricjsOverlay](https://github.com/altert/OpenseadragonFabricjsOverlay) - Thanks, [@altert](https://github.com/altert)
- [damjarling/openseadragon-fabricjs-overlay](https://www.npmjs.com/package/@adamjarling/openseadragon-fabricjs-overlay) - Thanks, [@adamjarling](https://www.npmjs.com/package/@adamjarling)
