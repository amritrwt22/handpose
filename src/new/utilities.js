//drawing function


//Points for fingers
const fingerJoints = {
    thumb : [0,1,2,3,4],
    indexFinger : [0,5,6,7,8],
    middleFinger : [0,9,10,11,12],
    ringFinger : [0,13,14,15,16],
    pinky : [0,17,18,19,20],
}
// Infinity Gauntlet Style
const style = {
0: { color: "yellow", size: 15 },
1: { color: "gold", size: 6 },
2: { color: "green", size: 10 },
3: { color: "gold", size: 6 },
4: { color: "gold", size: 6 },
5: { color: "purple", size: 10 },
6: { color: "gold", size: 6 },
7: { color: "gold", size: 6 },
8: { color: "gold", size: 6 },
9: { color: "blue", size: 10 },
10: { color: "gold", size: 6},
11: { color: "gold", size: 6},
12: { color: "gold", size: 6 },
13: { color: "red", size: 10 },
14: { color: "gold", size: 6},
15: { color: "gold", size: 6},
16: { color: "gold", size: 6},
17: { color: "orange", size: 10 },
18: { color: "gold", size: 6 },
19: { color: "gold", size: 6 },
20: { color: "gold", size: 6},
};


//drawhand is a arrrow fn with parameters pred,ctx
export const drawHand = (predictions,ctx) => {
    //Check if we have predictions
    if(predictions.length > 0){
        //Loop through each prediction
        predictions.forEach((prediction) => {

            //Grab landmarks
            const landmarks = prediction.landmarks;

            //loop through fingers & draw lines
            for(let j=0 ; j<Object.keys(fingerJoints).length ; j++){
                let finger = Object.keys(fingerJoints)[j];

                //loop through pair of joints in a finger
                for(let k=0 ; k<fingerJoints[finger].length-1 ; k++){
                    const firstJointIndex = fingerJoints[finger][k];
                    const secondJointIndex = fingerJoints[finger][k+1];

                    //draw path using html canvas functions
                    ctx.beginPath()
                    ctx.moveTo(
                        landmarks[firstJointIndex][0],
                        landmarks[firstJointIndex][1],
                    )
                    ctx.lineTo(
                        landmarks[secondJointIndex][0],
                        landmarks[secondJointIndex][1],
                    )
                    ctx.strokeStyle = "gold"
                    ctx.lineWidth = 4
                    ctx.stroke()

                }

            } 


            //loop through landmark and draw them
            for(let i=0 ; i<landmarks.length ; i++){
                //Get point x
                const x =landmarks[i][0];
                //Get point y
                const y =landmarks[i][1];

        //Start drawing - using html canvas (go check)
        //for gauntlet we dynamically assign the point size and fillstyle...
                ctx.beginPath();
                ctx.arc(x, y, style[i]["size"], 0, 3 * Math.PI);
                
                //set line color
                ctx.fillStyle = style[i]["color"];  // Make points visible
                ctx.fill();
            }
            
        });

    }

}