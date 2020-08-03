import { formatInteger } from './formatInteger';

describe('formatInteger', (): void => {
  it('formats decimals in number groupings', (): void => {
    expect(formatInteger('12345')).toEqual('12,345');
  });

  it('formats decimal-only in number groupings', (): void => {
    expect(formatInteger('test6789')).toEqual('6,789');
  });

  it('returns input for non-decimal', (): void => {
    expect(formatInteger('test')).toEqual('test');
  });

  it('returns non-sensical negative text', (): void => {
    expect(formatInteger('-test')).toEqual('-test');
  });

  it('formats negative numbers', (): void => {
    expect(formatInteger('-123456')).toEqual('-123,456');
  });
});
