<script lang="ts">
import {router} from "../store/router";
import {currentProfile} from "../store/currentProfile";
import ProfileNameInput from "../lib/ProfileNameInput.svelte";
import AppFooter from "../lib/AppFooter.svelte";
import SectionVerticalHeader from "../lib/SectionVerticalHeader.svelte";
import ProfilesTagList from "../lib/ProfilesTagList.svelte";
import {profiles} from "../store/profiles";
import {delayedPromise} from "../utils/delayedPromise";

let profilesPinned = [];
let profilesOther = [];
$: {
    profilesPinned = [];
    profilesOther = [];

    for(const profile  of $profiles) {
        profile[1].pinned
            ? profilesPinned.push(profile)
            : profilesOther.push(profile);
    }
}

$: profileName = $currentProfile?.name ?? 'custom';

let loading = false;

function profileSelected(event) {
  // rapid switching of profiles can crash the extension
  if(loading) return;

  loading = true;

  delayedPromise(
    currentProfile.loadOtherProfile(event.detail.id),
    200
  ).then(() => {
    loading = false;
  })
}
</script>

<section class="mb-10">
    <ProfileNameInput class="mb-2" value={profileName} />
    <div class="container">{ loading? 'loading ': '' }profile</div>
</section>

<SectionVerticalHeader class="mb-10" title="pinned">
    {#if profilesPinned.length === 0}
        <h3 class="pb-6 pt-2">No pinned profiles</h3>
    {:else}
    <ProfilesTagList
            profiles={profilesPinned}
            currentProfileId={$currentProfile?.id}

            on:selected={profileSelected}
    />
    {/if}
</SectionVerticalHeader>

<section class="flex-1 container mb-10">
    {#if profilesOther.length === 0}
        <h3 class="mb-5">No other profiles</h3>
    {:else}
        <h3 class="mb-5">Other profiles</h3>

        <div>
            <ProfilesTagList
                    profiles={profilesOther}
                    currentProfileId={$currentProfile?.id}

                    on:selected={profileSelected}
            />
        </div>
    {/if}
</section>

<AppFooter>
    <button type="button" on:click={router.goManage}>Manage</button>
    <button type="button" class="btn-o" on:click={router.goCreate}>Create</button>
</AppFooter>
