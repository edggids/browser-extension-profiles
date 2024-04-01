import {cleanup, fireEvent, render} from '@testing-library/svelte';
import {describe, it, expect, afterEach, vi} from 'vitest';
import Tag from "./Tag.svelte";
import SectionVerticalHeader from "./SectionVerticalHeader.svelte";

describe('Tag component', () => {
  afterEach(() => {
    cleanup();
  });

  it('mounts', () => {
    const { container } = render(Tag, { props: { color: '#123456' } });

    expect(container).toMatchSnapshot();
  });

  it('renders with provided color', () => {
    const { container } = render(Tag, { props: { color: '#123456' } });
    const tag = container.querySelector('span');
    expect(tag.style.getPropertyValue('--color')).toBe('#123456');
  });

  it('renders as non-active when active is false', () => {
    const { container } = render(Tag, { props: { active: false } });
    const tag = container.querySelector('span');
    expect(tag.classList.contains('active')).toBe(false);
  });

  it('renders as active when active is true', () => {
    const { container } = render(Tag, { props: { active: true } });
    const tag = container.querySelector('span');
    expect(tag.classList.contains('active')).toBe(true);
  });

  it('emits click event when clicked', async () => {
    const { container, component } = render(Tag);
    const tag = container.querySelector('span');

    const onClick = vi.fn();
    component.$on('click', onClick);

    await fireEvent.click(tag);
    expect(onClick).toHaveBeenCalled();
  });
});
