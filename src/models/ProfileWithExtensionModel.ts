import type {ProfileModel} from "./ProfileModel";
import type {ProfileExtensionModel} from "./ProfileExtensionModel";

export interface ProfileWithExtensionModel extends ProfileModel, ProfileExtensionModel {}
