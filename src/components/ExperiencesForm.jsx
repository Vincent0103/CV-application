import { toWordsOrdinal } from 'number-to-words';
import { produce } from 'immer';
import { useState } from 'react';
import { Inputs, Btn, ExperiencesMultipleInputs } from './FormElements.jsx';
import getEntriesFromRange, { getRandomItem } from './utils';
import { experiencesPlaceholders } from './data/data';

const ExperiencesForm = ({
  experiencesInformations,
  handleFormChange,
  handleFormClick,
}) => {
  const [currentPlaceholders, setCurrentPlaceholders] = useState([
    getRandomItem(experiencesPlaceholders),
  ]);

  const handlePlaceholders = () => {
    if (experiencesInformations.length >= currentPlaceholders.length) {
      setCurrentPlaceholders(produce((draft) => {
        draft.push(getRandomItem(experiencesPlaceholders));
      }));
    }
  };

  const repeated = {
    inputsProps: (placeholderIndex) => ({
      formName: 'experiences', placeholders: currentPlaceholders[placeholderIndex], handleFormChange,
    }),
    experiencesMultipleInputsProps: {
      formName: 'experiences', handleFormChange, handleFormClick,
    },
    addBtnProps: {
      formName: 'experiences', handleFormClick,
    },
    removeBtnProps: {
      formName: 'experiences', handleFormClick, removeBtnForWholeFormInstance: true,
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
            <Btn {...repeated.removeBtnProps} btnFunctionName={'remove'} isFormBtn={true}
              dataKey={'jobResponsibilities'}
              appendingTextToAriaLabel={`responsibility for the ${currentWordOrdinal} experiences`}
              idOfChangingInformationObject={item.id} btnText={'Experiences'}/>
            {/* add position title, company name inputs  */}
            <Inputs {...repeated.inputsProps(index)} dataEntries={entries[0]}
            idOfChangingInformationObject={item.id} nthNameAndId={currentWordOrdinal}/>
            <div className='grid grid-cols-2'>
              {/* add work date input  */}
              <Inputs {...repeated.inputsProps(index)} dataEntries={entries[1]}
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
              <Btn {...repeated.addBtnProps} btnFunctionName={'add'}
              dataKey={'jobResponsibilities'} btnText={'Responsibility'}
              appendingTextToAriaLabel={`responsibility for the ${currentWordOrdinal} experiences`}
              idOfChangingInformationObject={item.id} customColor='bg-indigo-950'/>
            </div>
            {/* add summary input  */}
            <Inputs {...repeated.inputsProps(index)} dataEntries={entries[2]}
            idOfChangingInformationObject={item.id} nthNameAndId={currentWordOrdinal}
            appendingTextToNameAndId='experiences' />
          </div>
        );
      })}
      <Btn {...repeated.addBtnProps} btnFunctionName={'add'}
      isFormBtn={true} btnText={'Experiences'} handlePlaceholders={handlePlaceholders}/>
    </form>
  );
};

export default ExperiencesForm;
