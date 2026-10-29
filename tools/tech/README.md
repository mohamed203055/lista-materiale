# Schema 2.0.0 update — backend integration contract

All 50 records have been migrated. This is a **breaking schema revision**: use the updated schema and regional files together.

## Changes from v1

- `descriptions` is replaced by `translations.<it|fr|en|ar>.{name,description}`. All four languages are required; display names include the exact reference. Names and translations are editorial, not official manufacturer localization.
- `product_url` is the official product-page URL when identified; otherwise null. `provenance.primary_source_url` always remains available and can itself be a PDF.
- `datasheet_url` links directly to an identified official PDF for **37 records** (six distinct documents). `datasheet_metadata.scope` distinguishes product datasheets, family datasheets and family catalogs. All six URLs returned HTTP 200 and a PDF file signature during this update. The other 13 records remain null rather than receiving guessed URLs. Reachability is point-in-time, not a guarantee of future availability.
- All physical quantities are numbers or null, not strings. `rated_voltage_V_AC`, `coil_voltage_V_AC`, and rating `voltage_V_AC` now allow **only a scalar number or null**, never an array. A source range has scalar null and explicit numeric `*_min_V_AC` / `*_max_V_AC` bounds. Fixed values repeat the scalar in both bounds. Unknown values remain null in all three fields.
- Breaking ratings have numeric `value_A` and derived numeric `value_kA`. `standard` is normalized (`IEC/EN 60898-1`, `IEC/EN 60947-2`, or `IEC/EN 61008-1` as appropriate). `standard_as_published` preserves the original source spelling, including CEI EN. This mapping does not assert a particular national certification or edition.
- `rating_data_complete` is a **data-completeness flag**, not an electrical-suitability decision. It requires a source-supported standard mapping and confirmed numeric voltage bounds. Only 15 rating tuples currently meet it. CHINT entries retain their explicitly noted table-label ambiguity and unconfirmed per-SKU voltage conditions; they are NOT automatically made calculation-ready.
- Do not substitute an equipment operating voltage for a short-circuit test voltage. Conditional `Inc` ratings retain `coordination_required: true`; the upstream protection selection still requires manufacturer coordination tables.
- Numeric identifiers such as SKUs and EANs deliberately remain strings.

## Supabase mapping

`supabase_mapping.sql` provides a PostgreSQL table with a complete JSONB record, unique manufacturer/reference key, generated numeric columns and additional type checks. RLS is enabled with **no client policies**. Use a trusted backend/service role for import; never expose a service key in UI code. Define authorization policies deliberately before enabling client access.

The SQL is provided as a migration file, **not executed or verified against a connected Supabase instance**. Validate the catalog locally first. It is intentionally not an idempotent schema migration for an existing table.

```js
// Server-side only; use your existing authenticated Supabase client.
// This maps records to the SQL table above (not directly to a different existing schema).
for (let offset = 0; offset < catalog.components.length; offset += 100) {
  const rows = catalog.components.slice(offset, offset + 100)
    .map(record => ({ id: record.id, record }));
  const { error } = await supabase.from('electrical_catalog_components')
    .upsert(rows, { onConflict: 'id' });
  if (error) throw error;
}
// Store the full canonical envelope/version in your catalog storage as well,
// so source_ids continue to resolve against the correct source registry.
```

## Mathematical-tool boundaries

Use structured numeric fields, never parse translated labels. Reject unknown inputs rather than treating null as zero. A component's rated current is **not** its circuit's actual design/load current. This catalog alone cannot compute voltage drop: conductor length, area, material, resistance/reactance, temperature, current, power factor and phase configuration are separate design inputs. Manufacturer compatibility, thermal checks and protective coordination also remain outside this data-completeness check.

For a BOM, null price means **quote required**; do not publish a complete monetary total until every line has a valid same-currency offer. Preserve all original warnings and source discrepancies.

Validation covers the full envelope and regional subsets, EAN checksums, quantity types and A/kA consistency, plus eight negative-schema tests (including numeric strings, booleans, wrong test-standard mappings and missing English). It is not manufacturer certification or a claim that the dataset is “bulletproof.”

---

# Official-source electrical component catalog

Checked: **29 October 2026**. Scope: **50 commercial references across Schneider Electric, ABB, BTicino, Vimar, Legrand, Hager and CHINT**.

## Files

- `database_components.json`: canonical envelope with metadata, source registry, regional profiles and 50 component records.
- `components_only.json`: identical component records as a top-level array, for importers requiring an array. Retain the envelope source registry separately; every record also carries its primary official URL.
- `database_components.schema.json`: JSON Schema (Draft 2020-12) for the canonical envelope.
- `validate_catalog.py`: schema, provenance, duplicate-reference, EAN checksum and domain checks. Requires Python 3 and `jsonschema` (`python -m pip install jsonschema`).
- `regional/IT.json`, `regional/FR.json`, `regional/MA.json`: filtered envelopes. Tags indicate editorial relevance, **not** certification or verified local distribution.

## Import

```js
import fs from 'node:fs/promises';
const catalog = JSON.parse(await fs.readFile('database_components.json', 'utf8'));
// The exact database driver depends on your application.
// Use (manufacturer, manufacturer_reference) as the unique commercial key.
// For MongoDB:
await db.collection('electrical_components').createIndex(
  { manufacturer: 1, manufacturer_reference: 1 }, { unique: true }
);
await db.collection('electrical_components').bulkWrite(
  catalog.components.map(component => ({
    updateOne: {
      filter: {
        manufacturer: component.manufacturer,
        manufacturer_reference: component.manufacturer_reference
      },
      update: { $set: component },
      upsert: true
    }
  }))
);
// Save catalog.sources in a separate provenance collection or versioned dataset document.
```

