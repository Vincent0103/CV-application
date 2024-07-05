import FormElements from './FormElements.jsx';
import objectSplice, { getRandomItem } from './utils';
import { randomStrings } from './data/data';

const EducationForm = ({
  educationInformations,
  handleChange,
}) => {
  const formElements = FormElements(getRandomItem(randomStrings.education), handleChange);

  const inputsData = educationInformations[0];

  return (
    <form>
      {/* add school name, study name, date, diplomas, location  */}
      {formElements.addInputs(objectSplice(inputsData), false)}
    </form>
  );
};

export default EducationForm;
