import { Chart } from 'react-google-charts';

// بيانات المحافظات باللغة العربية
export const data = [
    ['المحافظة', 'عدد السكان'],
    ['القاهرة', 1000],
    ['الإسكندرية', 800],
    ['الجيزة', 600],
    ['أسوان', 400],
    ['الأقصر', 300],
    ['بورسعيد', 200],
    ['السويس', 100],
];

const GoogleGeoChart = () => {
    return (
        <Chart
            chartType="GeoChart"
            data={data}
            options={{
                region: 'EG', // كود مصر
                displayMode: 'regions',
                resolution: 'provinces',
                colorAxis: { colors: ['#fce4ec', '#d81b60'] }, // ألوان مخصصة
                backgroundColor: '#f0f0f0',
                datalessRegionColor: '#e0e0e0',
                tooltip: { isHtml: true }, // تفعيل الـ Tooltip
            }}
            width="100%"
            height="500px"
            chartEvents={[
                {
                    eventName: 'select',
                    callback: ({ chartWrapper }) => {
                        const chart = chartWrapper.getChart();
                        const selection = chart.getSelection();
                        if (selection.length === 0) return;
                        const province = data[selection[0].row + 1];
                        alert('تم اختيار: ' + province[0]);
                    },
                },
            ]}
        />
    );
};

export default GoogleGeoChart;
