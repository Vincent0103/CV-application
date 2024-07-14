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
  children, type, nameAndId, placeholder, value, handleChange, dataKey, formName,
  innerCategory, idOfChangingInformationObject, innerObjectId, hasAutoFocus = false, additionalStyles = '',
}) => {
  const classes = `mt-1 block w-full px-3 py-2
  bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-400
  focus:border-gray-400 sm:text-sm`;

  const handleChangeParameterized = (e) => {
    const keys = [];
    [dataKey, innerCategory].forEach((item) => {
      if (item) keys.push(item);
    });
    return handleChange(formName, e, keys, idOfChangingInformationObject, innerObjectId);
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
  formName, nameAndId, values, dataKey,
  selectedValue, innerCategory, handleChange,
  innerObjectId,
}) => {
  const classes = `mt-1 block w-[50%] px-3 py-2
    bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-400
    focus:border-gray-400 sm:text-sm`;

  const handleChangeParameterized = (e) => {
    handleChange(formName, e, [dataKey, innerCategory], undefined, innerObjectId);
  };

  return (
    <select name={nameAndId} id={nameAndId} className={classes}
    value={selectedValue} onChange={handleChangeParameterized}>
      <option value="" disabled>{innerCategory[0].toUpperCase() + innerCategory.slice(1)}</option>
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

const AddBtn = ({
  formName, handleFormClick, dataKey,
  idOfChangingInformationObject, innerCategory, customStyling,
}) => {
  const PlusIcon = <svg className="transition-transform group-hover:rotate-180" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" id="plus"><path d="M12 24c-3.2 0-6.2-1.2-8.5-3.5-4.7-4.7-4.7-12.3 0-17C5.8 1.2 8.8 0 12 0s6.2 1.2 8.5 3.5c4.7 4.7 4.7 12.3 0 17-2.3 2.3-5.3 3.5-8.5 3.5zm0-22C9.3 2 6.8 3 4.9 4.9 1 8.8 1 15.2 4.9 19.1 6.8 21 9.3 22 12 22s5.2-1 7.1-2.9C23 15.2 23 8.9 19.1 5c-1.9-2-4.4-3-7.1-3z"></path><path d="M12 18c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1s1 .4 1 1v10c0 .6-.4 1-1 1z"></path><path d="M17 13H7c-.6 0-1-.4-1-1s.4-1 1-1h10c.6 0 1 .4 1 1s-.4 1-1 1z"></path></svg>;

  const classes = customStyling
  || 'bg-black h-[37.28px] rounded-md flex justify-center items-center cursor-pointer group';

  const handleClickParameterized = () => {
    handleFormClick(formName, 'add', dataKey, idOfChangingInformationObject);
  };

  return (
    <div className="w-full pb-4 px-4">
      <div tabIndex="0" role="button" aria-label={`Add new ${innerCategory || formName}`}
      className={classes} onClick={handleClickParameterized}>
        {PlusIcon}
      </div>
    </div>
  );
};

const RemoveBtn = ({
  formName, handleFormClick, dataKey, idOfChangingInformationObject,
  innerObjectId, innerCategory, nthNameAndId,
}) => {
  const CloseIcon = <svg className='transition-transform group-hover:rotate-180' xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 24 24"><title>close-circle-outline</title><path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" /></svg>;

  const classes = 'mt-1 flex flex-col justify-center items-center bg-red-500 border border-red-600 rounded-md shadow-sm focus:outline-none focus:ring-red-800 focus:border-red-800 px-1 cursor-pointer group';

  const ariaLabel = (nthNameAndId)
    ? `${nthNameAndId} ${innerCategory || formName}`
    : formName;

  const handleClickParameterized = () => {
    handleFormClick(formName, 'remove', dataKey, idOfChangingInformationObject, innerObjectId);
  };

  return (
    <div tabIndex="0" role="button" aria-label={`Remove ${ariaLabel}`}
    className={classes} onClick={handleClickParameterized}>
      {CloseIcon}
    </div>
  );
};

const Inputs = ({
  formName,
  handleFormChange,
  handleImgChange,
  placeholders,
  dataEntries,
  customDataKey,
  innerCategory,
  idOfChangingInformationObject,
  autoFocus = false,
  nthNameAndId = '',
  prependingTextToNameAndId = '',
}) => (
  dataEntries.map((item, index) => {
    const [key, value] = item;
    const type = typeGiver(key);
    const handleChange = (type !== 'file') ? handleFormChange : handleImgChange;

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
          dataKey={(!customDataKey) ? key : customDataKey}
          formName={formName}
          value={value}
          idOfChangingInformationObject={idOfChangingInformationObject}
          innerCategory={innerCategory?.[index]}
        />
      </SectionContainer>
    );
  })
);

const ExperiencesMultipleInputs = ({
  formName,
  handleFormChange,
  handleFormClick,
  inputsArray,
  idOfChangingInformationObject,
  categoryName,
  responsibilityKey,
}) => {
  let currentConvertedIndex;

  return (
    <SectionContainer>
      <Label name={categoryName} labelName={toTitle(categoryName)} />
      {inputsArray.map((item, index) => {
        currentConvertedIndex = toWordsOrdinal(index + 1);

        return (
          <InputContainer key={index} type="text" nameAndId={`${currentConvertedIndex} ${responsibilityKey}`}
            placeholder={item.placeholder} formName={formName}
            additionalStyles={(index === inputsArray.length - 1) ? 'py-0' : 'pb-2'}
            handleChange={handleFormChange} dataKey={categoryName}
            value={item[responsibilityKey]} innerCategory={responsibilityKey}
            idOfChangingInformationObject={idOfChangingInformationObject}
            innerObjectId={item.id}>
            <RemoveBtn formName={formName}
            idOfChangingInformationObject={idOfChangingInformationObject} innerObjectId={item.id}
            handleFormClick={handleFormClick} dataKey={categoryName}
            innerCategory={responsibilityKey} nthNameAndId={currentConvertedIndex}/>
          </ InputContainer>
        );
      })}
    </SectionContainer>
  );
};

const InputsAndSelects = ({
  formName,
  handleFormClick,
  handleFormChange,
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
          placeholder={entry.placeholder} formName={formName}
          additionalStyles={(index === subObject.length - 1) ? 'py-0' : 'pb-2'}
          handleChange={handleFormChange} dataKey={categoryName}
          value={entry[innerCategory]} innerCategory={innerCategory}
          innerObjectId={entry.id}>
          <Select formName={formName}
            nameAndId={`${currentConvertedIndex} ${innerOption}`} values={optionsArray}
            handleChange={handleFormChange} dataKey={categoryName}
            selectedValue={entry[innerOption]} innerCategory={innerOption}
            innerObjectId={entry.id} />
          <RemoveBtn formName={formName} idOfChangingInformationObject={entry.id}
          handleFormClick={handleFormClick} dataKey={categoryName}
          innerCategory={innerCategory} nthNameAndId={currentConvertedIndex}/>
        </ InputContainer>;
      })}
    </SectionContainer>
  );
};

export {
  Inputs, InputsAndSelects, ExperiencesMultipleInputs, AddBtn, RemoveBtn,
};
