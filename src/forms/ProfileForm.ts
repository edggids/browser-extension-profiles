import type {ProfileModel} from "../models/ProfileModel";
import type {ExtensionModel} from "../models/ExtensionModel";

export interface ProfileForm extends Omit<ProfileModel, 'hash'> {
  extensions: Set<ExtensionModel['id']>;
}
