const objectSplice = (obj, start = 0, end = Object.entries(obj).length) => {
  if (start >= end) return [];
  if (start < 0 || end > obj.length) return obj;
  return Object.entries(obj).slice(start, end);
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
  };

  return types[category] || null;
};

const getRandomItem = (array) => array[Math.round(Math.random() * (array.length - 1))];

const ArrayOfInputObjectEmptiness = (array, inputableIndexesRange) => {
  const [start, end] = inputableIndexesRange;

  const isInputObjectEmpty = (entry) => !objectSplice(entry, start, end)
    .find(([_, value]) => !!value);

  const isEmpty = () => array.every((entry) => isInputObjectEmpty(entry));

  return { isEmpty, isInputObjectEmpty };
};

const classesHandler = () => {
  const baseClasses = 'absolute top-0 w-full max-h-full';

  const positionClasses = {
    left: '-left-full pointer-events-none',
    center: '',
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
    const transitionClasses = (movingSide === 'left')
      ? 'transition-transform -translate-x-full duration-500'
      : 'transition-transform translate-x-full duration-500';

    const upcomingClasses = {
      [classesOnMove.center]: [`${transitionClasses} ${classesOnMove.center}`, classesOnMove.left],
      [classesOnMove.left]: [classesOnMove.left, classesOnMove.right],
      [classesOnMove.right]: [`${transitionClasses} ${classesOnMove.right}`, classesOnMove.center],
    };

    return upcomingClasses[currentClasses];
  };

  return { getMovableClasses, getUpcomingClasses };
};

export default objectSplice;
export {
  toTitle, typeGiver, getRandomItem, ArrayOfInputObjectEmptiness, classesHandler,
};
