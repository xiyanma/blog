/* eslint-disable react-hooks/exhaustive-deps */
import {
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
  useRef,
} from 'react';

export interface MagnifierProps {
  imageUrl: string,
};
export interface drawCanvasWithMagnifierData {
  offsetX: number,
  offsetY: number,
  width: number,
  height: number,
  target: [number, number, number],
}

export type MagnifierHandle = {
  drawCanvasWithMagnifier: (data: drawCanvasWithMagnifierData) => void,
  clearMagnifier: () => void,
}

export const Magnifier = forwardRef<MagnifierHandle, MagnifierProps>(({ imageUrl }, ref) => {
  const [image, setImage] = useState(new Image());
  const offCanvasElementRef = useRef<HTMLCanvasElement>(null);
  const offCanvas = offCanvasElementRef.current;
  const offContext = offCanvas?.getContext('2d');

  useImperativeHandle(ref, () => ({
    drawCanvasWithMagnifier,
    clearMagnifier
  }));

  useEffect(() => {
    image.src = imageUrl;
    setImage(image);
  }, [imageUrl]);

  const drawCanvasWithMagnifier = (data: drawCanvasWithMagnifierData) => {
    if (offCanvas && offContext) {
      const { offsetX, offsetY, width, height, target } = data;
      const [x, y] = target;

      offCanvas.width = width / 2;
      offCanvas.height = height / 2;
      clearMagnifier();

      let scale = 4.5;
      const targetWidth = 33;
      const targetHeight = 27;
      const dx = x - targetWidth / 2;
      const dy = y - targetHeight / 2;
      let dw = -targetWidth * scale;
      let dh = targetHeight * scale;
      let clientX = offsetX - 10;
      let clientY = offsetY + 10;

      // 若超出边框就移动放大镜
      // 超出左边框
      /*
      if (clientX - targetWidth * scale < 0) {
        dw = -dw;
        clientX = offsetX + 10;
      }

      // 超出下边框
      if (clientY + targetHeight * scale > offCanvas.height) {
        dh = -dh;
        clientY = offsetY - 10;
      }
      */

      //绘制放大镜边框
      offContext.lineWidth = 1.0;
      offContext.strokeStyle = '#069';
      offContext.strokeRect(clientX, clientY, dw, dh);

      //绘制放大镜图像
      offContext.drawImage(image, dx, dy, targetWidth, targetHeight, clientX, clientY, dw, dh);

      //绘制放大镜中心的十字瞄准线
      offContext.strokeStyle = '#F56565';
      offContext.moveTo(clientX + dw / 2, clientY);
      offContext.lineTo(clientX + dw / 2, clientY + dh);
      offContext.moveTo(clientX, clientY + dh / 2);
      offContext.lineTo(clientX + dw, clientY + dh / 2);
      offContext.stroke();
    }
  };

  const clearMagnifier = () => {
    if (offCanvas && offContext) {
      offContext.clearRect(0, 0, offCanvas.width, offCanvas.height);
    }
  };

  return (
    <canvas
      ref={offCanvasElementRef}
      style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none', zIndex: 9999999 }}>
    </canvas>
  );
});

