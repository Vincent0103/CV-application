const CVcustomizer = ({ children, handleNextBtnClick, currentlyShowingForm }) => {
  const FormSliderBtns = () => (
      <div className="flex flex-col mb-2">
        <div className="rounded-lg h-10 max-w-full flex justify-center items-end gap-3">
          <button type="button" className="font-bold text-3xl h-[35px]" aria-selected="true"
          role="tab">General</button>
          <button type="button" className="border-x-2 border-gray-300 px-3"
          role="tab">Education</button>
          <button type="button" role="tab">Experiences</button>
        </div>
      </div>
  );

  const NextFormBtn = ({ handleClick, currentForm }) => {
    const rightArrow = <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 transition-transform translate-y-[1px] group-hover:translate-x-0.5" height={24} width={24} fill="white" viewBox="0 0 24 24"><path d="M4,10V14H13L9.5,17.5L11.92,19.92L19.84,12L11.92,4.08L9.5,6.5L13,10H4Z" /></svg>;

    return (
      <div className="flex max-w-full justify-center">
        <div tabIndex="0" role="button" aria-label="Add new skill" onClick={handleClick}
        className="bg-black max-w-48 h-[37.28px] rounded-md flex justify-center items-center cursor-pointer
        my-4 group" dataCurrentForm={currentForm} >
          <p className="text-white text-xl font-semibold p-4 pr-2">Education</p>
          {rightArrow}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[40%] h-min sticky top-0">
      <FormSliderBtns />
      {children}
      <NextFormBtn handleClick={handleNextBtnClick} currentForm={currentlyShowingForm} />
    </div>
  );
};

export default CVcustomizer;
