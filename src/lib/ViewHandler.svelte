<script lang="ts">
    import { router } from "../store/router";
</script>

<svelte:component {...$$props} this={$router.route.component}/>
