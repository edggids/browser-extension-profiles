import {expect, test, vi} from "vitest";

vi.mock('../views/Index.svelte', () => ({ default: () => {} }));
vi.mock('../views/Edit.svelte', () => ({ default: () => {} }));
vi.mock('../views/Create.svelte', () => ({ default: () => {} }));
vi.mock('../views/Manage.svelte', () => ({ default: () => {} }));

import {ROUTES, INITIAL_ROUTE} from "./routes";

test('routes object contains expected routes', () => {
  const expectedRoutes = ['home', 'edit', 'create', 'manage'];
  const actualRoutes = Object.keys(ROUTES);

  expect(actualRoutes).toEqual(expectedRoutes);
});

test('initial route is set', () => {
  expect(typeof INITIAL_ROUTE).toBe('string');
  expect(INITIAL_ROUTE).toBeTruthy();
});

test('initial route is key in routes', () => {
  expect(ROUTES).toHaveProperty(INITIAL_ROUTE as string);
});
