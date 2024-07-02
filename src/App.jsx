import { useState } from 'react';
import CVcustomizer from './components/CVcustomizer.jsx';
import GeneralForm from './components/GeneralForm.jsx';
import CVpreview from './components/CVpreview.jsx';
import general from './components/data/data.js';

function App() {
  const [generalInformations, setGeneralInformations] = useState(general);

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
