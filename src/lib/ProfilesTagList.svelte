<script lang="ts">
    import Tag from "./Tag.svelte";
    import {createEventDispatcher} from "svelte";

    export let profiles = [];
    export let currentProfileId;

    const dispatch = createEventDispatcher();
    const onClick = (id) => dispatch("selected", { id });
</script>

{#each profiles as [id, profile]}
    <Tag active={id === currentProfileId } on:click={e => onClick(id)} class="mr-4 mb-4" color={profile.color.default}>{profile.name}</Tag>
{/each}
