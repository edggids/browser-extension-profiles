import {vi} from "vitest";

export function createMockChrome() {
  return {
    tabs: {
      query: vi.fn((_queryInfo, callback) => {
        callback([{ id: 123 }]);
      }),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      create: vi.fn(({ url }: { url: string }) => {}),
    },
    sidePanel: {
      open: vi.fn(),
    },
    commands: {
      getAll: vi.fn(() => {
        return [];
      }),
    }
  };
}

vi.stubGlobal('chrome', createMockChrome());
