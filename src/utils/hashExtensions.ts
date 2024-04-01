import type {ExtensionModel} from "../models/ExtensionModel";

export async function hashExtensions(extensions: Pick<chrome.management.ExtensionInfo, 'id'> [] | ExtensionModel['id'][]): Promise<string>
{
  if(extensions.length < 1) return '';

  const target: ExtensionModel['id'][] = typeof extensions[0] === 'string'
    ? [...extensions as ExtensionModel['id'][]]
    : extensions.map(extension => extension.id);

  const idsTextNormalized =  target.sort().join('|');

  const encoder = new TextEncoder();
  const data = encoder.encode(idsTextNormalized);
  const hash = await crypto.subtle.digest('SHA-256', data);

  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16))
    .join('');
}
