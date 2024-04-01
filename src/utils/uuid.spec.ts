import crypto from "crypto";
import {describe, expect, test, vi} from "vitest";
import {generateUUID} from "./uuid";

vi.stubGlobal('crypto', crypto.webcrypto);

describe('generateUUID', () => {
  test('should return a string', () => {
    const result = generateUUID();

    expect(typeof result).toBe('string');
    expect(result.length).toBe(36);
    expect(result).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });

  test('should return a different string each time', () => {
    const result1 = generateUUID();
    const result2 = generateUUID();

    expect(result1).not.toBe(result2);
  });
})
