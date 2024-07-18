import { areObjectsEmpty } from '../utils';
import PrimaryContainer from './primaryContainer.jsx';
import SecondaryContainer from './secondaryContainer.jsx';
import { generalPlaceholders, educationPlaceholders, experiencesPlaceholders } from '../data/data';

const CVpreview = ({ generalInformations, educationInformations, experiencesInformations }) => {
  const areInformationsEmpty = areObjectsEmpty(
    [generalInformations, educationInformations, experiencesInformations],
    [['accentColor', 'id', 'placeholder'], ['id'], ['id', 'placeholder']],
  );

  const placeholders = [
    { ...generalPlaceholders },
    [...educationPlaceholders].splice(0, 2),
    [...experiencesPlaceholders].splice(0, 2),
  ];

  // converting educationPlaceholders and experiencesPlaceholders
  // into array because they're an object
  const [generalObj, educationObj, experiencesObj] = (areInformationsEmpty)
    ? [...placeholders]
    : [generalInformations, educationInformations, experiencesInformations];

  return (
    <div className={`bg-white w-full max-h-[29.7cm] aspect-[0.707] shadow-lg rounded-md self-start
    flex text-sm overflow-y-hidden`}>
      <PrimaryContainer generalInformations={generalInformations}
      generalObj={generalObj} areInformationsEmpty={areInformationsEmpty}/>
      <SecondaryContainer generalObj={generalObj} educationObj={educationObj}
      experiencesObj={experiencesObj} educationInformations={educationInformations}
      experiencesInformations={experiencesInformations}
      areInformationsEmpty={areInformationsEmpty}/>
    </div>
  );
};

export default CVpreview;
