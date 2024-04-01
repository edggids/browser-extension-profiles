import {cleanup, render} from '@testing-library/svelte';
import {describe, it, expect, afterEach} from 'vitest';
import Popup from "./Popup.svelte";
import ColorPill from "./ColorPill.svelte";

describe('Popup component', () => {
  afterEach(() => {
    cleanup();
  });

  it('mounts', () => {
    const { container, getByRole } = render(Popup, { props: { isOpen: true } });

    expect(container).toMatchSnapshot();
  });

  it('renders when isOpen is true', () => {
    const { container, getByRole } = render(Popup, { props: { isOpen: true } });
    expect(getByRole('dialog')).not.toBeNull();
  });

  it('does not render when isOpen is false', () => {
    const { container, getByRole } = render(Popup, { props: { isOpen: false } });
    expect(getByRole('dialog').classList.contains('hidden')).toBe(true);
  });

  it('applies custom class when provided', () => {
    const { container, getByRole } = render(Popup, { props: { isOpen: true, class: 'custom-class' } });
    expect(getByRole('dialog').classList.contains('custom-class')).toBe(true);
  });
});
