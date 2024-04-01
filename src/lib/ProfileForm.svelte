<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import SectionVerticalHeader from "./SectionVerticalHeader.svelte";
    import ProfileNameInput from "./ProfileNameInput.svelte";
    import {getCurrentAppId} from "../api/currentApp";
    import {extensions} from "../store/extensions";
    import {debounce} from "../utils/debounce";
    import {EXTENSION_SOURCES, getExtensionSource} from "../utils/extensionSource";
    import Popup from "./Popup.svelte";
    import {colorOptions} from "../store/colorOptions";
    import type {ColorOption} from "../models/ColorOption";
    import {getActiveExtensionIds} from "../api/extension";
    import ColorPill from "./ColorPill.svelte";
    import type {ProfileModel} from "../models/ProfileModel";
    import type {ProfileForm} from "../forms/ProfileForm";

    export let profile:ProfileModel = null;
    export let style = '';

    let form: ProfileForm;
    const appId = getCurrentAppId();

    async function resetForm() {
        form = {
            id: null,
            name: '',
            color: $colorOptions.length > 0 ? $colorOptions[0].color : colorOptions.defaultColor().color,
            pinned: false,
            extensions: await getActiveExtensionIds(),
        };
    }

    function updateForm(profile) {
      form = {
        id: profile.id,
        name: profile.name,
        color: { ...profile.color },
        pinned: profile.pinned,
        extensions: new Set([...profile.extensions]),
      };
    }

    const filters = {
        search: '',
        extensionState: 'all',
    };

    let selectingColor = false;

    const selectColor = (colorOption: ColorOption) => {
        const color = colorOption.color;

        form.color = color;
        selectingColor = false;

        dispatch('colorChanged', { color });
    };

    const togglePopup = () => selectingColor = !selectingColor;

    $: {
        !profile
            ? resetForm()
            : updateForm(profile);
    }

    $: hasExtensions = $extensions.length > 0;

    let filteredExtensions = { [EXTENSION_SOURCES.LOCAL]: [], [EXTENSION_SOURCES.EDGE]: [], [EXTENSION_SOURCES.CHROME]: [], metadata: { count: 0 } };

    const debouncedFilterSearch = debounce(filterSearch, 150);
    $: debouncedFilterSearch(filters.search.toLowerCase(), $extensions);

    /** avoid lowercase the extension names on every filter */
    $: extensionsExtendedInfo = $extensions.reduce((acc, extension) => {
      acc.set(extension.id, {
        name: extension.name.toLowerCase(),
        source: getExtensionSource(extension)
      });

      return acc;
    }, new Map());

    function filterSearch(search, extensions){
      filteredExtensions = extensions.reduce((acc, extension) => {
        const extendedInfo = extensionsExtendedInfo.get(extension.id);
        const extensionState = filters.extensionState;
        const enabled = form.extensions.has(extension.id);

        const isSearchMatch = extendedInfo.name.includes(search);
        const isExtensionStateMatch = extensionState === 'all'
                || (extensionState === 'enabled' && enabled)
                || (extensionState === 'disabled' && !enabled);

        if(isSearchMatch && isExtensionStateMatch && extension.id !== appId){
            acc[extendedInfo.source].push(extension);
            acc.metadata.count++;
        }

        return acc;
      }, { [EXTENSION_SOURCES.LOCAL]: [], [EXTENSION_SOURCES.EDGE]: [], [EXTENSION_SOURCES.CHROME]: [], metadata: { count: 0 } });
    }

    const extensionGroups = [
        { source: EXTENSION_SOURCES.LOCAL, label: 'Local' },
        { source: EXTENSION_SOURCES.EDGE, label: 'Edge Store' },
        { source: EXTENSION_SOURCES.CHROME, label: 'Chrome Store' },
    ];

    function toggleExtension(id){
        form.extensions.has(id)
            ? form.extensions.delete(id)
            : form.extensions.add(id);

        /** Force reactivity */
        form.extensions = form.extensions;
    }

    const dispatch = createEventDispatcher();
    function onSubmit() { dispatch('submit', { form: { ...form, extensions: [...form.extensions] } }); }
</script>

<form on:submit|preventDefault={onSubmit} class="flex flex-col overflow-hidden flex-1" action="#" method="post" {style}>
  {#if (form)}
    <section class="mb-5">
      <ProfileNameInput class="mb-2" bind:value={form.name} editable={true} />
    </section>

    <div class="container mb-5 relative">
      <h3 on:click={togglePopup} class="mb-3.5 flex items-center leading-none">
        <span class="mr-3.5">Color:</span>

        <ColorPill color={form.color} class="cursor-pointer" />
      </h3>

      <Popup class="absolute p-4" isOpen={selectingColor} >
        <div class="grid grid-cols-2 gap-x-6">
          {#each $colorOptions as colorOption}
              <ColorPill label={colorOption.name} class="cursor-pointer" on:click={e => selectColor(colorOption)} color={colorOption.color} />
          {/each}
        </div>
      </Popup>
    </div>

    <SectionVerticalHeader compact={true} title="filters">
      <h3 class="mb-3.5 leading-none">Extensions</h3>

      <div
              class="flex"
              style:--color="var(--color-current)"
      >
        <input
                style="min-width: 150px;"
                placeholder="Filter by name"
                bind:value={filters.search} class="mr-4" type="text"
                style:--color-placeholder="var(--color-current)"
        >

        <select bind:value={filters.extensionState} name="extension-state">
          <option value="all">All</option>
          <option value="enabled">Enabled</option>
          <option value="disabled">Disabled</option>
        </select>
      </div>
    </SectionVerticalHeader>

    <section class={`flex-1 overflow-auto ${$$slots.footer ? 'mb-7' : ''}`}>
      {#if !hasExtensions}
        <h3 class="mt-5 mb-3.5 leading-none container">No other extensions installed</h3>
      {:else if filteredExtensions.metadata.count === 0}
        <h3 class="mt-5 mb-3.5 leading-none container">No results found</h3>
      {/if}

      {#each extensionGroups as extensionGroup (extensionGroup.source)}
        {#if filteredExtensions[extensionGroup.source].length > 0}
          <h3 class="container mt-5 mb-6.5 leading-none text-current-darker">{extensionGroup.label} extensions</h3>

          <ul>
            {#each filteredExtensions[extensionGroup.source] as extension (extension.id)}
              <li class="odd:bg-current-light container">
                <label class="flex items-center pt-3 pb-3 cursor-pointer" style:--color="var(--color-current)">
                  <input
                          class="hidden"

                          type="checkbox"
                          name="extensions"

                          on:change={e => toggleExtension(extension.id)}
                          checked={form.extensions.has(extension.id)}

                          value={extension.id}
                  />

                  <span class="check-mark mr-3.5">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.5 1.5L7 14L1 7.57143" stroke="var(--color-ground)" stroke-width="2"/>
                    </svg>
                  </span>

                  {extension.name}
                </label>
              </li>
            {/each}
          </ul>

        {/if}
      {/each}
    </section>

    <slot name="footer"></slot>
  {/if}
</form>
