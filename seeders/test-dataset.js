import {hashExtensions} from "../src/utils/hashExtensions.js";

const profiles = {
    '5b6ce629-c573-4497-93e8-d16bc7f2e97b': { name: "debugger", pinned: false, color: { default: '#319EDB', light: '#F4FBFF', darker: '#1772A5' } },
    '23d3eede-4b9e-42e0-ad7f-fbf845a54dee': { name: "study coding", pinned: true, color: { default: '#48A68A', light: '#F2F9F7', darker: '#318B70' } },
    '5841cf48-f756-4baf-ae1f-4accabed435f': { name: "video", pinned: true, color: { default: '#e99d09', light: '#fff6e5', darker: '#d99b24' } },
    'aaf438d3-43ae-4f7d-b977-b62f189a6593': { name: "zen", pinned: true, color: { default: '#A000D8', light: '#fdeefd', darker: '#7E07A8' } }
}

const extensions = {
    'profile_5841cf48-f756-4baf-ae1f-4accabed435f': {extensions: ['bcjindcccaagfpapjjmafapmmgkkhgoa', 'fdpohaocaechififmbbbbbknoalclacl', 'hdokiejnpimakedhajhdlcegeplioahd', 'liecbddmkiiihnedobmlmillhodjkdmb']},
    'profile_5b6ce629-c573-4497-93e8-d16bc7f2e97b': {extensions: ['bcjindcccaagfpapjjmafapmmgkkhgoa', 'eadndfjplgieldjbigjakmdgkmoaaaoc', 'fmkadmapgofadopljbjfkapdkoienihi', 'geddoclleiomckbhadiaipdggiiccfje']},
    'profile_23d3eede-4b9e-42e0-ad7f-fbf845a54dee': {extensions: ['gighmmpiobklfepjocnamgkkbiglidom', 'nhdogjmejiglipccpnnnanhbledajbpd', 'nkbihfbeogaeaoehlefnkodbefgpgknn', 'oeicpkgdngoghobnbjngekclpcmpgpij']},
    'profile_aaf438d3-43ae-4f7d-b977-b62f189a6593': {extensions: ['bcjindcccaagfpapjjmafapmmgkkhgoa', 'fmkadmapgofadopljbjfkapdkoienihi', 'geddoclleiomckbhadiaipdggiiccfje', 'fdpohaocaechififmbbbbbknoalclacl', 'gighmmpiobklfepjocnamgkkbiglidom', 'hdokiejnpimakedhajhdlcegeplioahd']},
}

Object.keys(profiles).forEach((profileId) => {
    profiles[profileId].hash = hashExtensions(extensions[`profile_${profileId}`].extensions);
});

chrome.storage.local.set({ profiles, ...extensions, current_profile: '23d3eede-4b9e-42e0-ad7f-fbf845a54dee'})
