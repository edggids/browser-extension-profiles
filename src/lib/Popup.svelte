<script lang="ts">
    export let isOpen = false;
    let className = '';

    export { className as class};
</script>

<div role="dialog" class={`${className} ${isOpen ? '': 'hidden'} p-2 bg-ground rounded shadow z-10`}>
    <slot></slot>
</div>

