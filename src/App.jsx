import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import CVcustomizer from './components/CVcustomizer.jsx';
import GeneralForm from './components/GeneralForm.jsx';
import CVpreview from './components/CVpreview.jsx';
import general, { randomStrings } from './components/data/data.js';
import { getRandomItem } from './components/utils.js';

function App() {
  const [currentlyShowingForm, setCurrentlyShowingForm] = useState(0);
  const [lastKeys, setLastKeys] = useState({});
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

  const handleClick = (key, id = null) => {
    if (!(key in generalInformations)) return;
    if (!Array.isArray(generalInformations[key])) return;

    const target = [...generalInformations[key]];

    const isRemovingEntry = !!id;
    if (isRemovingEntry) {
      const indexOfRemovingEntry = target.findIndex((item) => item.id === id);
      target.splice(indexOfRemovingEntry, 1);
      if (!(key in lastKeys)) {
        setLastKeys({
          ...lastKeys,
          [key]: Object.keys(target[0]),
        });
      }
    } else {
      const entryKeys = lastKeys[key] || Object.keys(target[0]);
      target.push({
        id: uuidv4(), [entryKeys[1]]: '', [entryKeys[2]]: '', [entryKeys[3]]: getRandomItem(randomStrings[key]),
      });
    }

    setGeneralInformations((prevState) => ({
      ...prevState,
      [key]: [...target],
    }));
  };

  const handleNextBtnClick = () => {
    const FIRST_INDEX = 0;
    const forms = ['general', 'education', 'experiences'];
    if (currentlyShowingForm < FIRST_INDEX || currentlyShowingForm > forms.length) return;
    setCurrentlyShowingForm(currentlyShowingForm + 1);
  };

  return (
    <div className='max-w-[1500px] w-[1500px] max-h-[29.7cm] flex justify-center gap-6
    p-5'>
      <CVcustomizer handleNextBtnClick={handleNextBtnClick}
      currentlyShowingForm={currentlyShowingForm}>
        <GeneralForm generalInformations={generalInformations} handleInputChange={handleChange}
        handleAddOrRemoveBtnClick={handleClick} />
      </CVcustomizer>
      <CVpreview generalInformations={generalInformations} />
    </div>
  );
}

export default App;
