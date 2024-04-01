import type {ColorModel} from "./ColorModel";
import type {UUID} from "../utils/uuid";

export interface ProfileModel {
    id: UUID;
    name: string;
    color: ColorModel;
    pinned: boolean;
    hash: string;
}
