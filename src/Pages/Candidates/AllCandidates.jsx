import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import CandidatesList from './CadidatesList';
import { Loading } from '../../Components/Loading';
import axios from 'axios';
import { baseURL, ELECTORAL_DISTRIC, GOVERNATE } from '../../Components/Api';
import { useGetCanditatesQuery } from '../../store/FetchCanditate';

const AllCandidates = () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [governate, setGovernate] = useState([]);
    const [electorals, setElectorals] = useState([]);
    const [govId, setGovId] = useState('');
    const [errors, setErrors] = useState(false);
    const [candidateData, setCandidateData] = useState({
        name: '',
        canditateNickname: '',
        coubcilName: '',
        partyName: '',
        coded: '',
        yearOFelection: '',
        dateOfBirth: '',
        nationalId: '',
        phoneNumber: '',
        ageAtNomination: '',
        email: '',
        jobQualification: '',
        currentJob: '',
        gender: '',
        electoralDistrictId: '',
    });

    const fetchGovernate = async () => {
        if (governate.length > 0) return;
        try {
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

    const fetchElectoral = async govId => {
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

    const handleImageChange = e => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setCandidateData(prevData => ({
                ...prevData,
                [name]: files[0],
            }));
        } else {
            setCandidateData(prevData => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!candidateData.canditateNickname) newErrors.canditateNickname = 'الرجاء إدخال اللقب.';
        if (!candidateData.gender) newErrors.gender = 'الرجاء اختيار الجنس.';
        if (!candidateData.currentJob) newErrors.currentJob = 'الرجاء إدخال الوظيفة الحالية.';
        if (!candidateData.electoralDistrictId)
            newErrors.electoralDistrictId = 'الرجاء اختيار الدائرة الانتخابية.';
        if (!candidateData.name) newErrors.name = 'الرجاء إدخال الاسم.';
        if (!govId) newErrors.govId = 'الرجاء اختيار المحافظة.';

        if (!candidateData.nationalId || candidateData.nationalId.length !== 14) {
            newErrors.nationalId = 'الرجاء إدخال 14 رقمًا.';
        }

        if (!candidateData.yearOFelection) {
            newErrors.yearOFelection = 'الرجاء إدخال سنة الانتخابات.';
        } else if (!/^\d{4}$/.test(candidateData.yearOFelection)) {
            newErrors.yearOFelection = 'الرجاء إدخال سنة مكونة من 4 أرقام.';
        }

        if (!candidateData.partyName) newErrors.partyName = 'الرجاء إدخال اسم الحزب.';
        if (!candidateData.coubcilName) newErrors.coubcilName = 'الرجاء إدخال اسم المجلس.';
        if (!candidateData.jobQualification) newErrors.jobQualification = 'الرجاء إدخال المؤهل.';
        if (
            !candidateData.ageAtNomination ||
            isNaN(candidateData.ageAtNomination) ||
            candidateData.ageAtNomination <= 0
        ) {
            newErrors.ageAtNomination = 'الرجاء إدخال العمر كرقم صحيح أكبر من صفر.';
        }

        if (!candidateData.phoneNumber) {
            newErrors.phoneNumber = 'الرجاء إدخال رقم الهاتف.';
        } else if (!/^\d{11}$/.test(candidateData.phoneNumber)) {
            newErrors.phoneNumber = 'الرجاء إدخال رقم هاتف مكون من 11 أرقام.';
        }
        if (!candidateData.dateOfBirth) newErrors.dateOfBirth = 'الرجاء إدخال تاريخ الميلاد.';
        if (!candidateData.image) newErrors.image = 'الرجاء تحميل صورة المرشح.';
        if (!candidateData.email) newErrors.email = 'الرجاء إدخال البريد الإلكتروني.';
        if (!candidateData.coded) newErrors.coded = 'الرجاء إدخال الرمز الانتخابي   .';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCandidateData({ ...candidateData, [name]: value });
        setErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            if (name === 'nationalId' || value.length === 14) {
                delete newErrors.nationalId;
            }
            if (name === 'govId' && value) {
                delete newErrors.govId;
            }
            if (value) {
                delete newErrors[name];
            }
            return newErrors;
        });
    };

    const { isLoading, refetch } = useGetCanditatesQuery();
    
    const handleSaveCandidate = async () => {
        if (!validateForm()) {
            return;
        }
        try {
            setLoading(true);

            const formData = new FormData();
            formData.append('CanditateNickname', candidateData.canditateNickname || '');
            formData.append('Gender', candidateData.gender || '');
            formData.append('CurrentJob', candidateData.currentJob || '');
            formData.append('ElectoralDistrictId', candidateData.electoralDistrictId || '');
            formData.append('Name', candidateData.name || '');
            formData.append('NationalId', candidateData.nationalId || '');
            formData.append('YearOFelection', candidateData.yearOFelection || '');
            formData.append('PartyName', candidateData.partyName || '');
            formData.append('JobQualification', candidateData.jobQualification || '');
            formData.append('AgeAtNomination', candidateData.ageAtNomination || '');
            formData.append('PhoneNumber', candidateData.phoneNumber || '');
            formData.append('Coded', candidateData.coded || '');
            formData.append('CoubcilName', candidateData.coubcilName || '');
            formData.append('DateOfBirth', candidateData.dateOfBirth || '');
            formData.append('Image', candidateData.image || '');
            formData.append('Email', candidateData.email || '');
            formData.append('govId', govId || '');
            console.log(candidateData);

            const token = localStorage.getItem('token');

            const response = await axios.post(`${baseURL}/Auth/AddCanditate`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Candidate added successfully:', response.data);
            refetch();
            handleClose();
        } catch (error) {
            console.error('Error adding candidate:', error);
            alert('حدث خطأ أثناء إضافة المرشح. يرجى التحقق من البيانات والمحاولة مرة أخرى.');
        } finally {
            setLoading(false);
        }
    };

    const handleGovIdChange = event => {
        const selectedGovId = event.target.value;
        setGovId(selectedGovId);
        if (selectedGovId) {
            fetchElectoral(selectedGovId);
        }
    };

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <div className="box-container">
                {isLoading && <Loading />}
                
                <Box>
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="">المرشحين</h2>
                        <div>
                            <button className="btn btn-primary" onClick={handleClickOpen}>
                                اضافة مرشح
                            </button>
                        </div>
                    </div>
                    <CandidatesList />
                </Box>
            </div>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    اضافة مرشح
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={theme => ({
                        position: 'absolute',
                        left: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    <DialogContent>
                        <div className="container">
                            <div className="row">
                                {/* اسم المرشح */}
                                <div className="col-md-3 mb-2">
                                    <label>اسم المرشح</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={candidateData.name}
                                        onChange={handleInputChange}
                                    />
                                    {errors.name && <div className="error">{errors.name}</div>}
                                </div>
                                {/* اسم الشهرة */}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="canditateNickname" className="d-flex mb-1">
                                        اسم الشهرة
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="canditateNickname"
                                        value={candidateData.canditateNickname}
                                        onChange={handleInputChange}
                                    />
                                    {errors.canditateNickname && (
                                        <div className="error">{errors.canditateNickname}</div>
                                    )}
                                </div>
                                {/* اسم المجلس */}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="coubcilName" className="d-flex mb-1">
                                        اسم المجلس
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="coubcilName"
                                        value={candidateData.coubcilName}
                                        onChange={handleInputChange}
                                    />
                                    {errors.coubcilName && (
                                        <div className="error">{errors.coubcilName}</div>
                                    )}
                                </div>
                                {/* اسم الحزب */}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="partyName" className="d-flex mb-1">
                                        اسم الحزب
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="partyName"
                                        value={candidateData.partyName}
                                        onChange={handleInputChange}
                                    />
                                    {errors.partyName && (
                                        <div className="error">{errors.partyName}</div>
                                    )}
                                </div>
                                {/* الرمز الانتخابي*/}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="coded" className="d-flex mb-1">
                                        الرمز الانتخابي
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="coded"
                                        value={candidateData.coded}
                                        onChange={handleInputChange}
                                    />
                                    {errors.coded && <div className="error">{errors.coded}</div>}
                                </div>
                                {/* سنة الانتخاب*/}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="yearOFelection" className="d-flex mb-1">
                                        سنة الانتخاب
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="yearOFelection"
                                        value={candidateData.yearOFelection}
                                        onChange={handleInputChange}
                                    />
                                    {errors.yearOFelection && (
                                        <div className="error">{errors.yearOFelection}</div>
                                    )}
                                </div>
                                {/* سنة الانتخاب*/}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="dateOfBirth" className="d-flex mb-1">
                                        تاريخ الميلاد
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="dateOfBirth"
                                        value={candidateData.dateOfBirth}
                                        onChange={handleInputChange}
                                    />
                                    {errors.dateOfBirth && (
                                        <div className="error">{errors.dateOfBirth}</div>
                                    )}
                                </div>
                                {/* الرقم القومي*/}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="nationalId" className="d-flex mb-1">
                                        الرقم القومي
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nationalId"
                                        value={candidateData.nationalId}
                                        onChange={handleInputChange}
                                    />
                                    {errors.nationalId && (
                                        <div className="error">{errors.nationalId}</div>
                                    )}
                                </div>
                                {/* الرقم */}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="phoneNumber" className="d-flex mb-1">
                                        رقم الهاتف
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phoneNumber"
                                        value={candidateData.phoneNumber}
                                        onChange={handleInputChange}
                                    />
                                    {errors.phoneNumber && (
                                        <div className="error">{errors.phoneNumber}</div>
                                    )}
                                </div>
                                {/* السن عند الترشح*/}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="ageAtNomination" className="d-flex mb-1">
                                        السن عند الترشح
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="ageAtNomination"
                                        value={candidateData.ageAtNomination}
                                        onChange={handleInputChange}
                                    />
                                    {errors.ageAtNomination && (
                                        <div className="error">{errors.ageAtNomination}</div>
                                    )}
                                </div>
                                {/* الايميل*/}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="email" className="d-flex mb-1">
                                        البريد الالكتروني
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={candidateData.email}
                                        onChange={handleInputChange}
                                    />
                                    {errors.email && <div className="error">{errors.email}</div>}
                                </div>
                                {/* المؤهل الوظيفي*/}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="jobQualification" className="d-flex mb-1">
                                        المؤهل الوظيفي
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="jobQualification"
                                        value={candidateData.jobQualification}
                                        onChange={handleInputChange}
                                    />
                                    {errors.jobQualification && (
                                        <div className="error">{errors.jobQualification}</div>
                                    )}
                                </div>
                                {/* الوظيفة الحالية*/}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="currentJob" className="d-flex mb-1">
                                        الوظيفة الحالية
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="currentJob"
                                        value={candidateData.currentJob}
                                        onChange={handleInputChange}
                                    />
                                    {errors.currentJob && (
                                        <div className="error">{errors.currentJob}</div>
                                    )}
                                </div>
                                {/* النوع  */}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="gender" className="d-flex mb-1">
                                        النوع
                                    </label>
                                    <select
                                        className="form-select"
                                        name="gender"
                                        value={candidateData.gender}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">اختر النوع</option>
                                        <option value="1">ذكر</option>
                                        <option value="2">انثي</option>
                                    </select>
                                    {errors.gender && <div className="error">{errors.gender}</div>}
                                </div>
                                {/* اسم المحافظة */}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="govId" className="form-label mb-1">
                                        المحافظة
                                    </label>
                                    <select
                                        className="form-select"
                                        name="govId"
                                        value={govId}
                                        onChange={handleGovIdChange}
                                        onClick={fetchGovernate}
                                    >
                                        <option value="">اختر المحافظة</option>
                                        {governate.map(gov => (
                                            <option key={gov.id} value={gov.id}>
                                                {gov.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.govId && <div className="error">{errors.govId}</div>}
                                </div>

                                {/* الدائرة الانتخابية */}
                                <div className="col-md-3 mb-2">
                                    <label
                                        htmlFor="electoralDistrictId"
                                        className="form-label mb-1"
                                    >
                                        الدائرة الانتخابية
                                    </label>
                                    <select
                                        className="form-select"
                                        name="electoralDistrictId"
                                        value={candidateData.electoralDistrictId}
                                        onChange={handleInputChange}
                                        disabled={!govId}
                                    >
                                        <option value="">اختر الدائرة الانتخابية</option>
                                        {electorals.map(electoral => (
                                            <option key={electoral.id} value={electoral.id}>
                                                {electoral.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.electoralDistrictId && (
                                        <div className="error">{errors.electoralDistrictId}</div>
                                    )}
                                </div>

                                {/* صورة المرشح*/}
                                <div className="col-md-4 mb-2">
                                    <label htmlFor="image" className="d-flex mb-1">
                                        صورة المرشح
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="image"
                                        onChange={handleImageChange}
                                    />
                                    {errors.image && <div className="error">{errors.image}</div>}
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </DialogContent>
                <DialogActions>
                    <button
                        className="btn btn-primary"
                        onClick={handleSaveCandidate}
                        disabled={loading}
                    >
                        {loading ? 'جارٍ الحفظ...' : 'حفظ'}
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AllCandidates;
