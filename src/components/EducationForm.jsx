import FormElements from './FormElements.jsx';
import objectSplice from './utils';
import { educationPlaceholders } from './data/data';

const EducationForm = ({
  educationInformations,
  handleInputChange,
}) => {
  const formElements = FormElements(educationPlaceholders, handleInputChange);

  const inputsData = educationInformations[0];
  const { id } = inputsData;

  const dateInput = inputsData.studyDate;

  return (
    <form>
      {/* add school name, study name  */}
      {formElements.addInputs(objectSplice(inputsData, ['schoolName', 'studyName']), false, 'education', id)}
      <div className='flex'>
      {/* add date input  */}
        {formElements.addInputs(Object.entries(dateInput), false, 'education', id)}
      </div>
      {/* add date input  */}
      {formElements.addInputs(objectSplice(inputsData, ['location', 'schoolSummary']), false, 'education', id)}
    </form>
  );
};

export default EducationForm;
