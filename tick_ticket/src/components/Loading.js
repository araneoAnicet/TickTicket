import React from 'react';
import {
    Audio,
    BallTriangle,
    Bars,
    Circles,
    Grid,
    Hearts,
    Oval,
    Puff,
    Rings,
    SpinningCircles,
    TailSpin,
    ThreeDots
} from '@agney/react-loading';

function Loading(props) {
    let animatedComponents = [
        <Audio color={props.color} height={props.height} style={props.style}/>,
        <BallTriangle color={props.color} height={props.height} style={props.style}/>,
        <Bars color={props.color} height={props.height} style={props.style}/>,
        <Circles color={props.color} height={props.height} style={props.style}/>,
        <Grid color={props.color} height={props.height} style={props.style}/>,
        <Hearts color={props.color} height={props.height} style={props.style}/>,
        <Oval color={props.color} height={props.height} style={props.style}/>,
        <Puff color={props.color} height={props.height} style={props.style}/>,
        <Rings color={props.color} height={props.height} style={props.style}/>,
        <SpinningCircles color={props.color} height={props.height} style={props.style}/>,
        <TailSpin color={props.color} height={props.height} style={props.style}/>,
        <ThreeDots color={props.color} height={props.height} style={props.style}/>
        ];
    if (props.loading) {
        return animatedComponents[Math.floor(Math.random()*animatedComponents.length)];    
    }
    return (
        <div>
            {props.children}
        </div>
  );
   
}

export default Loading;