import FormContainer from './FormContainer.jsx';
import FormElements from './FormElements.jsx';
import objectSplice, { getRandomItem } from './utils';
import { randomStrings } from './data/data';

const EducationForm = ({
  educationInformations, handleInputChange, handleAddOrRemoveBtnClick,
  handleImgChange,
}) => {
  const fadingBottomContainer = <div className="absolute -bottom-1 w-full h-24 bg-gradient-to-t from-white
  pointer-events-none"></div>;

  const formElements = FormElements(
    getRandomItem(randomStrings.education),
    handleInputChange,
    handleAddOrRemoveBtnClick,
    handleImgChange,
  );

  const skillsOptions = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const languagesOptions = ['Beginner', 'Intermediate', 'Advanced', 'Fluent'];
  return (
    <FormContainer fadingBottomContainer={fadingBottomContainer}>
      <form>
        {/* add profile picture input */}
        {formElements.addInputs(objectSplice(generalInformations, 0, 1), true)}
        <div className="flex">
          {/* add name and last name inputs */}
          {formElements.addInputs(objectSplice(generalInformations, 1, 3), true)}
        </div>
        {/* add email, phone number, location, summary inputs */}
        {formElements.addInputs(objectSplice(generalInformations, 3, 7), false)}
        <div>
          {formElements.addInputsAndSelects(
            generalInformations,
            'skills',
            ['skill', 'expertise'],
            skillsOptions,
          )}
          <formElements.AddBtn dataKey={'skills'} innerCategory={'skill'} />
        </div>
        <div>
          {formElements.addInputsAndSelects(
            generalInformations,
            'languages',
            ['language', 'fluency'],
            languagesOptions,
          )}
          <formElements.AddBtn dataKey={'languages'} innerCategory={'language'} />
        </div>
        {/* add hobbies input */}
        {formElements.addInputs(objectSplice(generalInformations, 9, 10), false)}

      </form>
    </FormContainer>
  );
};

export default GeneralForm;
