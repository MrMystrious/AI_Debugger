import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import { Button } from '@/components/ui/button';
import { EditorApp } from './components_/editor'; // Adjust import path as needed
import CustomizedDialogs from './components_/customizedDialog'; 
import BasicSelect from './components_/select';

export default function App() {
  const [openDialog,setOpenDialog] = useState(false)
  const [getcode,setGetcode] = useState(false)
  const [fixedCode,setFixedCode] = useState('')
  const [code,setCode] = useState('')
  const [showAlert,setShowAlert] = useState(false)
  
 const getFixedCode = async () => {
  try {
    const response = await fetch('http://localhost:3007/fix', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    const data = await response.json()
    console.log('data:', data)
    return data;
  } catch (error) {
    console.error('Error fetching fixed code:', error);
    return { fix: '' }
  }
}

  const handleOpenDialog = async () => {
  console.log('handling open dialog', openDialog);
  if (getcode === false) {
    setShowAlert(prev=>!prev)
    const { fix } = await getFixedCode();  
    setFixedCode(fix);
  }
  setShowAlert(false)
  setOpenDialog((prev) => !prev);
  setGetcode((prev) => !prev);
};

 


   console.log("Code : ",code)
   console.log("fixed Code : ",fixedCode)

  return (
    <div className="relative min-h-screen overflow-hidden">
      
      {/* SVG Background */}
      <div className="absolute inset-0 -z-10">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          overflow="auto"
          shapeRendering="auto"
          fill="#525252"
        >
          <defs>
            <path
              id="wavepath"
              d="M 0 2000 0 500 Q 108.5 291 217 500 t 217 0 217 0 217 0 217 0 217 0 217 0 v1000 z"
            />
            <path id="motionpath" d="M -434 0 0 0" />
          </defs>
          <g>
            <use xlinkHref="#wavepath" y="-390" fill="#9e57df">
              <animateMotion dur="5s" repeatCount="indefinite">
                <mpath xlinkHref="#motionpath" />
              </animateMotion>
            </use>
          </g>
        </svg>
      </div>
      <div className="relative z-10 p-4">
        {
          showAlert?<Alert variant="filled" severity="info" className={'absolute top-4 right-4 z-50'}>
            Wait till fixed code dialog gets automatically opened 
</Alert> :<div/>
        }
        <div>
          
        <Button
          variant="ghost"
          className="cursor-pointer bg-gray-200 hover:border-2 hover:border-green-400 border-gray-900 relative left-1/2 m-2 border-1 px-3"
          onClick = {handleOpenDialog}
        >
          Check bug
        </Button>
        </div>
        {
          openDialog?<CustomizedDialogs
                        openDialog={openDialog}
                        handleOpenDialog = {handleOpenDialog}
                        fixedCode ={fixedCode}
                      />:<span/>
        }
        <EditorApp 
          setCode = {setCode}
        />
      </div>
    </div>
  );
}
