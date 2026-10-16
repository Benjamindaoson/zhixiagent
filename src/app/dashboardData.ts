/** Calculations for the bounded, local dashboard preview. No model call is made. */

export type DashboardRow = Record<string, unknown>;
export type DashboardAggregation = 'average' | 'sum';

export interface DashboardGroup {
    label: string;
    value: number;
    count: number;
}

const MAX_GROUPS = 16;

const numericValue = (value: unknown): number | null => {
    if (value === null || value === undefined || typeof value === 'boolean') return null;
    if (typeof value === 'string' && value.trim() === '') return null;
    const number = typeof value === 'number' ? value : typeof value === 'string' ? Number(value.trim()) : NaN;
    return Number.isFinite(number) ? number : null;
};

const labelValue = (value: unknown): string | null => {
    if (value === null || value === undefined || value === '') return null;
    return String(value);
};

export function describeDashboardFields(rows: DashboardRow[], preferredNames: string[] = []) {
    const names = [...new Set([...preferredNames, ...rows.flatMap(row => Object.keys(row))])]
        .filter(name => name && name !== '#rowId' && name !== '#');
    const measureCounts = new Map(names.map(name => [name, rows.filter(row => numericValue(row[name]) !== null).length]));
    const measures = names.filter(name => (measureCounts.get(name) ?? 0) > 0
        && !rows.some(row => row[name] instanceof Date));
    const dimensions = names.filter(name => !measures.includes(name));
    // Low-cardinality fields make useful dashboard filters. Numeric IDs are
    // intentionally omitted because their filter menus are usually unwieldy.
    const filterFields = dimensions.filter(name => {
        const values = new Set(rows.map(row => labelValue(row[name])).filter(value => value !== null));
        return values.size >= 2 && values.size <= 30;
    });
    const defaultDimension = filterFields.find(name => /genre|category|region|country|symbol|sector|segment|type/i.test(name))
        ?? filterFields[0] ?? dimensions[0] ?? names[0] ?? '';
    const defaultMeasure = [...measures].sort((a, b) =>
        (measureCounts.get(b) ?? 0) - (measureCounts.get(a) ?? 0)
        || Number(/profit|revenue|sales|price|close|rate|amount|value/i.test(b))
        - Number(/profit|revenue|sales|price|close|rate|amount|value/i.test(a)))[0] ?? '';
    return { names, measures, dimensions: dimensions.length ? dimensions : names, filterFields, defaultDimension, defaultMeasure };
}

export function aggregateDashboard(
    rows: DashboardRow[],
    dimension: string,
    measure: string,
    aggregation: DashboardAggregation,
    filterField?: string,
    filterValue?: string,
) {
    const visible = filterField && filterValue !== undefined && filterValue !== ''
        ? rows.filter(row => labelValue(row[filterField]) === filterValue)
        : rows;
    const buckets = new Map<string, { sum: number; count: number }>();
    let total = 0;
    let validRows = 0;
    for (const row of visible) {
        const label = labelValue(row[dimension]);
        const value = numericValue(row[measure]);
        if (label === null || value === null) continue;
        const bucket = buckets.get(label) ?? { sum: 0, count: 0 };
        bucket.sum += value;
        bucket.count += 1;
        buckets.set(label, bucket);
        total += value;
        validRows += 1;
    }
    const groups: DashboardGroup[] = [...buckets.entries()]
        .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
        .slice(0, MAX_GROUPS)
        .map(([label, bucket]) => ({
            label,
            value: aggregation === 'sum' ? bucket.sum : bucket.sum / bucket.count,
            count: bucket.count,
        }));
    return { groups, total, validRows, visibleRows: visible.length, groupCount: buckets.size };
}
