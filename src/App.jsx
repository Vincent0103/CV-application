import { v4 as uuidv4 } from 'uuid';
import { produce } from 'immer';
import { useState, useCallback, act } from 'react';
import CVcustomizer from './components/CVcustomizer.jsx';
import FormContainer from './components/FormContainer.jsx';
import GeneralForm from './components/GeneralForm.jsx';
import EducationForm from './components/EducationForm.jsx';
import ExperiencesForm from './components/ExperiencesForm.jsx';
import CVpreview from './components/CVpreview/CVpreview.jsx';
import {
  randomStrings,
  general, education, experiences,
  defaultGeneral, defaultEducation, defaultExperiences,
} from './components/data/data';
import { getRandomItem, keyInDeeplyNestedObject } from './components/utils';

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

  const handleGeneralChange = useCallback((e, path, innerObjectId = null) => {
    if (!keyInDeeplyNestedObject(path[path.length - 1], formDefaultInformations.general)) return;

    if (innerObjectId !== null) {
      setGeneralInformations(produce((draft) => {
        const [key, category] = path;
        const current = draft[key];
        const index = current.findIndex(({ id }) => id === innerObjectId);
        current[index][category] = e.target.value;
      }));
    } else {
      setGeneralInformations(produce((draft) => {
        const current = draft;
        const [key] = path;
        current[key] = e.target.value;
      }));
    }
  }, [generalInformations]);

  const handleEducationChange = useCallback((e, path, educationId) => {
    if (!keyInDeeplyNestedObject(path[path.length - 1], formDefaultInformations.education)) return;

    setEducationInformations(produce((draft) => {
      let current = draft;
      const index = current.findIndex(({ id }) => id === educationId);
      let pathIndex = 0;

      if (path.length > 1) {
        current = current[index][path[pathIndex]];
        pathIndex += 1;
      } else {
        current = current[index];
      }

      current[path[pathIndex]] = e.target.value;
    }));
  }, [educationInformations]);

  const handleExperiencesChange = useCallback((
    e,
    path,
    experiencesId,
    innerObjectId,
  ) => {
    if (!keyInDeeplyNestedObject(
      path[path.length - 1],
      formDefaultInformations.experiences,
    )) return;

    setExperiencesInformations(produce((draft) => {
      let current = draft;
      let index = current.findIndex(({ id }) => id === experiencesId);
      let pathIndex = 0;

      if (path.length > 1) {
        current = current[index][path[pathIndex]];
        pathIndex += 1;
      } else {
        current = current[index];
      }

      if (Array.isArray(current)) {
        index = current.findIndex(({ id }) => id === innerObjectId);
        current[index][path[pathIndex]] = e.target.value;
      } else {
        current[path[pathIndex]] = e.target.value;
      }
    }));
  }, [experiencesInformations]);

  const handleFormChange = (formName, e, path, informationsId, innerObjectId) => {
    switch (formName) {
      case 'general':
        handleGeneralChange(e, path, innerObjectId);
        break;
      case 'education':
        handleEducationChange(e, path, informationsId);
        break;
      case 'experiences':
        handleExperiencesChange(e, path, informationsId, innerObjectId);
        break;
      default:
        throw new Error(`${formName} doesn't exist as a form data, cannot change inputs data accordingly`);
    }
  };

  const handleImgChange = (formName, e) => {
    const { files } = e.target;
    if (files.length <= 0) return;

    const file = files[0];
    const reader = new FileReader();
    if (formName === 'general') {
      reader.onloadend = () => {
        setGeneralInformations(produce((draft) => {
          const current = draft;
          current.profilePicture = reader.result;
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGeneralClick = (action, key, idOfChangingInformationObject) => {
    if (!(key in generalInformations)) return;
    if (!Array.isArray(generalInformations[key])) return;

    const target = [...generalInformations[key]];

    if (action === 'remove') {
      const indexOfRemovingEntry = target
        .findIndex((item) => item.id === idOfChangingInformationObject);
      target.splice(indexOfRemovingEntry, 1);
    } else if (action === 'add') {
      const entryKeysToChange = Object.keys(formDefaultInformations.general[key][0]);
      target.push({
        id: uuidv4(),
        [entryKeysToChange[1]]: '',
        [entryKeysToChange[2]]: '',
        [entryKeysToChange[3]]: getRandomItem(randomStrings.general[key]),
      });
    }

    setGeneralInformations((prevState) => ({
      ...prevState,
      [key]: [...target],
    }));
  };

  const handleEducationClick = (action, idOfChangingInformationObject) => {
    if (action === 'add') {
      const newEducation = {
        ...formDefaultInformations.education,
        id: uuidv4(),
      };
      setEducationInformations(produce((draft) => {
        const current = draft;
        current.push(newEducation);
      }));
    } else {
      const index = educationInformations
        .findIndex(({ id }) => id === idOfChangingInformationObject);

      setEducationInformations(produce((draft) => {
        const current = draft;
        current.splice(index, 1);
      }));
    }
  };

  const handleExperiencesClick = (action, key, idOfChangingInformationObject, innerObjectId) => {
    if (action === 'add') {
      if (key) {
        if (!(key in experiencesInformations[0])) return;
        const entryKeysToChange = Object.keys(formDefaultInformations.experiences[key][0]);

        setExperiencesInformations(produce((draft) => {
          const index = draft
            .findIndex(({ id }) => id === idOfChangingInformationObject);
          const target = draft[index][key];

          target.push({
            id: uuidv4(),
            [entryKeysToChange[1]]: '',
            [entryKeysToChange[2]]: getRandomItem(randomStrings.experiences[key]),
          });
        }));
      } else {
        setExperiencesInformations(produce((draft) => {
          draft.push({
            ...formDefaultInformations.experiences,
            id: uuidv4(),
            jobResponsibilities: [
              { id: uuidv4(), responsibility: '', placeholder: getRandomItem(randomStrings.experiences.jobResponsibilities) },
              { id: uuidv4(), responsibility: '', placeholder: getRandomItem(randomStrings.experiences.jobResponsibilities) },
            ],
          });
        }));
      }
    } else if (action === 'remove') {
      if (!(key in experiencesInformations[0])) return;
      const experiencesIndex = experiencesInformations
        .findIndex(({ id }) => id === idOfChangingInformationObject);

      if (innerObjectId) {
        setExperiencesInformations(produce((draft) => {
          const current = draft[experiencesIndex][key];
          const innerObjectIndex = current.findIndex(({ id }) => id === innerObjectId);
          current.splice(innerObjectIndex, 1);
        }));
      } else {
        setExperiencesInformations(produce((draft) => {
          draft.splice(experiencesIndex, 1);
        }));
      }
    }
  };

  const handleFormClick = (formName, action, key, idOfChangingInformationObject, innerObjectId) => {
    switch (formName) {
      case 'general':
        handleGeneralClick(action, key, idOfChangingInformationObject);
        break;
      case 'education':
        handleEducationClick(action, idOfChangingInformationObject);
        break;
      case 'experiences':
        handleExperiencesClick(action, key, idOfChangingInformationObject, innerObjectId);
        break;
      default:
        throw new Error(`${formName} doesn't exist as a form data, cannot update click accordingly`);
    }
  };

  const handleMovingSide = (movingSide) => {
    setMoveForms(movingSide);
  };

  const handleFormSwitcherBtn = (movingSide, toFormName) => {
    const movingSideMap = {
      left: {
        experiences: 'education',
        education: 'general',
        general: 'experiences',
      },
      right: {
        general: 'education',
        education: 'experiences',
        experiences: 'general',
      },
    };

    if (toFormName) {
      if (!'general education experiences'.includes(toFormName)) return;
      if (currentlyVisibleElement === toFormName) return;
      if (movingSideMap.left[currentlyVisibleElement] === toFormName) {
        handleMovingSide('left');
      } else {
        handleMovingSide('right');
      }
      setCurrentlyVisibleElement(toFormName);
      return;
    }

    if (!'idle left right'.includes(movingSide)) return;

    handleMovingSide(movingSide);
    setCurrentlyVisibleElement(movingSideMap[movingSide][currentlyVisibleElement]);
  };
  return (
    <div className='max-lg:flex max-lg:flex-col max-lg:gap-6 max-lg:p-1.5 max-lg:max-h-none max-w-[1500px] w-[1500px] flex justify-center gap-6
    p-5'>
      <CVcustomizer handleFormSwitcherBtn={handleFormSwitcherBtn}
      currentlyVisibleElement={currentlyVisibleElement} handleClick={handleFormSwitcherBtn}>
        <FormContainer childrenRelatedData={['general', 'education', 'experiences']}
        handleMovingSide={handleMovingSide} movingSide={moveForms}
        currentlyVisibleElement={currentlyVisibleElement}>

          <GeneralForm generalInformations={generalInformations}
          handleFormChange={handleFormChange} handleFormClick={handleFormClick}
          handleImgChange={handleImgChange} />

          <EducationForm educationInformations={educationInformations}
          handleFormChange={handleFormChange} handleFormClick={handleFormClick}/>

          <ExperiencesForm experiencesInformations={experiencesInformations}
          handleFormChange={handleFormChange} handleFormClick={handleFormClick}/>
        </FormContainer>
      </CVcustomizer>
      <CVpreview generalInformations={generalInformations}
      educationInformations={educationInformations}
      experiencesInformations={experiencesInformations}/>
    </div>
  );
}

export default App;
