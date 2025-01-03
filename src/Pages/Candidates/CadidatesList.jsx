import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Loading } from '../../Components/Loading';
import { baseURL, ELECTORAL_DISTRIC, GOVERNATE, IMG_URL } from '../../Components/Api';
import { useGetCanditatesQuery } from '../../store/FetchCanditate';
import { useState } from 'react';
import axios from 'axios';

const CandidatesList = () => {
    const [govId, setGovId] = useState('');
    const [electoralId, setElectoralId] = useState('');
    const [governate, setGovernate] = useState([]);
    const [electoralsList, setElectoralsList] = useState([]);
    const [loadingGovernate, setLoadingGovernate] = useState(false);
    const [loadingElectoral, setLoadingElectoral] = useState(false);

    const fetchGovernate = async () => {
        if (governate.length > 0) return;
        setLoadingGovernate(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseURL}/${GOVERNATE}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setGovernate(response.data.obj);
        } catch (error) {
            console.error('Error fetching governate:', error);
        } finally {
            setLoadingGovernate(false);
        }
    };

    const fetchElectoral = async selectedGovId => {
        setLoadingElectoral(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseURL}/${ELECTORAL_DISTRIC}`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { govId: selectedGovId },
            });
            setElectoralsList(response.data.obj);
        } catch (error) {
            console.error('Error fetching electorals:', error);
        } finally {
            setLoadingElectoral(false);
        }
    };

    const handleGovIdChange = async event => {
        const selectedGovId = event.target.value || 0;
        setGovId(selectedGovId);
        setElectoralId(0);
        if (selectedGovId) {
            await fetchElectoral(selectedGovId);
        }
    };

    const handleElectoralIdChange = e => {
        setElectoralId(e.target.value);
    };

    const fetchDataParams = {
        govId: govId || 0,
        electoralId: electoralId || 0,
    };
    const { data, error, isLoading } = useGetCanditatesQuery(fetchDataParams);

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <div>حدث خطأ أثناء تحميل البيانات: {error.message}</div>;
    }

    const type = {
        1: 'ذكر',
        2: 'انثي',
    };

    return (
        <div>
            <div>
                <form action="">
                    <div className="container">
                        <div className="row">
                            {/* المحافظة */}
                            <div className="col-md-3 mb-2">
                                <label htmlFor="GovId" className="d-flex mb-1">
                                    المحافظة
                                </label>
                                {loadingGovernate ? (
                                    <Loading /> // يمكن استخدام مكون تحميل
                                ) : (
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
                                )}
                            </div>
                            {/* الدائرة الانتخابية */}
                            <div className="col-md-3 mb-2">
                                <label htmlFor="ElectoralId" className="d-flex mb-1">
                                    الدائرة الانتخابية
                                </label>
                                {loadingElectoral ? (
                                    <Loading /> // يمكن استخدام مكون تحميل
                                ) : (
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
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead className="table-head-style">
                        <TableRow>
                            <TableCell className="table-row">صورة المرشح</TableCell>
                            <TableCell className="table-row">اسم المرشح</TableCell>
                            <TableCell className="table-row">اسم الشهرة</TableCell>
                            <TableCell className="table-row">اسم الحزب</TableCell>
                            <TableCell className="table-row">اسم المجلس</TableCell>
                            <TableCell className="table-row">الدائرة الانتخابية</TableCell>
                            <TableCell className="table-row">سنة الانتخاب</TableCell>
                            <TableCell className="table-row">السن</TableCell>
                            <TableCell className="table-row">تاريخ الميلاد</TableCell>
                            <TableCell className="table-row">الرقم القومي</TableCell>
                            <TableCell className="table-row">النوع</TableCell>
                            <TableCell className="table-row">رقم الهاتف</TableCell>
                            <TableCell className="table-row">الايميل</TableCell>
                            <TableCell className="table-row">المؤهل الوظيفي</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(data?.obj) && data.obj.length > 0 ? (
                            data.obj.map(canditate => (
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
