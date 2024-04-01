import {expect, test} from "vitest";
import type {ExtensionModel} from "../models/ExtensionModel";
import {getExtensionSource, EXTENSION_SOURCES} from "./extensionSource";

test('returns local source for invalid updateUrl', () => {
  const extension = { updateUrl: 'invalidUrl' } as ExtensionModel;
  const source = getExtensionSource(extension);
  expect(source).toBe(EXTENSION_SOURCES.LOCAL);
});

test('returns local source for unknown hostname', () => {
  const extension = { updateUrl: 'http://unknown.com' } as ExtensionModel;
  const source = getExtensionSource(extension);
  expect(source).toBe(EXTENSION_SOURCES.LOCAL);
});

test('returns chrome source for chrome hostname', () => {
  const extension = { updateUrl: 'http://clients2.google.com' } as ExtensionModel;
  const source = getExtensionSource(extension);
  expect(source).toBe(EXTENSION_SOURCES.CHROME);
});

test('returns edge source for edge hostname', () => {
  const extension = { updateUrl: 'http://edge.microsoft.com' } as ExtensionModel;
  const source = getExtensionSource(extension);
  expect(source).toBe(EXTENSION_SOURCES.EDGE);
});
