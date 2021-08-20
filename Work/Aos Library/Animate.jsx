import React, { useState,useEffect } from 'react'
import { useSpring, a } from '@react-spring/web'



const Animate = () => {
  const ref = React.useRef(null)
  const [oneTime,setOneTime] = useState(true)
  const [visible,setVisible] = useState(false);
  const options ={
    threshold: 1.0
  }
  useEffect(()=>{
    const observer = new IntersectionObserver(([entry]) =>{
        setVisible(entry.isIntersecting);
    },options)

    if (ref.current){
      observer.observe(ref.current);
    }

    return () =>{
      if (ref.current){
        observer.unobserve(ref.current);
      }
    };
    
  },[ref,options]);

   

  const [flipped, set] = useState(false)
  const [useMarginLeft, setMarginLeft] = useState("30px")
  const [useMarginTop, setMarginTop] = useState("-200px")
  const [image, setImage] = useState("/images/flowChart/1.png")
  const { transform, opacity } = useSpring({
    opacity: flipped ? 0 : 0,
    transform: `perspective(400px) rotateX(${flipped ? 360 : 0}deg)`,
    config: { mass: 2, tension: 100, friction: 30 },
  })

  if (visible){
    if (oneTime==true){
      set(true);
      setImage("/images/flowChart/2.png")
      setMarginTop("-170px")
      setOneTime(false);
    }

  }

  if(!visible){
    if (oneTime==false){
    set(false);
    setImage("/images/flowChart/1.png") 
    setMarginTop("-200px")
    setOneTime(true);
    }
  }
  
  function mouseEnter(){
  
    set(false);
    setImage("/images/flowChart/1.png")
    setMarginTop("-200px")
  }
  function mouseLeave(){
   
    set(true);
    setImage("/images/flowChart/2.png")
    
    setMarginTop("-170px")
  }
  
  return (
  
      <div onMouseOver={mouseEnter}  onMouseOut={mouseLeave}  >
          <img width="780" style={{marginLeft:"1px"}} src= "/images/flowChart/grid.png" ref={ref}/>
          <a.img onMouseOver={mouseEnter} width="707" height="107"  src= {image}  style={{opacity: opacity.to(o => 1 - o), transform , position:"absolute",marginTop:useMarginTop ,marginLeft:useMarginLeft}} />  
      </div>
   
  );
}
 
export default Animate;
