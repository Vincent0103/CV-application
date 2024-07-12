import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import CVcustomizer from './components/CVcustomizer.jsx';
import FormContainer from './components/FormContainer.jsx';
import GeneralForm from './components/GeneralForm.jsx';
import EducationForm from './components/EducationForm.jsx';
import ExperiencesForm from './components/ExperiencesForm.jsx';
import CVpreview from './components/CVpreview.jsx';
import general, {
  randomStrings, education, experiences,
  defaultGeneral, defaultEducation, defaultExperiences,
} from './components/data/data';
import { getRandomItem, getState } from './components/utils';

function App() {
  const [moveForms, setMoveForms] = useState('idle');
  const [currentlyVisibleElement, setCurrentlyVisibleElement] = useState('general');
  const [generalInformations, setGeneralInformations] = useState(general);
  const [educationInformations, setEducationInformations] = useState(education);
  const [experiencesInformations, setExperiencesInformations] = useState(experiences);

  const formDefaultInformations = {
    general: defaultGeneral,
    education: defaultEducation,
    experiences: defaultExperiences,
  };

  const handleGeneralChange = (e, key, [category = null, innerObjectId = null]) => {
    if (!(key in formDefaultInformations.general)) return;

    if (category !== null && innerObjectId !== null) {
      setGeneralInformations((prevState) => ({
        ...prevState,
        [key]: prevState[key].map((object) => (
          (object.id !== innerObjectId) ? object : { ...object, [category]: e.target.value }
        )),
      }));
    } else {
      setGeneralInformations((prevState) => ({
        ...prevState,
        [key]: e.target.value,
      }));
    }
  };

  const handleEducationChange = (e, key, educationId, innerObject = null) => {
    if (!innerObject && !(key in formDefaultInformations.education)) return;

    const index = educationInformations.findIndex((item) => item.id === educationId);
    const newEducationInformations = educationInformations.map((info, i) => {
      if (i === index) {
        const updatedInfo = { ...info };

        if (innerObject) {
          updatedInfo[innerObject] = { ...updatedInfo[innerObject], [key]: e.target.value };
        } else {
          updatedInfo[key] = e.target.value;
        }

        return updatedInfo;
      }
      return info;
    });

    setEducationInformations(newEducationInformations);
  };

  const handleExperiencesChange = (
    e,
    key,
    experiencesId,
    [category = null, innerObjectId = null],
    innerObject = null,
  ) => {
    const index = experiencesInformations.findIndex((item) => item.id === experiencesId);
    const newExperiencesInformations = experiencesInformations.map((info, i) => {
      if (i === index) {
        const updatedInfo = { ...info };

        if (innerObject) {
          updatedInfo[innerObject] = { ...updatedInfo[innerObject], [key]: e.target.value };
        } else if (category !== null && innerObjectId !== null) {
          updatedInfo[key].map((object) => (
            (object.id !== innerObjectId) ? object : { ...object, [category]: e.target.value }
          ));
        } else {
          updatedInfo[key] = e.target.value;
        }

        return updatedInfo;
      }
      return info;
    });

    setExperiencesInformations(newExperiencesInformations);
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

  const handleClick = (formName, key, id = null, objectId = null) => {
    const [informations, setInformations] = getState(
      formName,
      [generalInformations, setGeneralInformations],
      [educationInformations, setEducationInformations],
      [experiencesInformations, setExperiencesInformations],
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
        const entryKeysToChange = Object.keys(formDefaultInformations.general[key][0]);
        target.push({
          id: uuidv4(),
          [entryKeysToChange[1]]: '',
          [entryKeysToChange[2]]: '',
          [entryKeysToChange[3]]: getRandomItem(randomStrings.general[key]),
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
    } else if (formName === 'experiences') {
      let newExperiences;

      if (objectId >= 0 && key in informations[0]) {
        const entryKeysToChange = Object.keys(formDefaultInformations.experiences[key][0]);

        const target = informations[objectId][key];

        target.push({
          id: uuidv4(),
          [entryKeysToChange[1]]: '',
          [entryKeysToChange[2]]: getRandomItem(randomStrings.experiences[key]),
        });

        newExperiences = {
          ...informations[objectId],
          [key]: [...target],
        };

        setInformations((prevState) => (
          prevState.map((object, i) => ((i !== objectId) ? object : newExperiences))
        ));
      } else {
        newExperiences = {
          ...formDefaultInformations.experiences,
          id: uuidv4(),
          jobResponsibilities: [
            { id: uuidv4(), responsibility: '', placeholder: getRandomItem(randomStrings.experiences.jobResponsibilities) },
            { id: uuidv4(), responsibility: '', placeholder: getRandomItem(randomStrings.experiences.jobResponsibilities) },
          ],
        };

        setInformations((prevState) => ([
          ...prevState,
          { ...newExperiences },
        ]));
      }
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

          <ExperiencesForm experiencesInformations={experiencesInformations}
          handleInputChange={handleExperiencesChange} handleAddOrRemoveBtnClick={handleClick}
          />
        </FormContainer>
      </CVcustomizer>
      <CVpreview generalInformations={generalInformations}
      educationInformations={educationInformations} />
    </div>
  );
}

export default App;
