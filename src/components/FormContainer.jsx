import React, { useRef, useState, useCallback } from 'react';
import { classesHandler } from './utils';

// eslint-disable-next-line react/display-name
const FormContainer = ({
  fadingBottomContainer, childrenRelatedData, movingSide,
  handleMovingSide, currentlyVisibleElement, children,
}) => {
  const generalRef = useRef(null);
  const educationRef = useRef(null);
  const experiencesRef = useRef(null);

  const handleClasses = classesHandler();
  const classesOnMove = handleClasses.getMovableClasses();

  const [classes, setClasses] = useState({
    general: classesOnMove.center,
    education: classesOnMove.right,
    experiences: classesOnMove.left,
  });
  const [isFadingVisible, setIsFadingVisible] = useState(true);

  if (React.Children.count(children) !== 3) return;

  const formSections = 'general education experiences';
  if (childrenRelatedData.join(' ') !== formSections) return;

  const { getUpcomingClasses } = handleClasses;

  let upcomingClassesFuncs = {};
  let upcomingClasses = {};

  if (movingSide !== 'idle') {
    upcomingClassesFuncs = {
      general: getUpcomingClasses(classes.general, movingSide),
      education: getUpcomingClasses(classes.education, movingSide),
      experiences: getUpcomingClasses(classes.experiences, movingSide),
    };

    upcomingClasses = {
      general: upcomingClassesFuncs.general[0],
      education: upcomingClassesFuncs.education[0],
      experiences: upcomingClassesFuncs.experiences[0],
    };
  }

  const handleTransitionEnd = () => {
    handleMovingSide('idle');
    setClasses({
      general: upcomingClassesFuncs.general[1],
      education: upcomingClassesFuncs.education[1],
      experiences: upcomingClassesFuncs.experiences[1],
    });
  };

  const handleScroll = useCallback((e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    if (scrollTop + clientHeight >= scrollHeight - 10) setIsFadingVisible(false);
    else setIsFadingVisible(true);
  }, []);

  const generalChild = children[0];
  const educationChild = children[1];
  const experiencesChild = children[2];

  const refMapping = {
    general: generalRef,
    education: educationRef,
    experiences: experiencesRef,
  };

  // eslint-disable-next-line consistent-return
  return (
    <div className="max-h-full max-w-full relative bg-[#ebebeb] rounded-xl border-2 border-gray-300
      shadow-xl overflow-hidden">
      <div style={{ maxHeight: `${refMapping[currentlyVisibleElement].current?.offsetHeight}px` }}
      onScroll={handleScroll} className={`max-h-[80vh] min-w-full overflow-y-scroll scrollbar-thin
      scrollbar-track-transparent scrollbar-thumb-rounded-full transition-max-height`}>
        <div ref={generalRef} className={(movingSide !== 'idle') ? upcomingClasses.general : classes.general}
        onTransitionEnd={handleTransitionEnd}>
          { generalChild }
        </div>
        <div ref={educationRef} className={(movingSide !== 'idle') ? upcomingClasses.education : classes.education}>
          { educationChild }
        </div>
        <div ref={experiencesRef} className={(movingSide !== 'idle') ? upcomingClasses.experiences : classes.experiences}>
          { experiencesChild }
        </div>
      </div>
      {isFadingVisible && fadingBottomContainer}
    </div>
  );
};

export default FormContainer;
