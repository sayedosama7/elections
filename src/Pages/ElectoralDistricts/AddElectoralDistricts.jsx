/* eslint-disable no-unused-vars */
import Box from '@mui/material/Box';
import { useState } from 'react';
import { Loading } from '../../Components/Loading';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseURL, ELECTORAL_DISTRIC_CREATE, GOVERNATE } from '../../Components/Api';
import Swal from 'sweetalert2';

const AddElectoralDistricts = () => {
    const [loading, setLoading] = useState(false);
    const [governate, setGovernate] = useState([]);
    const [govId, setGovId] = useState('');
    const [electoralDistricts, setElectoralDistricts] = useState(['']);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

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

    const handleGovIdChange = event => {
        setGovId(event.target.value);
    };

    const handleElectoralDistrictChange = (index, value) => {
        const updatedDistricts = [...electoralDistricts];
        updatedDistricts[index] = value;
        setElectoralDistricts(updatedDistricts);
    };

    const addDistrictField = () => {
        setElectoralDistricts([...electoralDistricts, '']);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!govId || electoralDistricts.some(district => !district.trim())) {
            setMessage('يجب ملء جميع الحقول.');
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const payload = {
                governateId: parseInt(govId, 10),
                electoralDistrict: electoralDistricts,
            };

            const response = await axios.post(`${baseURL}/${ELECTORAL_DISTRIC_CREATE}`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.isSuccess) {
                navigate('/electoral-districts');
                Swal.fire({
                    icon: 'success',
                    text: response.data.message,
                });
                setGovId('');
                setElectoralDistricts(['']);
            } else {
                setError(response.data.errors || {});
                setMessage(response.data.message || 'حدث خطأ غير متوقع.');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setError(error.response.data.errors);
            }
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
                        <h2 className="">الدوائر الانتخابية</h2>
                        <div>
                            <Link to="/electoral-districts">
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
                    </div>
                    <div className="row">
                        {electoralDistricts.map((district, index) => (
                            <div className="col-md-3 mb-2" key={index}>
                                <label htmlFor={`district-${index}`} className="form-label mb-1">
                                    اسم الدائرة {index + 1}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id={`district-${index}`}
                                    value={district}
                                    onChange={e =>
                                        handleElectoralDistrictChange(index, e.target.value)
                                    }
                                />
                            </div>
                        ))}

                        <div className="col-md-12 my-2">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={addDistrictField}
                            >
                                إضافة دائرة جديدة
                            </button>
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

export default AddElectoralDistricts;
