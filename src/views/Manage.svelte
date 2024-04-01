<script lang="ts">
    import {router} from "../store/router";
    import AppFooter from "../lib/AppFooter.svelte";
    import {currentProfile} from "../store/currentProfile";
    import ProfileNameInput from "../lib/ProfileNameInput.svelte";
    import {profiles} from "../store/profiles";

    $: profilesArr = [...$profiles.entries()];
    $: profileName = $currentProfile?.name ?? 'custom';
</script>

<section class="mb-10">
    <ProfileNameInput class="mb-2" value={profileName} />
</section>

<section class="mb-10 flex-1">
    <h3 class="container mb-3.5">Extensions</h3>

    <div>
        {#each profilesArr as [id, profile]}
            <div class="container flex items-center pt-3 pb-3 odd:bg-current-light">
                <span class="indicator mr-3.5" style:--color={profile.color.default}></span>
                <span class="flex-1">{profile.name}</span>

                <button type="button" on:click={e => profiles.togglePin(profile)} class="pl-3.5 pr-3.5 text-current">
                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_102_376)">
                            {#if profile.pinned}
                                <path d="M5.05 4.55L0.5 4.925L4.35 8.3075L2.67 14L7.63576 10.5L12.33 14L10.44 8.3075L14.5 4.925L9.67 4.55L7.63576 0L5.05 4.55Z" fill="var(--color-current)"/>
                            {:else}
                                <path d="M5.48471 4.79704L7.58244 1.10579L9.21354 4.75408L9.33489 5.02549L9.6313 5.0485L13.2348 5.32828L10.12 7.92335L9.85806 8.14154L9.96547 8.46505L11.3546 12.6491L7.93463 10.0992L7.64401 9.88247L7.3477 10.0913L3.55619 12.7637L4.82955 8.44903L4.91996 8.14269L4.68001 7.93188L1.71464 5.32659L5.09107 5.04831L5.35424 5.02662L5.48471 4.79704Z" stroke="var(--color-current)" />
                            {/if}
                        </g>
                    </svg>
                </button>

                <button type="button" on:click={e => router.goEdit(id)} class="pl-3.5 pr-3.5 text-current">
                    <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 12.5L8 7L1.5 1.5" stroke="var(--color-current)" stroke-width="2"/>
                    </svg>
                </button>
            </div>
        {/each}
    </div>
</section>


<AppFooter>
    <button type="button" on:click={router.goHome}>Home</button>
    <button type="button" class="btn-o" on:click={router.goCreate}>Create</button>
</AppFooter>
