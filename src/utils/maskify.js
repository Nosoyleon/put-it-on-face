import * as faceapi from 'face-api.js';

const getOverlayValues = landmarks => {
  const nose = landmarks.getNose();
  const jawline = landmarks.getJawOutline();

  const jawLeft = jawline[0];
  const jawRight = jawline.splice(-1)[0];
  const adjacent = jawRight.x - jawLeft.x;
  const opposite = jawRight.y - jawLeft.y;
  const jawLength = Math.sqrt(adjacent ** 2 + opposite ** 2);

  // Both of these work. The chat believes atan2 is better.
  // I don't know why. (It doesn’t break if we divide by zero.)
  // const angle = Math.round(Math.tan(opposite / adjacent) * 100)
  const angle = Math.atan2(opposite, adjacent) * (180 / Math.PI);
  const width = jawLength * 2.2;

  return {
    width,
    angle,
    leftOffset: jawLeft.x - width * 0.27,
    topOffset: nose[0].y - width * 0.47
  };
};

export function loadModels() {
  const MODEL_URL = `${process.env.PUBLIC_URL}/models`;
  return Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL)
  ]);
}

export async function maskify(maskUrl, imageContainer, originalImage) {
  const scale = originalImage.width / originalImage.naturalWidth;

  return new Promise(resolve => {
    const handleImage = newImage => async () => {
      const detection = await faceapi
        .detectSingleFace(newImage, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks(true);

      if (!detection) {
        resolve('no-face');
        return;
      }

      const overlayValues = getOverlayValues(detection.landmarks);

      const overlay = document.createElement('img');
      overlay.src = maskUrl;
      overlay.id = 'mask-overlay';
      overlay.alt = 'mask overlay.';
      overlay.style.cssText = `
          position: absolute;
          left: ${overlayValues.leftOffset * scale}px;
          top: ${overlayValues.topOffset * scale}px;
          width: ${overlayValues.width * scale}px;
          transform: rotate(${overlayValues.angle}deg);
        `;

      imageContainer.appendChild(overlay);
      resolve('masked');
    };

    // To avoid CORS issues we create a cross-origin-friendly copy of the image.
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.addEventListener('load', handleImage(image));
    image.src = originalImage.src;
  });
}
