import React, { useState } from 'react';

const method = (navigation) => {
    const colors = [0,1,2,3,4,5,6,7,8,9,10,11];
    const [bgColor, setBgColor] = useState(
        [
            ['#FF9966', '#FF5E62'],
            ['#56CCF2', '#2F80ED'],
            ['#4776E6', '#8E54E9'],
            ['#00B09B', '#96C93D'],
            ['#A8C0FF', '#3F2B96'],
            ['#ED213A', '#93291E'],
            ['#FDC830', '#F37335'],
            ['#00B4DB', '#0083B0'],
            ['#AD5389', '#3C1053'],
            ['#EC008C', '#FC6767'],
            ['#DA4453', '#89216B'],
            ['#654EA3', '#EAAFC8']
        ]
    );
    const [selectedColor, setSelectedColor] = useState(0);

    return {
       colors,
       bgColor,
       selectedColor,
       setSelectedColor
    };
  };
  
  export default method;