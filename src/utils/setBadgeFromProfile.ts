import {setBadge} from "../api/badge";
import type {ProfileModel} from "../models/ProfileModel";

export function setBadgeFromProfile(profile: ProfileModel): Promise<void>
{
    return setBadge(profile.name, profile.color.default);
}
