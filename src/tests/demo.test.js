import {test, expect, it} from  'vitest';

test('1+1', () => {
    expect(1+1).toEqual(2);
});


it('toUpperCase', () => {
    const result = 'FOORBAR';
    expect(result).toMatchSnapshot()
})