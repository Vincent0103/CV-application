import {
  vi, describe, it, expect, beforeEach,
} from 'vitest';
import getEntriesFromRange, {
  toTitle, keyInDeeplyNestedObject, toSpacedLowerCase,
  typeGiver, ArrayOfInputObjectEmptiness, classesHandler,
  getFormattedDate, ColorRatio,
} from '../utils';

describe('getEntriesFromRange fn', () => {
  let inputObject;
  beforeEach(() => {
    inputObject = {
      name: 'John',
      lastName: 'Doe',
      location: 'Mars',
      skills: 'JavaScript',
      languages: 'English',
      email: '',
    };
  });

  it('returns the first three entries of the object', () => {
    const result = getEntriesFromRange(inputObject, ['name', 'location']);
    expect(result).toEqual([
      ['name', 'John'],
      ['lastName', 'Doe'],
      ['location', 'Mars'],
    ]);
  });

  it('returns the last two entries of the object', () => {
    const result = getEntriesFromRange(inputObject, ['languages', 'email']);
    expect(result).toEqual([
      ['languages', 'English'],
      ['email', ''],
    ]);
  });

  it('throws an error if end index is less than start index', () => {
    const errorThrowingFunction = () => getEntriesFromRange(inputObject, ['skills', 'location']);
    expect(errorThrowingFunction).toThrowError('Cannot have the index of the starting key greater than the ending key index');
  });

  it('throws an error for keys that do not exist', () => {
    const errorThrowingFunction = () => getEntriesFromRange(inputObject, ['mario', 'gets called']);
    expect(errorThrowingFunction).toThrowError('startKey or endKey not found in the object.');
  });

  it('handles correctly if the endingKey isn\'t given', () => {
    const result = getEntriesFromRange(inputObject, ['skills', false]);
    expect(result).toEqual([
      ['skills', 'JavaScript'],
    ]);
  });
});

describe('keyInDeeplyNestedObject fn', () => {
  let inputObject;
  let inputObjectWithNestedArrays;
  beforeEach(() => {
    inputObject = {
      id: 'mario',
      schoolName: '',
      studyName: '',
      studyDate: {
        from: '',
        to: '',
      },
      location: '',
      summary: {
        me: '',
        peoples: {
          people1: '',
          people2: '',
        },
      },
    };

    inputObjectWithNestedArrays = [
      {
        id: 'john',
        companyName: '',
        positionTitle: '',
        jobResponsibilities: [
          { id: 'martin', responsibility: '', placeholder: 'smh' },
          { id: 'sohie', responsibility: '', placeholder: 'smh' },
        ],
        workDate: {
          from: '',
          to: '',
        },
      },
    ];
  });

  it('returns true when the key is nested 2 times', () => {
    expect(keyInDeeplyNestedObject('from', inputObject)).toBe(true);
  });

  it('returns true when the key is nested 3 times', () => {
    expect(keyInDeeplyNestedObject('people2', inputObject)).toBe(true);
  });

  it('returns false when the key isn\'t in the object', () => {
    expect(keyInDeeplyNestedObject('people3', inputObject)).toBe(false);
    expect(keyInDeeplyNestedObject('people', inputObject)).toBe(false);
    expect(keyInDeeplyNestedObject(false, inputObject)).toBe(false);
  });

  it('returns true when the key is nested within an array', () => {
    expect(keyInDeeplyNestedObject('responsibility', inputObjectWithNestedArrays)).toBe(true);
  });
});

describe('toTitle fn', () => {
  let testStrings;
  beforeEach(() => {
    testStrings = ['johnSmith', 'mar', 'Epic Suffer', 'indeed-dot-com', 'W3AG', ''];
  });

  it('converts camelCase strings to title case', () => {
    const results = testStrings.map((str) => toTitle(str));
    expect(results).toEqual(['John Smith', 'Mar', 'Epic Suffer', 'Indeed Dot Com', 'W3AG', '']);
  });
});

describe('toSpacedLowerCase fn', () => {
  let testStrings;
  beforeEach(() => {
    testStrings = ['johnSmith', 'mar', 'Epic Suffer', 'indeed-dot-com', 'W3AG', ''];
  });

  it('converts camelCase strings to spaced lowercase strings', () => {
    const results = testStrings.map((str) => toSpacedLowerCase(str));
    expect(results).toEqual(['john smith', 'mar', 'epic suffer', 'indeed dot com', 'w3ag', '']);
  });
});

describe('typeGiver fn', () => {
  let categoriesString;
  beforeEach(() => {
    categoriesString = ['name', 'lastName', 'location', 'skills', 'languages', 'email', 'phoneNumber', 'summary', 'hobbies'];
  });

  it('returns the type of input element for a given category', () => {
    const results = categoriesString.map((category) => typeGiver(category));
    expect(results).toEqual(['text', 'text', 'text', 'text', 'text', 'email', 'tel', 'textarea', 'textarea']);
  });

  it('returns null for an unknown category', () => {
    const result = typeGiver('unknown');
    expect(result).toBeNull();
  });

  it('returns null for an empty string', () => {
    const result = typeGiver('');
    expect(result).toBeNull();
  });
});

