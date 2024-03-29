import { useEffect } from "react";

const Display = () => {

  
  useEffect(() => {
    const canvas = document.getElementById('display') as HTMLCanvasElement
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'red';
      ctx.fillRect(100, 100, 200, 200);
    }
  }, []);

  return (

    <div>
      <canvas id='display' width={600} height={600}>тут холст</canvas>
    </div>
  )
}

export default Display;
