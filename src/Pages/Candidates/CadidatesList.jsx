import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Loading } from '../../Components/Loading';
import { useEffect, useState } from 'react';
import { baseURL, CANDITATES, IMG_URL } from '../../Components/Api';
import axios from 'axios';

const CandidatesList = () => {
    const [loading, setLoading] = useState(false);
    const [canditates, setCanditates] = useState([]);

    const fetchCanditates = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseURL}/${CANDITATES}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCanditates(response.data.obj);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCanditates();
    }, []);

    const type = {
        1: 'ذكر',
        2: 'انثي',
    };

    return (
        <div>
            {loading && <Loading />}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead className="table-head-style">
                        <TableRow>
                            <TableCell className="table-row">صورة المرشح</TableCell>
                            <TableCell className="table-row">اسم المرشح</TableCell>
                            <TableCell className="table-row">اسم الشهرة</TableCell>
                            <TableCell className="table-row">اسم الحزب</TableCell>
                            <TableCell className="table-row">اسم المجلس</TableCell>
                            <TableCell className="table-row">اسم الدائرة الانتخابية</TableCell>
                            <TableCell className="table-row">سنة الانتخاب</TableCell>
                            <TableCell className="table-row">السن عند الترشيح</TableCell>
                            <TableCell className="table-row">تاريخ الميلاد</TableCell>
                            <TableCell className="table-row">الرقم القومي</TableCell>
                            <TableCell className="table-row">النوع</TableCell>
                            <TableCell className="table-row">رقم الهاتف</TableCell>
                            <TableCell className="table-row">الايميل</TableCell>
                            <TableCell className="table-row">المؤهل الوظيفي</TableCell>
                            {/* <TableCell className="table-row">الوظيفة الحالية</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(canditates) && canditates.length > 0 ? (
                            canditates.map(canditate => (
                                <TableRow key={canditate.id}>
                                    <TableCell className="table-content">
                                        {canditate.imageUrl ? (
                                            <img
                                                style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    objectFit: 'cover',
                                                    borderRadius: '50%',
                                                }}
                                                src={`${IMG_URL}${canditate.imageUrl}`}
                                                alt={canditate.name || 'canditate-image'}
                                            />
                                        ) : (
                                            <span style={{ color: 'gray', fontSize: '16px' }}>
                                                بدون صورة
                                            </span>
                                        )}
                                    </TableCell>

                                    <TableCell className="table-content">
                                        {canditate.name}
                                    </TableCell>

                                    <TableCell className="table-content">
                                        {canditate.canditateNickname}
                                    </TableCell>

                                    <TableCell className="table-content">
                                        {canditate.partyName}
                                    </TableCell>

                                    <TableCell className="table-content">
                                        {canditate.councilName}
                                    </TableCell>

                                    <TableCell className="table-content">
                                        {canditate.electoralDistrictName}
                                    </TableCell>

                                    <TableCell className="table-content">
                                        {canditate.yearOFelection}
                                    </TableCell>

                                    <TableCell className="table-content">
                                        {canditate.ageAtNomination}
                                    </TableCell>

                                    <TableCell className="table-content">
                                        {new Date(canditate.dateOfBirth).toLocaleDateString()}
                                    </TableCell>

                                    <TableCell className="table-content">
                                        {canditate.nationalId}
                                    </TableCell>

                                    <TableCell className="table-content">
                                        {type[canditate.gender]}
                                    </TableCell>

                                    <TableCell className="table-content">
                                        {canditate.phoneNumber}
                                    </TableCell>

                                    <TableCell className="table-content">
                                        {canditate.email}
                                    </TableCell>

                                    <TableCell className="table-content">
                                        {canditate.jobQualification}
                                    </TableCell>

                                    {/* <TableCell className="table-content">
                                        {canditate.currentJob}
                                    </TableCell> */}
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
    );
};

export default CandidatesList;
