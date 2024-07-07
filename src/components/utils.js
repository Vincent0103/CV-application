const objectSplice = (obj, [startKey, endKey]) => {
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

const toTitle = (camelCaseString) => camelCaseString
  // Replace hyphens with spaces
  .replace(/-/g, ' ')
  // Insert a space before all caps
  .replace(/([a-z])([A-Z])/g, '$1 $2')
  // Uppercase the first character of each word
  .replace(/\b\w/g, (char) => char.toUpperCase())
  .trim();

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
    diplomas: 'text',
  };

  return types[category] || null;
};

const getRandomItem = (array) => array[Math.round(Math.random() * (array.length - 1))];

const ArrayOfInputObjectEmptiness = (array, inputableKeysRanges) => {
  const [startKey, endKey] = inputableKeysRanges;

  const isInputObjectEmpty = (entry) => !objectSplice(entry, [startKey, endKey])
    .find(([_, value]) => !!value);

  const isEmpty = () => array.every((entry) => isInputObjectEmpty(entry));

  return { isEmpty, isInputObjectEmpty };
};

const classesHandler = () => {
  const baseClasses = 'absolute top-0 w-full';

  const positionClasses = {
    left: '-left-full pointer-events-none',
    center: 'pointer-events-auto',
    right: 'left-full pointer-events-none',
  };

  const getClasses = (position) => `${(position === 'center') ? baseClasses.replace(/\babsolute\b/, 'relative') : baseClasses} ${positionClasses[position] || ''}`;

  const classesOnMove = {
    left: getClasses('left'),
    center: getClasses('center'),
    right: getClasses('right'),
  };

  const getMovableClasses = () => classesOnMove;

  const getUpcomingClasses = (currentClasses, movingSide) => {
    const transitionClasses = (movingSide === 'right')
      ? 'transition-transform -translate-x-full duration-500'
      : 'transition-transform translate-x-full duration-500';

    const upcomingClasses = {
      right: {
        [classesOnMove.center]: [`${transitionClasses} ${classesOnMove.center}`, classesOnMove.left],
        [classesOnMove.left]: [classesOnMove.left, classesOnMove.right],
        [classesOnMove.right]: [`${transitionClasses} ${classesOnMove.right}`, classesOnMove.center],
      },
      left: {
        [classesOnMove.center]: [`${transitionClasses} ${classesOnMove.center}`, classesOnMove.right],
        [classesOnMove.left]: [`${transitionClasses} ${classesOnMove.left}`, classesOnMove.center],
        [classesOnMove.right]: [classesOnMove.right, classesOnMove.left],
      },
    };

    return upcomingClasses[movingSide][currentClasses];
  };

  return { getMovableClasses, getUpcomingClasses };
};

export default objectSplice;
export {
  toTitle, typeGiver, getRandomItem, ArrayOfInputObjectEmptiness, classesHandler,
};
