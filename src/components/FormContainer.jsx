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
      scrollbar-track-transparent scrollbar-thumb-rounded-full">
        { children }
      </div>
      {isFadingVisible && fadingBottomContainer};
    </div>
  );
};

export default FormContainer;
