import Index from "../views/Index.svelte";
import Edit from "../views/Edit.svelte";
import Create from "../views/Create.svelte";
import Manage from "../views/Manage.svelte";
import type RouteModel from "../models/RouteModel";
import {freezeRoutes, type FrozenRoutes} from "../utils/freezeRoutes";

export type RoutesConfig = FrozenRoutes<{
    [key: string]: RouteModel
}>;

export type RouteOption = keyof typeof ROUTES;

export const INITIAL_ROUTE:RouteOption = 'home';

export const ROUTES = freezeRoutes({
    'home': { component: Index, title: 'Running' },
    'edit': { component: Edit, title: 'Edit' },
    'create': { component: Create, title: 'Create' },
    'manage': { component: Manage, title: 'Manage' },
}) as RoutesConfig;
