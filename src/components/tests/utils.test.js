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
    const result = objectSplice(inputObject, ['name', 'location']);
    expect(result).toEqual([
      ['name', 'John'],
      ['lastName', 'Doe'],
      ['location', 'Mars'],
    ]);
  });

  it('correctly returns the last two properties of the object', () => {
    const result = objectSplice(inputObject, ['languages', 'email']);
    expect(result).toEqual([
      ['languages', 'English'],
      ['email', ''],
    ]);
  });

  it('should throw an error if end index is less than start index', () => {
    const errorThrowingFunction = () => objectSplice(inputObject, ['skills', 'location']);
    expect(errorThrowingFunction).toThrowError('Cannot have the index of the starting key greater than the ending key index');
  });

  it('should throw an error for keys that does not exist', () => {
    const errorThrowingFunction = () => objectSplice(inputObject, ['mario', 'gets called']);
    expect(errorThrowingFunction).toThrowError('startKey or endKey not found in the object.');
  });

  it('should handle correctly if the endingKey isn\'t given', () => {
    const result = objectSplice(inputObject, ['skills', false]);
    expect(result).toEqual([
      ['skills', 'JavaScript'],
    ]);
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

describe('');
