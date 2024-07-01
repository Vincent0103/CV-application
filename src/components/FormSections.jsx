import { useState, useCallback } from 'react';

const FormContainer = ({ fadingBottomContainer, children }) => {
  const [isFadingVisible, setIsFadingVisible] = useState(true);

  const handleScroll = useCallback((e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    if (scrollTop + clientHeight >= scrollHeight - 10) setIsFadingVisible(false);
    else setIsFadingVisible(true);
  }, []);

  return (
    <div className="max-h-[80vh] max-w-full relative bg-[#ebebeb] rounded-xl border-2 border-gray-300
      shadow-xl overflow-hidden">
      <div onScroll={handleScroll} className="max-h-[80vh] min-w-full overflow-y-scroll scrollbar-thin
      scrollbar-thumb-bar-color scrollbar-track-transparent scrollbar-thumb-rounded-full">
        { children }
      </div>
      {isFadingVisible && fadingBottomContainer};
    </div>
  );
};

const FormSections = ({ children }) => {
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

  const NextFormBtn = () => {
    const rightArrow = <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 transition-transform translate-y-[1px] group-hover:translate-x-0.5" height={24} width={24} fill="white" viewBox="0 0 24 24"><path d="M4,10V14H13L9.5,17.5L11.92,19.92L19.84,12L11.92,4.08L9.5,6.5L13,10H4Z" /></svg>;

    return (
      <div className="flex max-w-full justify-center">
        <div tabIndex="0" role="button" aria-label="Add new skill"
        className="bg-black max-w-48 h-[37.28px] rounded-md flex justify-center items-center cursor-pointer
        my-4 group">
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
      <NextFormBtn />
    </div>
  );
};

export default FormSections;
export { FormContainer };
