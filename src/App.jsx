import { useState } from 'react';
import CVcustomizer from './components/CVcustomizer.jsx';
import GeneralForm from './components/GeneralForm.jsx';
import CVpreview from './components/CVpreview.jsx';
import general, { randomStrings } from './components/data/data.js';
import { getRandomItem } from './components/utils.js';

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

  const handleClick = (key, removingEntryId) => {
    if (!(key in generalInformations)) return;
    if (!Array.isArray(generalInformations[key])) return;

    const target = [...generalInformations[key]];
    if (typeof removingEntryId === 'number') {
      const indexOfRemovingEntry = target.indexOf((item) => item.id === removingEntryId);
      target.splice(indexOfRemovingEntry, 1);
    } else {
      const entryKeys = Object.keys(target[0]);
      const lastId = target[target.length - 1].id;
      target.push({ id: lastId + 1, [entryKeys[1]]: '', [entryKeys[2]]: '', [entryKeys[3]]: getRandomItem(randomStrings[key])});
    }

    setGeneralInformations((prevState) => ({
      ...prevState,
      [key]: [...target],
    }));
  };

  return (
    <div className='max-w-[1500px] w-[1500px] max-h-[29.7cm] flex justify-center gap-6
    p-5'>
      <CVcustomizer>
        <GeneralForm generalInformations={generalInformations} handleChange={handleChange}
        handleClick={handleClick} />
      </CVcustomizer>
      <CVpreview generalInformations={generalInformations} />
    </div>
  );
}

export default App;
