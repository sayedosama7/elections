/* eslint-disable no-unused-vars */
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

// بيانات عدد المنتخبين في كل محافظة
const dataset = [
    { month: 'القاهرة', selectedVoters: 5000 },
    { month: 'الإسكندرية', selectedVoters: 3000 },
    { month: 'الجيزة', selectedVoters: 4500 },
    { month: 'الشرقية', selectedVoters: 2500 },
    { month: 'القليوبية', selectedVoters: 6000 },
];

const valueFormatter = value => `${value} منتخب`;

const chartSetting = {
    yAxis: [
        {
            label: 'عدد المنتخبين',
        },
    ],
    series: [{ dataKey: 'selectedVoters', label: 'عدد المنتخبين', valueFormatter }],
    height: 300,
    sx: {
        [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
            transform: 'translateX(-10px)',
        },
    },
};

export default function TickPlacementBars() {
    const [tickPlacement, setTickPlacement] = React.useState('middle');
    const [tickLabelPlacement, setTickLabelPlacement] = React.useState('middle');

    return (
        <div style={{ width: '100%' }}>
            <BarChart
                dataset={dataset}
                xAxis={[{ scaleType: 'band', dataKey: 'month', tickPlacement, tickLabelPlacement }]}
                {...chartSetting}
            />
        </div>
    );
}
