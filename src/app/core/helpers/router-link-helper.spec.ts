import { RouterLinkHelper } from './router-link-helper';

describe('RouterLinkHelper', () => {
  const params = ['one', 'two'];

  it(`should push param after base`, () => {
    expect(RouterLinkHelper.push(params, 'three')).toEqual(['one', 'two', 'three']);
  });

  it(`should do anything if "null" is push`, () => {
    expect(RouterLinkHelper.push(params, null)).toEqual(['one', 'two']);
  });
});
