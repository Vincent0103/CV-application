import FormElements from './FormElements.jsx';
import objectSplice from './utils';

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

  return (
    <form>
      {/* add profile picture input */}
      {formElements.addInputs(objectSplice(generalInformations, ['profilePicture', false]), true)}
      <div className="flex">
        {/* add name and last name inputs */}
        {formElements.addInputs(objectSplice(generalInformations, ['name', 'lastName']), false)}
      </div>
      {/* add email, phone number, location, summary inputs */}
      {formElements.addInputs(objectSplice(generalInformations, ['email', 'summary']), false)}
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
      {formElements.addInputs(objectSplice(generalInformations, ['hobbies', false]), false)}

    </form>
  );
};

export default GeneralForm;
