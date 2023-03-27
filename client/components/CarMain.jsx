import React from 'react';
import {useRef, useEffect} from 'react';

import Car from './neuroCar/car'
import Control from './neuroCar/control'
import Road from './neuroCar/road'
import Sensor from './neuroCar/sensor'
import lerp from './neuroCar/utils'
import getIntersection from './neuroCar/utils'


const CarMain = (()=>{
    const canvasRef = useRef(null);

    useEffect(()=>{
        const canvas = canvasRef.current;
        canvas.width = 200;
    
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "blue"
        ctx.fillRect(0,0,100,100)
        console.log(canvasRef)
    }, [])

         
    
    return(
        <canvas ref={canvasRef} id = "myCanvas"/>
    )

})

export default CarMain