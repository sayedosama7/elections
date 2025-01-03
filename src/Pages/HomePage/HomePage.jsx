import Box from '@mui/material/Box';
import PieChartPage from './PieChart';
import TickPlacementBars from './BarsPage';
import HomeTable from './HomeTable';

const HomePage = () => {
    return (
        <div>
            <div className="box-container">
                <Box>
                    <div>
                        <h2 className="">الصفحة الرئيسية</h2>
                    </div>
                </Box>
            </div>
            <div className="my-5">
                <HomeTable />
            </div>
            <div className="my-5">
                <TickPlacementBars />
            </div>

            <PieChartPage />
        </div>
    );
};

export default HomePage;
