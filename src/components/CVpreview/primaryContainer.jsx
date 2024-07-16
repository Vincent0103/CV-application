import { ArrayOfInputObjectEmptiness, ColorRatio } from '../utils';

const PrimaryContainer = ({ generalInformations, generalObj, areInformationsEmpty }) => {
  const arrays = [generalInformations.skills, generalInformations.languages];

  const [skillsEmptiness, languagesEmptiness] = [ArrayOfInputObjectEmptiness(arrays[0], ['id', 'placeholder']),
    ArrayOfInputObjectEmptiness(arrays[1], ['id', 'placeholder'])];

  const areSkillsEmpty = !areInformationsEmpty && skillsEmptiness.isEmpty();
  const areLanguagesEmpty = !areInformationsEmpty && languagesEmptiness.isEmpty();

  const colorRatio = ColorRatio();

  const SectionContainer = ({
    heading, containerStyles, children, hasHr = true,
  }) => {
    const hr = (hasHr) ? <SectionHr /> : '';

    const component = (
      <>
        <div className={`self-stretch ${containerStyles || ''} max-lg:pb-1`}>
          { heading && <h3 className="font-bold text-2xl p-2 text-center
          max-lg:text-xl max-lg:font-semibold max-lg:p-2 max-lg:h-[40px]
          max-sm:text-sm max-sm:p-1 max-sm:h-[25px]">{ heading }</h3>}
          { children }
        </div>
        {hr}
      </>
    );

    return component;
  };

  const ListSection = ({ obj, emptinessFunction }) => (
    <ul>
      {obj.map((item, index) => {
        const isSkillItemEmpty = (!areInformationsEmpty
          && emptinessFunction.isInputObjectEmpty(item));

        return (
          !isSkillItemEmpty
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

  const SectionHr = () => <hr className="border-t-1 my-2 border-white w-[90%]"/>;

  return (
    <div style={{
      backgroundColor: generalInformations.accentColor,
      color: colorRatio.getTextColorBasedOfBackgroundColor(generalInformations.accentColor),
    }}
    className="bg-slate-800 h-full w-[33%] text-white flex
    flex-col items-center">

      {generalObj.profilePicture
      && <SectionContainer category={'profilePicture'}
      containerStyles={'flex justify-center items-center p-6 max-sm:p-2'}>
       <img src={generalObj.profilePicture} alt="Your custom profile picture"
        className="size-32 object-cover object-center rounded-full shadow-lg
        max-lg:size-25 max-sm:size-20"/>
      </SectionContainer>}

      {!areSkillsEmpty
        && <SectionContainer heading={'Skills'}>
        <ListSection obj={generalObj.skills} emptinessFunction={skillsEmptiness} />
      </SectionContainer>}

      {!areLanguagesEmpty
      && <SectionContainer heading={'Languages'}>
        <ListSection obj={generalObj.languages} emptinessFunction={languagesEmptiness}/>
      </SectionContainer>}

      {generalObj.hobbies
      && <SectionContainer heading={'Hobbies'} containerStyles='flex flex-col items-center'
      hasHr={false}>
        <p className="w-[90%] py-2 max-lg:text-xs max-sm:text-[8px]
        max-sm:leading-relaxed">{ generalObj.hobbies }</p>
      </SectionContainer>}

    </div>
  );
};

export default PrimaryContainer;