describe('getRandomItem module', () => {
  let RandomItem;
  beforeEach(() => {
    RandomItem = vi.fn(() => {
      const randomIndexArray = [1, 4, 2, 8, 6, 3, 0, 2, 4];
      let currentIndex = -1;
      return (array) => {
        currentIndex += 1;
        const randomItem = array[randomIndexArray[currentIndex]];

        if (!array.includes(randomItem)) return array[0];
        return randomItem;
      };
    });
  });

  it('gets a random item from an array', () => {
    const getRandomItem = RandomItem();
    const array = ['john', 'smith', 13, 8425, false, null, 'iShowSpeed'];
    expect(getRandomItem(array)).toBe('smith');

    // array = ['john', 'smith', false, null, 'iShowSpeed'];
    array.splice(2, 2);

    expect(getRandomItem(array)).toBe('iShowSpeed');
    expect(getRandomItem(array)).toBe(false);
    expect(getRandomItem(array)).toBe('john');
  });
});

describe('ArrayOfInputObjectEmptiness fn', () => {
  let skillsFn;
  let languagesFn;
  let skills;
  let languages;
  beforeEach(() => {
    skills = [
      { id: 0, skill: 'Coding', expertise: 'Advanced' },
      { id: 1, skill: 'Artist', expertise: 'Beginner' },
      { id: 2, skill: 'Cooking', expertise: 'Beginner' },
    ];

    languages = [
      {
        id: 0, skill: '', fluency: '', hasAutoFocus: true,
      },
      {
        id: 1, skill: 'English', fluency: 'Advanced', hasAutoFocus: false,
      },
      {
        id: 2, skill: 'Spanish', fluency: '', hasAutoFocus: false,
      },
      {
        id: 3, skill: '', fluency: false, hasAutoFocus: true,
      },
    ];

    skillsFn = ArrayOfInputObjectEmptiness(skills, ['id', 'hasAutoFocus']);
    languagesFn = ArrayOfInputObjectEmptiness(languages, ['id', 'hasAutoFocus']);
  });

  describe('isInputObjectEmpty fn', () => {
    it('returns false if is not empty', () => {
      expect(skillsFn.isInputObjectEmpty(skills[1])).toBeFalsy();
      expect(languagesFn.isInputObjectEmpty(languages[1])).toBeFalsy();
      expect(languagesFn.isInputObjectEmpty(languages[2])).toBeFalsy();
    });

    it('returns true if is empty', () => {
      expect(languagesFn.isInputObjectEmpty(languages[0])).toBeTruthy();
    });

    it('returns false if one of the input entry value is false', () => {
      expect(languagesFn.isInputObjectEmpty(languages[3])).toBeFalsy();
    });

    it('returns a correct value if an item of the input object is itself an object', () => {
      const items = languages[2];
      languages[2] = {
        ...items,
        skill: '',
        fluency: {
          inUSA: '',
          inEuropeanCountries: '',
        },
      };

      expect(languagesFn.isInputObjectEmpty(languages[2])).toBeTruthy();

      languages[2] = {
        ...items,
        skills: '',
        fluency: {
          inUSA: false,
          inEuropeanCountries: '',
        },
      };

      expect(languagesFn.isInputObjectEmpty(languages[2])).toBeFalsy();
    });

    it('returns a correct value if an item of the input object is itself an array of object', () => {
      const items = languages[2];
      languages[2] = {
        ...items,
        skill: '',
        fluency: [
          {
            id: 'lolne',
            inUSA: '',
            inEuropeanCountries: '',
          },
          {
            id: 'parle',
            inUSA: '',
            inEuropeanCountries: '',
          },
          {
            id: 'shote',
            inUSA: '',
            inEuropeanCountries: '',
          },
        ],
      };

      expect(languagesFn.isInputObjectEmpty(languages[2])).toBeTruthy();

      languages[2] = {
        ...items,
        skills: '',
        fluency: [
          {
            id: 'lolne',
            inUSA: '',
            inEuropeanCountries: '',
          },
          {
            id: 'parle',
            inUSA: '',
            inEuropeanCountries: 'Begineer',
          },
          {
            id: 'shote',
            inUSA: 'yes',
            inEuropeanCountries: '',
          },
        ],
      };

      expect(languagesFn.isInputObjectEmpty(languages[2])).toBeFalsy();
    });
  });

  describe('isEmpty', () => {
    let newSkillsFn;

    beforeEach(() => {
      const newSkills = skills.map((item) => ({ ...item, skill: '', expertise: '' }));
      newSkillsFn = ArrayOfInputObjectEmptiness(newSkills, ['id']);
    });

    it('returns true if the inputtable entry values from array are empty', () => {
      expect(newSkillsFn.isEmpty()).toBeTruthy();
    });

    it('returns false if some inputtable entry values from array are empty', () => {
      expect(languagesFn.isEmpty()).toBeFalsy();
    });
  });
});

