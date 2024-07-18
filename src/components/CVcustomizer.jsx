import { toTitle } from './utils';

const Btn = ({
  handleFormSwitcherBtn, movingSide, formSectionName, children,
}) => (
  <div className="flex max-w-full justify-center">
    <div tabIndex="0" role="button" aria-label={`Move to ${formSectionName}`} onClick={() => handleFormSwitcherBtn(movingSide)}
    className="bg-black max-w-48 h-[37.28px] rounded-md shadow-sm flex justify-center items-center
    cursor-pointer my-4 group" >
      { children }
    </div>
  </div>
);

const CVcustomizer = ({
  handleFormSwitcherBtn, currentlyVisibleElement,
  handleClick, children,
}) => {
  const FormSliderBtns = () => {
    const getClasses = (isActive) => {
      const activeTextClasses = 'font-bold text-3xl h-[35px] text-shadow max-lg:text-2xl max-lg:h-[32px]';
      const inactiveTextClasses = 'font-normal text-base h-6 max-lg:text-sm';

      return (isActive) ? activeTextClasses : inactiveTextClasses;
    };

    return (
      <div className="flex flex-col mb-2">
        <div className="rounded-lg h-10 max-w-full flex justify-center items-end gap-2">
          <button type="button" className={`${getClasses(currentlyVisibleElement === 'general')}`} aria-selected="true"
          role="tab" onClick={() => handleClick(null, 'general')}>General</button>
          <button type="button" className={`${getClasses(currentlyVisibleElement === 'education')} border-x-2 border-gray-300 px-2`}
          role="tab" onClick={() => handleClick(null, 'education')}>Education</button>
          <button type="button" className={`${getClasses(currentlyVisibleElement === 'experiences')}`} role="tab"
          onClick={() => handleClick(null, 'experiences')}>Experiences</button>
        </div>
      </div>
    );
  };

  const UpcomingFormBtns = () => {
    const rightArrow = <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 transition-transform translate-y-[1px] group-hover:translate-x-0.5" height={24} width={24} fill="white" viewBox="0 0 24 24"><path d="M4,10V14H13L9.5,17.5L11.92,19.92L19.84,12L11.92,4.08L9.5,6.5L13,10H4Z" /></svg>;
    const leftArrow = <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 transition-transform translate-y-[1px] group-hover:-translate-x-0.5" height={24} width={24} fill="white" viewBox="0 0 24 24"><path d="M20,10V14H11L14.5,17.5L12.08,19.92L4.16,12L12.08,4.08L14.5,6.5L11,10H20Z" /></svg>;

    const getNextVisibleElement = (movingSide) => {
      const movingSideMap = {
        left: {
          experiences: 'education',
          education: 'general',
        },
        right: {
          general: 'education',
          education: 'experiences',
        },
      };

      return movingSideMap[movingSide][currentlyVisibleElement];
    };

    const LeftBtn = () => {
      const formSectionName = toTitle(getNextVisibleElement('left'));

      return (
        <Btn handleFormSwitcherBtn={handleFormSwitcherBtn} movingSide={'left'}
        formSectionName={formSectionName}>
          {leftArrow}
          <p className="text-white text-xl font-semibold p-4 pl-2">{formSectionName}</p>
        </Btn>
      );
    };

    const RightBtn = () => {
      const formSectionName = getNextVisibleElement('right');
      return (
        <Btn handleFormSwitcherBtn={handleFormSwitcherBtn} movingSide={'right'}
        formSectionName={formSectionName}>
          <p className="text-white text-xl font-semibold p-4 pr-2">{formSectionName}</p>
          {rightArrow}
        </Btn>
      );
    };

    return (
      <div className='flex justify-center items-center gap-2'>
        {(currentlyVisibleElement !== 'general') && <LeftBtn />}
        {(currentlyVisibleElement !== 'experiences') && <RightBtn />}
      </div>
    );
  };

  return (
    <div className="w-[33%] h-min sticky top-0 max-lg:static
    max-lg:flex max-lg:flex-col max-lg:items-center max-lg:w-full">
      <FormSliderBtns />
      {children}
      <UpcomingFormBtns />
    </div>
  );
};

export default CVcustomizer;
