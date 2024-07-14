const getEntriesFromRange = (obj, [startKey, endKey]) => {
  const keys = Object.keys(obj);
  const startingIndex = keys.indexOf(startKey);
  const endingIndex = keys.indexOf(endKey);

  if (startingIndex === -1 || (endKey && endingIndex === -1)) {
    throw new Error('startKey or endKey not found in the object.');
  } if (endKey && startingIndex >= endingIndex) {
    throw new Error('Cannot have the index of the starting key greater than the ending key index');
  }

  const slicedEnd = (endKey) ? endingIndex + 1 : startingIndex + 1;
  const slicedKeys = keys.slice(startingIndex, slicedEnd);
  const slicedEntries = slicedKeys.map((key) => [key, obj[key]]);
  return slicedEntries;
};

const keyInDeeplyNestedObject = (key, object) => {
  let current = object;
  while (Array.isArray(current)) [current] = current;
  return !!Object.entries(object)
    .find(([entryKey, entryValue]) => (
      (typeof entryValue !== 'object' && !Array.isArray(entryValue))
        ? entryKey === key
        : keyInDeeplyNestedObject(key, entryValue)));
};

const toTitle = (camelCaseString) => camelCaseString
  // Replace hyphens with spaces
  .replace(/-/g, ' ')
  // Insert a space before all caps
  .replace(/([a-z])([A-Z])/g, '$1 $2')
  // Uppercase the first character of each word
  .replace(/\b\w/g, (char) => char.toUpperCase())
  .trim();

const toSpacedLowerCase = (camelCaseString) => camelCaseString
  // Replace hyphens with spaces
  .replace(/-/g, ' ')
  // Insert a space before all caps
  .replace(/([a-z])([A-Z])/g, '$1 $2')
  // Lowercase all characters
  .toLowerCase();

const typeGiver = (category) => {
  const types = {
    name: 'text',
    lastName: 'text',
    location: 'text',
    profilePicture: 'file',
    skills: 'text',
    languages: 'text',
    email: 'email',
    phoneNumber: 'tel',
    summary: 'textarea',
    hobbies: 'textarea',
    schoolName: 'text',
    studyName: 'text',
    from: 'date',
    to: 'date',
  };

  return types[category] || null;
};

const getRandomItem = (array) => array[Math.round(Math.random() * (array.length - 1))];

const ArrayOfInputObjectEmptiness = (array, keysToOmit) => {
  const isInputObjectEmpty = (object) => Object.entries(object)
    .every(([key, value]) => {
      if (keysToOmit.includes(key)) return true;

      const isValueAnArray = Array.isArray(value);
      if (!isValueAnArray && typeof value !== 'object') return value === '';

      const target = (isValueAnArray) ? value : [value];
      return ArrayOfInputObjectEmptiness(target, keysToOmit).isEmpty();
    });

  const isEmpty = () => array.every((object) => isInputObjectEmpty(object));

  return { isEmpty, isInputObjectEmpty };
};

const classesHandler = () => {
  const positionClasses = {
    left: 'hidden -left-full pointer-events-none',
    center: 'block pointer-events-auto',
    right: 'hidden left-full pointer-events-none',
  };

  const getMovableClasses = () => positionClasses;

  const getUpcomingClasses = (currentClasses, movingSide) => {
    const upcomingClasses = {
      right: {
        [positionClasses.center]: positionClasses.left,
        [positionClasses.left]: positionClasses.right,
        [positionClasses.right]: positionClasses.center,
      },
      left: {
        [positionClasses.center]: positionClasses.right,
        [positionClasses.left]: positionClasses.center,
        [positionClasses.right]: positionClasses.left,
      },
    };

    if (!(movingSide in upcomingClasses)) {
      throw Error(`The key ${movingSide} is not a valid key in upcomingClasses. Ensure that movingSide is one of the expected keys: ['left', 'right']`);
    }

    if (!(currentClasses in upcomingClasses[movingSide])) throw Error('Given bad classes format in getUpcomingClasses()');

    return upcomingClasses[movingSide][currentClasses];
  };

  return { getMovableClasses, getUpcomingClasses };
};

const getFormattedDate = () => {
  const isDateToday = (dateString) => {
    const today = new Date();
    let month = today.getMonth() + 1;
    if (month > 0 && month < 10) month = `0${month}`;

    const todayFormatted = `${today.getFullYear()}-${month}-${today.getDate()}`;
    return dateString === todayFormatted;
  };
  const formatDate = (dateString) => {
    if (!dateString) return '';

    if (isDateToday(dateString)) return 'Present';
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long' };
    const formattedDate = `${date.toLocaleString('en-US', options)}`;
    if (formattedDate === 'Invalid Date') {
      throw new Error(`Invalid date format for ${dateString}, it is supposed be in this format [YYYY]-[MM]-[DD]`);
    }
    return formattedDate;
  };

  return { formatDate };
};

export default getEntriesFromRange;
export {
  toTitle, toSpacedLowerCase, typeGiver, getRandomItem,
  ArrayOfInputObjectEmptiness, classesHandler,
  keyInDeeplyNestedObject, getFormattedDate,
};
