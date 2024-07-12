import { toWordsOrdinal } from 'number-to-words';
import Form, { Inputs, AddBtn, ExperiencesMultipleInputs } from './FormElements.jsx';
import getEntriesFromRange from './utils';
import { experiencesPlaceholders } from './data/data';

const ExperiencesForm = ({
  experiencesInformations,
  handleInputChange,
  handleAddOrRemoveBtnClick,
}) => (
    <Form formName={'experiences'} placeholders={experiencesPlaceholders} handleInputChange={handleInputChange}
    handleAddOrRemoveBtnClick={handleAddOrRemoveBtnClick}
    formStyling='flex flex-col items-center gap-4 m-2'>
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
            <Inputs dataEntries={entries[0]} dataForm={'education'} idToApplyForEachEntry={id}
            nthNameAndId={currentWordOrdinal}/>
            <div className='flex'>
              {/* add work date input  */}
              <Inputs dataEntries={entries[1]} dataForm={'education'} idToApplyForEachEntry={id}
              nthNameAndId={currentWordOrdinal} prependingTextToNameAndId='work date'
              keyInnerObject={'studyDate'}/>
            </div>
            <div>
              <ExperiencesMultipleInputs object={experiencesInformations[index]} categoryName={'jobResponsibilities'}
              responsibilityKey={'responsibility'}/>
              <AddBtn dataKey={'jobResponsibilities'} innerCategory={'responsibility'} objectId={index} />
            </div>
          </div>
        );
      })}
      <AddBtn />
    </Form>
);

export default ExperiencesForm;
