import {cleanup, render} from '@testing-library/svelte';
import {describe, it, expect, afterEach} from 'vitest';
import ProfileNameInput from "./ProfileNameInput.svelte";
import Popup from "./Popup.svelte";

describe('ProfileNameInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('mounts', () => {
    const { container } = render(ProfileNameInput);

    expect(container).toMatchSnapshot();
  });

  it('renders as non-editable when editable is false', () => {
    const { container } = render(ProfileNameInput, { props: { editable: false } });
    const input = container.querySelector('input');
    expect(input).toBeNull();
  });

  it('renders as editable when editable is true', () => {
    const { container } = render(ProfileNameInput, { props: { editable: true } });
    const input = container.querySelector('input');
    expect(input).not.toBeNull();
  });

  it('renders with provided value when editing', () => {
    const { container } = render(ProfileNameInput, { props: { editable: true, value: 'Test Value' } });
    const input = container.querySelector('input');
    expect(input.value).toBe('Test Value');
  });

  it('renders with provided value when not editing', () => {
    const { container, getByText } = render(ProfileNameInput, { props: { editable: false, value: 'Test Value' } });
    expect(getByText('Test Value')).not.toBeNull();
  });

  it('applies custom class when provided', () => {
    const { container, getByTestId } = render(ProfileNameInput, { props: { class: 'custom-class' } });
    const wrapper = getByTestId('inputGroup');

    expect(wrapper.classList.contains('custom-class')).toBe(true);
  });
});
