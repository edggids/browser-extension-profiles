import {cleanup, render} from '@testing-library/svelte';
import {describe, it, expect, afterEach} from 'vitest';
import SectionVerticalHeader from "./SectionVerticalHeader.svelte";
import Popup from "./Popup.svelte";
import ProfilesTagList from "./ProfilesTagList.svelte";

describe('SectionVerticalHeader component', () => {
  afterEach(() => {
    cleanup();
  });

  it('mounts', () => {
    const { container } = render(SectionVerticalHeader, { props: { title: 'Test Title' } });

    expect(container).toMatchSnapshot();
  });

  it('renders with provided title', () => {
    const { container, getByTestId } = render(SectionVerticalHeader, { props: { title: 'Test Title' } });
    const header = getByTestId('title');
    expect(header.textContent).toBe('Test Title');
  });

  it('applies custom class when provided', () => {
    const { container } = render(SectionVerticalHeader, { props: { compact: false, class: 'custom-class' } });
    const section = container.querySelector('section');

    expect(section.classList.contains('custom-class')).toBe(true);
  });

  it('renders with default padding when compact is false', () => {
    const {  getByTestId, container } = render(SectionVerticalHeader, { props: { compact: false } });
    const target = getByTestId('contentWrapper');

    expect(target.classList.contains('pt-6')).toBe(true);
    expect(target.classList.contains('pb-2.75')).toBe(true);
  });

  it('renders with compact padding when compact is true', () => {
    const {  getByTestId, container } = render(SectionVerticalHeader, { props: { compact: true } });
    const target = getByTestId('contentWrapper');

    expect(target.classList.contains('pt-4')).toBe(true);
    expect(target.classList.contains('pb-5')).toBe(true);
  });
});
