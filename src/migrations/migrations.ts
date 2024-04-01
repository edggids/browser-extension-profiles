import colorOptionsSeeder from './colorOptionsSeeder'
import type {MigrationCollection} from "./migrationsHandler";

const migrations:MigrationCollection = new Map([
  ['color-options', colorOptionsSeeder]
]);

export default migrations;
