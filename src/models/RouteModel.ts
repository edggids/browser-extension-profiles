import type {SvelteComponent} from "svelte";

export default interface RouteModel {
  component: typeof SvelteComponent;
  title: string;
}
