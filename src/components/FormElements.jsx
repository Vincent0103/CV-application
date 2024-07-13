import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toWordsOrdinal } from 'number-to-words';
import { typeGiver, toTitle, toSpacedLowerCase } from './utils';

const Label = ({ name, labelName }) => <label htmlFor={name} className="block text-sm font-medium text-gray-700">{labelName}</label>;

const InputImg = ({
  handleImgChange, nameAndId, hasAutoFocus, classes,
}) => (
  <input type='file' accept='image/*' id={nameAndId} name={nameAndId}
  onChange={handleImgChange} autoFocus={hasAutoFocus} className={classes}/>
);

const InputOrTextarea = ({
  type, nameAndId, classes, placeholder, hasAutoFocus, value, handleChange,
}) => {
  const commonProps = {
    name: nameAndId,
    id: nameAndId,
    className: classes,
    placeholder,
    autoFocus: hasAutoFocus,
    value,
    onChange: handleChange,
  };

  return ((type !== 'textarea')
    ? (<input type={type} {...commonProps} />)
    : (<textarea rows="6" {...commonProps}></textarea>));
};

const InputContainer = ({
  children, type, nameAndId, placeholder, value, handleChange, dataKey, formName = 'general',
  hasAutoFocus = false, additionalStyles = '', category = null, innerObjectId = null,
  keyInnerObject = null,
}) => {
  const classes = `mt-1 block w-full px-3 py-2
  bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-400
  focus:border-gray-400 sm:text-sm`;

  const handleChangeParameterized = (e) => {
    if (formName === 'general') {
      return ((type !== 'file')
        ? handleChange(e, dataKey, [category, innerObjectId])
        : handleChange(e));
    }
    if (formName === 'education') {
      if (keyInnerObject) return handleChange(e, dataKey, innerObjectId, keyInnerObject);
      return handleChange(e, dataKey, innerObjectId);
    }
  };

  const inputOrTextareaComponent = <InputOrTextarea type={type} nameAndId={nameAndId}
  classes={classes} placeholder={placeholder} hasAutoFocus={hasAutoFocus} value={value}
  handleChange={handleChangeParameterized}/>;

  const inputImg = <InputImg handleImgChange={handleChangeParameterized} name={nameAndId}
   classes={classes} hasAutoFocus={hasAutoFocus} />;

  const input = (type !== 'file') ? inputOrTextareaComponent : inputImg;

  const flexInputs = <div className={`flex gap-3 ${additionalStyles}`}>{input}{children}</div>;

  return (children) ? flexInputs : input;
};

const Select = ({
  nameAndId, values, dataKey, selectedValue, category = null, innerObjectId = null, handleChange,
}) => {
  const classes = `mt-1 block w-[50%] px-3 py-2
    bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-400
    focus:border-gray-400 sm:text-sm`;

  const handleChangeParameterized = (e) => handleChange(e, dataKey, [category, innerObjectId]);

  return (
    <select name={nameAndId} id={nameAndId} className={classes}
    value={selectedValue} onChange={handleChangeParameterized}>
      <option value="" disabled>{category[0].toUpperCase() + category.slice(1)}</option>
      {values.map((value) => <option key={uuidv4()} value={value}>
        {value[0].toUpperCase() + value.slice(1)}
      </option>)}
    </select>
  );
};

const SectionContainer = ({ children }) => (
  <div className='p-4 w-full'>
    {children}
  </div>
);

const Form = ({
  children, formName, placeholders, handleInputChange,
  handleFormClick, handleFileChange, formStyling,
}) => {
  const cloneChildrenWithProps = (currentChildren) => React.Children
    .map(currentChildren, (child) => {
      if (!React.isValidElement(child)) return child;

      const childProps = {
        formName, placeholders, handleInputChange, handleFormClick, handleFileChange,
      };

      if (child.props.children) {
        childProps.children = cloneChildrenWithProps(child.props.children);
      }

      return React.cloneElement(child, childProps);
    });

  return <form className={formStyling}>{cloneChildrenWithProps(children)}</form>;
};

