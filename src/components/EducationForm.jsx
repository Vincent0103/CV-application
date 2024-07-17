import { toWordsOrdinal } from 'number-to-words';
import { Inputs, Btn } from './FormElements.jsx';
import getEntriesFromRange, { getRandomItem } from './utils';
import { educationPlaceholders } from './data/data';

const EducationForm = ({
  educationInformations,
  handleFormChange,
  handleFormClick,
}) => {
  const repeated = {
    inputsProps: {
      formName: 'education', placeholders: getRandomItem(educationPlaceholders), handleFormChange,
    },
    addBtnProps: {
      formName: 'education', handleFormClick,
    },
    removeBtnProps: {
      formName: 'education', handleFormClick, removeBtnForWholeFormInstance: true,
    },
  };

  return (
    <form className='flex flex-col items-center gap-4 m-2 max-lg:m-1 max-lg:gap-3'>
      {educationInformations.map((item, index) => {
        const entries = [
          getEntriesFromRange(item, ['schoolName', 'studyName']),
          Object.entries(item.studyDate),
          getEntriesFromRange(item, ['location', 'summary']),
        ];

        const currentWordOrdinal = toWordsOrdinal(index + 1);

        return (
          <div key={index} className=' bg-zinc-200 border-2 border-zinc-300 w-full rounded-lg shadow-sm box'>
            <Btn {...repeated.removeBtnProps} btnFunctionName={'remove'} isFormBtn={true}
              dataKey={'jobResponsibilities'} appendingTextToAriaLabel={`${currentWordOrdinal} education`}
              idOfChangingInformationObject={item.id} btnText={'Education'}/>
            {/* add school name, study name  */}
            <Inputs {...repeated.inputsProps} dataEntries={entries[0]}
            idOfChangingInformationObject={item.id} nthNameAndId={currentWordOrdinal}/>
            <div className='grid grid-cols-2'>
              {/* add date input  */}
              <Inputs {...repeated.inputsProps} dataEntries={entries[1]}
              idOfChangingInformationObject={item.id} nthNameAndId={currentWordOrdinal}
              appendingTextToNameAndId='study date' customDataKey={'studyDate'}
              innerCategory={['from', 'to']} isInFlexContainer={true}/>
            </div>
            {/* add school location, school summary inputs  */}
            <Inputs {...repeated.inputsProps} dataEntries={entries[2]}
            idOfChangingInformationObject={item.id} nthNameAndId={currentWordOrdinal}
            appendingTextToNameAndId={'school'}/>
          </div>
        );
      })}
      <Btn {...repeated.addBtnProps} btnFunctionName={'add'}
      isFormBtn={true} btnText={'Education'}/>
    </form>
  );
};

export default EducationForm;
