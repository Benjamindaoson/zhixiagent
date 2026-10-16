import { describe, expect, it } from 'vitest';
import { aggregateDashboard, describeDashboardFields } from '../../../../src/app/dashboardData';

const rows = [
    { month: '2026-01', region: 'East', revenue: 10 },
    { month: '2026-01', region: 'West', revenue: 20 },
    { month: '2026-02', region: 'East', revenue: 30 },
    { month: '2026-02', region: 'West', revenue: null },
];

describe('interactive dashboard data', () => {
    it('finds numeric measures and categorical filters in a table sample', () => {
        const fields = describeDashboardFields(rows, ['month', 'region', 'revenue']);
        expect(fields.measures).toEqual(['revenue']);
        expect(fields.dimensions).toEqual(['month', 'region']);
        expect(fields.filterFields).toEqual(['month', 'region']);
        expect(fields.defaultDimension).toBe('region');
        expect(fields.defaultMeasure).toBe('revenue');
    });

    it('starts with a populated measure and a useful category on sparse data', () => {
        const sparse = [
            { 'Release Date': 'Jan 01 2026', 'Major Genre': 'Drama', 'US DVD Sales': null, 'Worldwide Gross': 15 },
            { 'Release Date': 'Feb 01 2026', 'Major Genre': 'Comedy', 'US DVD Sales': null, 'Worldwide Gross': 20 },
            { 'Release Date': 'Mar 01 2026', 'Major Genre': 'Drama', 'US DVD Sales': 2, 'Worldwide Gross': 30 },
        ];
        const fields = describeDashboardFields(sparse, ['Release Date', 'Major Genre', 'US DVD Sales', 'Worldwide Gross']);
        expect(fields.defaultDimension).toBe('Major Genre');
        expect(fields.defaultMeasure).toBe('Worldwide Gross');
    });

    it('aggregates the visible sample and responds to category filters', () => {
        const all = aggregateDashboard(rows, 'month', 'revenue', 'average');
        expect(all.groups).toEqual([
            { label: '2026-01', value: 15, count: 2 },
            { label: '2026-02', value: 30, count: 1 },
        ]);
        expect(all.validRows).toBe(3);
        expect(all.total).toBe(60);

        const east = aggregateDashboard(rows, 'month', 'revenue', 'sum', 'region', 'East');
        expect(east.groups).toEqual([
            { label: '2026-01', value: 10, count: 1 },
            { label: '2026-02', value: 30, count: 1 },
        ]);
        expect(east.visibleRows).toBe(2);
    });

    it('does not turn empty or invalid values into zero-valued measures', () => {
        const summary = aggregateDashboard([{ group: 'A', amount: null }, { group: 'B', amount: 'n/a' }, { group: 'C', amount: '  ' }], 'group', 'amount', 'sum');
        expect(summary.groups).toEqual([]);
        expect(summary.validRows).toBe(0);
        expect(summary.total).toBe(0);
    });
});
