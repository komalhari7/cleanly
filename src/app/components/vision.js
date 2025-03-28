import React from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import { useEffect, useRef, useState } from "react";
const Vision = () => {
  const [imgSrc, setImgsrc] = useState();
  const frameRef = useRef();
  const [detected, setDetected] = useState([]);
  const modelURL = "/model/model.json";
  const [model, setModel] = useState();

  const MODEL_CONFIG = {
    imgSize: [640, 640],
    stride: 32,
    task: "detect",
    batchSize: 1,
    numClasses: 18,
    classLabels: [
      "Aluminium foil",
      "Bottle cap",
      "Bottle",
      "Broken glass",
      "Can",
      "Carton",
      "Cigarette",
      "Cup",
      "Lid",
      "Other litter",
      "Other plastic",
      "Paper",
      "Plastic bag - wrapper",
      "Plastic container",
      "Pop tab",
      "Straw",
      "Styrofoam piece",
      "Unlabeled litter",
    ],
  };

  useEffect(() => {
    const loadModel = async () => {
      try {
        const result = await tf.loadGraphModel(modelURL, {
          onProgress: (f) => {
            console.log(f);
            window.x = f;
          },
        });
        console.log(result);
        setModel(result);
      } catch (e) {
        console.log(e);
      }
    };
    loadModel();
  }, []);
  const img = new Image();

  const frameInput = async () => {
    const frame = await frameRef.current.getScreenshot();

    img.src = frame;
    setImgsrc(img.src);
  };

  img.onload = async () => {
    try {
      console.log("Image loaded successfully!");
      const inputTensor = tf.tidy(() => {
        return tf.browser
          .fromPixels(img)
          .resizeBilinear(MODEL_CONFIG.imgSize)
          .div(255.0)
          .expandDims(0);
      });

      const result = await model.execute(inputTensor);
      console.log(result);
      console.log(result.array());
      const outputArray = await result.array();

      let maxArray = await outputArray[0].map((value, key) => {
        return Math.max(...value);
      });
      let detection = Array();
      if (maxArray) {
        for (let i = 4; i < 22; i++) {
          if (maxArray[i] > 0.5 && maxArray[i] <= 1) {
            let index = outputArray[0][i].map((value, index) => {
              if (maxArray[i] === value) {
                return index;
              }
            });

            let filteredIndex = index.filter((i) => {
              return i;
            });
         

            detection[detection.length] = {
              label: MODEL_CONFIG.classLabels[i - 4],
              score: maxArray[i] * 100,
              x: outputArray[0][0][filteredIndex[0]],
              y: outputArray[0][1][filteredIndex[0]],
              width: outputArray[0][2][filteredIndex[0]],
              height: outputArray[0][3][filteredIndex[0]],
            };
           
          }
        }
      }

      setDetected(detection);
   inputTensor.dispose();
    result.dispose();
      console.log(detection);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Webcam
        className="h-64 w-64 object-cover rounded-lg border-solid border-white border-4"
        videoConstraints={{
          facingMode: "environment",
          width: 640,
          height: 640,
          frameRate: { ideal: 10, max: 15 },
        }}
        ref={frameRef}
        audio={false}
      />
      {window.x}
      {model && (
        <button className="bg-blue-500 p-4 rounded-xl" onClick={frameInput}>
          {" "}
          Detect{" "}
        </button>
      )}
      {detected.map((value, index) => (
        <li key={index}> {value.label} </li>
      ))}
    </>
  );
};

export default Vision;