const AddBtn = ({
  formName, handleFormClick, dataKey, objectId, innerCategory,
}) => {
  const PlusIcon = <svg className="transition-transform group-hover:rotate-180" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" id="plus"><path d="M12 24c-3.2 0-6.2-1.2-8.5-3.5-4.7-4.7-4.7-12.3 0-17C5.8 1.2 8.8 0 12 0s6.2 1.2 8.5 3.5c4.7 4.7 4.7 12.3 0 17-2.3 2.3-5.3 3.5-8.5 3.5zm0-22C9.3 2 6.8 3 4.9 4.9 1 8.8 1 15.2 4.9 19.1 6.8 21 9.3 22 12 22s5.2-1 7.1-2.9C23 15.2 23 8.9 19.1 5c-1.9-2-4.4-3-7.1-3z"></path><path d="M12 18c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1s1 .4 1 1v10c0 .6-.4 1-1 1z"></path><path d="M17 13H7c-.6 0-1-.4-1-1s.4-1 1-1h10c.6 0 1 .4 1 1s-.4 1-1 1z"></path></svg>;

  const Btn = ({ ariaLabel, handleClick }) => (
    <div className="w-full pb-4 px-4">
      <div tabIndex="0" role="button" aria-label={`Add new ${ariaLabel}`}
      className="bg-black h-[37.28px] rounded-md flex justify-center items-center
      cursor-pointer group" onClick={handleClick}>
        {PlusIcon}
      </div>
    </div>
  );

  const General = () => {
    const handleClickParameterized = () => {
      handleFormClick(formName, 'add', dataKey);
    };

    return <Btn ariaLabel={innerCategory} handleClick={handleClickParameterized} />;
  };

  const Education = () => {
    const handleClickParameterized = () => {
      handleFormClick(formName, 'add');
    };

    return <Btn ariaLabel={formName} handleClick={handleClickParameterized} />;
  };

  const Experiences = () => {
    let handleClickParameterized;

    if (dataKey && innerCategory) {
      handleClickParameterized = () => {
        handleFormClick(formName, 'add', dataKey, objectId);
      };

      return <Btn ariaLabel={innerCategory} handleClick={handleClickParameterized} />;
    }

    handleClickParameterized = () => {
      handleFormClick(formName, 'add');
    };

    return <Btn ariaLabel={formName} handleClick={handleClickParameterized} />;
  };

  return (
    <>
      {formName === 'general' && <General/>}
      {formName === 'education' && <Education />}
      {formName === 'experiences' && <Experiences />}
    </>
  );
};

const RemoveBtn = ({
  formName, objectId, handleFormClick, dataKey, innerCategory, nthNameAndId,
}) => {
  const CloseIcon = <svg className='transition-transform group-hover:rotate-180' xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 24 24"><title>close-circle-outline</title><path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" /></svg>;

  const Btn = ({ ariaLabel, handleClick }) => (
    <div tabIndex="0" role="button" aria-label={`Remove ${ariaLabel}`}
    className='mt-1 flex flex-col justify-center items-center bg-red-500 border
    border-red-600 rounded-md shadow-sm focus:outline-none focus:ring-red-800
  focus:border-red-800 px-1 cursor-pointer group' onClick={handleClick}>
      {CloseIcon}
    </div>
  );

  const General = () => {
    const handleClickParameterized = () => {
      handleFormClick(formName, 'remove', dataKey, objectId);
    };

    return <Btn ariaLabel={(nthNameAndId)
      ? `${nthNameAndId} ${innerCategory}`
      : innerCategory} handleClick={handleClickParameterized} />;
  };

  const Education = () => {
    const handleClickParameterized = () => {
      handleFormClick(formName, 'remove', null, objectId);
    };

    return <Btn ariaLabel={(nthNameAndId)
      ? `${nthNameAndId} ${formName}`
      : formName} handleClick={handleClickParameterized} />;
  };

  const Experiences = () => {
    if (dataKey && innerCategory) {
      const handleClickParameterized = () => {
        handleFormClick(formName, 'remove', dataKey, objectId);
      };

      return <Btn ariaLabel={(nthNameAndId)
        ? `${nthNameAndId} ${innerCategory}`
        : innerCategory} handleClick={handleClickParameterized} />;
    }

    const handleClickParameterized = () => {
      handleFormClick(formName, 'remove', null, objectId);
    };

    return <Btn ariaLabel={(nthNameAndId)
      ? `${nthNameAndId} ${formName}`
      : formName} handleClick={handleClickParameterized} />;
  };

  return (
    <>
      {formName === 'general' && <General/>}
      {formName === 'education' && <Education />}
      {formName === 'experiences' && <Experiences />}
    </>
  );
};

