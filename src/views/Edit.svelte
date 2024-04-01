<script lang="ts">
    import {router} from "../store/router";
    import {getProfile} from "../api/profile";
    import {profiles} from "../store/profiles";
    import AppFooter from "../lib/AppFooter.svelte";
    import ProfileForm from "../lib/ProfileForm.svelte";
    import {generateCurrentColorCssVars, getDefaultColors} from "../utils/colors";

    let processing = false;
    let deleting = false;

    let profile = null;
    $: profileId = $router.params.id;

    $: {
        getProfile(profileId)
            .then( r => profile = r );
    }

    let colors;
    $: colors = generateCurrentColorCssVars(
      profile
        ? profile.color
        : getDefaultColors()
    )

    const submitProfileForm = (e) => {
      processing = true;

      profiles.updateOrCreate(e.detail.form)
        .finally( () => processing = false );
    };

    const deleteProfile = (e) => {
        if (confirm('Are you sure you want to delete this profile?')) {
          deleting = true;

            profiles.destroy(profile.id)
                .then( () => router.goManage() )
                .finally( () => deleting = false );
        }
    }

    const colorChanged = (e) => {
      colors = generateCurrentColorCssVars(e.detail.color);
    }
</script>

{#if (profile)}
<ProfileForm on:colorChanged={colorChanged} on:submit={submitProfileForm} style={colors} {profile} >
    <AppFooter slot="footer" style={colors}>
        <button type="button" on:click={router.goManage}>Back</button>

        <div>
            <button type="button" on:click={deleteProfile} class="btn-o mr-7" disabled={deleting}>{ deleting ? 'Deleting': 'Delete'}</button>
            <button type="submit" class="btn-o" disabled={processing}>{processing ? 'Saving': 'Save'}</button>
        </div>
    </AppFooter>
</ProfileForm>
{/if}
