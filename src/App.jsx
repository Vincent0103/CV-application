import { useState } from 'react';
import CVcustomizer from './components/CVcustomizer.jsx';
import GeneralForm from './components/GeneralForm.jsx';
import CVpreview from './components/CVpreview.jsx';

function App() {
  const [generalInformations, setGeneralInformations] = useState({
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
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

  const handleChange = (e, key, [category = null, innerObjectId = null]) => {
    if (!(key in generalInformations)) return;

    if (category !== null && innerObjectId !== null) {
      setGeneralInformations((prevState) => ({
        ...prevState,
        [key]: prevState[key].map((entry) => (
          (entry.id !== innerObjectId) ? entry : { ...entry, [category]: e.target.value }
        )),
      }));
    } else {
      setGeneralInformations((prevState) => ({
        ...prevState,
        [key]: e.target.value,
      }));
    }
  };

  return (
    <div className='max-w-[1500px] w-[1500px] max-h-[29.7cm] flex justify-center gap-6
    p-5'>
      <CVcustomizer>
        <GeneralForm generalInformations={generalInformations} handleChange={handleChange} />
      </CVcustomizer>
      <CVpreview generalInformations={generalInformations} />
    </div>
  );
}

export default App;
