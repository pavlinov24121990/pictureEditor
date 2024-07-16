import stateStore from "../mobX/stateStore";

const writeDash = (ctx: CanvasRenderingContext2D, dash: number[], minPicX: number, minPicY: number, maxPicX: number, maxPicY: number, defaultWidthImg: number, defaultHeightImg: number, resize: boolean): void => {
  if (resize) {
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(maxPicX, maxPicY + 15);
    ctx.lineTo(maxPicX + 15, maxPicY + 15);
    ctx.moveTo(maxPicX + 15, maxPicY);
    ctx.lineTo(maxPicX + 15, maxPicY + 15);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.setLineDash(dash);
    ctx.strokeRect(minPicX - 10, minPicY - 10, defaultWidthImg + 20, defaultHeightImg + 20);
    console.log('dsfsf')
    stateStore.setInstallDash(true)
  } else if (ctx.getLineDash().length > 0) {
    ctx.setLineDash([]);
    stateStore.setInstallDash(false)
  } else {
    stateStore.setInstallDash(true)
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(maxPicX, maxPicY + 15);
    ctx.lineTo(maxPicX + 15, maxPicY + 15);
    ctx.moveTo(maxPicX + 15, maxPicY);
    ctx.lineTo(maxPicX + 15, maxPicY + 15);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.setLineDash(dash);
    ctx.strokeRect(minPicX - 10, minPicY - 10, defaultWidthImg + 20, defaultHeightImg + 20);
  }
};

export default writeDash;
