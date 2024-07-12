import React from 'react';
import { v4 as uuidv4 } from 'uuid';
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
  children, type, nameAndId, placeholder, value, handleChange, dataKey, dataForm = 'general',
  hasAutoFocus = false, additionalStyles = '', category = null, innerObjectId = null,
  keyInnerObject = null,
}) => {
  const classes = `mt-1 block w-full px-3 py-2
  bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-400
  focus:border-gray-400 sm:text-sm`;

  const handleChangeParameterized = (e) => {
    if (dataForm === 'general') {
      return ((type !== 'file')
        ? handleChange(e, dataKey, [category, innerObjectId])
        : handleChange(e));
    }
    if (dataForm === 'education') {
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
  handleAddOrRemoveBtnClick, handleFileChange, formStyling,
}) => {
  const cloneChildrenWithProps = (currentChildren) => React.Children
    .map(currentChildren, (child) => {
      if (!React.isValidElement(child)) return child;

      const childProps = {
        formName, placeholders, handleInputChange, handleAddOrRemoveBtnClick, handleFileChange,
      };

      if (child.props.children) {
        childProps.children = cloneChildrenWithProps(child.props.children);
      }

      return React.cloneElement(child, childProps);
    });

  return <form className={formStyling}>{cloneChildrenWithProps(children)}</form>;
};

const AddBtn = ({
  formName, handleAddOrRemoveBtnClick, dataKey, innerCategory,
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
    const handleClickParameterized = () => handleAddOrRemoveBtnClick(formName, dataKey);

    return <Btn ariaLabel={innerCategory} handleClick={handleClickParameterized} />;
  };

  const Education = () => {
    const handleClickParameterized = () => handleAddOrRemoveBtnClick(formName, formName);

    return <Btn ariaLabel={formName} handleClick={handleClickParameterized} />;
  };

  return (
    <>
      {formName === 'general' && <General/>}
      {formName === 'education' && <Education />}
    </>
  );
};

const RemoveBtn = ({
  formName, handleAddOrRemoveBtnClick, dataKey, dataId, innerCategory,
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
    const handleClickParameterized = () => handleAddOrRemoveBtnClick(formName, dataKey, dataId);

    return <Btn ariaLabel={innerCategory} handleClick={handleClickParameterized} />;
  };

  const Education = () => {
    const handleClickParameterized = () => handleAddOrRemoveBtnClick(formName, formName);

    return <Btn ariaLabel={formName} handleClick={handleClickParameterized} />;
  };

  return (
    <>
      {formName === 'general' && <General/>}
      {formName === 'education' && <Education />}
    </>
  );
};

const Inputs = ({
  handleInputChange,
  handleFileChange,
  placeholders,
  dataEntries,
  autoFocus = false,
  dataForm = 'general',
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
          dataForm={dataForm}
          value={value}
          innerObjectId={(idToApplyForEachEntry) || ''}
          keyInnerObject={keyInnerObject}
        />
      </SectionContainer>
    );
  })
);

const GeneralInputsAndSelects = ({
  formName,
  handleAddOrRemoveBtnClick,
  handleInputChange,
  object,
  categoryName,
  inputtableSubCategoryKeys,
  optionsArray,
}) => {
  const subObject = object[categoryName];
  const [innerCategory, innerOption] = inputtableSubCategoryKeys;

  return (
    <SectionContainer>
      <Label name={`${innerCategory}0`} labelName={toTitle(categoryName)} />
      {subObject.map((_, index) => {
        const entry = subObject[index];

        return <InputContainer key={index} type="text" nameAndId={`${innerCategory}${index}`}
          placeholder={entry.placeholder}
          additionalStyles={(index === subObject.length - 1) ? 'pt-0 pb-0' : 'pb-2'}
          handleChange={handleInputChange} dataKey={categoryName}
          value={entry[innerCategory]} category={innerCategory}
          innerObjectId={entry.id}>
          <Select nameAndId={`${innerOption}${index}`}
            values={optionsArray}
            handleChange={handleInputChange} dataKey={categoryName}
            selectedValue={entry[innerOption]} category={innerOption}
            innerObjectId={entry.id} />
          <RemoveBtn formName={formName} handleAddOrRemoveBtnClick={handleAddOrRemoveBtnClick}
          dataKey={categoryName} dataId={entry.id} innerCategory={innerCategory} />
        </ InputContainer>;
      })}
    </SectionContainer>
  );
};

export default Form;
export {
  Inputs, GeneralInputsAndSelects, AddBtn, RemoveBtn,
};
