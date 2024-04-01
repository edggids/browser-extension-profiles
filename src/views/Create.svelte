<script lang="ts">
    import {router} from "../store/router";
    import AppFooter from "../lib/AppFooter.svelte";
    import ProfileForm from "../lib/ProfileForm.svelte";
    import {profiles} from "../store/profiles";
    import {generateCurrentColorCssVars, getDefaultColors} from "../utils/colors";

    let processing = false;

    const submitProfileForm = (e) => {
      processing = true;

        profiles.updateOrCreate(e.detail.form)
            .then(() => router.goHome())
            .finally(() => processing = false);
    }

    let colors: string;
    $: colors = generateCurrentColorCssVars(getDefaultColors())

    const colorChanged = (e) => {
      colors = generateCurrentColorCssVars(e.detail.color);
    }
</script>

<ProfileForm on:colorChanged={colorChanged} on:submit={submitProfileForm} style={colors}>
    <AppFooter slot="footer" style={colors}>
        <button type="button" on:click={router.goHome}>Home</button>
        <button type="submit" class="btn-o" disabled={processing}>{ processing ? 'Creating': 'Create'}</button>
    </AppFooter>
</ProfileForm>
