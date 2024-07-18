import getEntriesFromRange, { ArrayOfInputObjectEmptiness, getFormattedDate } from '../utils';

const SecondaryContainer = ({
  generalObj, educationObj, experiencesObj,
  educationInformations, experiencesInformations, areInformationsEmpty,
}) => {
  const GeneralSection = () => {
    const svgs = {
      email: <svg className="size-5 max-lg:size-4.5 max-sm:size-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14,11H20V15H18V13H14V11M18,4H8A5,5 0 0,0 3,9V18H1V20H21A2,2 0 0,0 23,18V9A5,5 0 0,0 18,4M11,18H5V9A3,3 0 0,1 8,6A3,3 0 0,1 11,9V18M21,18H13V9C13,7.92 12.65,6.86 12,6H18A3,3 0 0,1 21,9V18Z" /></svg>,
      phoneNumber: <svg className="size-5 max-lg:size-4.5 max-sm:size-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 15.5C18.8 15.5 17.5 15.3 16.4 14.9H16.1C15.8 14.9 15.6 15 15.4 15.2L13.2 17.4C10.4 15.9 8 13.6 6.6 10.8L8.8 8.6C9.1 8.3 9.2 7.9 9 7.6C8.7 6.5 8.5 5.2 8.5 4C8.5 3.5 8 3 7.5 3H4C3.5 3 3 3.5 3 4C3 13.4 10.6 21 20 21C20.5 21 21 20.5 21 20V16.5C21 16 20.5 15.5 20 15.5M5 5H6.5C6.6 5.9 6.8 6.8 7 7.6L5.8 8.8C5.4 7.6 5.1 6.3 5 5M19 19C17.7 18.9 16.4 18.6 15.2 18.2L16.4 17C17.2 17.2 18.1 17.4 19 17.4V19M15 12H17A5 5 0 0 0 12 7V9A3 3 0 0 1 15 12M19 12H21C21 7 16.97 3 12 3V5C15.86 5 19 8.13 19 12Z" /></svg>,
      location: <svg className="size-5 max-lg:size-4.5 max-sm:size-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 4C14.2 4 16 5.8 16 8C16 10.1 13.9 13.5 12 15.9C10.1 13.4 8 10.1 8 8C8 5.8 9.8 4 12 4M12 2C8.7 2 6 4.7 6 8C6 12.5 12 19 12 19S18 12.4 18 8C18 4.7 15.3 2 12 2M12 6C10.9 6 10 6.9 10 8S10.9 10 12 10 14 9.1 14 8 13.1 6 12 6M20 19C20 21.2 16.4 23 12 23S4 21.2 4 19C4 17.7 5.2 16.6 7.1 15.8L7.7 16.7C6.7 17.2 6 17.8 6 18.5C6 19.9 8.7 21 12 21S18 19.9 18 18.5C18 17.8 17.3 17.2 16.2 16.7L16.8 15.8C18.8 16.6 20 17.7 20 19Z" /></svg>,
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

    const NameHeading = ({ name, lastName }) => (
      (name || lastName)
      && <h1 className="text-5xl font-black text-zinc-700 py-3
        max-lg:py-2 max-lg:text-4xl max-sm:py-1.5 max-sm:text-xl">{name} {lastName}</h1>
    );

    const ContactsAndLocationSection = ({ entries }) => (
      entries.some(([_, value]) => !!value)
      && <>
        <div className="flex flex-wrap gap-1 justify-between py-3
        max-lg:py-2 max-sm:py-1.5">
          <FlexItems obj={entries} />
        </div>
        <hr />
      </>
    );

    return (
      <>
        <NameHeading name={generalObj.name} lastName={generalObj.lastName} />

        <ContactsAndLocationSection
          entries={getEntriesFromRange(generalObj, ['email', 'location'])} />
      </>
    );
  };

  const date = getFormattedDate();

  const EducationRelated = ({ object, isFirstOccurence = false }) => {
    const SchoolNameAndStudyDate = () => {
      const hasSchoolName = object.schoolName;
      const hasStudyDate = (object.studyDate.from || object.studyDate.to);

      if (hasSchoolName || hasStudyDate) {
        return (
          <div className='flex justify-between items-center'>
            {hasSchoolName
            && <h4 className='font-bold text-xl max-lg:text-base
            max-sm:text-xs'>{object.schoolName}</h4>}
            {hasStudyDate
            && <p className='max-lg:text-xs max-sm:text-[8px] max-sm:leading-snug'>
              {date.formatDate(object.studyDate.from)} - {date.formatDate(object.studyDate.to)}
            </p>}
          </div>
        );
      }
    };

    const StudyNameAndLocation = () => {
      const hasStudyName = object.studyName;
      const hasLocation = object.location;

      if (hasStudyName || hasLocation) {
        return (
          <div>
            {hasStudyName
            && <p className='font-semibold max-lg:text-sm max-sm:text-[10px]
            max-sm:leading-snug'>{object.studyName}</p>}
            {hasLocation
            && <p className='max-lg:text-xs
            max-sm:text-[8px] max-sm:leading-snug'>{object.location}</p>}
          </div>
        );
      }
    };

    const Summary = () => (
      object.summary
      && <p className='max-lg:text-xs
      max-sm:text-[8px] max-sm:leading-snug'>{object.summary}</p>
    );

    return (
      <div className={`${isFirstOccurence && 'pt-0'} py-2 flex flex-col gap-2`}>
        <SchoolNameAndStudyDate />
        <StudyNameAndLocation />
        <Summary />
      </div>
    );
  };

  const EducationSection = ({ education }) => {
    const isEducationEmpty = !areInformationsEmpty
    && ArrayOfInputObjectEmptiness(educationInformations, ['id']).isEmpty();

    return (
      !isEducationEmpty
      && <div>
        <h3 className='font-extrabold text-2xl py-3 underline decoration-1 underline-offset-4
        max-lg:text-xl max-lg:py-2 max-sm:text-sm max-sm:py-1.5'>Education</h3>
          {education.map((item, index) => (
            <EducationRelated key={index} object={item} isFirstOccurence={(index === 0)} />
          ))}
      </div>
    );
  };

  const ExperiencesSection = ({ experiences }) => {
    const PositionTitleAndWorkDate = ({ object }) => {
      const hasPositionTitle = object.positionTitle;
      const hasWorkDate = (object.workDate.from || object.workDate.to);

      if (hasPositionTitle || hasWorkDate) {
        return (
          <div className='flex justify-between items-center'>
            <h4 className='font-bold text-xl
            max-lg:text-base max-sm:text-xs'>{object.positionTitle}</h4>
            <p className='max-lg:text-xs max-sm:text-[8px] max-sm:leading-snug'>
              {date.formatDate(object.workDate.from)} - {date.formatDate(object.workDate.to)}
            </p>
          </div>
        );
      }
    };

    const CompanyName = ({ object }) => (
      object.companyName
      && <div>
        <p className='font-semibold max-lg:text-sm
        max-sm:text-[10px] max-sm:leading-snug'>{object.companyName}</p>
      </div>
    );

    const SummaryAndJobResponsibilities = ({ object }) => {
      const hasSummary = object.summary;
      const hasJobResponsibilities = !ArrayOfInputObjectEmptiness(object.jobResponsibilities, ['id', 'placeholder']).isEmpty();

      if (hasSummary || hasJobResponsibilities) {
        return (
          <div className='flex flex-col'>
            <p className='max-lg:text-xs max-sm:text-[8px] max-sm:leading-snug'>{object.summary}</p>
            <ul className='list-disc ml-4 max-lg:text-xs max-sm:text-[8px] max-sm:leading-snug'>
              {object.jobResponsibilities.map((jobItem, j) => (
                jobItem.responsibility
                && <li key={j}>{jobItem.responsibility}</li>
              ))}
            </ul>
          </div>
        );
      }
    };

    const ExperiencesRelated = ({ object, isFirstOccurence = false }) => (
      <div className={`${isFirstOccurence && 'pt-0'} py-2 flex flex-col gap-2`}>
        <div>
          <PositionTitleAndWorkDate object={object}/>
          <CompanyName object={object}/>
        </div>
        <SummaryAndJobResponsibilities object={object}/>
      </div>
    );

    const isExperiencesEmpty = !areInformationsEmpty
    && ArrayOfInputObjectEmptiness(experiencesInformations, ['id', 'placeholder']).isEmpty();

    return (
      !isExperiencesEmpty
      && <div>
        <h3 className='font-extrabold text-2xl py-3 underline decoration-1 underline-offset-4
        max-lg:text-xl max-lg:py-2 max-sm:text-sm max-sm:py-1.5'>Experiences</h3>
          {experiences.map((item, index) => (
            <ExperiencesRelated key={index} object={item} isFirstOccurence={(index === 0)} />
          ))}
      </div>
    );
  };

  const GeneralSummary = ({ summary }) => (
    summary
    && <div>
      <h3 className="font-extrabold text-2xl py-3 underline decoration-1 underline-offset-4
      max-lg:text-xl max-lg:py-2 max-sm:text-sm max-sm:py-1.5">Summary</h3>
      <p className='max-lg:text-xs max-sm:text-[8px]
      max-sm:leading-snug'>{summary}</p>
    </div>
  );

  return (
    <div className="bg-white h-full w-[67%] px-4 max-lg:px-3 max-sm:px-2">
      <GeneralSection />
      <div className='flex flex-col gap-2'>
        <GeneralSummary summary={generalObj.summary} />
        <EducationSection education={educationObj}/>
        <ExperiencesSection experiences={experiencesObj} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
