<script lang="ts">
    import type {Toast} from "../store/toasts";
    import {createEventDispatcher} from "svelte";

    export let toast: Toast;

    let className = '';
    export { className as class };

    const colorClassMap: Record<Toast['state'], { bg: string, text: string }> = {
        info: { bg: 'bg-safe-light', text: 'text-safe-darker' },
        error: { bg: 'bg-danger-light', text: 'text-danger-darker' },
        warning: { bg: 'bg-danger-light', text: 'text-danger-darker' },
    };

    $: role = toast.state === 'error' ? 'alert' : 'status';
    $: colorClass = colorClassMap[toast.state] ?? colorClassMap.info;

    const dispatch = createEventDispatcher();

    const onClick = (toast: Toast) => dispatch('close', { toast });
</script>

<div role={role} class={`${colorClass.bg} ${colorClass.text} pl-4 pt-3 pb-3 text-sm flex items-center rounded-xs ${className}`} >
    <span class="flex-1 mr-3.5 pb-1px">{toast.message}</span>
    <button data-testid="closeButton" type="button" class={`${colorClass.text} pr-4 pl-4`} on:click={e => onClick(toast)}>x</button>
</div>
