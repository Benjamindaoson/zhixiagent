// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert, Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { apiRequest } from '../app/apiClient';
import { aggregateDashboard, describeDashboardFields, type DashboardAggregation, type DashboardGroup, type DashboardRow } from '../app/dashboardData';
import { dfSelectors, type DataFormulatorState } from '../app/dfSlice';
import { getUrls } from '../app/utils';

type ChartKind = 'bar' | 'line';
const SAMPLE_LIMIT = 1000;

const numberText = (value: number) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(value);
const axisText = (value: number) => new Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: 1 }).format(value);

const DashboardChart: React.FC<{ groups: DashboardGroup[]; kind: ChartKind; color: string }> = ({ groups, kind, color }) => {
    const width = 840;
    const height = 330;
    const left = 64;
    const right = 22;
    const top = 20;
    const bottom = 88;
    const plotWidth = width - left - right;
    const plotHeight = height - top - bottom;
    const values = groups.map(group => group.value);
    const min = Math.min(0, ...values);
    const max = Math.max(0, ...values);
    const span = max - min || 1;
    const y = (value: number) => top + ((max - value) / span) * plotHeight;
    const x = (index: number) => left + ((index + 0.5) / groups.length) * plotWidth;
    const baseline = y(0);
    const points = groups.map((group, index) => `${x(index)},${y(group.value)}`).join(' ');
    const barWidth = Math.min(44, (plotWidth / groups.length) * 0.64);

    return (
        <Box sx={{ width: '100%', minWidth: 0, overflowX: 'auto' }}>
            <svg role="img" aria-label="Dashboard chart" viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', width: '100%', minWidth: 520 }}>
                {[0, 1, 2, 3, 4].map(step => {
                    const value = min + (span * step) / 4;
                    const lineY = y(value);
                    return <g key={step}>
                        <line x1={left} x2={width - right} y1={lineY} y2={lineY} stroke="#DCE7EB" strokeDasharray="4 5" />
                        <text x={left - 10} y={lineY + 4} textAnchor="end" fontSize="11" fill="#607481">{axisText(value)}</text>
                    </g>;
                })}
                <line x1={left} x2={width - right} y1={baseline} y2={baseline} stroke="#9CB0BA" />
                {kind === 'line' && <polyline points={points} fill="none" stroke={color} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />}
                {groups.map((group, index) => (
                    <g key={`${group.label}-${index}`}>
                        {kind === 'bar' ? (
                            <rect x={x(index) - barWidth / 2} y={Math.min(y(group.value), baseline)}
                                width={barWidth} height={Math.max(1, Math.abs(y(group.value) - baseline))}
                                rx="5" fill={color} opacity={0.85} />
                        ) : <circle cx={x(index)} cy={y(group.value)} r="5" fill="#fff" stroke={color} strokeWidth="3" />}
                        <text x={x(index)} y={height - bottom + 18} textAnchor="end"
                            transform={`rotate(-38 ${x(index)} ${height - bottom + 18})`}
                            fontSize="11" fill="#4C6270">{group.label.length > 15 ? `${group.label.slice(0, 14)}…` : group.label}</text>
                        <title>{`${group.label}: ${numberText(group.value)} (${group.count})`}</title>
                    </g>
                ))}
            </svg>
        </Box>
    );
};

const MetricCard: React.FC<{ label: string; value: string; note?: string }> = ({ label, value, note }) => (
    <Box sx={{ p: 1.5, bgcolor: '#fff', border: '1px solid #DCE9EC', borderRadius: 2, minWidth: 130, flex: '1 1 calc(50% - 6px)', boxSizing: 'border-box' }}>
        <Typography sx={{ fontSize: 12, color: '#597180' }}>{label}</Typography>
        <Typography sx={{ mt: 0.5, fontSize: 25, fontWeight: 750, color: '#173B4D', lineHeight: 1.2 }}>{value}</Typography>
        {note && <Typography sx={{ mt: 0.5, fontSize: 11, color: '#758994' }}>{note}</Typography>}
    </Box>
);