Do not convert SKU strings to numbers, including CHINT numeric codes. `id` is an application identifier, not a manufacturer SKU. Arabic is UTF-8. Preserve the exact SKU casing and punctuation.

## Coverage

| Manufacturer | Records | Included families |
|---|---:|---|
| Schneider Electric | 8 | Acti9 iC60N, iID, iCT, Linergy TR, Resi9 MP / mini Pragma |
| ABB | 1 | S201-C16, System pro M compact S200 |
| BTicino | 3 | BTDIN-RS, Living Now, Matix |
| Vimar | 2 | Plana, Eikon |
| Legrand | 2 | DNX³, DX³ |
| Hager | 2 | SanVis MFS716, CDC742F |
| CHINT | 32 | NB1-63 SB variants, B and C curves, 1P / 1P+N / 2P / 3P / 4P |

This is a **curated catalog, not every product or every brand/category combination**. Categories are not manufactured or fabricated merely to complete a matrix. Commercial references are explicitly present in the linked official sources; they are not extrapolated from a numbering pattern.

## Read these semantics before integration

1. **No blanket “100% guaranteed” claim.** These are source-supported transcriptions, not a manufacturer-certified database. Official pages can contain errors and regional differences. Confirm current datasheets, supplied reference, certificate scope and installation conditions before ordering or building.
2. **Breaking capacity is structured.** Never flatten it to a single `breaking_capacity_kA` field. `Icn`, `Icu`, `Ics`, `Inc`, `Im` and residual equivalents mean different things. Ratings include their standard and, where verified, test voltage. Values are in **amperes**, not kA. A missing test voltage is not permission to apply the rating at every voltage.
3. **RCCB is not RCBO.** A9R21240 and CDC742F have no integral overcurrent protection. Conditional short-circuit ratings require the manufacturer's upstream-protection coordination conditions.
4. **Wiring switches are not breakers.** Living Now K4001, Matix AM5001, Plana 14000 and Eikon 20000.FX are wiring devices. Their `wiring_device_modules` must never be used as `din_modules`. AX is a load designation, not a trip curve.
5. **Do not fabricate missing values.** Null means not applicable or not confirmed/transcribed; it does not mean zero, unrestricted rotation, no required protection, or compliant. `product_standards: []` means no product-specific standard was transcribed, not that the device has no applicable standard.
6. **Geometry is deliberately conservative.** Several records omit dimensions. They must not be physically placed by assuming a width from pole count. Add manufacturer-drawing-verified geometry before production rail-layout use. Manufacturer 9 mm pitch counts and 17.5/17.7/17.8/18 mm dimensions are not silently interchanged.
7. **Price is null, not zero.** Do not present an unpriced item as free. A BOM should show “quote required” and an incomplete total until every item has a valid supplier offer in the project currency. Official list prices seen on pages are not assumed to be current regional purchasing prices.
8. **Translations are editorial.** `it`, `fr`, `en` and `ar` descriptions translate sourced facts; they are not claimed to be official localized manufacturer copy.
9. **Marks are source evidence, not independent certification audits.** Some pages display IMQ, NF or Moroccan markings/certificate links. `catalog_marks` preserves that evidence. It does not establish current certificate validity, local availability or blanket approval of a finished panel.
10. **Rotation permissions are unknown unless documented.** Null means your placement engine should require review, not permit every orientation.

## Regional compliance

- Italy: installation-rule context is separate from product standards. FC881C16's official catalog explicitly lists **CEI EN 60898-1**. That does not certify an entire design to CEI 64-8.
- France: **NF C 15-100 installation requirements**, **EN/IEC product standards**, and an **NF certification mark** are separate concepts. The DX³ page links an NF certificate; its current scope still requires review.
- Morocco: a French-compatible component or an IEC/EN statement is not proof of Moroccan installation compliance. This catalog does not invent a universal “setup used by certified electricians.” Confirm applicable Moroccan standards, authority/utility requirements, importer conformity documents and current distribution. Country tags alone are insufficient.

## Known official-source discrepancies

- **Legrand 407782:** current SKU page lists 35.4 × 94.8 × 77.8 mm; an older official family PDF lists 35.6 mm width / 83 mm body height. These could reflect geometry conventions or revisions. Current SKU-page dimensions are transcribed, and a warning requires a current drawing before fabrication. The current page lists 16 kA Icu at 230 V while the older family sheet lists 25 kA. That disputed 230 V rating is intentionally omitted. The included **400 V Icn 6 kA / Icu 10 kA** ratings agree.
- **CHINT NB1-63:** the ordering table labels the column `Icu(kA)` while listing IEC/EN 60898-1 variants. The listed 6 kA is normalized as **Icn** in this dataset, with the original labeling discrepancy noted per record. Other family-table capacities are not indiscriminately copied to every variant.
- **Schneider NSYTRV22:** approval-system-specific electrical ratings are kept separate; potentially inconsistent localized dimensional prose is not imported as geometry.

## Validation

```sh
python -m pip install jsonschema
python validate_catalog.py
```

Validation checks structure and internal consistency. It does **not** re-certify the manufacturer facts or test electrical suitability. Use versioned catalog updates and preserve the provenance when editing.
