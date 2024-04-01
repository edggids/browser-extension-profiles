import {cleanup, render} from '@testing-library/svelte';
import {describe, it, expect, afterEach, vi} from 'vitest';
import ColorPill from "./ColorPill.svelte";

describe('ColorPill component', () => {
  afterEach(() => {
    cleanup();
  });

  it('mounts', () => {
    const { container } = render(ColorPill, { props: { color: { light: '#fff', default: '#000', darker: '#333' } } });

    expect(container).toMatchSnapshot();
  });

  it('renders with custom label', () => {
    const { container } = render(ColorPill, { props: { color: { light: '#fff', default: '#000', darker: '#333' }, label: 'Test Label' } });
    const pill = container.querySelector('span');

    expect(pill.textContent).toContain('Test Label');
    expect(pill).toMatchSnapshot();
  });

  it('dispatches click event', async () => {
    const { container, component } = render(ColorPill, { props: { color: { light: '#fff', default: '#000', darker: '#333' } } });
    const pill = container.querySelector('span');

    const onClick = vi.fn();
    component.$on('click', onClick)

    await pill.click();
    expect(onClick).toHaveBeenCalled();
  })

  it('accepts custom class', () => {
    const { container } = render(ColorPill, { props: { color: { light: '#fff', default: '#000', darker: '#333' }, class: 'custom-class' } });
    const pill = container.querySelector('span');

    expect(pill.classList.contains('custom-class')).toBe(true);
  })
});
