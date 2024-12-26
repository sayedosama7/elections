import { useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { ADD_USER, baseURL } from '../../Components/Api';
import { Loading } from '../../Components/Loading';
import Swal from 'sweetalert2';

const AddUsers = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        userName: '',
        phoneNumber: '',
        nationalId: '',
        password: '',
        roleId: '',
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        setMessage('');

        const newErrors = {};
        if (!formData.name) newErrors.name = ['الاسم مطلوب'];
        if (!formData.userName) newErrors.userName = ['اسم المستخدم مطلوب'];
        if (!formData.phoneNumber) {
            newErrors.phoneNumber = ['رقم الهاتف مطلوب'];
        } else if (!/^\d+$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = ['رقم الهاتف يجب أن يحتوي على أرقام فقط'];
        }
        if (!formData.nationalId) {
            newErrors.nationalId = ['الرقم القومي مطلوب'];
        } else if (!/^\d{14}$/.test(formData.nationalId)) {
            newErrors.nationalId = ['الرقم القومي يجب أن يتكون من 14 رقمًا فقط'];
        }
        if (!formData.password) {
            newErrors.password = ['الرقم السري مطلوب'];
        } else if (formData.password.length < 6) {
            newErrors.password = ['الرقم السري يجب أن يكون أطول من 6 أحرف'];
        }
        if (!formData.roleId) newErrors.roleId = ['نوع المستخدم مطلوب'];

        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return;
        }

        const roleMap = {
            Admin: 1,
            Employee: 2,
        };

        const payload = {
            name: formData.name,
            userName: formData.userName,
            phoneNumber: formData.phoneNumber,
            nationalId: formData.nationalId,
            password: formData.password,
            roleId: roleMap[formData.roleId] || 0,
        };

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseURL}/${ADD_USER}`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            setMessage(response.data.message);
            if (response.data.isSuccess) {
                Swal.fire({
                    icon: 'success',
                    text: response.data.message,
                });
            } else {
                setError(response.data.errors || {});
                setMessage(response.data.message || 'حدث خطأ غير متوقع.');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setError(error.response.data.errors);
            } else {
                setMessage('حدث خطأ أثناء إضافة المستخدم');
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
                        <h2 className="mb-5">اضافة مستخدم</h2>
                    </div>
                </Box>
            </div>

            <form action="">
                <div className="container">
                    <div className="row">
                        {/* الاسم */}
                        <div className="col-md-4 mb-3">
                            <div className="form-group">
                                <label htmlFor="name" className="mb-2">
                                    الاسم
                                </label>
                                <input
                                    type="text"
                                    // className={`form-control ${
                                    //     error.name ? 'is-invalid' : ''
                                    // }`}
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                {error.name && (
                                    <div className="text-danger mt-1">{error.name[0]}</div>
                                )}
                            </div>
                        </div>

                        {/* اسم المستخدم */}
                        <div className="col-md-4 mb-3">
                            <div className="form-group">
                                <label htmlFor="userName" className="mb-2">
                                    اسم المستخدم
                                </label>
                                <input
                                    type="text"
                                    // className={`form-control ${
                                    //     error.userName ? 'is-invalid' : ''
                                    // }`}
                                    className="form-control"
                                    id="userName"
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleChange}
                                />
                                {error.userName && (
                                    <div className="text-danger mt-1">{error.userName[0]}</div>
                                )}
                            </div>
                        </div>

                        {/* الهاتف */}
                        <div className="col-md-4 mb-3">
                            <div className="form-group">
                                <label htmlFor="phoneNumber" className="mb-2">
                                    رقم الهاتف
                                </label>
                                <input
                                    type="text"
                                    // className={`form-control ${
                                    //     error.phoneNumber ? 'is-invalid' : ''
                                    // }`}
                                    className="form-control"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                                {error.phoneNumber && (
                                    <div className="text-danger mt-1">{error.phoneNumber[0]}</div>
                                )}
                            </div>
                        </div>

                        {/* الرقم القومي */}
                        <div className="col-md-4 mb-3">
                            <div className="form-group">
                                <label htmlFor="nationalId" className="mb-2">
                                    الرقم القومي
                                </label>
                                <input
                                    type="text"
                                    // className={`form-control ${
                                    //     error.nationalId ? 'is-invalid' : ''
                                    // }`}
                                    className="form-control"
                                    id="nationalId"
                                    name="nationalId"
                                    value={formData.nationalId}
                                    onChange={handleChange}
                                />
                                {error.nationalId && (
                                    <div className="text-danger mt-1">{error.nationalId[0]}</div>
                                )}
                            </div>
                        </div>

                        {/* الرقم السري */}
                        <div className="col-md-4 mb-3">
                            <div className="form-group">
                                <label htmlFor="password" className="mb-2">
                                    الرقم السري
                                </label>
                                <input
                                    type="password"
                                    // className={`form-control ${
                                    //     error.password ? 'is-invalid' : ''
                                    // }`}
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {error.password && (
                                    <div className="text-danger mt-1">{error.password[0]}</div>
                                )}
                            </div>
                        </div>

                        {/* نوع المستخدم */}
                        <div className="col-md-4 mb-3">
                            <div className="form-group">
                                <label htmlFor="password" className="mb-2">
                                    اختر النوع
                                </label>
                                <select
                                    id="roleId"
                                    name="roleId"
                                    value={formData.roleId}
                                    onChange={handleChange}
                                    // className={`form-select ${
                                    //     error.password ? 'is-invalid' : ''
                                    // }`}
                                    className="form-select"
                                    size="small"
                                >
                                    <option value="">اختر النوع</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Employee">Employee</option>
                                </select>
                                {error.roleId && (
                                    <div className="text-danger mt-1">{error.roleId[0]}</div>
                                )}
                            </div>
                        </div>
                        {message && (
                            <div className={`alert ${error ? 'alert-danger' : 'alert-success'}`}>
                                {message}
                            </div>
                        )}
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-primary" onClick={handleSubmit}>
                                اضافة
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddUsers;
