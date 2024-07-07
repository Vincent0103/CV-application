import FormElements from './FormElements.jsx';
import getItemsFromRange from './utils';

const GeneralForm = ({
  generalInformations, handleInputChange, handleAddOrRemoveBtnClick,
  handleImgChange,
}) => {
  const summaryForJohnDoe = 'I am John Doe, a passionate and dedicated web developer with a proven track record of creating dynamic and user-friendly websites and applications.';
  const hobbiesForJohnDoe = 'In my free time, I enjoy coding personal projects, hiking in nature, reading about the latest technology trends, and volunteering at local community centers.';

  const placeholders = {
    name: 'John',
    lastName: 'Doe',
    email: 'johndoe@gmail.com',
    phoneNumber: '06 32 73 12 98',
    location: '75010 Paris, France',
    summary: summaryForJohnDoe,
    hobbies: hobbiesForJohnDoe,
  };

  const formElements = FormElements(
    placeholders,
    handleInputChange,
    handleAddOrRemoveBtnClick,
    handleImgChange,
  );

  const skillsOptions = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const languagesOptions = ['Beginner', 'Intermediate', 'Advanced', 'Fluent'];

  const addBtn = formElements.addBtn();

  return (
    <form>
      {/* add profile picture input */}
      {formElements.addInputs(getItemsFromRange(generalInformations, ['profilePicture', false]), true)}
      <div className="flex">
        {/* add name and last name inputs */}
        {formElements.addInputs(getItemsFromRange(generalInformations, ['name', 'lastName']), false)}
      </div>
      {/* add email, phone number, location, summary inputs */}
      {formElements.addInputs(getItemsFromRange(generalInformations, ['email', 'summary']), false)}
      <div>
        {formElements.addGeneralInputsAndSelects(
          generalInformations,
          'skills',
          ['skill', 'expertise'],
          skillsOptions,
        )}
        <addBtn.General dataKey={'skills'} innerCategory={'skill'} />
      </div>
      <div>
        {formElements.addGeneralInputsAndSelects(
          generalInformations,
          'languages',
          ['language', 'fluency'],
          languagesOptions,
        )}
        <addBtn.General dataKey={'languages'} innerCategory={'language'} />
      </div>
      {/* add hobbies input */}
      {formElements.addInputs(getItemsFromRange(generalInformations, ['hobbies', false]), false)}

    </form>
  );
};

export default GeneralForm;
