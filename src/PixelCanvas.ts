class PixelCanvas {
  public ctx: CanvasRenderingContext2D;
  scaleW: number;
  scaleH: number;

  constructor(
    width: number,
    height: number,
    scaleW: number,
    scaleH: number,
    id: string,
    dom: DocumentFragment
  ) {
    const canvas = document.createElement("canvas") as HTMLCanvasElement;
    canvas.textContent = "Your browser does not seem to support HTML5 canvas.";
    canvas.setAttribute("id", id);
    canvas.width = width;
    canvas.height = height;
    this.scaleW = scaleW;
    this.scaleH = scaleH;
    dom.appendChild(canvas);

    this.ctx = canvas.getContext("2d");
    CanvasRenderingContext2D.prototype.pFillRect = function (
      x: number,
      y: number,
      xd: number,
      yd: number
    ) {
      return this.fillRect(scaleW * x, scaleH * y, scaleW * xd, scaleH * yd);
    };
    CanvasRenderingContext2D.prototype.pClearRect = function (
      x: number,
      y: number,
      xd: number,
      yd: number
    ) {
      return this.clearRect(scaleW * x, scaleH * y, scaleW * xd, scaleH * yd);
    };
    CanvasRenderingContext2D.prototype.pMoveTo = function (
      x: number,
      y: number
    ) {
      return this.moveTo(scaleW * x, scaleH * y);
    };

    CanvasRenderingContext2D.prototype.pLineTo = function (
      x: number,
      y: number
    ) {
      return this.lineTo(scaleW * x, scaleH * y);
    };

    CanvasRenderingContext2D.prototype.pGetImageData = function (
      sx: number,
      sy: number,
      sw: number,
      sh: number
    ) {
      return this.getImageData(
        scaleW * sx,
        scaleH * sy,
        scaleW * sw,
        scaleH * sh
      );
    };

    CanvasRenderingContext2D.prototype.pPutImageData = function (
      ctxBoardState: any,
      x: number,
      y: number
    ) {
      return this.putImageData(ctxBoardState, scaleW * x, scaleH * y);
    };

    CanvasRenderingContext2D.prototype.pTranslate = function (
      x: number,
      y: number
    ) {
      return this.translate(scaleW * x, scaleH * y);
    };

    CanvasRenderingContext2D.prototype.isFree = function (
      x: number,
      y: number
    ): boolean {
      if (x < 0 || width / scaleW <= x || height / scaleH <= y) {
        console.log("isFree, Border");
        return false;
      }
      const image = this.getImageData(scaleW * x, scaleH * y, 1, 1).data;
      const colorSum = image.reduce(
        (previous: number, current: number) => previous + current,
        0
      );
      console.log("isFree, Not Border: ", { x: x, y: y, free: !colorSum });
      return !colorSum;
    };
  }

  // isFreePixel(x:number,y:number){
  //  const content =  this.ctx.getImageData(x, y, 1, 1).data;
  //   console.log(content)
  // }
}

export default PixelCanvas;
