import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Loading } from '../../Components/Loading';
import { useEffect, useState } from 'react';
import { baseURL, GOVERNATE } from '../../Components/Api';
import axios from 'axios';

const GovernoratesList = () => {
    const [loading, setLoading] = useState(false);
    const [governorate, setGovernorate] = useState([]);

    const fetchGovernorate = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseURL}/${GOVERNATE}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setGovernorate(response.data.obj);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGovernorate();
    }, []);

    return (
        <div>
            {loading && <Loading />}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead className="table-head-style">
                        <TableRow>
                            <TableCell className="table-row" sx={{ fontSize: '18px' }}>
                                اسم المحافظة
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(governorate) && governorate.length > 0 ? (
                            governorate.map(gov => (
                                <TableRow key={gov.id}>
                                    <TableCell className="table-content" sx={{ fontSize: '18px' }}>
                                        {gov.name}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell className="text-center">
                                    <h5>لا توجد بيانات</h5>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default GovernoratesList;
