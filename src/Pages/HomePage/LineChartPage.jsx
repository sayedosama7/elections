import React from 'react';
import { Chart } from 'react-google-charts';

const GoogleGeoChart = () => {
  // Provide only the required 2 columns: City and Population (or any numeric data)
  const data = [
    ['City', 'Population'],
    ['القاهرة', 9500000],
    ['الإسكندرية', 4500000],
    ['الجيزة', 9000000],
    ['شرم الشيخ', 75000],
    ['الأقصر', 507000],
    ['أسوان', 1550000],
    ['بورسعيد', 600000],
    ['السويس', 743000],
    ['طنطا', 421000],
    ['المنصورة', 350000],
  ];

  const options = {
    region: 'EG', // Egypt
    displayMode: 'markers', // Markers on the map
    colorAxis: { colors: ['green', 'blue'] }, // Color range
    tooltip: { trigger: 'focus', isHtml: true }, // Tooltip on hover
    datalessRegionColor: '#f0f0f0', // Color for regions with no data
  };

  return (
    <div style={{ width: '900px', height: '500px' }}>
      <Chart
        chartType="GeoChart"
        data={data}
        options={options}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default GoogleGeoChart;
