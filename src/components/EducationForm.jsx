import FormElements from './FormElements.jsx';
import getEntriesFromRange from './utils';
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
        const entries = [
          getEntriesFromRange(item, ['schoolName', 'studyName']),
          Object.entries(dateInput),
          getEntriesFromRange(item, ['location', 'schoolSummary']),
        ];


        return (
          <div key={index} className=' bg-zinc-200 border-2 border-zinc-300 w-full rounded-lg shadow-sm box'>
            {/* add school name, study name  */}
            <formElements.Inputs dataEntries={entries[0]} dataForm={'education'} idToApplyForEachEntry={id} />
            <div className='flex'>
              {/* add date input  */}
              <formElements.Inputs dataEntries={entries[1]} dataForm={'education'} idToApplyForEachEntry={id} />
            </div>
            {/* add school location, school summary inputs  */}
            <formElements.Inputs dataEntries={entries[2]} dataForm={'education'} idToApplyForEachEntry={id} />
          </div>
        );
      })}
      <addBtn.Education />
    </form>
  );
};

export default EducationForm;
