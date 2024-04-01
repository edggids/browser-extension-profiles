// Utility to create a Mock Storage
import "../utils/testSetupChrome";
import {beforeAll, describe, expect, it, vi} from "vitest";
import {handleMigrations} from "./migrationsHandler";
import type {Storage} from "../api/storage";

function createMockStorage(executedMigrations: string[] = [], failedMigrations = {}) {
  return {
    get: vi.fn((key, defaultValue) => {
      if (key === 'migrations') return Promise.resolve(executedMigrations);
      if (key === 'migrations_failed') return Promise.resolve(failedMigrations);
      return Promise.resolve(defaultValue);
    }),
    set: vi.fn().mockResolvedValue(undefined),
  } as unknown as Storage;
}

// Utility to create a Mock Migration
function createMockMigration(success: boolean) {
  return {
    up: vi.fn().mockImplementation(() => success ? Promise.resolve() : Promise.reject(new Error('Failed'))),
    down: vi.fn().mockResolvedValue(undefined),
  };
}

// vi.mock('./../api/api.ts', () => ({
//   tabs: {
//     query: vi.fn((_queryInfo, callback) => {
//       callback([{ id: 123 }]);
//     }),
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     create: vi.fn(({ url }: { url: string }) => {}),
//   },
//   sidePanel: {
//     open: vi.fn(),
//   },
//   commands: {
//     getAll: vi.fn(() => {
//       return [];
//     }),
//   }
// }));

describe('migrationHandler', () => {
  it('should handle successful migrations', async () => {
    const storage = createMockStorage();
    const migration = createMockMigration(true);

    const result = await handleMigrations(storage, new Map([['migration1', migration]]));

    expect(result['migration1']).toBe('success');
    expect(migration.up).toBeCalledWith(storage);
    expect(storage.set).toBeCalled();
  });

  it('should handle failed migrations', async () => {
    const storage = createMockStorage();
    const migration = createMockMigration(false);

    const result = await handleMigrations(storage, new Map([['migration1', migration]]));

    expect(result['migration1']).toBe('Failed');
    expect(migration.up).toBeCalledWith(storage);
    expect(storage.set).toBeCalled();
  });

  it('should skip already executed migrations', async () => {
    const storage = createMockStorage(['migration1']);
    const migration = createMockMigration(true);

    const result = await handleMigrations(storage, new Map([['migration1', migration]]));

    expect(result).toEqual({});
    expect(migration.up).not.toBeCalled();
  })
})
