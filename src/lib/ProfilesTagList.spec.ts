import {cleanup, render} from '@testing-library/svelte';
import {describe, it, expect, afterEach, vi} from 'vitest';
import ProfilesTagList from "./ProfilesTagList.svelte";
import ColorPill from "./ColorPill.svelte";
import ProfileNameInput from "./ProfileNameInput.svelte";

describe('ProfilesTagList component', () => {
  afterEach(() => {
    cleanup();
  });

  it('mounts', () => {
    const { container } = render(ProfilesTagList, { props: { profiles: [], currentProfileId: 'id1' } });

    expect(container).toMatchSnapshot();
  });

  it('renders no tags when no profiles are provided', () => {
    const { container } = render(ProfilesTagList, { props: { profiles: [], currentProfileId: 'id1' } });
    expect(container.firstChild.childNodes.length).toBe(1);
  });

  it('renders tags for provided profiles', () => {
    const profiles = [['id1', { name: 'Profile 1', color: { default: '#123456' } }], ['id2', { name: 'Profile 2', color: { default: '#654321' } }]];
    const { container } = render(ProfilesTagList, { props: { profiles, currentProfileId: 'id1'} });

    expect(container.firstChild.childNodes.length).toBe(profiles.length + 1);
  });

  it('dispatches click event', async () => {
    const profiles = [['id1', { name: 'Profile 1', color: { default: '#123456' } }], ['id2', { name: 'Profile 2', color: { default: '#654321' } }]];
    const { container, component } = render(ProfilesTagList, { props: { profiles, currentProfileId: 'id1'} });
    const tag = container.firstChild.firstChild;

    const onClick = vi.fn();
    component.$on('selected', onClick)

    tag.dispatchEvent(new MouseEvent('click'));
    expect(onClick).toHaveBeenCalled();
  })
});
