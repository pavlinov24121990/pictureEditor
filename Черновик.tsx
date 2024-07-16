

import { MouseEventHandler, useEffect, useRef, useState } from "react";
import '../../styles/components/main/display.scss';

const Display = () => {
  const canvasTwoRef = useRef<HTMLCanvasElement>(null);
  const ctxTwoRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [offsetXImg, setOffsetXImg] = useState<number>(0);
  const [offsetYImg, setOffsetYImg] = useState<number>(0);
  const [pic, setPic] = useState<HTMLImageElement>(new Image());
  const [minX, setMinX] = useState<number>(100);
  const [maxX, setMaxX] = useState<number>(200);
  const [minY, setMinY] = useState<number>(100);
  const [maxY, setMaxY] = useState<number>(200);
  const [dottedLine, setDottedLine] = useState<boolean>(false);
  const [resize, setResize] = useState<boolean>(false);

  useEffect(() => {
    if (canvasTwoRef.current) {
      const canvas = canvasTwoRef.current;
      const ctx = canvas.getContext('2d');
      ctxTwoRef.current = ctx;
    }
    pic.src = 'http://habrahabr.ru/i/nocopypast.png';
    pic.onload = function() {
      const ctx = ctxTwoRef.current;
      if (ctx) {
        ctx.drawImage(pic, 100, 100, 100, 100);
      }
    };
  }, []);

  const mouseDown: MouseEventHandler<HTMLCanvasElement> = (e): void => {
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;
    const ctx = ctxTwoRef.current;
    if (!ctx) return;
    if (mouseX >= minX && mouseX <= maxX && mouseY >= minY && mouseY <= maxY) {
      setIsDragging(true);
      setOffsetXImg(mouseX - minX);
    setOffsetYImg(mouseY - minY);
    }
    if (mouseX >= maxX && mouseX <= maxX + 20 && mouseY >= maxY && mouseY <= maxY + 20 && ctx.getLineDash().length != 0) {
      setResize(true);
      console.log('dsfsf')
      setOffsetXImg(mouseX - minX);
    setOffsetYImg(mouseY - minY);
    }
    setOffsetXImg(mouseX - minX);
    setOffsetYImg(mouseY - minY);
  }
  
  const mouseMove: MouseEventHandler<HTMLCanvasElement> = (e): void => {
    const canvas = canvasTwoRef.current;
    const ctx = ctxTwoRef.current;
    if (!canvas || !ctx) return;
    ctx.shadowBlur = 20;
    ctx.shadowColor = 'rgba(0, 0, 0, 1)';
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;
    const newMaxX = mouseX + (maxX - minX - 100);
    const newMaxY = mouseY + (maxY - minY - 100);
    if (isDragging) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(pic, mouseX - offsetXImg, mouseY - offsetYImg, 100, 100);
      setDottedLine(true)
    }
    if (resize) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(pic, minX, minY, newMaxX - minX - 10, newMaxY - minY - 10);
      setDottedLine(true)
    }
  }

  const mouseUp: MouseEventHandler<HTMLCanvasElement> = (e): void => {
    const canvas = canvasTwoRef.current;
    const ctx = ctxTwoRef.current;
    if (!canvas || !ctx) return;

    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;
    if (isDragging) {
      setMinX(mouseX - offsetXImg);
      setMaxX(mouseX - offsetXImg + 100);
      setMinY(mouseY - offsetYImg);
      setMaxY(mouseY - offsetYImg + 100);
      
      ctx.shadowBlur = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(pic, mouseX - offsetXImg, mouseY - offsetYImg, 100, 100);
      setIsDragging(false)
      if (dottedLine) {
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(mouseX - offsetXImg - 10, mouseY - offsetYImg - 10, maxX - minX + 20, maxY - minY + 20);
        setDottedLine(false)
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.moveTo(mouseX - offsetXImg + (maxX - minX) + 15, mouseY - offsetYImg + (maxY - minY));
        ctx.lineTo(mouseX - offsetXImg + (maxX - minX) + 15, mouseY - offsetYImg + (maxY - minY) + 15);
        ctx.moveTo(mouseX - offsetXImg + (maxX - minX), mouseY - offsetYImg + (maxY - minY + 15));
        ctx.lineTo(mouseX - offsetXImg + (maxX - minX) + 15, mouseY - offsetYImg + (maxY - minY) + 15);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
      } else if (ctx.getLineDash().length > 0) {
        ctx.setLineDash([]);
      } else {
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(mouseX - offsetXImg - 10, mouseY - offsetYImg - 10, maxX - minX + 20, maxY - minY + 20);
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.moveTo(mouseX - offsetXImg + (maxX - minX) + 15, mouseY - offsetYImg + (maxY - minY));
        ctx.lineTo(mouseX - offsetXImg + (maxX - minX) + 15, mouseY - offsetYImg + (maxY - minY) + 15);
        ctx.moveTo(mouseX - offsetXImg + (maxX - minX), mouseY - offsetYImg + (maxY - minY + 15));
        ctx.lineTo(mouseX - offsetXImg + (maxX - minX) + 15, mouseY - offsetYImg + (maxY - minY) + 15);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        
      }
    }
    if (resize) {
      setMinX(mouseX - offsetXImg);
      setMaxX(mouseX - offsetXImg + 100);
      setMinY(mouseY - offsetYImg);
      setMaxY(mouseY - offsetYImg + 100);
      const newMaxX = mouseX + (maxX - minX - 100);
      const newMaxY = mouseY + (maxY - minY - 100);
      setMinX(mouseX - offsetXImg);
      setMaxX(newMaxX);
      setMinY(mouseY - offsetYImg);
      setMaxY(newMaxY);
      setResize(false)
      ctx.setLineDash([5, 5]);
        ctx.strokeRect(minX - 10, minY - 10, newMaxX - minX + 10, newMaxY - minY + 10);
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.moveTo(mouseX - offsetXImg + (maxX - minX) + 15, mouseY - offsetYImg + (maxY - minY));
        ctx.lineTo(mouseX - offsetXImg + (maxX - minX) + 15, mouseY - offsetYImg + (maxY - minY) + 15);
        ctx.moveTo(mouseX - offsetXImg + (maxX - minX), mouseY - offsetYImg + (maxY - minY + 15));
        ctx.lineTo(mouseX - offsetXImg + (maxX - minX) + 15, mouseY - offsetYImg + (maxY - minY) + 15);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
    }
  }
  return (

    <canvas onMouseDown={(e) => mouseDown(e)} onMouseUp={(e) => mouseUp(e)} onMouseMove={(e) => mouseMove(e)} id='displayTwo' ref={canvasTwoRef} width={600} height={600}>тут холст</canvas>
  );
}

export default Display;
