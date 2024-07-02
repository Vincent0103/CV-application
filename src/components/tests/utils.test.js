import {
  describe, it, expect, beforeEach,
} from 'vitest';
import objectSplice, { toTitle, typeGiver } from '../utils';

describe('objectSplice fn', () => {
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

  it('correctly returns the first three properties of the object', () => {
    const result = objectSplice(inputObject, 0, 3);
    expect(result).toEqual([
      ['name', 'John'],
      ['lastName', 'Doe'],
      ['location', 'Mars'],
    ]);
  });

  it('correctly returns the last two properties of the object', () => {
    const result = objectSplice(inputObject, 4, inputObject.length);
    expect(result).toEqual([
      ['languages', 'English'],
      ['email', ''],
    ]);
  });

  it('should return an empty object if end index is less than start index', () => {
    const result = objectSplice(inputObject, 3, 2);
    expect(result).toEqual([]);
  });

  it('should handle out of bounds indices', () => {
    const result = objectSplice(inputObject, -1, 10);
    expect(result).toEqual(inputObject);
  });
});

describe('toTitle fn', () => {
  let testStrings;
  beforeEach(() => {
    testStrings = ['johnSmith', 'mar', 'Epic Suffer', 'indeed-dot-com', 'W3AG', ''];
  });

  it('correctly converts camelCase strings to title case', () => {
    const results = testStrings.map((str) => toTitle(str));
    expect(results).toEqual(['John Smith', 'Mar', 'Epic Suffer', 'Indeed Dot Com', 'W3AG', '']);
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
