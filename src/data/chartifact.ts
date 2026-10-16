// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
// Adapted from the upstream chartifact branch for the current chart canvas.

import { csvFormat } from 'd3-dsv';
import type { Chart, DictTable } from '../components/ComponentType';

const MAX_EXPORTED_ROWS = 1000;

/** Build a self-contained Chartifact document from the chart currently shown. */
export function buildChartifactDocument(
    title: string,
    chart: Pick<Chart, 'id' | 'chartType'>,
    table: Pick<DictTable, 'id' | 'displayId' | 'rows' | 'derive'>,
    renderedSpec: Record<string, any>,
): string {
    const spec = JSON.parse(JSON.stringify(renderedSpec));
    const replaceInlineData = (node: any): void => {
        if (!node || typeof node !== 'object') return;
        if (Array.isArray(node)) {
            node.forEach(replaceInlineData);
            return;
        }
        if (node.data && typeof node.data === 'object' && 'values' in node.data) {
            node.data = { ...node.data, name: table.id };
            delete node.data.values;
        }
        delete node.datasets;
        Object.values(node).forEach(replaceInlineData);
    };
    replaceInlineData(spec);
    if (!spec.data) spec.data = { name: table.id };

    const rows = table.rows.slice(0, MAX_EXPORTED_ROWS);
    const heading = title.replace(/[\r\n]+/g, ' ').trim() || table.displayId || table.id;
    const blocks = [
        '# View this document in the Chartifact viewer: https://microsoft.github.io/chartifact/view/',
        `# 知析 AI 分析图表: ${heading}`,
        `**Chart:** ${chart.chartType} (${chart.id})`,
        `**Table:** ${table.displayId || table.id}`,
        `**Exported rows:** ${rows.length} of ${table.rows.length} loaded rows`,
    ];
    if (table.derive?.code) {
        blocks.push('## Transformation Code', `\`\`\`python\n${table.derive.code}\n\`\`\``);
    }
    blocks.push(
        '## Visualization',
        `\`\`\`json vega-lite\n${JSON.stringify(spec, null, 2)}\n\`\`\``,
        '## Data Tables',
        `### ${table.displayId || table.id}`,
        `\`\`\`csv ${table.id}\n${csvFormat(rows)}\n\`\`\``,
        `\`\`\`json tabulator\n${JSON.stringify({ dataSourceName: table.id }, null, 2)}\n\`\`\``,
    );
    return blocks.join('\n\n') + '\n';
}
