import storage from "./api/storage";
import migrations from "./migrations/migrations";
import {handleMigrations} from "./migrations/migrationsHandler";
import {clearCurrentProfile, getProfileOptions, loadProfile} from "./api/profile";
import {setBadgeFromProfile} from "./utils/setBadgeFromProfile";
import {getActiveExtensionIds} from "./api/extension";
import {hashExtensions} from "./utils/hashExtensions";
import {debounce} from "./utils/debounce";
import {getCustomProfile} from "./utils/customProfile";
import {log} from "./utils/log";

// check and run migrations when extension installed or refreshed
chrome.runtime.onInstalled.addListener(async function(){
  log.info('migrations started');

  await handleMigrations(storage, migrations)
    .then(result => log.info('migrations finished', result));

  await handleProfileCheckAgainstActiveExtensions();
});

chrome.runtime.onStartup.addListener(async function()
{
  log.info('startup');

  await handleProfileCheckAgainstActiveExtensions();
});

chrome.management.onDisabled.addListener(
  (info) => debouncedHandleExtensionStateChange(info)
);

chrome.management.onEnabled.addListener(
  (info) => debouncedHandleExtensionStateChange(info)
);

const debouncedHandleExtensionStateChange = debounce(handleExtensionStateChange, 500);

// TODO: should debounce this?
async function handleExtensionStateChange(info: chrome.management.ExtensionInfo): Promise<void>
{
  log.info('extension state changed', info, info.enabled);

  await handleProfileCheckAgainstActiveExtensions();
}

async function handleProfileCheckAgainstActiveExtensions(): Promise<void>
{
  log.info('checking profile against active extensions');

  // get hash of current extensions state
  const extensionIds = await getActiveExtensionIds();
  const hash = await hashExtensions([...extensionIds]);

  // find hash in profiles
  const profiles = await getProfileOptions();

  for(const [id, profile] of profiles.entries()) {
    log.info('profile', id, profile);

    if(profile.hash === hash) {
      await loadProfile(id);
      await setBadgeFromProfile(profile);

      return;
    }
  }

  // todo: clear loaded profile
  await clearCurrentProfile();
  await setBadgeFromProfile(getCustomProfile());
}
