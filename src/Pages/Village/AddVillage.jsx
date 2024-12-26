import { useState } from 'react';
import axios from 'axios';
import {
    baseURL,
    ELECTORAL_DISTRIC,
    GOVERNATE,
    IncorporatedSections,
    Village_CREATE,
} from '../../Components/Api';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Box from '@mui/material/Box';
import { Loading } from '../../Components/Loading';
const AddVillage = () => {
    const [loading, setLoading] = useState(false);
    const [govId, setGovId] = useState('');
    const [governate, setGovernate] = useState([]);
    const [electorals, setElectorals] = useState([]);
    const [sections, setSections] = useState([]);
    const navigate = useNavigate();
    const [electoralDistrictId, setElectoralDistrictId] = useState('');
    const [sectionsId, setSectionsId] = useState('');
    const [village, setVillage] = useState(['']);
    const [message, setMessage] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        if (!govId || !electoralDistrictId || !sectionsId || village.some(v => !v.trim())) {
            setMessage('يجب ملء جميع الحقول.');
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const payload = {
                governateId: parseInt(govId, 10),
                electoralDistrictId: parseInt(electoralDistrictId, 10),
                id: parseInt(sectionsId, 10),
                data: village.filter(v => v.trim() !== ''),
            };

            const response = await axios.post(`${baseURL}/${Village_CREATE}`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.isSuccess) {
                navigate('/village');
                Swal.fire({
                    icon: 'success',
                    text: response.data.message,
                });
                setGovId('');
                setElectoralDistrictId('');
                setSectionsId('');
                setVillage(['']);
            } else {
                setMessage(response.data.message || 'حدث خطأ غير متوقع.');
            }
        } catch (error) {
            console.error(error.response?.data?.errors || error.message);
            setMessage('حدث خطأ أثناء الحفظ.');
        } finally {
            setLoading(false);
        }
    };

    const handleGovIdChange = event => {
        setGovId(event.target.value);
        setElectoralDistrictId('');
        setSectionsId('');
    };

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

    const handleVillageChange = (index, value) => {
        const updatedVillage = [...village];
        updatedVillage[index] = value;
        setVillage(updatedVillage);
    };

    const addVillageField = () => {
        setVillage([...village, '']);
    };

    const handleElectoralsChange = event => {
        setElectoralDistrictId(event.target.value);
    };
    const handleSectionChange = event => {
        setSectionsId(event.target.value);
    };

    const fetchElectoral = async () => {
        if (!govId) return;

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseURL}/${ELECTORAL_DISTRIC}?govId=${govId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setElectorals(response.data.obj);
        } catch (error) {
            console.error('Error fetching electorals:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSections = async () => {
        if (!govId || !electoralDistrictId) return;

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${baseURL}/${IncorporatedSections}?govId=${govId}&electoralDistrictId=${electoralDistrictId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setSections(response.data.obj);
        } catch (error) {
            console.error('Error fetching sections:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="box-container">
                {loading && <Loading />}
                <Box>
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="">اضافة قرية</h2>
                        <div>
                            <Link to="/village">
                                <button className="btn btn-primary">رجوع</button>
                            </Link>
                        </div>
                    </div>
                </Box>
            </div>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="container">
                    <div className="row">
                        {/* المحافظة */}
                        <div className="col-md-3 mb-2">
                            <label htmlFor="GovId" className="form-label mb-1">
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
                            <label htmlFor="electoralDistrictId" className="form-label mb-1">
                                الدائرة الانتخابية
                            </label>
                            <select
                                className="form-select"
                                onChange={handleElectoralsChange}
                                value={electoralDistrictId}
                                disabled={!govId}
                                onClick={fetchElectoral}
                            >
                                <option value="">اختر الدائرة الانتخابية</option>
                                {electorals.map(electoral => (
                                    <option key={electoral.id} value={electoral.id}>
                                        {electoral.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/*  الاقسام */}
                        <div className="col-md-3 mb-2">
                            <label htmlFor="sectionsId" className="form-label mb-1">
                                الاقسام
                            </label>
                            <select
                                className="form-select"
                                onChange={handleSectionChange}
                                value={sectionsId}
                                disabled={!electoralDistrictId}
                                onClick={fetchSections}
                            >
                                <option value="">اختر القسم</option>
                                {sections.map(section => (
                                    <option key={section.id} value={section.id}>
                                        {section.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* اسم القرية */}
                        <div className="row">
                            {village.map((village, index) => (
                                <div className="col-md-3 mb-2" key={index}>
                                    <label htmlFor={`village-${index}`} className="form-label mb-1">
                                        اسم القرية {index + 1}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id={`village-${index}`}
                                        value={village}
                                        onChange={e => handleVillageChange(index, e.target.value)}
                                    />
                                </div>
                            ))}
                            <div className="col-md-12 my-2">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={addVillageField}
                                >
                                    إضافة قرية جديدة
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {message && <p className="text-danger">{message}</p>}

                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary btn-lg" type="submit">
                        حفظ
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddVillage;
