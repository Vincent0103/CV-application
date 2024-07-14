import {
  vi, describe, it, expect, beforeEach,
} from 'vitest';
import getEntriesFromRange, {
  toTitle, keyInDeeplyNestedObject, toSpacedLowerCase,
  typeGiver, ArrayOfInputObjectEmptiness, classesHandler,
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

  it('throws an error for keys that does not exist', () => {
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

  it('returns true when the key when nested 2 times', () => {
    expect(keyInDeeplyNestedObject('from', inputObject)).toBe(true);
  });

  it('returns true when the key when nested 3 times', () => {
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

  it('correctly returns the type of input element for a given category', () => {
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

    skillsFn = ArrayOfInputObjectEmptiness(skills, ['skill', 'expertise']);
    languagesFn = ArrayOfInputObjectEmptiness(languages, ['skill', 'fluency']);
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

    it('returns correct value if an item of the input object is itself an object', () => {
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
  });

  describe('isEmpty', () => {
    let newSkillsFn;
    beforeEach(() => {
      const newSkills = skills.map((item) => ({ ...item, skill: '', expertise: '' }));
      newSkillsFn = ArrayOfInputObjectEmptiness(newSkills, ['skill', 'expertise']);
    });

    it('returns true if the inputtable entry values from array are empty', () => {
      expect(newSkillsFn.isEmpty()).toBe(true);
    });

    it('returns false if some inputtable entry values from array are empty', () => {
      expect(languagesFn.isEmpty()).toBe(false);
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
      left: 'absolute top-0 w-full -left-full pointer-events-none',
      center: 'relative top-0 w-full pointer-events-auto',
      right: 'absolute top-0 w-full left-full pointer-events-none',
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

    it('throws an error if the movingSide form is invalid', () => {
      expect(() => handleClasses.getUpcomingClasses(currentClasses1.right, 'droite')).toThrowError('The key droite is not a valid key in upcomingClasses. Ensure that movingSide is one of the expected keys: [\'left\', \'right\']');
      expect(() => handleClasses.getUpcomingClasses(currentClasses1.right, false)).toThrowError();
      expect(() => handleClasses.getUpcomingClasses(currentClasses1.left, 'Left')).toThrowError();
      expect(() => handleClasses.getUpcomingClasses(currentClasses1.right, 'right ')).toThrowError();
    });

    it('throws an error if the classes format are invalid', () => {
      expect(() => handleClasses.getUpcomingClasses('relative top-0 w-full left-full pointer-events-none', 'left')).toThrowError();
      expect(() => handleClasses.getUpcomingClasses('transition-transform translate-x-full duration-500', 'right')).toThrowError();
    });
  });
});
