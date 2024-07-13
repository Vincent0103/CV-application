import { toWordsOrdinal } from 'number-to-words';
import { Inputs, AddBtn, ExperiencesMultipleInputs } from './FormElements.jsx';
import getEntriesFromRange from './utils';
import { experiencesPlaceholders } from './data/data';

const ExperiencesForm = ({
  experiencesInformations,
  handleInputChange,
  handleFormClick,
}) => {
  const repeated = {
    inputsProps: {
      formName: 'experiences', placeholders: experiencesPlaceholders, handleInputChange,
    },
    experiencesMultipleInputsProps: {
      formName: 'experiences', handleInputChange, handleFormClick,
    },
    addBtnProps: {
      formName: 'experiences', handleFormClick,
    },
  };

  return (
    <form className='flex flex-col items-center gap-4 m-2'>
      {experiencesInformations.map((item, index) => {
        const { id } = item;

        const entries = [
          getEntriesFromRange(item, ['companyName', 'positionTitle']),
          Object.entries(item.workDate),

        ];

        const currentWordOrdinal = toWordsOrdinal(index + 1);

        return (
          <div key={index} className=' bg-zinc-200 border-2 border-zinc-300 w-full rounded-lg shadow-sm box'>
            {/* add company name, position title inputs  */}
            <Inputs {...repeated.inputsProps} dataEntries={entries[0]} idOfChangingObject={id}
            nthNameAndId={currentWordOrdinal}/>
            <div className='flex'>
              {/* add work date input  */}
              <Inputs {...repeated.inputsProps} dataEntries={entries[1]} idOfChangingObject={id}
              nthNameAndId={currentWordOrdinal} prependingTextToNameAndId='work date'
              keyInnerObject={'studyDate'}/>
            </div>
            <div>
              <ExperiencesMultipleInputs {...repeated.experiencesMultipleInputsProps}
              object={experiencesInformations[index]} categoryName={'jobResponsibilities'}
              responsibilityKey={'responsibility'}/>
              <AddBtn {...repeated.addBtnProps} dataKey={'jobResponsibilities'}
              innerCategory={'responsibility'} objectId={index} />
            </div>
          </div>
        );
      })}
      <AddBtn {...repeated.addBtnProps}/>
    </form>
  )
}

export default ExperiencesForm;
