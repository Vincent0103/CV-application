import Form, {
  Inputs, GeneralInputsAndSelects, AddBtn,
} from './FormElements.jsx';
import getEntriesFromRange from './utils';

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

  const skillsOptions = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const languagesOptions = ['Beginner', 'Intermediate', 'Advanced', 'Fluent'];

  const entries = [
    getEntriesFromRange(generalInformations, ['profilePicture', false]),
    getEntriesFromRange(generalInformations, ['name', 'lastName']),
    getEntriesFromRange(generalInformations, ['email', 'summary']),
    getEntriesFromRange(generalInformations, ['hobbies', false]),
  ];

  return (
    <Form formName={'general'} placeholders={placeholders} handleInputChange={handleInputChange}
    handleAddOrRemoveBtnClick={handleAddOrRemoveBtnClick} handleFileChange={handleImgChange}>
      {/* add profile picture input */}
      <Inputs dataEntries={entries[0]} autoFocus={true} />
      <div className="flex">
        {/* add name and last name inputs */}
        <Inputs dataEntries={entries[1]} autoFocus={false} />
      </div>
      {/* add email, phone number, location, summary inputs */}
      <Inputs dataEntries={entries[2]} autoFocus={false} />
      <div>
        <GeneralInputsAndSelects object={generalInformations} categoryName={'skills'}
        inputtableSubCategoryKeys={['skill', 'expertise']} optionsArray={skillsOptions} />
        <AddBtn dataKey={'skills'} innerCategory={'skill'} />
      </div>
      <div>
        <GeneralInputsAndSelects object={generalInformations} categoryName={'languages'}
        inputtableSubCategoryKeys={['language', 'fluency']} optionsArray={languagesOptions} />
        <AddBtn dataKey={'languages'} innerCategory={'language'} />
      </div>
      {/* add hobbies input */}
      <Inputs dataEntries={entries[3]} autoFocus={false} />
    </Form>
  );
};

export default GeneralForm;
