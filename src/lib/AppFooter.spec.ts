import {cleanup, render} from '@testing-library/svelte';
import {describe, it, expect, afterEach} from 'vitest';
import AppFooter from "./AppFooter.svelte";

describe('AppFooter component', () => {
  it('mounts', () => {
    const { container } = render(AppFooter);
    expect( container ).toMatchSnapshot();
  });

  it('renders with custom style', () => {
    const { container } = render(AppFooter, { props: { style: 'background-color: red;' } });
    const footer = container.querySelector('footer');

    expect( footer.style.backgroundColor ).toBe('red');
    expect( footer ).toMatchSnapshot();
  });
});
