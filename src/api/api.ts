function getApi(): typeof chrome {
    return chrome;
}

export const api = getApi();

export const REQUIRED_PERMISSIONS = [
    "management",
    "storage",
];

export function closeApp(){
    window.close();
}
