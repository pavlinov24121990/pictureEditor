import { MouseEventHandler, useEffect, useRef, useState } from "react";
import '../../styles/components/main/display.scss';
import writeDash from "../../helpers/writeDash";
import stateStore from "../../mobX/stateStore";

const Display = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const [img, setImg] = useState(new Image());
  // РАЗМЕРЫ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const [defaultWidthImg, setDefaultWidthImg] = useState<number>(100);
  const [defaultHeightImg, setDefaultHeightImg] = useState<number>(100);
  const [newWidth, setNewWidth] = useState<number>(100);
  const [newHeight, setNewHeight] = useState<number>(100);
  const [minPicX, setMinPicX] = useState<number>(250);
  const [maxPicX, setMaxPicX] = useState<number>(350);
  const [minPicY, setMinPickY] = useState<number>(250);
  const [maxPicY, setMaxPickY] = useState<number>(350);
  const [resize, setResize] = useState<boolean>(false);
  const [defaultMouseX, setDefaultMouseX] = useState<number>(0);
  const [defaultMouseY, setDefaultMouseY] = useState<number>(0);
  
  // Другие стейты~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  useEffect(() => {
    canvas.current && (ctx.current = canvas.current?.getContext('2d'));
    img.src = 'http://habrahabr.ru/i/nocopypast.png';
    img.onload = function () {
    ctx.current?.drawImage(img, 250, 250, defaultWidthImg, defaultHeightImg);
    }
  }, []);

  const mouseDown: MouseEventHandler<HTMLCanvasElement> = (e) => {
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;
    if (mouseX >= minPicX && mouseX <= maxPicX && mouseY >= minPicY && mouseY <= maxPicY) {
      stateStore.setMovePic(true)
      setDefaultMouseX(mouseX);
      setDefaultMouseY(mouseY);
    } else if (mouseX >= maxPicX && mouseX <= maxPicX + 15 && mouseY >= maxPicY && mouseY <= maxPicY + 15 && stateStore.installDash) {
      console.log('попал');
      setDefaultMouseX(mouseX);
      setDefaultMouseY(mouseY);
      setResize(true);
    }
  }

  const mouseMove: MouseEventHandler<HTMLCanvasElement> = (e) => {
    if (!canvas.current) return;
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;
    if (stateStore.movePic) {

      
      ctx.current?.clearRect(0, 0, canvas.current.width, canvas.current.height);
      ctx.current?.drawImage(img, mouseX - (mouseX - minPicX), mouseY - (mouseY - minPicY), newWidth, newHeight);
    } else if (resize) {
      const deltaX = mouseX - defaultMouseX;
      const deltaY = mouseY - defaultMouseY;
      setNewWidth(defaultWidthImg + deltaX);
      setNewHeight(defaultHeightImg + deltaY);
      ctx.current?.clearRect(0, 0, canvas.current.width, canvas.current.height);
      ctx.current?.drawImage(img, 250, 250, newWidth, newHeight);
    }

  }

  const mouseUp: MouseEventHandler<HTMLCanvasElement> = (e) => {
    if (!ctx.current || !canvas.current) return;
    if (resize || stateStore.movePic) {
      setDefaultWidthImg(newWidth);
      setDefaultHeightImg(newHeight);
      setMaxPicX(newWidth + minPicX);
      setMaxPickY(newHeight + minPicY);
      canvas.current && (ctx.current?.clearRect(0, 0, canvas.current.width, canvas.current.height));
      ctx.current?.drawImage(img, 250, 250, newWidth, newHeight);
      writeDash(ctx.current, [5, 5], minPicX, minPicY, newWidth + minPicX, newHeight + minPicY, newWidth, newHeight, resize);
      setResize(false)
    }
    
    stateStore.setMovePic(false);
    
    
    
  }
  return (

    <canvas onMouseMove={(e) => mouseMove(e)} onMouseUp={(e) => mouseUp(e)} onMouseDown={(e) => mouseDown(e)} ref={canvas} width={600} height={600}>тут холст</canvas>
  );
}

export default Display;