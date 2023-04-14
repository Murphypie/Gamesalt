import React from 'react';
import {useRef, useEffect} from 'react';

import Car from './neuroCar/car'
import Control from './neuroCar/control'
import Road from './neuroCar/road'
import Sensor from './neuroCar/sensor'
import lerp from './neuroCar/utils'
import getIntersection from './neuroCar/utils'

import "./../css/neuroCar.css"


const CarMain = (()=>{
    const canvasRef = useRef(null);
    
    useEffect(()=>{
        const canvas = canvasRef.current;
        canvas.width = 200;
        
        const ctx = canvas.getContext("2d");
        const road = new Road(canvas.width/2, canvas.width*0.9);
        const car = new Car(road.getLaneCenter(1), 100, 30, 50);
        animate();
        function animate(){
            car.update(road.borders);

            canvas.height=window.innerHeight; // When you resize the canvas in this way, it clears the canvas and redraw
        
            ctx.save();
            ctx.translate(0, -car.y+canvas.height*0.7);
        
            road.draw(ctx);
            car.draw(ctx);
        
            ctx.restore();
            requestAnimationFrame(animate) // Essentially recursive call
        }
        
    })

         
    
    return(
        <div id = 'carBody'>
            <canvas ref={canvasRef} id = "myCanvas"/>
        </div>
    )

})

export default CarMain