import { useState } from 'react';
import FormSections from './components/FormSections.jsx';
import GeneralForm from './components/GeneralForm.jsx';
import CVpreview from './components/CVpreview.jsx';

function App() {
  const [generalInformations, setGeneralInformations] = useState({
    name: '',
    lastName: '',
    email: '',
    tel: '',
    location: '',
    summary: '',
    skills: [
      { id: 0, skill: '', expertise: '' },
      { id: 1, skill: '', expertise: '' },
    ],
    languages: [
      { id: 0, language: '', fluency: '' },
      { id: 1, language: '', fluency: '' },
    ],
    hobbies: '',
  });

  return (
    <div className='max-w-[1500px] w-[1500px] max-h-[29.7cm] flex justify-center gap-6
    p-5'>
      <FormSections>
        <GeneralForm generalInformations={generalInformations}
        setGeneralInformations={setGeneralInformations} />
      </FormSections>
      <CVpreview generalInformations={generalInformations} />
    </div>
  );
}

export default App;
