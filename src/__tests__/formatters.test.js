import { convertNumberToPersian } from '../utils/formatters';

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
  it('should nit crash when input is null', () => {
    expect(convertNumberToPersian(null)).toBe('null');
  });
  it('should convert numbers to Persian correctly if input contains symbols', () => {
    expect(convertNumberToPersian('~!@#$%^&*()_+{}[]')).toBe('~!@#$%^&*()_+{}[]');
  });
});
