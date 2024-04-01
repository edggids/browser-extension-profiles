import {type Readable, writable} from "svelte/store";
import {destroyProfile, getProfileOptions, saveProfile} from "../api/profile";
import type {ProfileModel} from "../models/ProfileModel";
import {toasts} from "./toasts";
import {currentProfile} from "./currentProfile";
import type {ProfileForm} from "../forms/ProfileForm";

interface ProfilesStore extends Readable<Map<ProfileModel['id'], ProfileModel>> {
  refresh: () => Promise<void>;
  destroy: (id: ProfileModel['id']) => Promise<void>;
  updateOrCreate: (profileForm: ProfileForm) => Promise<void>;
  togglePin: (profile: ProfileModel) => Promise<void>;
}

function createProfilesStore(): ProfilesStore
{
  const { subscribe, set, update } = writable<Map<ProfileModel['id'], ProfileModel>>(new Map());

  function destroy(id) {
    return destroyProfile(id)
        .then((profile) => {
          toasts.info(`Profile "${profile?.name}" deleted`);

          return refresh()
        });
  }

  function refresh(){
    return getProfileOptions()
        .then( (profiles) => set(profiles))
        .catch((err) => toasts.error(err.message));
  }

  function updateOrCreate({ id, pinned, name, color, hash, extensions}) {
    return saveProfile({ id, pinned, name, color, hash}, extensions)
        .then(async () => {
          const toastMsg = id === null
            ? `Profile "${name}" created`
            : `Profile "${name}" updated`;

          toasts.info(toastMsg);

          // if active profile was updated, reload it to change extensions
          if (id === currentProfile.getCurrentProfileId()) {
            await currentProfile.loadOtherProfile(id);
          }

          return refresh()
        })
        .catch((err) => toasts.error(err.message));
  }

  function togglePin(profile){
    profile.pinned = !profile.pinned;

    return saveProfile(profile)
      .then(() => {
        update((profiles) => {
          profiles.set(profile.id, profile);

          return profiles;
        });
      })
      .catch((err) => toasts.error(err.message));
  }

  // load initial value
  refresh();

  return {
    subscribe,

    refresh,
    destroy,
    updateOrCreate,
    togglePin,
  };
}

export const profiles = createProfilesStore();
