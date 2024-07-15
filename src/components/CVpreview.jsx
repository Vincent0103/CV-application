import getEntriesFromRange, { ArrayOfInputObjectEmptiness, getFormattedDate } from './utils';

const CVpreview = ({ generalInformations, educationInformations, experiencesInformations }) => {
  const ListSection = ({ obj, arrayOfInputObjectEmptiness }) => (
    <ul>
      {obj.map((item, index) => {
        const isInputEmpty = arrayOfInputObjectEmptiness.isInputObjectEmpty(item, 1, 3);
        return (
          !isInputEmpty
          && <li key={index} className="p-2 px-7 flex justify-between gap-4 max-lg:gap-2
          overflow-hidden max-lg:p-1 max-lg:px-3.5 max-lg:text-xs max-lg:h-[35px]
          max-sm:text-[8px] max-sm:h-[20px]">
            {Object.keys(item).map((innerItem, i) => (
              innerItem !== 'id' && innerItem !== 'placeholder'
              && <p key={i}>{ item[innerItem] }</p>
            ))}
          </li>
        );
      })}
    </ul>
  );

  const SectionContainer = ({
    heading, category, containerStyles, children, arrayOfInputObjectEmptiness, hasHr = true,
  }) => {
    const item = generalInformations[category];
    const hr = (hasHr) ? <SectionHr /> : '';

    const component = (
      !arrayOfInputObjectEmptiness?.isEmpty()
      && <>
        <div className={`self-stretch ${containerStyles || ''} max-lg:pb-1`}>
          { heading && <h3 className="font-bold text-2xl p-2 text-center
          max-lg:text-xl max-lg:font-semibold max-lg:p-2 max-lg:h-[40px]
          max-sm:text-sm max-sm:p-1 max-sm:h-[25px]">{ heading }</h3>}
          { children }
        </div>
        {hr}
      </>
    );

    return (item && component);
  };

  const SectionHr = () => <hr className="border-t-1 my-2 border-white w-[90%]"/>;

  const PrimaryContainer = () => {
    const arrays = [generalInformations.skills, generalInformations.languages];

    const emptinessFunctions = [ArrayOfInputObjectEmptiness(arrays[0], ['id', 'placeholder']),
      ArrayOfInputObjectEmptiness(arrays[1], ['id', 'placeholder'])];

    return (
      <div className="bg-slate-800 h-full w-[33%] text-white flex
      flex-col items-center">

        <SectionContainer category={'profilePicture'}
        containerStyles={'flex justify-center items-center p-6 max-sm:p-2'}>
          <img src={generalInformations.profilePicture} alt="Your custom profile picture"
          className="size-32 object-cover object-center rounded-full shadow-lg
          max-lg:size-25 max-sm:size-20"/>
        </SectionContainer>

        <SectionContainer heading={'Skills'} category={'skills'}
        arrayOfInputObjectEmptiness={emptinessFunctions[0]}>
          <ListSection obj={generalInformations.skills}
          arrayOfInputObjectEmptiness={emptinessFunctions[0]} />
        </SectionContainer>

        <SectionContainer heading={'Languages'} category={'languages'}
        arrayOfInputObjectEmptiness={emptinessFunctions[1]}>
          <ListSection obj={generalInformations.languages}
          arrayOfInputObjectEmptiness={emptinessFunctions[1]} />
        </SectionContainer>

        <SectionContainer heading={'Hobbies'} category={'hobbies'} containerStyles='flex flex-col items-center'
        hasHr={false}>
          <p className="w-[90%] py-2 max-lg:text-xs max-sm:text-[8px]
          max-sm:leading-relaxed">{ generalInformations.hobbies }</p>
        </SectionContainer>

      </div>
    );
  };

  const svgs = {
    email: <svg className="size-5 max-lg:size-4.5 max-sm:size-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>mailbox-open-outline</title><path d="M14,11H20V15H18V13H14V11M18,4H8A5,5 0 0,0 3,9V18H1V20H21A2,2 0 0,0 23,18V9A5,5 0 0,0 18,4M11,18H5V9A3,3 0 0,1 8,6A3,3 0 0,1 11,9V18M21,18H13V9C13,7.92 12.65,6.86 12,6H18A3,3 0 0,1 21,9V18Z" /></svg>,
    phoneNumber: <svg className="size-5 max-lg:size-4.5 max-sm:size-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>phone-in-talk-outline</title><path d="M20 15.5C18.8 15.5 17.5 15.3 16.4 14.9H16.1C15.8 14.9 15.6 15 15.4 15.2L13.2 17.4C10.4 15.9 8 13.6 6.6 10.8L8.8 8.6C9.1 8.3 9.2 7.9 9 7.6C8.7 6.5 8.5 5.2 8.5 4C8.5 3.5 8 3 7.5 3H4C3.5 3 3 3.5 3 4C3 13.4 10.6 21 20 21C20.5 21 21 20.5 21 20V16.5C21 16 20.5 15.5 20 15.5M5 5H6.5C6.6 5.9 6.8 6.8 7 7.6L5.8 8.8C5.4 7.6 5.1 6.3 5 5M19 19C17.7 18.9 16.4 18.6 15.2 18.2L16.4 17C17.2 17.2 18.1 17.4 19 17.4V19M15 12H17A5 5 0 0 0 12 7V9A3 3 0 0 1 15 12M19 12H21C21 7 16.97 3 12 3V5C15.86 5 19 8.13 19 12Z" /></svg>,
    location: <svg className="size-5 max-lg:size-4.5 max-sm:size-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>map-marker-radius-outline</title><path d="M12 4C14.2 4 16 5.8 16 8C16 10.1 13.9 13.5 12 15.9C10.1 13.4 8 10.1 8 8C8 5.8 9.8 4 12 4M12 2C8.7 2 6 4.7 6 8C6 12.5 12 19 12 19S18 12.4 18 8C18 4.7 15.3 2 12 2M12 6C10.9 6 10 6.9 10 8S10.9 10 12 10 14 9.1 14 8 13.1 6 12 6M20 19C20 21.2 16.4 23 12 23S4 21.2 4 19C4 17.7 5.2 16.6 7.1 15.8L7.7 16.7C6.7 17.2 6 17.8 6 18.5C6 19.9 8.7 21 12 21S18 19.9 18 18.5C18 17.8 17.3 17.2 16.2 16.7L16.8 15.8C18.8 16.6 20 17.7 20 19Z" /></svg>,
  };

  const FlexItems = ({ obj }) => (
    obj.map(([key, item], index) => (
      item && <p key={index} className="flex gap-1 justify-center items-center
      max-lg:text-xs max-sm:text-[8px]">
        {svgs[key]}
        {item}
      </p>
    ))
  );

  const SecondaryContainer = () => {
    const generalObj = generalInformations;
    const educationArray = educationInformations;
    const experiencesArray = experiencesInformations;
    const educationEmptiness = ArrayOfInputObjectEmptiness(educationArray, ['id']);
    const experiencesEmptiness = ArrayOfInputObjectEmptiness(experiencesArray, ['id', 'placeholder']);
    const date = getFormattedDate();

    return (
      <div className="bg-white h-full w-[67%] px-4 max-lg:px-3 max-sm:px-2">
        {(generalObj.name || generalObj.lastName)
        && <h1 className="text-5xl font-black text-zinc-700 py-3
        max-lg:py-2 max-lg:text-4xl max-sm:py-1.5 max-sm:text-xl">{generalObj.name} {generalObj.lastName}</h1>}
        {(generalObj.email || generalObj.phoneNumber || generalObj.location)
        && <>
            <div className="flex flex-wrap gap-1 justify-between py-3
            max-lg:py-2 max-sm:py-1.5">
              <FlexItems obj={getEntriesFromRange(generalObj, ['email', 'location'])} />
            </div>
            <hr />
          </>
        }
        <div className='flex flex-col gap-2'>
          {(generalObj.summary)
          && <div>
              <h3 className="font-extrabold text-2xl py-3 underline decoration-1 underline-offset-4
              max-lg:text-xl max-lg:py-2 max-sm:text-sm max-sm:py-1.5">Summary</h3>
              <p className='max-lg:text-xs max-sm:text-[8px]
              max-sm:leading-snug'>{generalObj.summary}</p>
            </div>
          }
          {(!educationEmptiness.isEmpty())
          && <div>
              <h3 className='font-extrabold text-2xl py-3 underline decoration-1 underline-offset-4
              max-lg:text-xl max-lg:py-2 max-sm:text-sm max-sm:py-1.5'>Education</h3>
              {educationArray.map((item, index) => (
                !educationEmptiness.isInputObjectEmpty(item)
                && <div key={index}
                className={`${index === 0 && 'pt-0'} py-2 flex flex-col gap-2`}>
                  <div className='flex justify-between items-center'>
                    <h4 className='font-bold text-xl max-lg:text-base
                    max-sm:text-xs'>{item.schoolName}</h4>
                    <p className='max-lg:text-xs max-sm:text-[8px] max-sm:leading-snug'>
                      {date.formatDate(item.studyDate.from)} - {date.formatDate(item.studyDate.to)}
                    </p>
                  </div>
                  <div>
                    <p className='font-semibold max-lg:text-sm max-sm:text-[10px]
                    max-sm:leading-snug'>{item.studyName}</p>
                    <p className='max-lg:text-xs
                    max-sm:text-[8px] max-sm:leading-snug'>{item.location}</p>
                  </div>
                  <p className='max-lg:text-xs
                    max-sm:text-[8px] max-sm:leading-snug'>{item.summary}</p>
                </div>
              ))}
            </div>
          }
          {(!experiencesEmptiness.isEmpty())
          && <div>
              <h3 className='font-extrabold text-2xl py-3 underline decoration-1 underline-offset-4
              max-lg:text-xl max-lg:py-2 max-sm:text-sm max-sm:py-1.5'>Experiences</h3>
              {experiencesArray.map((item, index) => (
                !experiencesEmptiness.isInputObjectEmpty(item)
                && <div key={index}
                className={`${index === 0 && 'pt-0'} py-2 flex flex-col gap-2`}>
                  <div>
                    <div className='flex justify-between items-center'>
                      <h4 className='font-bold text-xl
                      max-lg:text-base max-sm:text-xs'>{item.positionTitle}</h4>
                      <p className='max-lg:text-xs max-sm:text-[8px] max-sm:leading-snug'>
                        {date.formatDate(item.workDate.from)} - {date.formatDate(item.workDate.to)}
                      </p>
                    </div>
                    <div>
                      <p className='font-semibold max-lg:text-sm
                      max-sm:text-[10px] max-sm:leading-snug'>{item.companyName}</p>
                    </div>
                  </div>
                  <div className='flex flex-col'>
                    <p className='max-lg:text-xs max-sm:text-[8px] max-sm:leading-snug'>{item.summary}</p>
                    <ul className='list-disc ml-4 max-lg:text-xs max-sm:text-[8px] max-sm:leading-snug'>
                      {item.jobResponsibilities.map((jobItem, j) => (
                        !experiencesEmptiness.isInputObjectEmpty(jobItem)
                        && <li key={j}>{jobItem.responsibility}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
          </div>}
        </div>
      </div>
    );
  };

  return (
    <div className={`bg-white w-[67%] max-h-[29.7cm] aspect-[0.707] shadow-lg rounded-md self-start
    flex text-sm max-lg:w-full`}>
      <PrimaryContainer />
      <SecondaryContainer />
    </div>
  );
};

export default CVpreview;
