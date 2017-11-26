import { FilterBlogsPipe } from './filter-blogs.pipe';

describe('FilterBlogsPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterBlogsPipe();
    expect(pipe).toBeTruthy();
  });
});
