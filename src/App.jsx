import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import CVcustomizer from './components/CVcustomizer.jsx';
import FormContainer from './components/FormContainer.jsx';
import GeneralForm from './components/GeneralForm.jsx';
import EducationForm from './components/EducationForm.jsx';
import CVpreview from './components/CVpreview.jsx';
import general, { randomStrings, education } from './components/data/data';
import { getRandomItem } from './components/utils';

function App() {
  const [moveForms, setMoveForms] = useState('idle');
  const [lastKeys, setLastKeys] = useState({});
  const [generalInformations, setGeneralInformations] = useState(general);
  const [educationInformations, setEducationInformations] = useState(education);

  const handleGeneralChange = (e, key, [category = null, innerObjectId = null]) => {
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

  const handleEducationChange = (e, key) => {
    if (!(key in educationInformations)) return;

    setEducationInformations((prevState) => ({
      ...prevState,
      [key]: e.target.value,
    }));
  };

  const handleImgChange = (e) => {
    const { files } = e.target;
    if (files.length <= 0) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setGeneralInformations({
        ...generalInformations,
        profilePicture: reader.result,
      });
    };
    reader.readAsDataURL(file);
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
        id: uuidv4(), [entryKeys[1]]: '', [entryKeys[2]]: '', [entryKeys[3]]: getRandomItem(randomStrings.general[key]),
      });
    }

    setGeneralInformations((prevState) => ({
      ...prevState,
      [key]: [...target],
    }));
  };

  const handleMovingSide = (movingSide) => {
    setMoveForms(movingSide);
  };

  const handleNextBtnClick = (movingSide) => {
    if (!'idle left right'.includes(movingSide)) return;
    handleMovingSide(movingSide);
  };

  const fadingBottomContainer = <div className="absolute -bottom-1 w-full h-24 bg-gradient-to-t from-white
  pointer-events-none"></div>;

  return (
    <div className='max-w-[1500px] w-[1500px] max-h-[29.7cm] flex justify-center gap-6
    p-5'>
      <CVcustomizer handleNextBtnClick={handleNextBtnClick}>
        <FormContainer fadingBottomContainer={fadingBottomContainer}
        childrenRelatedData={['general', 'education', 'experiences']}
        handleMovingSide={handleMovingSide} movingSide={moveForms}>

          <GeneralForm generalInformations={generalInformations}
          handleInputChange={handleGeneralChange} handleAddOrRemoveBtnClick={handleClick}
          handleImgChange={handleImgChange} />

          <EducationForm educationInformations={educationInformations}
          handleChange={handleEducationChange}
          />
        </FormContainer>
      </CVcustomizer>
      <CVpreview generalInformations={generalInformations} />
    </div>
  );
}

export default App;
