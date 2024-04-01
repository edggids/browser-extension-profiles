<script lang="ts">
  import {createEventDispatcher} from "svelte";

  let className = '';
  export { className as class };

  export let active = false;

  export let color = '#1d1e1e';

  const dispatch = createEventDispatcher();

  function onClick() { dispatch('click'); }
</script>

<span on:click={onClick} class:active class={ `tag transition-border-color transition-color rounded-xl p-2.75 leading-none pr-4 inline-flex items-center text-sm bg-ground ${className}` } style:--color={color}>
  <span class="indicator mr-2.75"></span><slot></slot>
</span>
