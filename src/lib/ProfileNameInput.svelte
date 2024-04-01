<script lang="ts">
    let className = '';
    export { className as class };

    export let editable = false;
    export let value = '';
</script>

<div data-testid="inputGroup" class={`container transition-bg bg-current-light transition-color text-current text-lg pt-2 pb-3.5 ${className}`}>
    <span class="text-xl">{'{'}</span>
    {#if editable}
        <input placeholder="SET NAME HERE" class="plain" type="text" bind:value />
    {:else}
        <span>{ value }</span>
    {/if}
    <span class="text-xl">{'}'}</span>
</div>
