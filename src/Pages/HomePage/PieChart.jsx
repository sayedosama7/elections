import { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const PieChartPage = () => {
    const [chartData, setChartData] = useState([]);

    // بيانات ثابتة تضم اسم المحافظة وعدد اللجان
    const governorates = [
        { name: 'القاهرة', committeesCount: 5 },
        { name: 'الإسكندرية', committeesCount: 3 },
        { name: 'الجيزة', committeesCount: 4 },
        { name: 'الشرقية', committeesCount: 2 },
        { name: 'الإسماعلية', committeesCount: 10 },
        { name: 'المنيا', committeesCount: 6 },
        { name: 'القليوبية', committeesCount: 12 },
        { name: 'السويس', committeesCount: 20 },
        { name: 'اسيوط', committeesCount: 10 },
    ];

    // مجموعة من الألوان المتنوعة
    const colors = [
         '#33FF57', '#3357FF', '#FF33A8', '#FF9633', '#33FFF5',
        '#FF5733', '#6A33FF', '#33FF9A', '#FF7F33',
    ];

    useEffect(() => {
        // تحضير البيانات لتكون مناسبة للـ PieChart
        const pieChartData = governorates.map((gov, index) => ({
            id: index,
            value: gov.committeesCount, // تخصيص القيم حسب عدد اللجان
            label: `${gov.name} - عدد اللجان: ${gov.committeesCount}`,
            color: colors[index % colors.length], // تخصيص اللون من المصفوفة
        }));

        // تحديث chartData بعد التحضير
        setChartData(pieChartData);
    }, []); // هذه المصفوفة الفارغة تعني أنه سيتم تنفيذ الـ useEffect مرة واحدة فقط عند تحميل المكون

    return (
        <div>
            {/* عرض الـ PieChart فقط عندما تحتوي البيانات على عناصر */}
            {chartData.length > 0 ? (
                <PieChart
                    series={[
                        {
                            data: chartData,
                            highlightScope: { fade: 'global', highlight: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30 },
                            tooltip: (datum) => `${datum.label}`, // تخصيص tooltip لعرض اسم المحافظة وعدد اللجان
                            colors: chartData.map(datum => datum.color), // تخصيص الألوان بناءً على البيانات
                        },
                    ]}
                    height={400} // يمكن تعديل الحجم حسب الرغبة
                />
            ) : (
                <h5>لا توجد بيانات لعرضها</h5> // عرض رسالة إذا لم توجد بيانات
            )}
        </div>
    );
};

export default PieChartPage;
