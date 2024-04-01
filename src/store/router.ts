import {type Readable, writable} from "svelte/store";
import {INITIAL_ROUTE, type RouteOption, ROUTES} from "../config/routes";
import type RouteModel from "../models/RouteModel";
import type {ProfileModel} from "../models/ProfileModel";
import {log} from "../utils/log";

type routeParams = { [key:string]: any };

interface RouterValue {
  name: string;
  params: routeParams;
  route: Readonly<RouteModel>;
}

interface RouterStore extends Readable<RouterValue> {
  goHome: () => void;
  goCreate: () => void;
  goManage: () => void;
  goEdit: (profileId: ProfileModel['id']) => void;
}

function createRouterStore(): RouterStore
{
  const { subscribe, set } = writable<RouterValue>();

  function setRoute(name: RouteOption, params: routeParams = {}): boolean
  {
    if(typeof ROUTES[name] === 'undefined'){
      console.error(`Route "${name}" not found`);

      return false;
    }

    set({ name: name.toString(), params, route: ROUTES[name] });
    log.info('navigating to:', name, params);

    return true;
  }

  setRoute(INITIAL_ROUTE);

  return {
    subscribe,

    goHome: () => setRoute('home'),
    goCreate: () => setRoute('create'),
    goManage: () => setRoute('manage'),
    goEdit: (profileId) => setRoute('edit', { id: profileId } ),
  };
}

export const router = createRouterStore();
