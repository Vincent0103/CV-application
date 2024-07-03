import { v4 as uuidv4 } from 'uuid';
import objectSplice, { toTitle, typeGiver, getRandomItem } from './utils.js';
import FormContainer from './FormContainer.jsx';
import SectionContainer, {
  InputContainer, Label, Select, AddBtn, RemoveBtn,
} from './FormElements.jsx';

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
    objectSplice(data, start, end).map((item, index) => {
      const [key, value] = item;
      return (
        <SectionContainer key={index}>
          <Label name={key} labelName={toTitle(key)}/>
          <InputContainer
            type={typeGiver(key)}
            name={key}
            labelName={toTitle(key)}
            placeholder={placeholders[key]}
            hasAutoFocus={autoFocus && index === 0}
            handleChange={handleChange}
            dataKey={key}
            value={value}
          />
        </SectionContainer>
      );
    })
  );

  const addGeneralInputsAndSelects = (obj, category, [innerCategory, innerOption]) => (
    <SectionContainer>
      <Label name={`${innerCategory}0`} labelName={toTitle(category)}/>
      {obj.map((_, index) => {
        const entry = generalInformations[category][index];

        return <InputContainer key={index} type="text" name={`${innerCategory}${index}`}
          placeholder={entry.placeholder}
          additionalStyles={(index === obj.length - 1) ? 'pt-0 pb-0' : 'pb-2'}
          handleChange={handleChange} dataKey={category}
          value={entry[innerCategory]} category={innerCategory}
          innerObjectId={entry.id}>
            <Select name={`${innerOption}${index}`}
            values={['Beginner', 'Intermediate', 'Advanced', 'Fluent']}
            handleChange={handleChange} dataKey={category}
            selectedValue={entry[innerOption]} category={innerOption}
            innerObjectId={entry.id}/>
            <RemoveBtn handleClick={handleClick} dataKey={category}
            dataId={entry.id} innerCategory={innerCategory} />
          </ InputContainer>;
      })}
    </SectionContainer>
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
          <AddBtn handleClick={handleClick} dataKey={'skills'} innerCategory={'skill'} />
        </div>
        <div>
          {addGeneralInputsAndSelects(generalInformations.languages, 'languages', ['language', 'fluency'])}
          <AddBtn handleClick={handleClick} dataKey={'languages'} innerCategory={'language'} />
        </div>
        {addGeneralInputs(generalInformations, 8, 9, false)}

      </form>
    </FormContainer>
  );
};

export default GeneralForm;
