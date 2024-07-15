import React, { useEffect, useState } from 'react';
import { classesHandler } from './utils';

const FormContainer = ({
  childrenRelatedData, movingSide,
  handleMovingSide, children,
}) => {
  const handleClasses = classesHandler();
  const classesOnMove = handleClasses.getMovableClasses();

  const [classes, setClasses] = useState({
    general: classesOnMove.center,
    education: classesOnMove.right,
    experiences: classesOnMove.left,
  });

  const { getUpcomingClasses } = handleClasses;

  useEffect(() => {
    if (movingSide !== 'idle') {
      setClasses((prevClasses) => ({
        general: getUpcomingClasses(prevClasses.general, movingSide),
        education: getUpcomingClasses(prevClasses.education, movingSide),
        experiences: getUpcomingClasses(prevClasses.experiences, movingSide),
      }));
      handleMovingSide('idle');
    }
  }, [movingSide, handleMovingSide, getUpcomingClasses]);

  if (React.Children.count(children) !== 3) return;

  const formSections = 'general education experiences';
  if (childrenRelatedData.join(' ') !== formSections) return;

  const [generalChild, educationChild, experiencesChild] = children;

  // eslint-disable-next-line consistent-return
  return (
    <div className="max-h-full max-w-full relative bg-[#ebebeb] rounded-xl border-2 border-gray-300
      shadow-xl overflow-hidden">

      <div className={`max-h-[80vh] min-w-full overflow-x-hidden overflow-y-scroll scrollbar-thin
      scrollbar-track-transparent scrollbar-thumb-rounded-full max-lg:max-h-full`}>

        <div className={classes.general}>
          { generalChild }
        </div>
        <div className={classes.education}>
          { educationChild }
        </div>
        <div className={classes.experiences}>
          { experiencesChild }
        </div>

      </div>
    </div>
  );
};

export default FormContainer;
