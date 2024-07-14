import { Inputs, InputsAndSelects, AddBtn } from './FormElements.jsx';
import getEntriesFromRange from './utils';
import { generalPlaceholders } from './data/data';

const GeneralForm = ({
  generalInformations, handleFormChange, handleFormClick,
  handleImgChange,
}) => {
  const skillsOptions = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const languagesOptions = ['Beginner', 'Intermediate', 'Advanced', 'Fluent'];

  const entries = [
    getEntriesFromRange(generalInformations, ['profilePicture', false]),
    getEntriesFromRange(generalInformations, ['name', 'lastName']),
    getEntriesFromRange(generalInformations, ['email', 'summary']),
    getEntriesFromRange(generalInformations, ['hobbies', false]),
  ];

  const repeated = {
    inputsProps: {
      formName: 'general', placeholders: generalPlaceholders, handleFormChange, handleImgChange,
    },
    inputsAndSelectsProps: {
      formName: 'general', handleFormChange, handleFormClick,
    },
    addBtnProps: {
      formName: 'general', handleFormClick,
    },
  };

  return (
    <form>
      {/* add profile picture input */}
      <Inputs {...repeated.inputsProps} dataEntries={entries[0]} autoFocus={true} />
      <div className="flex">
        {/* add name and last name inputs */}
        <Inputs {...repeated.inputsProps} dataEntries={entries[1]} autoFocus={false} />
      </div>
      {/* add email, phone number, location, summary inputs */}
      <Inputs {...repeated.inputsProps} dataEntries={entries[2]} autoFocus={false} />
      <div>
        <InputsAndSelects {...repeated.inputsAndSelectsProps}
        object={generalInformations} categoryName={'skills'}
        inputtableSubCategoryKeys={['skill', 'expertise']} optionsArray={skillsOptions} />
        <AddBtn {...repeated.addBtnProps} dataKey={'skills'} innerCategory={'skill'} />
      </div>
      <div>
        <InputsAndSelects {...repeated.inputsAndSelectsProps}
        object={generalInformations} categoryName={'languages'}
        inputtableSubCategoryKeys={['language', 'fluency']} optionsArray={languagesOptions} />
        <AddBtn {...repeated.addBtnProps} dataKey={'languages'} innerCategory={'language'} />
      </div>
      {/* add hobbies input */}
      <Inputs {...repeated.inputsProps} dataEntries={entries[3]} autoFocus={false} />
    </form>
  );
};

export default GeneralForm;
