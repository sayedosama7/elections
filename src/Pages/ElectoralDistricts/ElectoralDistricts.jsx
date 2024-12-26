import Box from '@mui/material/Box';
// import { Loading } from '../../Components/Loading';
import { useCallback, useEffect, useState } from 'react';
import { baseURL, ELECTORAL_DISTRIC, GOVERNATE } from '../../Components/Api';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Loading } from '../../Components/Loading';
import { Link } from 'react-router-dom';

const ElectoralDistricts = () => {
    const [loading, setLoading] = useState(false);
    const [election, setElection] = useState([]);
    const [govId, setGovId] = useState('');
    const [governate, setGovernate] = useState([]);

    const handleGovIdChange = async event => {
        const selectedGovId = event.target.value;
        setGovId(selectedGovId);

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseURL}/${ELECTORAL_DISTRIC}`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { govId: selectedGovId },
            });
            setElection(response.data.obj);
        } catch (error) {
            console.error('Error fetching filtered data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchElection = useCallback(async () => {
        const params = {
            govId: govId || undefined,
        };
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseURL}/${ELECTORAL_DISTRIC}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params,
            });
            setElection(response.data.obj);
            console.log('ELECTION_DISTRIC', response.data.obj);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }, [govId]);

    useEffect(() => {
        fetchElection();
    }, [fetchElection]);

    const fetchGovernate = async () => {
        try {
            if (governate.length > 0) return;
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseURL}/${GOVERNATE}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setGovernate(response.data.obj);
        } catch (error) {
            console.error('Error fetching governate:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading && <Loading />}

            <div className="box-container">
                <Box>
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="">الدوائر الانتخابية</h2>
                        <div>
                            <Link to="/add-Electoraldistricts">
                                <button className="btn btn-primary">اضافة دائرة انتخابية</button>
                            </Link>
                        </div>
                    </div>
                </Box>

                <div className="filter-districts">
                    <form action="">
                        <div className="container">
                            <div className="row">
                                {/* المحافظة */}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="GovId" className="d-flex mb-1">
                                        المحافظة
                                    </label>
                                    <select
                                        className="form-select"
                                        onChange={handleGovIdChange}
                                        onClick={fetchGovernate}
                                        value={govId}
                                    >
                                        <option value="">اختر المحافظة</option>
                                        {governate.map(gov => (
                                            <option key={gov.id} value={gov.id}>
                                                {gov.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <TableContainer component={Paper} className='mt-1'>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead className="table-head-style">
                            <TableRow>
                                <TableCell className="table-row" sx={{ fontSize: '18px' }}>
                                    اسم المحافظة
                                </TableCell>
                                <TableCell className="table-row" sx={{ fontSize: '18px' }}>
                                    اسم الدائرة الانتخابية
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(election) && election.length > 0 ? (
                                election.map(election => (
                                    <TableRow key={election.id}>
                                        <TableCell
                                            className="table-content"
                                            sx={{ fontSize: '18px' }}
                                        >
                                            {election.governorateName}
                                        </TableCell>

                                        <TableCell
                                            className="table-content"
                                            sx={{ fontSize: '18px' }}
                                        >
                                            {election.name}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell className="text-center" colSpan={16}>
                                        <h5>لا توجد بيانات</h5>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default ElectoralDistricts;