export const InteractiveDashboard: React.FC = () => {
    const tables = useSelector(dfSelectors.getAllTables);
    const workspaceId = useSelector((state: DataFormulatorState) => state.activeWorkspace?.id);
    const { i18n } = useTranslation();
    const zh = i18n.language.startsWith('zh');
    const [selectedTableId, setSelectedTableId] = useState('');
    const [rows, setRows] = useState<DashboardRow[]>([]);
    const [totalRowCount, setTotalRowCount] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [retry, setRetry] = useState(0);
    const [dimension, setDimension] = useState('');
    const [measure, setMeasure] = useState('');
    const [filterField, setFilterField] = useState('');
    const [filterValue, setFilterValue] = useState('');
    const [kind, setKind] = useState<ChartKind>('bar');
    const [aggregation, setAggregation] = useState<DashboardAggregation>('average');

    useEffect(() => {
        if (!tables.some(table => table.id === selectedTableId)) setSelectedTableId(tables[0]?.id ?? '');
    }, [tables, selectedTableId]);
    const table = tables.find(item => item.id === selectedTableId);
    const tableStorageId = table?.virtual?.tableId ?? table?.id;

    useEffect(() => {
        if (!tableStorageId) {
            setRows([]);
            setTotalRowCount(null);
            return;
        }
        let current = true;
        setRows([]);
        setError('');
        setLoading(true);
        apiRequest<{ rows: DashboardRow[]; total_row_count?: number }>(getUrls().SAMPLE_TABLE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...(workspaceId ? { 'X-Workspace-Id': workspaceId } : {}) },
            body: JSON.stringify({ table: tableStorageId, size: SAMPLE_LIMIT, method: 'head' }),
        }).then(({ data }) => {
            if (!current) return;
            setRows(data.rows ?? []);
            setTotalRowCount(data.total_row_count ?? null);
        }).catch(cause => {
            if (!current) return;
            setError(cause instanceof Error ? cause.message : String(cause));
        }).finally(() => { if (current) setLoading(false); });
        return () => { current = false; };
    }, [tableStorageId, workspaceId, retry]);

    const fields = useMemo(() => describeDashboardFields(rows, table?.names ?? []), [rows, table]);
    const activeDimension = fields.dimensions.includes(dimension) ? dimension : fields.defaultDimension;
    const activeMeasure = fields.measures.includes(measure) ? measure : fields.defaultMeasure;
    const activeFilterField = fields.filterFields.includes(filterField) ? filterField : '';
    const filterOptions = activeFilterField
        ? [...new Set(rows.map(row => row[activeFilterField]).filter(value => value !== null && value !== undefined && value !== '').map(String))]
            .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        : [];
    const activeFilterValue = filterOptions.includes(filterValue) ? filterValue : '';
    const summary = useMemo(
        () => aggregateDashboard(rows, activeDimension, activeMeasure, aggregation, activeFilterField, activeFilterValue),
        [rows, activeDimension, activeMeasure, aggregation, activeFilterField, activeFilterValue],
    );

    const selectSx = { minWidth: 135, flex: '1 1 150px', '& .MuiOutlinedInput-root': { bgcolor: '#fff', borderRadius: 2 } };
    return (
        <Box sx={{ width: '100%', height: '100%', overflowY: 'auto', bgcolor: '#F6FAFB', p: { xs: 2, md: 3 }, boxSizing: 'border-box' }}>
            <Box sx={{ mb: 2.5 }}>
                <Typography sx={{ fontSize: 23, fontWeight: 780, color: '#153B4C' }}>
                    {zh ? '交互式分析仪表盘' : 'Interactive analysis dashboard'}
                </Typography>
                <Typography sx={{ fontSize: 13, color: '#607A88', mt: 0.5 }}>
                    {zh ? '选择字段并筛选数据，即时查看图表与摘要。' : 'Choose fields and filters to explore your data instantly.'}
                </Typography>
            </Box>

            {tables.length === 0 ? (
                <Alert severity="info">{zh ? '请先上传数据或打开一个示例会话。' : 'Upload data or open a demo session first.'}</Alert>
            ) : <>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2.5 }}>
                    <FormControl size="small" sx={selectSx}>
                        <InputLabel id="dashboard-table-label">{zh ? '数据表' : 'Table'}</InputLabel>
                        <Select labelId="dashboard-table-label" label={zh ? '数据表' : 'Table'} value={selectedTableId} onChange={event => { setSelectedTableId(event.target.value); setDimension(''); setMeasure(''); setFilterField(''); setFilterValue(''); }}>
                            {tables.map(item => <MenuItem key={item.id} value={item.id}>{item.displayId || item.id}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl size="small" sx={selectSx} disabled={loading || !!error || !fields.dimensions.length}>
                        <InputLabel id="dashboard-dimension-label">{zh ? '横轴字段' : 'Dimension'}</InputLabel>
                        <Select labelId="dashboard-dimension-label" label={zh ? '横轴字段' : 'Dimension'} value={activeDimension} onChange={event => setDimension(event.target.value)}>
                            {fields.dimensions.map(name => <MenuItem key={name} value={name}>{name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl size="small" sx={selectSx} disabled={loading || !!error || !fields.measures.length}>
                        <InputLabel id="dashboard-measure-label">{zh ? '数值字段' : 'Measure'}</InputLabel>
                        <Select labelId="dashboard-measure-label" label={zh ? '数值字段' : 'Measure'} value={activeMeasure} onChange={event => setMeasure(event.target.value)}>
                            {fields.measures.map(name => <MenuItem key={name} value={name}>{name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl size="small" sx={selectSx} disabled={loading || !!error || !fields.filterFields.length}>
                        <InputLabel id="dashboard-filter-field-label">{zh ? '筛选字段' : 'Filter field'}</InputLabel>
                        <Select labelId="dashboard-filter-field-label" label={zh ? '筛选字段' : 'Filter field'} value={activeFilterField} onChange={event => { setFilterField(event.target.value); setFilterValue(''); }}>
                            <MenuItem value="">{zh ? '全部' : 'All'}</MenuItem>
                            {fields.filterFields.map(name => <MenuItem key={name} value={name}>{name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    {activeFilterField && <FormControl size="small" sx={selectSx}>
                        <InputLabel id="dashboard-filter-value-label">{zh ? '筛选值' : 'Filter value'}</InputLabel>
                        <Select labelId="dashboard-filter-value-label" label={zh ? '筛选值' : 'Filter value'} value={activeFilterValue} onChange={event => setFilterValue(event.target.value)}>
                            <MenuItem value="">{zh ? '全部' : 'All'}</MenuItem>
                            {filterOptions.map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)}
                        </Select>
                    </FormControl>}
                </Box>

                {loading ? <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 5 }}><CircularProgress size={23} /><Typography>{zh ? '正在读取表格样本…' : 'Loading table sample…'}</Typography></Box>
                    : error ? <Alert severity="error" action={<Button color="inherit" size="small" onClick={() => setRetry(value => value + 1)}>{zh ? '重试' : 'Retry'}</Button>}>
                        {zh ? '读取表格失败：' : 'Could not load table: '}{error}
                    </Alert> : rows.length === 0 ? <Alert severity="info">{zh ? '这个数据表暂无可展示的行。请选择其他表。' : 'This table has no rows to show. Choose another table.'}</Alert>
                        : !activeMeasure || !activeDimension ? <Alert severity="info">{zh ? '样本中没有可用的数值字段与维度字段。请选择其他表。' : 'No usable numeric measure and dimension were found. Choose another table.'}</Alert>
                            : <>
                                <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 2.5 }}>
                                    <MetricCard label={zh ? '筛选后样本行数' : 'Visible sample rows'} value={numberText(summary.visibleRows)} note={zh ? `读取 ${rows.length} 行` : `${rows.length} rows loaded`} />
                                    <MetricCard label={zh ? '有效数值行数' : 'Numeric rows'} value={numberText(summary.validRows)} note={activeMeasure} />
                                    <MetricCard label={zh ? '样本数值合计' : 'Sample total'} value={numberText(summary.total)} note={activeMeasure} />
                                    <MetricCard label={zh ? '样本数值平均' : 'Sample average'} value={summary.validRows ? numberText(summary.total / summary.validRows) : '—'} note={activeMeasure} />
                                </Box>
                                <Box sx={{ bgcolor: '#fff', border: '1px solid #DCE9EC', borderRadius: 2.5, p: { xs: 1.5, md: 2.5 } }}>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 1, mb: 1.5 }}>
                                        <Box>
                                            <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#173B4D' }}>{activeMeasure} / {activeDimension}</Typography>
                                            <Typography sx={{ fontSize: 12, color: '#748A96' }}>
                                                {zh ? `基于前 ${rows.length} 行样本${totalRowCount && totalRowCount > rows.length ? `，全表约 ${numberText(totalRowCount)} 行` : ''}`
                                                    : `Based on the first ${rows.length} sampled rows${totalRowCount && totalRowCount > rows.length ? ` of ${numberText(totalRowCount)} total` : ''}`}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Button size="small" variant={kind === 'bar' ? 'contained' : 'outlined'} onClick={() => setKind('bar')}>{zh ? '柱状图' : 'Bars'}</Button>
                                            <Button size="small" variant={kind === 'line' ? 'contained' : 'outlined'} onClick={() => setKind('line')}>{zh ? '折线图' : 'Line'}</Button>
                                            <FormControl size="small" sx={{ minWidth: 90 }}>
                                                <Select aria-label={zh ? '汇总方式' : 'Aggregation'} value={aggregation} onChange={event => setAggregation(event.target.value as DashboardAggregation)}>
                                                    <MenuItem value="average">{zh ? '平均' : 'Average'}</MenuItem>
                                                    <MenuItem value="sum">{zh ? '合计' : 'Sum'}</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Box>
                                    {summary.groups.length ? <DashboardChart groups={summary.groups} kind={kind} color="#168A89" />
                                        : <Alert severity="info">{zh ? '当前筛选条件下没有可绘制的数值。' : 'No numeric values match the current filter.'}</Alert>}
                                    {summary.groupCount > summary.groups.length && <Typography sx={{ fontSize: 12, color: '#748A96' }}>
                                        {zh ? `图表显示前 ${summary.groups.length} 个分组，共 ${summary.groupCount} 个。` : `Showing ${summary.groups.length} of ${summary.groupCount} groups.`}
                                    </Typography>}
                                </Box>
                            </>}
            </>}
        </Box>
    );
};

export default InteractiveDashboard;
