import { toWordsOrdinal } from 'number-to-words';
import Form, { Inputs, AddBtn } from './FormElements.jsx';
import getEntriesFromRange from './utils';
import { educationPlaceholders } from './data/data';

const EducationForm = ({
  educationInformations,
  handleInputChange,
  handleAddOrRemoveBtnClick,
}) => (
    <Form formName={'education'} placeholders={educationPlaceholders} handleInputChange={handleInputChange}
    handleAddOrRemoveBtnClick={handleAddOrRemoveBtnClick}
    formStyling='flex flex-col items-center gap-4 m-2'>
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
            <Inputs dataEntries={entries[0]} dataForm={'education'} idToApplyForEachEntry={id}
            nthNameAndId={currentWordOrdinal}/>
            <div className='flex'>
              {/* add date input  */}
              <Inputs dataEntries={entries[1]} dataForm={'education'} idToApplyForEachEntry={id}
              nthNameAndId={currentWordOrdinal}/>
            </div>
            {/* add school location, school summary inputs  */}
            <Inputs dataEntries={entries[2]} dataForm={'education'} idToApplyForEachEntry={id}
            nthNameAndId={currentWordOrdinal} prependingTextToNameAndId={'school'}/>
          </div>
        );
      })}
      <AddBtn />
    </Form>
);

export default EducationForm;
