<script lang="ts">
import {createEventDispatcher} from "svelte";
import type {ColorModel} from "../models/ColorModel";

export let color:ColorModel;
export let label:string|null = null;

let className = '';
export { className as class };

const dispatch = createEventDispatcher();

$:wrapperStyle = `--color-current-light: ${color.light}`;
$:wrapperClass = `inline-flex items-center p-2 hover:bg-current-light ${className}`;

function onClick() { dispatch('click'); }
</script>

<span role="button" on:click={onClick} class={wrapperClass} style={wrapperStyle}>
    <span class="inline-flex mr-3">
        <span style="width: 16px; height:24px; background-color: {color.light}"></span>
        <span style="width: 16px; height:24px; background-color: {color.default}"></span>
        <span style="width: 16px; height:24px; background-color: {color.darker}"></span>
    </span>

    {#if label}
        <span class="text leading-none pr-3">{label}</span>
    {/if}
</span>
