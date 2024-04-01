import {toasts} from "./toasts";
import {type Readable, writable} from "svelte/store";
import type {ProfileModel} from "../models/ProfileModel";
import {getCurrentProfile, getProfile, loadProfile} from "../api/profile.js";
import type {ProfileWithExtensionModel} from "../models/ProfileWithExtensionModel";

interface CurrentProfileStore extends Readable<null|ProfileWithExtensionModel>
{
  refresh: () => Promise<void>;
  loadOtherProfile: (id: ProfileModel['id']) => Promise<void>;
  getCurrentProfileId: () => ProfileModel['id']|null;
}

function createCurrentProfileStore(): CurrentProfileStore
{
  let currentProfileId:ProfileModel['id']|null = null;
  const { subscribe, set: _set } = writable<null|ProfileWithExtensionModel>(null);

  function set(profile: ProfileWithExtensionModel) {
    currentProfileId = profile?.id ?? null;
    return _set(profile);
  }

  function getCurrentProfileId(): ProfileModel['id']|null
  {
    return currentProfileId;
  }

  function refresh(){
    return getCurrentProfile()
        .then( (profile) => set(profile))
        .catch((err) => toasts.error(err.message));
  }

  function loadOtherProfile(id: ProfileModel['id']) {
    return loadProfile(id)
        .then(({ profile }) => set(profile))
        .catch( async (err) => {
          // todo: decide what should happen if one of extension didn't load
          // for now just load it anyway
          toasts.error(err.message);

          const profile = await getProfile(id);
          if(profile) {
            set(profile);
          }
        });
  }

  refresh();

  return {
    subscribe,

    refresh,
    loadOtherProfile,
    getCurrentProfileId,
  };
}

export const currentProfile = createCurrentProfileStore();
