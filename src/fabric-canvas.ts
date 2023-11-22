import { fabric } from 'fabric';
import OpenSeadragon, { Point, Viewer } from 'openseadragon';

export interface FabricOverlayConfig {
  staticCanvas: boolean;
  fabricCanvasOptions: fabric.ICanvasOptions | fabric.IStaticCanvasOptions;
}

export class FabricOverlay {
  private _viewer: Viewer;
  private _canvas: HTMLCanvasElement;
  private _fabricCanvas: fabric.StaticCanvas | fabric.Canvas;

  private _id: string;
  private _containerWidth: number;
  private _containerHeight: number;
  private _canvasDiv: HTMLDivElement;

  canvas(): HTMLCanvasElement {
    return this._canvas;
  }
  fabricCanvas(): fabric.StaticCanvas | fabric.Canvas {
    return this._fabricCanvas;
  }
  clear(): void {
    this._fabricCanvas.clear();
  }
  render(): void {
    this._fabricCanvas.renderAll();
  }
  resize(): void {
    if (this._containerWidth !== this._viewer.container.clientWidth) {
      this._containerWidth = this._viewer.container.clientWidth;
      this._canvasDiv.setAttribute('width', String(this._containerWidth));
      this._canvas.setAttribute('width', String(this._containerWidth));
    }

    if (this._containerHeight !== this._viewer.container.clientHeight) {
      this._containerHeight = this._viewer.container.clientHeight;
      this._canvasDiv.setAttribute('height', String(this._containerHeight));
      this._canvas.setAttribute('height', String(this._containerHeight));
    }
  }
  resizeCanvas(): void {
    let origin = new Point(0, 0);
    let viewportZoom = this._viewer.viewport.getZoom(true);
    let viewportToImageZoom =
      this._viewer.viewport.viewportToImageZoom(viewportZoom);
    this._fabricCanvas.setWidth(this._containerWidth);
    this._fabricCanvas.setHeight(this._containerHeight);

    /** Original package way of syncing OSD zoom to Fabric zoom */
    this._fabricCanvas.setZoom(viewportZoom);

    /** Alternative way of syncing OSD zoom to Fabric zoom, which keeps horizontal window resizing in sync */
    this._fabricCanvas.setZoom(viewportToImageZoom);

    let viewportWindowPoint =
      this._viewer.viewport.viewportToWindowCoordinates(origin);
    let x = Math.round(viewportWindowPoint.x);
    let y = Math.round(viewportWindowPoint.y);
    let canvasOffset = this._canvasDiv.getBoundingClientRect();

    let pageScroll = OpenSeadragon.getPageScroll();

    this._fabricCanvas.absolutePan(
      new fabric.Point(
        canvasOffset.left - x + pageScroll.x,
        canvasOffset.top - y + pageScroll.y
      )
    );
  }

  constructor(
    viewer: Viewer,
    {
      staticCanvas = true,
      fabricCanvasOptions = { selection: false },
    }: FabricOverlayConfig,
    id: number
  ) {
    let self = this;

    this._viewer = viewer;

    this._containerWidth = 0;
    this._containerHeight = 0;

    this._canvasDiv = document.createElement('div');
    this._canvasDiv.style.position = 'absolute';
    this._canvasDiv.style.left = '0px';
    this._canvasDiv.style.top = '0px';
    this._canvasDiv.style.width = '100%';
    this._canvasDiv.style.height = '100%';
    this._viewer.canvas.appendChild(this._canvasDiv);

    this._canvas = document.createElement('canvas');

    this._id = 'osd-canvas-' + id;
    this._canvas.setAttribute('id', this._id);
    this._canvasDiv.appendChild(this._canvas);
    this.resize();

    // make the canvas static if specified, ordinary otherwise
    if (staticCanvas) {
      this._fabricCanvas = new fabric.StaticCanvas(
        this._canvas,
        fabricCanvasOptions
      );
    } else {
      this._fabricCanvas = new fabric.Canvas(this._canvas, fabricCanvasOptions);
    }

    /**
     * Prevent OSD mousedown on fabric objects
     */
    this._fabricCanvas.on('mouse:down', function (options) {
      if (options.target) {
        options.e.preventDefault();
        options.e.stopPropagation();
      }
    });

    /**
     * Prevent OSD mouseup on fabric objects
     */
    this._fabricCanvas.on('mouse:up', function (options) {
      if (options.target) {
        options.e.preventDefault();
        options.e.stopPropagation();
      }
    });

    /**
     * Update viewport
     */
    this._viewer.addHandler('update-viewport', function () {
      self.resize();
      self.resizeCanvas();
      self.render();
    });

    /**
     * Resize the fabric.js overlay when the viewer or window changes size
     */
    this._viewer.addHandler('open', function () {
      self.resize();
      self.resizeCanvas();
    });
    window.addEventListener('resize', function () {
      self.resize();
      self.resizeCanvas();
    });
  }
}
