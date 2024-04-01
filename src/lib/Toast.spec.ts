import {cleanup, render, fireEvent} from '@testing-library/svelte';
import {describe, it, expect, afterEach, vi} from 'vitest';
import Toast from "./Toast.svelte";
import Tag from "./Tag.svelte";

describe('Toast component', () => {
  afterEach(() => {
    cleanup();
  });

  it('mounts', () => {
    const { container } = render(Toast, { props: { toast: { message: 'Test Message', state: 'info' } } });

    expect(container).toMatchSnapshot();
  });

  it('renders with provided message', () => {
    const { getByText } = render(Toast, { props: { toast: { message: 'Test Message', state: 'info' } } });
    expect(getByText('Test Message')).not.toBeNull();
  });

  it('renders with correct role for info state', () => {
    const { getByRole } = render(Toast, { props: { toast: { message: 'Test Message', state: 'info' } } });
    expect(getByRole('status')).not.toBeNull();
  });

  it('renders with correct role for error state', () => {
    const { getByRole } = render(Toast, { props: { toast: { message: 'Test Message', state: 'error' } } });
    expect(getByRole('alert')).not.toBeNull();
  });

  it('emits close event when close button is clicked', async () => {
    const { getByTestId, component } = render(Toast, { props: { toast: { message: 'Test Message', state: 'info' } } });

    const closeListener = vi.fn();
    component.$on('close', closeListener);

    await fireEvent.click(getByTestId('closeButton'));
    expect(closeListener).toHaveBeenCalled();
  });
});
