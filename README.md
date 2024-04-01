![test workflow results](https://github.com/edggids/browser-extension-profiles/actions/workflows/main.yml/badge.svg)

## WIP

# Extension Profile Manager
Simple browser extension that empowers you to create custom profiles for your enabled extensions. 
This extension lets you selectively activate only the extensions essential for your specific tasks, 
optimizing your browsing efficiency.

## Local Development
1. run `npm install` to install dependencies
2. run `npm run dev` to start vite build in watch mode

## Build
1. run `npm run build` to build the extension

## Tests
1. run `npm run test` to build the extension

### Missing feature
- [x] Loading indicator for saving/creating/deleting profiles
- [ ] Add loading animation
- [x] Add toast notification on save/create/delete
- [x] Create toast design
- [x] Add color selection to profile edit and create
- [x] Create a design for color selection
- [x] Add pin button in manage view
- [x] Prevent spamming profile switch as that can cause a crash
- [x] Create a test data seeder/function
- [x] Create an installation script that would add preset colors to the database
- [ ] Add a view for "no profiles"
- [x] Add a view for "no extensions"
- [x] Add a view for "no other extensions"
- [x] Add a view for "no pinned profiles"
- [x] Add a message for "no extensions" when filtering in ProfileForm
- [x] Add CSS purge
- [x] Add SCSS and refactor CSS
- [x] Debounce search filtering
- [ ] Move to GitHub
- [ ] Publish on [Chrome web store](https://developer.chrome.com/docs/webstore/publish/)
- [ ] Create an icon
- [x] Change the icon indicator based on the active profile
- [x] Group extensions by source (Chrome, Edge, Local, etc)
- [x] If the current profile is updated, then reload it.
- [x] Create a generic Custom profile that is activated when users manually disable or enable extensions.
- [x] After manual on/off, check for a matching profile, and if found, activate it
  -  This can be done by adding a hash to the profile, based on the enabled extensions' ids
- [x] On create, currently enabled extensions should be selected initially
- [ ] Update badge color if active profile color updated
- [ ] badge is not reset on current profile delete.

### Questions
- [ ] Should it roll back the extension state if at least one extension fails to load?
