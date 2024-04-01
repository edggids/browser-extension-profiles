import {api, REQUIRED_PERMISSIONS} from "./api";

export function checkPermission(): Promise<boolean>
{
    return new Promise((resolve) => {
        api.permissions.contains(
            { permissions: REQUIRED_PERMISSIONS },
            (result) => resolve(!!result)
        );
    });
}

export function requestPermission(): Promise<void>
{
    return new Promise((resolve, reject) => {
        api.permissions.request(
            { permissions: REQUIRED_PERMISSIONS },
            (granted) => granted ? resolve() : reject()
        );
    });
}
