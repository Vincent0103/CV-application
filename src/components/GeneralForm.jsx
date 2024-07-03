import FormContainer from './FormContainer.jsx';
import FormElements, { AddBtn } from './FormElements.jsx';

const GeneralForm = ({ generalInformations, handleInputChange, handleAddOrRemoveBtnClick }) => {
  const summaryForJohnDoe = 'I am John Doe, a passionate and dedicated web developer with a proven track record of creating dynamic and user-friendly websites and applications.';
  const hobbiesForJohnDoe = 'In my free time, I enjoy coding personal projects, hiking in nature, reading about the latest technology trends, and volunteering at local community centers.';

  const fadingBottomContainer = <div className="absolute -bottom-1 w-full h-24 bg-gradient-to-t from-white
  pointer-events-none"></div>;

  const placeholders = {
    name: 'John',
    lastName: 'Doe',
    email: 'johndoe@gmail.com',
    phoneNumber: '06 32 73 12 98',
    location: '75010 Paris, France',
    summary: summaryForJohnDoe,
    hobbies: hobbiesForJohnDoe,
  };

  const formElements = FormElements(placeholders, handleInputChange, handleAddOrRemoveBtnClick);

  return (
    <FormContainer fadingBottomContainer={fadingBottomContainer}>
      <form>
        <div className="flex">
          {formElements.addInputs(generalInformations, 0, 2, true)}
        </div>
        {formElements.addInputs(generalInformations, 2, 6, false)}
        <div>
          {formElements.addInputsAndSelects(generalInformations, 'skills', ['skill', 'expertise'])}
          <AddBtn handleClick={handleAddOrRemoveBtnClick} dataKey={'skills'} innerCategory={'skill'} />
        </div>
        <div>
          {formElements.addInputsAndSelects(generalInformations, 'languages', ['language', 'fluency'])}
          <AddBtn handleClick={handleAddOrRemoveBtnClick} dataKey={'languages'} innerCategory={'language'} />
        </div>
        {formElements.addInputs(generalInformations, 8, 9, false)}

      </form>
    </FormContainer>
  );
};

export default GeneralForm;
