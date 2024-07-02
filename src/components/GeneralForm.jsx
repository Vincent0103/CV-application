import objectSplice, { toTitle, typeGiver, getRandomItem } from './utils.js';
import FormContainer from './FormContainer.jsx';
import LabelAndInput, { Select, AddBtn, RemoveBtn } from './FormElements.jsx';
import { randomStrings } from './data/data.js';

const GeneralForm = ({ generalInformations, handleChange, handleClick }) => {
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

  const addGeneralInputs = (data, start, end, autoFocus = false) => (
    objectSplice(data, start, end).map((item, index) => (
      <LabelAndInput
        key={index}
        type={typeGiver(item[0])}
        name={item[0]}
        labelName={toTitle(item[0])}
        placeholder={placeholders[item[0]]}
        hasAutoFocus={autoFocus && index === 0}
        handleChange={handleChange}
        dataKey={item[0]}
        value={item[1]}
      />
    ))
  );

  const addGeneralInputsAndSelects = (obj, category, [innerCategory, innerOption]) => (
    obj.map((_, index) => {
      const entry = generalInformations[category][index];

      return <LabelAndInput key={index} type="text" name={`${innerCategory}${index}`}
        labelName={(index !== 0) ? '' : toTitle(category)}
        placeholder={entry.placeholder}
        additionalStyles={(index !== 0) ? 'pt-0 pb-3' : 'pb-2'}
        handleChange={handleChange} dataKey={category}
        value={entry[innerCategory]} category={innerCategory}
        innerObjectId={index}>
          <Select name={`${innerOption}${index}`}
          values={['Beginner', 'Intermediate', 'Advanced', 'Fluent']}
          handleChange={handleChange} dataKey={category}
          selectedValue={entry[innerOption]} category={innerOption}
          innerObjectId={index}/>
          {index > 0
          && <RemoveBtn handleClick={handleClick} dataKey={category} removingEntryId={index} />}
        </ LabelAndInput>;
    })
  );

  return (
    <FormContainer fadingBottomContainer={fadingBottomContainer}>
      <form>
        <div className="flex">
          {addGeneralInputs(generalInformations, 0, 2, true)}
        </div>
        {addGeneralInputs(generalInformations, 2, 6, false)}
        <div>
          {addGeneralInputsAndSelects(generalInformations.skills, 'skills', ['skill', 'expertise'])}
          <AddBtn handleClick={handleClick} dataKey={'skills'} />
        </div>
        <div>
          {addGeneralInputsAndSelects(generalInformations.languages, 'languages', ['language', 'fluency'])}
          <AddBtn handleClick={handleClick} dataKey={'languages'} />
        </div>
        {addGeneralInputs(generalInformations, 8, 9, false)}

      </form>
    </FormContainer>
  );
};

export default GeneralForm;
