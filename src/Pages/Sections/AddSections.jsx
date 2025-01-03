import { useState } from 'react';
import axios from 'axios';
import {
    baseURL,
    ELECTORAL_DISTRIC,
    GOVERNATE,
    IncorporatedSections_CREATE,
} from '../../Components/Api';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Box from '@mui/material/Box';
import { Loading } from '../../Components/Loading';
const AddSections = () => {
    const [loading, setLoading] = useState(false);
    const [govId, setGovId] = useState('');
    const [governate, setGovernate] = useState([]);
    const [electorals, setElectorals] = useState([]);
    const [electoralDistrictId, setElectoralDistrictId] = useState('');
    const [sections, setSections] = useState(['']);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async e => {
        e.preventDefault();

        if (!govId || !electoralDistrictId || sections.some(section => !section.trim())) {
            setMessage('يجب ملء جميع الحقول.');
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const payload = {
                governateId: parseInt(govId, 10),
                electoralDistrictId: electoralDistrictId,
                sections: sections.filter(section => section.trim() !== ''),
            };

            const response = await axios.post(
                `${baseURL}/${IncorporatedSections_CREATE}`,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.isSuccess) {
                navigate('/sections');
                Swal.fire({
                    icon: 'success',
                    text: response.data.message,
                });
                setGovId('');
                setElectoralDistrictId('');
                setSections(['']);
            } else {
                setMessage(response.data.message || 'حدث خطأ غير متوقع.');
            }
        } catch (error) {
            console.error(error.response.data.errors);
        } finally {
            setLoading(false);
        }
    };

    const handleGovIdChange = event => {
        setGovId(event.target.value);
        setElectoralDistrictId('');
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

    const handleSectionsChange = (index, value) => {
        const updatedDistricts = [...sections];
        updatedDistricts[index] = value;
        setSections(updatedDistricts);
    };

    const addSectionField = () => {
        setSections([...sections, '']);
    };

    const handleElectoralsChange = event => {
        setElectoralDistrictId(event.target.value);
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

    return (
        <div>
            <div className="box-container">
                {loading && <Loading />}
                <Box>
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="">اضافة قسم</h2>
                        <div>
                            <Link to="/sections">
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

                        {/* اسم القسم */}
                        <div className="row">
                            {sections.map((section, index) => (
                                <div className="col-md-3 mb-2" key={index}>
                                    <label htmlFor={`section-${index}`} className="form-label mb-1">
                                        اسم القسم {index + 1}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id={`section-${index}`}
                                        value={section}
                                        onChange={e => handleSectionsChange(index, e.target.value)}
                                    />
                                </div>
                            ))}
                            <div className="col-md-12 my-2">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={addSectionField}
                                >
                                    إضافة قسم جديدة
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

export default AddSections;
