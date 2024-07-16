import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react"
import { useEffect } from "react";
import { fabric } from "fabric";
import '../../styles/components/main/display.scss';


const Display = () => {
  const { editor, onReady } = useFabricJSEditor();

  useEffect(() => {
    fabric.Image.fromURL('http://habrahabr.ru/i/nocopypast.png', function (oImg) {
      oImg.set({ left: 250, top: 250 });
      editor?.canvas.add(oImg);
      oImg.on('mousedown', function(options) {
      });
    });
  }, [fabric, editor])

  return (
    <div className="canv">
      <FabricJSCanvas className="sample-canvas" onReady={onReady} />
    </div>
  )
}

export default Display;