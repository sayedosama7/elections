import Box from '@mui/material/Box';
import { useCallback, useEffect, useState } from 'react';
import { baseURL, ELECTORAL_DISTRIC, GOVERNATE, IncorporatedSections } from '../../Components/Api';
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

const AllSections = () => {
    const [loading, setLoading] = useState(false);
    const [sections, setSections] = useState([]);
    const [govId, setGovId] = useState('');
    const [governate, setGovernate] = useState([]);
    const [electoralsList, setElectoralsList] = useState([]);
    const [electoralId, setElectoralId] = useState('');

    const handleGovIdChange = async event => {
        const selectedGovId = event.target.value;
        setGovId(selectedGovId);
        setElectoralId('');
        if (selectedGovId) {
            await fetchElectorals(selectedGovId);
        }
    };

    const handleElectoralIdChange = async event => {
        const selectedElectoralId = event.target.value;
        setElectoralId(selectedElectoralId);

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseURL}/${ELECTORAL_DISTRIC}`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { electoralId: selectedElectoralId },
            });
            setSections(response.data.obj);
        } catch (error) {
            console.error('Error fetching filtered data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSectoins = useCallback(async () => {
        const params = {
            govId: govId || undefined,
            electoralId: electoralId || undefined,
        };
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseURL}/${IncorporatedSections}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params,
            });
            setSections(response.data.obj);
            console.log('IncorporatedSections', response.data.obj);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }, [electoralId, govId]);

    useEffect(() => {
        fetchSectoins();
    }, [fetchSectoins]);

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

    const fetchElectorals = async selectedGovId => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseURL}/${ELECTORAL_DISTRIC}`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { govId: selectedGovId },
            });
            setElectoralsList(response.data.obj);
        } catch (error) {
            console.error('Error fetching electorals:', error);
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
                        <h2 className="">الأقسام</h2>
                        <div>
                            <Link to="/add-sections">
                                <button className="btn btn-primary">اضافة قسم</button>
                            </Link>
                        </div>
                    </div>
                </Box>

                <div>
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
                                {/* الدائرة الانتخابية */}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="ElectoralId" className="d-flex mb-1">
                                        الدائرة الانتخابية
                                    </label>
                                    <select
                                        className="form-select"
                                        onChange={handleElectoralIdChange}
                                        value={electoralId}
                                        disabled={!govId}
                                    >
                                        <option value="">اختر الدائرة الانتخابية</option>
                                        {electoralsList.map(electoral => (
                                            <option key={electoral.id} value={electoral.id}>
                                                {electoral.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <TableContainer component={Paper} className="mt-2">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead className="table-head-style">
                            <TableRow>
                                <TableCell className="table-row" sx={{ fontSize: '18px' }}>
                                    اسم القسم
                                </TableCell>
                                <TableCell className="table-row" sx={{ fontSize: '18px' }}>
                                    اسم الدائرة الانتخابية
                                </TableCell>
                                <TableCell className="table-row" sx={{ fontSize: '18px' }}>
                                    اسم المحافظة
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(sections) && sections.length > 0 ? (
                                sections.map(section => (
                                    <TableRow key={section.id}>
                                        <TableCell
                                            className="table-content"
                                            sx={{ fontSize: '18px' }}
                                        >
                                            {section.name}
                                        </TableCell>

                                        <TableCell
                                            className="table-content"
                                            sx={{ fontSize: '18px' }}
                                        >
                                            {section.electroalDistrictName}
                                        </TableCell>

                                        <TableCell
                                            className="table-content"
                                            sx={{ fontSize: '18px' }}
                                        >
                                            {section.governateName}
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

export default AllSections;
