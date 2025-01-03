import { useState } from 'react';
import axios from 'axios';
import {
    baseURL,
    COMMITTEE,
    ELECTION,
    ELECTORAL_DISTRIC,
    GOVERNATE,
    IncorporatedSections,
    Village,
    VOTERS_CREATE,
} from '../../Components/Api';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Box from '@mui/material/Box';
import { Loading } from '../../Components/Loading';

const AddVoter = () => {
    const [loading, setLoading] = useState(false);
    const [govId, setGovId] = useState('');
    const [governate, setGovernate] = useState([]);
    const [electorals, setElectorals] = useState([]);
    const [sections, setSections] = useState([]);
    const navigate = useNavigate();
    const [electoralDistrictId, setElectoralDistrictId] = useState('');
    const [sectionsId, setSectionsId] = useState('');
    const [village, setVillage] = useState(['']);
    const [villageId, setVillageId] = useState('');
    const [elections, setElections] = useState(['']);
    const [electionCenterId, setElectionCenterId] = useState('');
    const [commitee, setCommitee] = useState(['']);
    const [CommId, setCommId] = useState('');
    const [voters, setVoters] = useState(['']);

    const [message, setMessage] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        if (
            !govId ||
            !electoralDistrictId ||
            !sectionsId ||
            !villageId ||
            !elections ||
            !CommId ||
            voters.some(v => !v.trim())
        ) {
            setMessage('يجب ملء جميع الحقول.');
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const payload = {
                governateId: parseInt(govId, 10),
                electoralDistrictId: parseInt(electoralDistrictId, 10),
                sectionsId: parseInt(sectionsId, 10),
                villageId: parseInt(villageId, 10),
                electionCenterId: parseInt(electionCenterId, 10),
                id: parseInt(CommId, 10),
                data: voters.filter(v => v.trim() !== ''),
            };

            const response = await axios.post(`${baseURL}/${VOTERS_CREATE}`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.isSuccess) {
                navigate('/all-voters');
                Swal.fire({
                    icon: 'success',
                    text: response.data.message,
                });
                setGovId('');
                setElectoralDistrictId('');
                setSectionsId('');
                setVillage('');
                setElections('');
                setCommitee('');
                setVoters(['']);
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
        setVillageId('');
        setCommId('');
        setElectionCenterId('');
        setElectorals([]);
        setSections([]);
        setVillage([]);
        setElections([]);
        setCommitee([]);
    };

    const handleVotersChange = (index, value) => {
        const updatedVoters = [...voters];
        updatedVoters[index] = value;
        setVoters(updatedVoters);
    };

    const addVotersField = () => {
        setVoters([...voters, '']);
    };

    const handleElectoralsChange = event => {
        setElectoralDistrictId(event.target.value);
    };
    const handleSectionChange = event => {
        setSectionsId(event.target.value);
    };
    const handleVillageChange = event => {
        setVillageId(event.target.value);
    };
    const handleElectionChange = event => {
        setElectionCenterId(event.target.value);
    };
    const handleCommitteeChange = event => {
        setCommId(event.target.value);
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

    const fetchVillage = async () => {
        if (!govId || !electoralDistrictId || !sectionsId) return;

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${baseURL}/${Village}?govId=${govId}&electoralDistrictId=${electoralDistrictId}&sectionsId=${sectionsId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setVillage(Array.isArray(response.data.obj) ? response.data.obj : []);
        } catch (error) {
            console.error('Error fetching villages:', error);
            setVillage([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchElectionCenter = async () => {
        if (!govId || !electoralDistrictId || !sectionsId || !villageId) return;

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${baseURL}/${ELECTION}?govId=${govId}&electoralDistrictId=${electoralDistrictId}&sectionsId=${sectionsId}&villageId=${villageId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setElections(Array.isArray(response.data.obj) ? response.data.obj : []);
        } catch (error) {
            console.error('Error fetching elections:', error);
            setCommitee([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchCommittee = async () => {
        if (!govId || !electoralDistrictId || !sectionsId || !villageId || !electionCenterId)
            return;

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${baseURL}/${COMMITTEE}?govId=${govId}&electoralDistrictId=${electoralDistrictId}&sectionsId=${sectionsId}&villageId=${villageId}&electionCenterId=${electionCenterId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setCommitee(Array.isArray(response.data.obj) ? response.data.obj : []);
        } catch (error) {
            console.error('Error fetching Committee:', error);
            setVoters([]);
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
                        <h2 className="">اضافة ناخب</h2>
                        <div>
                            <Link to="/all-voters">
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

                        {/*  القري */}
                        <div className="col-md-3 mb-2">
                            <label htmlFor="villageId" className="form-label mb-1">
                                القري
                            </label>
                            <select
                                className="form-select"
                                onChange={handleVillageChange}
                                value={villageId}
                                disabled={!sectionsId}
                                onClick={fetchVillage}
                            >
                                <option value="">اختر القرية</option>
                                {Array.isArray(village) &&
                                    village.map((villageItem, index) => (
                                        <option
                                            key={villageItem.id || index}
                                            value={villageItem.id}
                                        >
                                            {villageItem.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        {/*  اسم المقر الانتخابي */}
                        <div className="col-md-3 mb-2">
                            <label htmlFor="electionCenterId" className="form-label mb-1">
                                المقر الانتخابي
                            </label>
                            <select
                                className="form-select"
                                onChange={handleElectionChange}
                                value={electionCenterId}
                                disabled={!villageId}
                                onClick={fetchElectionCenter}
                            >
                                <option value="">اختر المقر</option>
                                {Array.isArray(village) &&
                                    elections.map((election, index) => (
                                        <option key={election.id || index} value={election.id}>
                                            {election.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        {/*  اسم  اللجنة */}
                        <div className="col-md-3 mb-2">
                            <label htmlFor="CommId" className="form-label mb-1">
                                اللجنة
                            </label>
                            <select
                                className="form-select"
                                onChange={handleCommitteeChange}
                                value={CommId}
                                disabled={!electionCenterId}
                                onClick={fetchCommittee}
                            >
                                <option value="">اختر اللجنة</option>
                                {Array.isArray(commitee) &&
                                    commitee.map((c, index) => (
                                        <option key={c.id || index} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {/* اسم اللجنة */}
                        <div className="row">
                            {voters.map((voter, index) => (
                                <div className="col-md-3 mb-2" key={index}>
                                    <label htmlFor={`voter-${index}`} className="form-label mb-1">
                                        اسم الناخب {index + 1}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id={`voter-${index}`}
                                        value={voter}
                                        onChange={e => handleVotersChange(index, e.target.value)}
                                    />
                                </div>
                            ))}

                            {/* إضافة زر إضافة ناخب جديد */}
                            <div className="col-md-12 my-2">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={addVotersField}
                                >
                                    إضافة ناخب جديد
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

export default AddVoter;
