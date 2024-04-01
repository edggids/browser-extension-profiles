<script lang="ts">
  import { onMount } from 'svelte';
  import ViewHandler from "./lib/ViewHandler.svelte";
  import {currentProfile} from "./store/currentProfile";
  import {getDefaultColors, setCurrentColor} from "./utils/colors";
  import {router} from "./store/router";
  import {checkPermission, requestPermission} from "./api/permission";
  import {closeApp} from "./api/api";
  import ToastsSection from "./lib/ToastsSection.svelte";
  import {toasts} from "./store/toasts";

  let hasPermission = false;

  $: {
    const color = $currentProfile
      ? $currentProfile.color
      : getDefaultColors();

    setCurrentColor(color);
  }

  onMount(async () => {
    hasPermission = await checkPermission();

    if (!hasPermission) {
      // TODO: implement missing permission screen
      await onPermissionRequest();
    }
  });

  function onPermissionRequest() {
    requestPermission()
            .then(() => {
              hasPermission = true;
            })
            .catch(() => {
              hasPermission = false;
            });
  }

  function closeToast(event) {
    toasts.close(event.detail.toast);
  }
</script>

<main class="h-full flex flex-col">
  <header class="container flex justify-between mt-3 mb-2.75">
    <h1>{ $router.route.title }</h1>
    <button type="button" on:click={closeApp} class="text-lg text-default-color">X</button>
  </header>

  <ViewHandler />

  <ToastsSection toasts={$toasts} on:close={closeToast} />
</main>
