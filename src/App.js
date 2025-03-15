/* TASKS WE ARE GONNA DO
1. Install dependencies -done
npm install @tensorflow/tfjs @tensorflow-models/handpose react-webcam

2. Import dependencies - done
3. setup webcam and canvas - done
4. define references to those -done
5. load handpose - done
6. detect function -done
7. drawing utilities from tensorflow -
8. draw functions -made in utilities

*/

//import logo from './logo.svg';
import "./App.css";
//import dependencies
import React, { useRef ,useEffect } from "react"; //useRef allow us to have refernces to the elements on our webpage
import * as tf from "@tensorflow/tfjs"; //give us tensorflow backend
import * as handpose from "@tensorflow-models/handpose"; //allow to make detection
import Webcam from "react-webcam"; //allow us to use webcam of our machine

import { drawHand } from "./new/utilities"; //

function App() {
  const webcamRef = useRef(null)
  // Stores a reference to the webcam component, allowing us to access the webcam's video stream.
  const canvasRef = useRef(null)
  //Stores a reference to the canvas element, which will be used to draw hand landmarks.

  //loaidng handpose model
  useEffect(() => {
    const runHandpose = async () => {
      const net = await handpose.load();
      console.log("Handpose model loaded");
      //loop and detect if hand in frame every 100ms  ....setinterval(arrfn{} ,100)
      setInterval( () => {
        detect(net);
      },100)

    };
    runHandpose();
  }, []); // Empty dependency array ensures it runs only once

  const detect = async (net) =>{
    //check if data is available
    if(
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4 
    ){
      //get video properties
      const video = webcamRef.current.video
      const videoWidth = webcamRef.current.video.videoWidth
      const videoHeight = webcamRef.current.video.videoHeight

      //set video height and width
      webcamRef.current.video.width = videoWidth
      webcamRef.current.video.height = videoHeight

      //set canvas height and width
      canvasRef.current.width = videoWidth
      canvasRef.current.height = videoHeight
      
      //make detections
      const hand = await net.estimateHands(video);
      console.log(hand);

      //draw mesh - using drawHand function imported from utilities
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand,ctx)

    }
  }



  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;
