import { describe, expect, it } from 'vitest';
import { buildChartifactDocument } from '../../../../src/data/chartifact';

describe('Chartifact export', () => {
    const chart = { id: 'chart-1', chartType: 'Line Chart' };

    it('exports the Vega spec and CSV while removing inline data from the spec', () => {
        const table = {
            id: 'prices', displayId: 'Price data',
            rows: [{ symbol: 'AAPL', close: 123 }, { symbol: 'MSFT', close: 456 }],
            derive: { code: 'result_df = source_df.copy()' },
        } as any;
        const spec = { data: { values: [{ secret: 'inline-row' }] }, mark: 'line', datasets: { raw: [1] } };
        const document = buildChartifactDocument('Stock prices', chart, table, spec);

        expect(document).toContain('# 知析 AI 分析图表: Stock prices');
        expect(document).toContain('```json vega-lite');
        expect(document).toContain('"name": "prices"');
        expect(document).toContain('```csv prices');
        expect(document).toContain('AAPL,123');
        expect(document).toContain('result_df = source_df.copy()');
        expect(document).not.toContain('inline-row');
        expect(document).not.toContain('"datasets"');
        expect(spec.data.values[0].secret).toBe('inline-row');
    });

    it('labels a bounded export when more than 1000 rows are loaded', () => {
        const table = { id: 'large', displayId: 'Large', rows: Array.from({ length: 1002 }, (_, i) => ({ index: i })) } as any;
        const document = buildChartifactDocument('Large', chart, table, { mark: 'bar' });
        expect(document).toContain('**Exported rows:** 1000 of 1002 loaded rows');
        expect(document).not.toContain('\n1001\n');
    });
});
