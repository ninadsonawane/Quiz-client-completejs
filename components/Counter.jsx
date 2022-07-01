import React, { useEffect, useState } from 'react'

export const Counter = ({ set }) => {

  const [countdown , setCountDown] = useState(10);

  
  useEffect(() => {
    const timer =
    countdown > 0 && setInterval(() => setCountDown(countdown - 1), 1000);
    return () => clearInterval(timer);
  },[countdown])


  if(countdown === 0) {
    set();
    setCountDown(10);
  }


  return (
    <div>{countdown}</div>
  )
}
