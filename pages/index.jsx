import { useEffect, useState } from 'react';
import { Counter } from '../components/Counter';


export default function Index() {
  const [data , setData ] = useState(null);
  const [userInput , setUserInput] = useState({
      userName:"",
      questionSelected:[],
      optionSelected:[]
})
   const { userName } = userInput
  const [counter , setCounter ] = useState(-1)
  useEffect(() => {
    fetch('http://localhost:6060/questions')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  }, [])
  
  const handleChange = (option , question) => {
   setUserInput({...userInput , optionSelected : [...userInput.optionSelected , option] , questionSelected: [...userInput.questionSelected , question] })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setCounter(0)
  }
  const handleNext = () => {
    setCounter(c => c+1)
  }
  
  if(counter === -1) {
    return (
      <div className='m-8'>
        <form onSubmit={handleSubmit}>
        <h1 className='font-bold text-lg'>Enter your username</h1>
        <input value={userName} onChange={(e) => setUserInput({ ...userInput , userName : e.target.value })} ></input>
        <button onSubmit={handleSubmit} >GO!</button>
        </form>
      </div>
    )
  }
  
 console.log(userInput);

    return (
      <div className='m-8'>
        { 
          data?.map((q,index) => {
          if (counter === index && counter !== data.length - 1  ) {
          return  (
              <div key={q.id}>
               <h1 className='font-bold text-lg'>{q.question}</h1>
                {
                  q.options.map((op) => {
                    return (
                     <div key={op.id}>
                      <input onChange={(e) => handleChange(e.target.value, index + 1)}  id={op.value} type="radio" value={op.id} name="option" ></input>
                      <label className="text-lg" htmlFor={op.value}>{op.value}</label> 
                     </div>
                    )
                  }) 
                }
               {/* <button className='bg-sky-500/50 p-2 rounded-md' onClick={() => setCounter(c => c+1)} >Submit</button> */}
              </div>
            )       
          }  else if (counter  === data.length - 1 && counter === index ) {
            return  (
              <div key={q.id}>
              <h1 className='font-bold text-lg'>{q.question}</h1>
              {
                  q.options.map((op) => {
                    return (
                     <div key={op.id}>
                      <input onChange={(e) => handleChange(e.target.value, index + 1)}  id={op.value} type="radio" value={op.id} name="option" ></input>
                      <label className="text-lg" htmlFor={op.value}>{op.value}</label> 
                     </div>
                    )
                  }) 
                }
              <button className='bg-sky-500/50 p-2 rounded-md'  onClick={() => {
                console.log(userInput)
                setCounter(0)
              }} >Save</button>
             </div>
            )
          }        
          })
        }    
        <div>
          <Counter set={handleNext} />
        </div>
      </div>
    );
  
}

