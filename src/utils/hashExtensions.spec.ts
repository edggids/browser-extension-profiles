import crypto from "crypto";
import {expect, test, vi} from "vitest";
import {hashExtensions} from "./hashExtensions";

vi.stubGlobal('crypto', {
    subtle: crypto.webcrypto.subtle,
});

test('should return empty string when no extensions are provided', async () => {
  const result = await hashExtensions([]);
  expect(result).toBe('');
});

test('should return the same hash for the same extensions regardless of order', async () => {
  const extensions1 = ['ext1', 'ext2', 'ext3'];
  const extensions2 = ['ext3', 'ext1', 'ext2'];

  const result1 = await hashExtensions(extensions1);
  const result2 = await hashExtensions(extensions2);

  expect(result1).toBe(result2);
});

test('should return different hashes for different extensions', async () => {
  const extensions1 = ['ext1', 'ext2', 'ext3'];
  const extensions2 = ['ext4', 'ext5', 'ext6'];

  const result1 = await hashExtensions(extensions1);
  const result2 = await hashExtensions(extensions2);

  expect(result1).not.toBe(result2);
});

test('should handle extensions as objects', async () => {
  const extensions = [{id: 'ext1'}, {id: 'ext2'}, {id: 'ext3'}];

  const result = await hashExtensions(extensions);
  const expected = await hashExtensions(['ext1', 'ext2', 'ext3']);

  expect(result).toBe(expected);
});
