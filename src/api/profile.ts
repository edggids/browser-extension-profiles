import storage from "./storage.js";
import {generateUUID} from "../utils/uuid";
import type { UUID } from "../utils/uuid";
import { api } from "./api";
import {getCurrentAppId} from "./currentApp";
import {setExtensionState} from "./extension";
import type {ProfileWithExtensionModel} from "../models/ProfileWithExtensionModel";
import type {ProfileModel} from "../models/ProfileModel";
import type {ProfileExtensionModel} from "../models/ProfileExtensionModel";
import {hashExtensions} from "../utils/hashExtensions";

function generateProfileID(): UUID
{
    // TODO: should we check for collisions?
    return generateUUID();
}

function extensionsKeyFromProfileId(id: ProfileModel['id']): string
{
    return `profile_${id}`;
}

export async function updateProfileOption(id: ProfileModel['id'], profile: ProfileModel)
{
    const profiles = await getProfileOptions();
    profiles.set(id, profile);

    return setProfileOptions(profiles);
}

export async function setCurrentProfile(id: ProfileModel['id'])
{
    return storage.set("current_profile", id);
}

export async function clearCurrentProfile()
{
    return storage.set("current_profile", null);
}

export async function getCurrentProfile(): Promise<ProfileWithExtensionModel|null>
{
    let id = await storage.get<ProfileModel['id']|null>("current_profile", null);

    return id !== null
        ? await getProfile(id)
        : null;
}

export async function loadProfile(id: ProfileModel['id']): Promise<{ profile:ProfileWithExtensionModel }>
{
    const profile = await getProfile(id);

    if(!profile) {
        return Promise.reject(`Profile ${id} not found`);
    }

    const extensionsEnabled = new Set(profile.extensions);
    const promises = [];

    const appId = getCurrentAppId();

    // TODO: check if async function
    await api.management.getAll((extensions) => {
        for (const extension of extensions) {
            // skip our extension
            if(extension.id === appId) {
                continue;
            }

            // change state if it's not the same as the profile
            if(extension.enabled !== extensionsEnabled.has(extension.id)) {
                promises.push(setExtensionState(extension.id, !extension.enabled));
            }
        }
    });

    await setCurrentProfile(id);

    return new Promise((resolve, reject) => {
        Promise.all(promises)
            .then(() => resolve({ profile }))
            .catch((err) => reject(err));
    })
}

export async function saveProfile({ id, pinned, name, color, hash }: ProfileModel, extensions?: ProfileExtensionModel['extensions']): Promise<void>
{
    let isCreate = !id;

    // create id if it doesn't exist
    if (isCreate) {
        id = generateProfileID();
    }

    if(extensions){
        await storage.set(extensionsKeyFromProfileId(id), { extensions });
        hash = await hashExtensions(extensions);
    }

    await updateProfileOption(id, { id, name, color, pinned, hash });
}

export function getProfileOptions(): Promise<Map<ProfileModel['id'], ProfileModel>>
{
    return storage.get<{ [key: ProfileModel['id']]: ProfileModel}>("profiles", {})
        .then((profiles) => {
            return new Map(Object.entries(profiles));
        });
}

export function setProfileOptions(profiles: Map<ProfileModel['id'], ProfileModel>): Promise<void>
{
    return storage.set("profiles", Object.fromEntries(profiles));
}

export async function destroyProfile(id: ProfileModel['id']): Promise<ProfileModel>
{
    const profiles = await getProfileOptions();
    const profile = profiles.get(id) ?? null;

    if(profile) {
        profiles.delete(id);
        await setProfileOptions(profiles);
    }

    await destroyProfileExtensions(id);
    return profile;
}

export function destroyProfileExtensions(id: ProfileModel['id']): Promise<void>
{
    return storage.remove(extensionsKeyFromProfileId(id));
}

export function getProfileExtensions(profileId: ProfileModel['id']): Promise<ProfileExtensionModel>
{
    const fallback = { extensions: [] };

    return storage.get<ProfileExtensionModel>(extensionsKeyFromProfileId(profileId), fallback)
      .then( (extensions) => {
          if(typeof extensions.extensions === 'undefined') {
              return fallback;
          }

          return extensions;
      });
}

export async function getProfile(id: ProfileModel['id']): Promise<ProfileWithExtensionModel|null>
{
    const profiles = await getProfileOptions();

    if(!profiles.has(id)) {
        return null;
    }

    const profile = profiles.get(id);
    const extensions = await getProfileExtensions(id);

    return {
        id,
        ...profile,
        extensions: extensions.extensions,
    }
}