describe('classesHandler module', () => {
  let handleClasses;

  beforeEach(() => {
    handleClasses = classesHandler();
  });

  it('returns the correct object when calling getMovableClasses()', () => {
    expect(handleClasses.getMovableClasses()).toEqual({
      left: 'hidden -left-full pointer-events-none',
      center: 'block pointer-events-auto',
      right: 'hidden left-full pointer-events-none',
    });
  });

  describe('getUpcomingClasses fn', () => {
    let currentClasses1;
    let currentClasses2;
    let classes;
    beforeEach(() => {
      classes = handleClasses.getMovableClasses();

      currentClasses1 = {
        left: classes.left,
        center: classes.center,
        right: classes.right,
      };

      currentClasses2 = {
        left: classes.right,
        center: classes.left,
        right: classes.center,
      };
    });

    it('returns the correct classes when moving on the left side', () => {
      const movingSide = 'left';
      expect(handleClasses.getUpcomingClasses(currentClasses1.left, movingSide))
        .toEqual(classes.center);

      expect(handleClasses.getUpcomingClasses(currentClasses1.right, movingSide))
        .toEqual(classes.left);

      expect(handleClasses.getUpcomingClasses(currentClasses2.right, movingSide))
        .toEqual(classes.right);
    });

    it('returns the correct classes when moving on the right side', () => {
      const movingSide = 'right';
      expect(handleClasses.getUpcomingClasses(currentClasses1.center, movingSide))
        .toEqual(classes.left);

      expect(handleClasses.getUpcomingClasses(currentClasses1.left, movingSide))
        .toEqual(classes.right);

      expect(handleClasses.getUpcomingClasses(currentClasses2.left, movingSide))
        .toEqual(classes.center);
    });

    it('throws an error if the movingSide is invalid', () => {
      expect(() => handleClasses.getUpcomingClasses(currentClasses1.right, 'droite')).toThrowError('The key droite is not a valid key in upcomingClasses. Ensure that movingSide is one of the expected keys: [\'left\', \'right\']');
      expect(() => handleClasses.getUpcomingClasses(currentClasses1.right, false)).toThrowError();
      expect(() => handleClasses.getUpcomingClasses(currentClasses1.left, 'Left')).toThrowError();
      expect(() => handleClasses.getUpcomingClasses(currentClasses1.right, 'right ')).toThrowError();
    });

    it('throws an error if the classes format are invalid', () => {
      expect(() => handleClasses.getUpcomingClasses('block left-full pointer-events-none', 'left')).toThrowError();
      expect(() => handleClasses.getUpcomingClasses('transition-transform translate-x-full duration-500', 'right')).toThrowError();
    });
  });
});

describe('getFormattedDate module', () => {
  let date;
  let validDateStrings;
  let formattedValidDateStrings;
  let invalidDateStrings;
  let falsyDateStrings;
  beforeEach(() => {
    date = getFormattedDate();
    validDateStrings = ['1997-12-02', '0001-08-01', '2004-03-24'];
    formattedValidDateStrings = ['December 1997', 'August 1', 'March 2004'];
    invalidDateStrings = ['1907-00-02', '2024-02-32', '1323-24', 'twenty-four', '1324-06-00'];
    falsyDateStrings = [false, '', 0, null];
  });

  it('format date correctly if the date string is valid', () => {
    validDateStrings.forEach((dateString, i) => {
      expect(date.formatDate(dateString)).toBe(formattedValidDateStrings[i]);
    });
  });

  it('throws an error if the date string is badly formatted', () => {
    invalidDateStrings.forEach((dateString) => {
      expect(() => date.formatDate(dateString)).toThrowError();
    });
  });

  it('returns an empty string if the date string is falsy', () => {
    falsyDateStrings.forEach((dateString) => {
      expect(date.formatDate(dateString)).toBe('');
    });
  });
});

describe('ColorRatio module', () => {
  const darkerColors = ['#34A853', '#FF5733', '#2980B9', 'rgb(255, 105, 180)', 'rgb(46, 204, 113)', 'hsl(348, 100%, 61%)', 'hsl(200, 100%, 50%)', 'hsl(120, 73%, 46%)'];
  const whiterColors = ['rgb(123, 31, 162)', '#00008B', '#005B9A', 'hsl(210, 100%, 20%)', 'hsl(220, 100%, 30%)', 'rgb(38, 38, 38)'];
  let colorRatio;

  beforeEach(() => {
    colorRatio = ColorRatio();
  });

  it('returns the dark text color when given a lighter background color', () => {
    darkerColors.forEach((color) => {
      expect(colorRatio.getTextColorBasedOfBackgroundColor(color)).toBe('black');
    });
  });

  it('returns the white text color when given a darker background color', () => {
    whiterColors.forEach((color) => {
      expect(colorRatio.getTextColorBasedOfBackgroundColor(color)).toBe('white');
    });
  });
});
