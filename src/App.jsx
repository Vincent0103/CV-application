import { useState } from 'react';
import FormSections from './components/FormSections';
import CVpreview from './components/CVpreview';

function App() {

  return (
    <div className='max-w-[1500px] flex justify-center content-center'>
      <FormSections />
      <CVpreview />
    </div>
  )
}

export default App
