<script lang="ts">
    import {type Toasts} from "../store/toasts";
    import {createEventDispatcher} from "svelte";
    import Toast from "./Toast.svelte";

    export let toasts: Toasts;

    const dispatch = createEventDispatcher();

    function onClick(toast) { dispatch("close", { toast }) }
</script>

<style>

</style>

{#if toasts.size > 0}
<section class="absolute w-full bg-toast-section" style="bottom: 70px;">
    <div class="container pt-5">
        {#each [...toasts] as toast}
            <Toast class="mb-3.5" {toast} on:close={e => onClick(toast)} />
        {/each}
    </div>
</section>
{/if}
