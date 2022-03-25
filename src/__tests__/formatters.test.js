import { convertNumberToPersian } from '../utils/formatters';
import { convertNumberToEnglish } from '../utils/formatters';
import { isPersianNumber } from '../utils/formatters';
import { formatPrice } from '../utils/formatters';

// convertNumberToPersian

describe('convert input number or numbers in a string to Persian numbers', () => {
  it('should return empty string when input is empty', () => {
    expect(convertNumberToPersian('')).toBe('');
  });
  it('should return the original string when there is no number in it', () => {
    expect(convertNumberToPersian('string without number')).toBe('string without number');
  });
  it('should convert numbers to Persian when string is just numbers', () => {
    expect(convertNumberToPersian('0123456789')).toBe('۰۱۲۳۴۵۶۷۸۹');
  });
  it('should convert numbers to Persian when input is combination of numbers and characters', () => {
    expect(convertNumberToPersian('Tehran-021')).toBe('Tehran-۰۲۱');
  });
  it('should convert numbers to Persian correctly if type of input is number', () => {
    expect(convertNumberToPersian(9876543210)).toBe('۹۸۷۶۵۴۳۲۱۰');
  });
  it('should not crash when input is undefined', () => {
    expect(convertNumberToPersian(undefined)).toBe('undefined');
  });
  it('should not crash when input is null', () => {
    expect(convertNumberToPersian(null)).toBe('null');
  });
  it('should convert numbers to Persian correctly if input contains symbols', () => {
    expect(convertNumberToPersian('~!@#$%^&*()_+{}[]')).toBe('~!@#$%^&*()_+{}[]');
  });
});

// convertNumberToEnglish

describe('convert input number or numbers in a string to English numbers', () => {
  it('should return empty string when input is empty', () => {
    expect(convertNumberToEnglish('')).toBe('');
  });
  it('should return the original string when there is no number in it', () => {
    expect(convertNumberToEnglish('string without number')).toBe('string without number');
  });
  it('should convert numbers to English when string is just numbers', () => {
    expect(convertNumberToEnglish('۰۱۲۳۴۵۶۷۸۹')).toBe('0123456789');
  });
  it('should convert numbers to English when input is combination of numbers and characters', () => {
    expect(convertNumberToEnglish('Tehran-۰۲۱')).toBe('Tehran-021');
  });
  it('should not crash when input is undefined', () => {
    expect(convertNumberToEnglish(undefined)).toBe('undefined');
  });
  it('should not crash when input is null', () => {
    expect(convertNumberToEnglish(null)).toBe('null');
  });
  it('should convert numbers to English correctly if input contains symbols', () => {
    expect(convertNumberToEnglish('~!@#$%^&*()_+{}۱۲۳[]')).toBe('~!@#$%^&*()_+{}123[]');
  });
});

// isPersianNumber

describe('Check if the input number is a Persian number or not', () => {
  it('should return false when input is empty', () => {
    expect(isPersianNumber('')).toBe(false);
  });
  it('should return false when there is no number in it', () => {
    expect(isPersianNumber('string without number')).toBe(false);
  });
  it('should return true when string is just made of Persian numbers', () => {
    expect(isPersianNumber('۰۱۲۳۴۵۶۷۸۹')).toBe(true);
  });
  it('should return false when input is English numbers', () => {
    expect(isPersianNumber(9876543210)).toBe(false);
  });
  it('should return true when string is just Persian numbers', () => {
    expect(isPersianNumber('۰۱۲۳۴۵۶۷۸۹')).toBe(true);
  });
  it('should return false when input is combination of English numbers and characters', () => {
    expect(isPersianNumber('Tehran-021')).toBe(false);
  });
  it('should return false when input is combination of Persian numbers and characters', () => {
    expect(isPersianNumber('Tehran-۰۲۱')).toBe(false);
  });
  it('should not crash when input is undefined and return false', () => {
    expect(isPersianNumber(undefined)).toBe(false);
  });
  it('should not crash when input is null and return false', () => {
    expect(isPersianNumber(null)).toBe(false);
  });
  it('should return false if input contains symbols', () => {
    expect(isPersianNumber('~!@#$%^&*()_+{}[]')).toBe(false);
  });
});

// formatPrice

describe('format the number with comma (,) as a separator between every three numbers', () => {
  it('should return empty string when input is empty', () => {
    expect(formatPrice('')).toBe('');
  });
  it('should format correctly when string is just English numbers', () => {
    expect(formatPrice('9123456780')).toBe('9,123,456,780');
  });
  it('should format correctly when input string is just Persian numbers', () => {
    expect(formatPrice('۱۲۳۴۵۶۷۸۹۰۰')).toBe('۱۲,۳۴۵,۶۷۸,۹۰۰');
  });
  it('should return false when input is combination of numbers and other characters', () => {
    expect(isPersianNumber('Tehran-65234')).toBe(false);
  });
  it('should format correctly if the type of input is number', () => {
    expect(formatPrice(9876543210)).toBe('9,876,543,210');
  });
  it('should not crash when input is undefined', () => {
    expect(formatPrice(undefined)).toBe(undefined);
  });
  it('should not crash when input is null', () => {
    expect(formatPrice(null)).toBe(null);
  });
});