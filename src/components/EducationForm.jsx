import { toWordsOrdinal } from 'number-to-words';
import { Inputs, AddBtn } from './FormElements.jsx';
import getEntriesFromRange from './utils';
import { educationPlaceholders } from './data/data';

const EducationForm = ({
  educationInformations,
  handleFormChange,
  handleFormClick,
}) => {
  const repeated = {
    inputsProps: {
      formName: 'education', placeholders: educationPlaceholders, handleFormChange,
    },
    addBtnProps: {
      formName: 'education', handleFormClick,
    },
  };

  return (
    <form className='flex flex-col items-center gap-4 m-2'>
      {educationInformations.map((item, index) => {
        const { id } = item;

        const entries = [
          getEntriesFromRange(item, ['schoolName', 'studyName']),
          Object.entries(item.studyDate),
          getEntriesFromRange(item, ['location', 'summary']),
        ];

        const currentWordOrdinal = toWordsOrdinal(index + 1);

        return (
          <div key={index} className=' bg-zinc-200 border-2 border-zinc-300 w-full rounded-lg shadow-sm box'>
            {/* add school name, study name  */}
            <Inputs {...repeated.inputsProps} dataEntries={entries[0]}
            idOfChangingInformationObject={id} nthNameAndId={currentWordOrdinal}/>
            <div className='flex'>
              {/* add date input  */}
              <Inputs {...repeated.inputsProps} dataEntries={entries[1]}
              idOfChangingInformationObject={id} nthNameAndId={currentWordOrdinal}
              prependingTextToNameAndId='study date'
              innerCategory={['studyDate']}/>
            </div>
            {/* add school location, school summary inputs  */}
            <Inputs {...repeated.inputsProps} dataEntries={entries[2]}
            idOfChangingInformationObject={id} nthNameAndId={currentWordOrdinal}
            prependingTextToNameAndId={'school'}/>
          </div>
        );
      })}
      <AddBtn {...repeated.addBtnProps} />
    </form>
  );
};

export default EducationForm;
