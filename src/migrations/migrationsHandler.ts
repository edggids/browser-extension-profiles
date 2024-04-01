import {type Storage} from "../api/storage";

export interface Migration {
  up: ( storage: Storage ) => Promise<any>
  down: ( storage: Storage ) => Promise<any>
}

export type MigrationCollection = Map<string, Migration>;

const STORAGE_KEY  = 'migrations';
const FAILED_STORAGE_KEY  = 'migrations_failed';

export async function handleMigrations(storage: Storage, migrations: MigrationCollection): Promise<Record<string, string>>
{
  const [executed, failed] = await Promise.all([
    storage.get<string[]>(STORAGE_KEY, []).then(r => new Set(r)),
    storage.get<{name: string, error: string}[]>(FAILED_STORAGE_KEY, [])
  ]);

  const ranMigrations = {};

  for(const [name, migration] of migrations){
    if(executed.has(name)) continue;

    try {
      await migration.up(storage);

      executed.add(name);
      await storage.set(STORAGE_KEY, [...executed.add(name)]);

      ranMigrations[name] = 'success';
    }
    catch (e) {
      console.warn(`Migration ${name} failed`);

      failed[name] = e.message;
      await storage.set(FAILED_STORAGE_KEY, failed);

      ranMigrations[name] = e.message;
    }
  }

  return ranMigrations;
}
