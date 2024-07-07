import FormElements from './FormElements.jsx';
import getItemsFromRange from './utils';
import { educationPlaceholders } from './data/data';

const EducationForm = ({
  educationInformations,
  handleInputChange,
  handleAddOrRemoveBtnClick,
}) => {
  const formElements = FormElements(
    educationPlaceholders,
    handleInputChange,
    handleAddOrRemoveBtnClick,
  );

  const inputsData = educationInformations;
  const addBtn = formElements.addBtn();

  return (
    <form className='flex flex-col items-center gap-4 m-2'>
      {inputsData.map((item, index) => {
        const { id } = item;
        const dateInput = item.studyDate;

        return (
          <div key={index} className=' bg-zinc-200 border-2 border-zinc-300 w-full rounded-lg shadow-sm box'>
            {/* add school name, study name  */}
            {formElements.addInputs(getItemsFromRange(item, ['schoolName', 'studyName']), false, 'education', id)}
            <div className='flex'>
            {/* add date input  */}
              {formElements.addInputs(Object.entries(dateInput), false, 'education', id)}
            </div>
            {/* add date input  */}
            {formElements.addInputs(getItemsFromRange(item, ['location', 'schoolSummary']), false, 'education', id)}
          </div>
        );
      })}
      <addBtn.Education />
    </form>
  );
};

export default EducationForm;
