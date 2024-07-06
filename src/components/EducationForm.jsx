import FormElements from './FormElements.jsx';
import objectSplice from './utils';
import { randomStrings, educationPlaceholders } from './data/data';

const EducationForm = ({
  educationInformations,
  handleInputChange,
}) => {
  const formElements = FormElements(educationPlaceholders, handleInputChange);

  const inputsData = educationInformations[0];
  const { id } = inputsData;

  return (
    <form>
      {/* add school name, study name, date, diplomas, location  */}
      {formElements.addInputs(objectSplice(inputsData, 1), false, 'education', id)}
    </form>
  );
};

export default EducationForm;