const Inputs = ({
  formName,
  handleInputChange,
  handleFileChange,
  placeholders,
  dataEntries,
  autoFocus = false,
  idToApplyForEachEntry = null,
  nthNameAndId = '',
  prependingTextToNameAndId = '',
  keyInnerObject = null,
}) => (
  dataEntries.map((item, index) => {
    const [key, value] = item;
    const type = typeGiver(key);
    const handleChange = (type !== 'file') ? handleInputChange : handleFileChange;

    let nameAndId = '';
    if (nthNameAndId) nameAndId += `${nthNameAndId} `;
    if (prependingTextToNameAndId) nameAndId += `${prependingTextToNameAndId} `;
    nameAndId += toSpacedLowerCase(key);

    return (
      <SectionContainer key={index}>
        <Label name={nameAndId} labelName={toTitle(key)} />
        <InputContainer
          type={type}
          nameAndId={nameAndId}
          labelName={toTitle(key)}
          placeholder={placeholders[key]}
          hasAutoFocus={autoFocus}
          handleChange={handleChange}
          dataKey={key}
          formName={formName}
          value={value}
          innerObjectId={(idToApplyForEachEntry) || ''}
          keyInnerObject={keyInnerObject}
        />
      </SectionContainer>
    );
  })
);

const ExperiencesMultipleInputs = ({
  formName,
  handleInputChange,
  handleFormClick,
  object,
  categoryName,
  responsibilityKey,
}) => {
  const subObject = object[categoryName];

  let currentConvertedIndex;
  return (
    <SectionContainer>
      <Label name={categoryName} labelName={toTitle(categoryName)} />
      {subObject.map((_, index) => {
        const entry = subObject[index];
        currentConvertedIndex = toWordsOrdinal(index + 1);

        return <InputContainer key={index} type="text" nameAndId={`${currentConvertedIndex} ${responsibilityKey}`}
          placeholder={entry.placeholder}
          additionalStyles={(index === subObject.length - 1) ? 'py-0' : 'pb-2'}
          handleChange={handleInputChange} dataKey={categoryName}
          value={entry[responsibilityKey]} category={responsibilityKey}
          innerObjectId={entry.id}>
          <RemoveBtn formName={formName} dataId={entry.id}
          handleFormClick={handleFormClick} dataKey={categoryName}
          innerCategory={responsibilityKey} nthNameAndId={currentConvertedIndex}/>
        </ InputContainer>;
      })}
    </SectionContainer>
  );
};

const GeneralInputsAndSelects = ({
  formName,
  handleFormClick,
  handleInputChange,
  object,
  categoryName,
  inputtableSubCategoryKeys,
  optionsArray,
}) => {
  const subObject = object[categoryName];
  const [innerCategory, innerOption] = inputtableSubCategoryKeys;

  let currentConvertedIndex;
  return (
    <SectionContainer>
      <Label name={`${toWordsOrdinal(1)} ${innerCategory}`} labelName={toTitle(categoryName)} />
      {subObject.map((_, index) => {
        const entry = subObject[index];
        currentConvertedIndex = toWordsOrdinal(index + 1);

        return <InputContainer key={index} type="text" nameAndId={`${currentConvertedIndex} ${innerCategory}`}
          placeholder={entry.placeholder}
          additionalStyles={(index === subObject.length - 1) ? 'py-0' : 'pb-2'}
          handleChange={handleInputChange} dataKey={categoryName}
          value={entry[innerCategory]} category={innerCategory}
          innerObjectId={entry.id}>
          <Select nameAndId={`${currentConvertedIndex} ${innerOption}`}
            values={optionsArray}
            handleChange={handleInputChange} dataKey={categoryName}
            selectedValue={entry[innerOption]} category={innerOption}
            innerObjectId={entry.id} />
          <RemoveBtn formName={formName} objectId={entry.id}
          handleFormClick={handleFormClick} dataKey={categoryName}
          innerCategory={innerCategory} nthNameAndId={currentConvertedIndex}/>
        </ InputContainer>;
      })}
    </SectionContainer>
  );
};

export default Form;
export {
  Inputs, GeneralInputsAndSelects, ExperiencesMultipleInputs, AddBtn, RemoveBtn,
};
