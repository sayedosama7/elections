import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const HomeTable = () => {
    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead className="table-head-style">
                        <TableRow>
                            <TableCell className="table-row" sx={{ fontSize: '18px' }}>
                                اسم المحافظة
                            </TableCell>
                            <TableCell className="table-row" sx={{ fontSize: '18px' }}>
                                عدد الدوائر الانتخابية
                            </TableCell>
                            <TableCell className="table-row" sx={{ fontSize: '18px' }}>
                                عدد الافسام
                            </TableCell>
                            <TableCell className="table-row" sx={{ fontSize: '18px' }}>
                                عدد القري
                            </TableCell>
                            <TableCell className="table-row" sx={{ fontSize: '18px' }}>
                                عدد المقرات الانتخابية
                            </TableCell>
                            <TableCell className="table-row" sx={{ fontSize: '18px' }}>
                                عدد اللجان الانتخابية
                            </TableCell>
                            <TableCell className="table-row" sx={{ fontSize: '18px' }}>
                                عدد الناخبين
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell className="table-content" sx={{ fontSize: '18px' }}>
                                القاهرة
                            </TableCell>
                            <TableCell className="table-content" sx={{ fontSize: '18px' }}>
                                20
                            </TableCell>
                            <TableCell className="table-content" sx={{ fontSize: '18px' }}>
                                10
                            </TableCell>
                            <TableCell className="table-content" sx={{ fontSize: '18px' }}>
                                15
                            </TableCell>
                            <TableCell className="table-content" sx={{ fontSize: '18px' }}>
                                30
                            </TableCell>
                            <TableCell className="table-content" sx={{ fontSize: '18px' }}>
                                50
                            </TableCell>
                            <TableCell className="table-content" sx={{ fontSize: '18px' }}>
                                3000
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="table-content" sx={{ fontSize: '18px' }}>
                                الاسكندرية
                            </TableCell>
                            <TableCell className="table-content" sx={{ fontSize: '18px' }}>
                                50
                            </TableCell>
                            <TableCell className="table-content" sx={{ fontSize: '18px' }}>
                                20
                            </TableCell>
                            <TableCell className="table-content" sx={{ fontSize: '18px' }}>
                                15
                            </TableCell>
                            <TableCell className="table-content" sx={{ fontSize: '18px' }}>
                                44
                            </TableCell>
                            <TableCell className="table-content" sx={{ fontSize: '18px' }}>
                                65
                            </TableCell>
                            <TableCell className="table-content" sx={{ fontSize: '18px' }}>
                                2000
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default HomeTable;
