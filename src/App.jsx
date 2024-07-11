import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import CVcustomizer from './components/CVcustomizer.jsx';
import FormContainer from './components/FormContainer.jsx';
import GeneralForm from './components/GeneralForm.jsx';
import EducationForm from './components/EducationForm.jsx';
import ExperiencesForm from './components/ExperiencesForm.jsx';
import CVpreview from './components/CVpreview.jsx';
import general, { randomStrings, education, defaultGeneral, defaultEducation } from './components/data/data';
import { getRandomItem, getState } from './components/utils';

function App() {
  const [moveForms, setMoveForms] = useState('idle');
  const [currentlyVisibleElement, setCurrentlyVisibleElement] = useState('general');
  const [generalInformations, setGeneralInformations] = useState(general);
  const [educationInformations, setEducationInformations] = useState(education);

  const formDefaultInformations = {
    general: defaultGeneral,
    education: defaultEducation,
  };

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

  const handleEducationChange = (e, key, educationId) => {
    if (!(key in educationInformations[0])) return;

    const index = educationInformations.findIndex((item) => item.id === educationId);
    educationInformations[index][key] = e.target.value;
    setEducationInformations([...educationInformations]);
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

  const handleClick = (formName, key, id = null) => {
    const [informations, setInformations] = getState(
      formName,
      [generalInformations, setGeneralInformations],
      [educationInformations, setEducationInformations],
    );

    if (formName === 'general') {
      if (!(key in informations)) return;
      if (!Array.isArray(informations[key])) return;

      const target = [...informations[key]];

      const isRemovingEntry = !!id;
      if (isRemovingEntry) {
        const indexOfRemovingEntry = target.findIndex((item) => item.id === id);
        target.splice(indexOfRemovingEntry, 1);
      } else {
        const entryKeys = Object.keys(formDefaultInformations.general[key][0]);
        target.push({
          id: uuidv4(), [entryKeys[1]]: '', [entryKeys[2]]: '', [entryKeys[3]]: getRandomItem(randomStrings.general[key]),
        });
      }

      setInformations((prevState) => ({
        ...prevState,
        [key]: [...target],
      }));
    } else if (formName === 'education') {
      const newEducation = {
        ...formDefaultInformations.education,
        id: uuidv4(),
      };
      setInformations((prevState) => ([
        ...prevState,
        { ...newEducation },
      ]));
    }
  };

  const handleMovingSide = (movingSide) => {
    setMoveForms(movingSide);
  };

  const handleFormSwitcherBtn = (movingSide) => {
    if (!'idle left right'.includes(movingSide)) return;

    const movingSideMap = {
      left: {
        experiences: 'education',
        education: 'general',
      },
      right: {
        general: 'education',
        education: 'experiences',
      },
    };

    handleMovingSide(movingSide);
    setCurrentlyVisibleElement(movingSideMap[movingSide][currentlyVisibleElement]);
  };

  return (
    <div className='max-w-[1500px] w-[1500px] max-h-[29.7cm] flex justify-center gap-6
    p-5'>
      <CVcustomizer handleFormSwitcherBtn={handleFormSwitcherBtn}
      currentlyVisibleElement={currentlyVisibleElement}>
        <FormContainer childrenRelatedData={['general', 'education', 'experiences']}
        handleMovingSide={handleMovingSide} movingSide={moveForms}
        currentlyVisibleElement={currentlyVisibleElement}>

          <GeneralForm generalInformations={generalInformations}
          handleInputChange={handleGeneralChange} handleAddOrRemoveBtnClick={handleClick}
          handleImgChange={handleImgChange} />

          <EducationForm educationInformations={educationInformations}
          handleInputChange={handleEducationChange} handleAddOrRemoveBtnClick={handleClick}
          />

          <ExperiencesForm />
        </FormContainer>
      </CVcustomizer>
      <CVpreview generalInformations={generalInformations}
      educationInformations={educationInformations} />
    </div>
  );
}

export default App;
