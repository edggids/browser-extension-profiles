import { get } from 'svelte/store';
import { router } from './router';
import {INITIAL_ROUTE, ROUTES, type RoutesConfig} from '../config/routes';
import {beforeEach, describe, expect, it, vi} from "vitest";

vi.mock("../config/routes", async (importOriginal) => {
  return {
    ROUTES: {
      'home': { component: null, title: 'Running' },
      'edit': { component: null, title: 'Edit' },
      'create': { component: null, title: 'Create' },
      'manage': { component: null, title: 'Manage' },
    } as RoutesConfig,
    INITIAL_ROUTE: 'home',
  }
})

describe("RouterStore", () => {
  beforeEach(() => {
    router.goHome();
  });

  it("should navigate to home", () => {
    expect(get(router).name).toBe('home');
    expect(get(router).route).toBe(ROUTES['home']);
  });

  it("should navigate to create", () => {
    router.goCreate();

    expect(get(router).name).toBe('create');
    expect(get(router).route).toBe(ROUTES['create']);
  });

  it("should navigate to manage", () => {
    router.goManage();

    expect(get(router).name).toBe('manage');
    expect(get(router).route).toBe(ROUTES['manage']);
  });

  it("should navigate to edit with profileId", () => {
    const profileId = 'testProfileId';

    router.goEdit(profileId);

    expect(get(router).name).toBe('edit');
    expect(get(router).route).toBe(ROUTES['edit']);
    expect(get(router).params.id).toBe(profileId);
  });
});
