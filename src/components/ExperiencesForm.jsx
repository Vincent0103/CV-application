import { toWordsOrdinal } from 'number-to-words';
import { Inputs, AddBtn, ExperiencesMultipleInputs } from './FormElements.jsx';
import getEntriesFromRange, { getRandomItem } from './utils';
import { experiencesPlaceholders } from './data/data';

const ExperiencesForm = ({
  experiencesInformations,
  handleFormChange,
  handleFormClick,
}) => {
  const repeated = {
    inputsProps: {
      formName: 'experiences', placeholders: getRandomItem(experiencesPlaceholders), handleFormChange,
    },
    experiencesMultipleInputsProps: {
      formName: 'experiences', handleFormChange, handleFormClick,
    },
    addBtnProps: {
      formName: 'experiences', handleFormClick,
    },
  };

  return (
    <form className='flex flex-col items-center gap-4 m-2 max-lg:m-1 max-lg:gap-3'>
      {experiencesInformations.map((item, index) => {
        const entries = [
          getEntriesFromRange(item, ['positionTitle', 'companyName']),
          Object.entries(item.workDate),
          getEntriesFromRange(item, ['summary', false]),
        ];

        const currentWordOrdinal = toWordsOrdinal(index + 1);

        return (
          <div key={index} className=' bg-zinc-200 border-2 border-zinc-300 w-full rounded-lg shadow-sm box'>
            {/* add company name, position title inputs  */}
            <Inputs {...repeated.inputsProps} dataEntries={entries[0]}
            idOfChangingInformationObject={item.id} nthNameAndId={currentWordOrdinal}/>
            <div className='grid grid-cols-2'>
              {/* add work date input  */}
              <Inputs {...repeated.inputsProps} dataEntries={entries[1]}
              idOfChangingInformationObject={item.id} nthNameAndId={currentWordOrdinal}
              appendingTextToNameAndId='work date' customDataKey={'workDate'}
              innerCategory={['from', 'to']} isInFlexContainer={true}/>
            </div>
            <div>
              {/* add job responsibilites inputs  */}
              <ExperiencesMultipleInputs {...repeated.experiencesMultipleInputsProps}
              inputsArray={item.jobResponsibilities} categoryName={'jobResponsibilities'}
              idOfChangingInformationObject={item.id} responsibilityKey={'responsibility'}
              appendingTextToNameAndId={`of ${currentWordOrdinal} experiences`}/>
              <AddBtn {...repeated.addBtnProps} dataKey={'jobResponsibilities'}
              appendingTextToAriaLabel={`responsibility for the ${currentWordOrdinal} experiences`}
              idOfChangingInformationObject={item.id} customColor='bg-indigo-950'/>
            </div>
            {/* add summary input  */}
            <Inputs {...repeated.inputsProps} dataEntries={entries[2]}
            idOfChangingInformationObject={item.id} nthNameAndId={currentWordOrdinal}
            appendingTextToNameAndId='experiences' />
          </div>
        );
      })}
      <AddBtn {...repeated.addBtnProps}/>
    </form>
  );
};

export default ExperiencesForm;
