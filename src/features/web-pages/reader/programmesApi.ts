/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ProgrammeDoc } from '@/types/programme';

/**
 * Reader-only data helpers.
 *
 * The dashboard used RTK Query (create/update/delete/get) to manage
 * programmes. On the website we only *view* a programme, and the data is
 * fetched on the server with `nextFetch` (see `app/reader/page.tsx`).
 *
 * We only keep the normalisation helpers that the reader needs to turn the
 * raw API document into the shape the block previews expect (flattened block
 * `data`, guaranteed `id`s, etc.). The write-side helpers (`wrapBlock`,
 * `preparePayload`) and all RTK endpoints/hooks have been removed.
 */

/**
 * Flattens a stored block: hoists everything inside `data` to the top level
 * and guarantees a stable `id`, which is what the preview components read.
 */
export function unwrapBlock(block: any): any {
  if (!block) return block;
  const { id, _id, type, module, animation, layout, data, ...rest } = block;
  const blockData = data || {};
  const generatedId = `blk_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
  return {
    type,
    module,
    animation,
    layout,
    ...rest,
    ...blockData,
    id: id || _id || blockData.id || blockData._id || generatedId,
  };
}

/**
 * Normalises a raw programme document from the API into a `ProgrammeDoc`:
 * ensures top-level `id`, and normalises every page and its blocks.
 */
export function normalizeProgramme(p: any): ProgrammeDoc {
  if (!p) return p;
  const id = p.id || p._id;
  const pages = Array.isArray(p.pages)
    ? p.pages.map((page: any) => ({
      ...page,
      id: page.id || page._id || `pg_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`,
      blocks: Array.isArray(page.blocks)
        ? page.blocks.map(unwrapBlock)
        : [],
    }))
    : [];
  return {
    ...p,
    id,
    pages,
  } as ProgrammeDoc;
}
