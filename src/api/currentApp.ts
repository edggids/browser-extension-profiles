import { api } from "./api";

export function getCurrentAppId(){
    return api.runtime.id;
}
