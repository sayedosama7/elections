import Box from '@mui/material/Box';
import { useCallback, useEffect, useState } from 'react';
import {
    baseURL,
    COMMITTEE,
    ELECTION,
    ELECTORAL_DISTRIC,
    GOVERNATE,
    IncorporatedSections,
    Village,
    VOTERS,
} from '../../Components/Api';
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
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const AllVoter = () => {
    const [loading, setLoading] = useState(false);
    const [sections, setSections] = useState([]);
    const [sectionsId, setSectionsId] = useState('');
    const [govId, setGovId] = useState('');
    const [governate, setGovernate] = useState([]);
    const [electoralsList, setElectoralsList] = useState([]);
    const [electoralId, setElectoralId] = useState('');
    const [village, setVillage] = useState([]);
    const [villageId, setVillageId] = useState('');
    const [elections, setElections] = useState('');
    const [electionCenterId, setElectionCenterId] = useState('');
    const [commitee, setCommitee] = useState([]);
    const [CommId, setCommId] = useState('');
    const [voters, setVoters] = useState([]);

    const handleGovIdChange = async event => {
        const selectedGovId = event.target.value;
        setGovId(selectedGovId);
        setElectoralId('');
        setElectoralsList([]);
        setSectionsId('');
        setSections([]);
        setVillageId('');
        setVillage([]);
        setElectionCenterId('');
        setElections([]);
        setCommId('');
        setCommitee([]);

        if (selectedGovId) {
            await fetchElectorals(selectedGovId);
        }
    };

    const handleElectoralIdChange = async event => {
        const selectedElectoralId = event.target.value;
        setElectoralId(selectedElectoralId);
        setSections([]);
        setSectionsId('');

        if (selectedElectoralId) {
            await fetchSections(selectedElectoralId);
        }
    };

    const handleCommitteeChange = async event => {
        const selectedCommId = event.target.value;
        setCommId(selectedCommId);

        if (!selectedCommId) {
            setCommitee([]);
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseURL}/${COMMITTEE}`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { electionCenterId: selectedCommId },
            });
            const committeeData = response.data.obj || [];
            setCommitee(Array.isArray(committeeData) ? committeeData : []);
            console.log('Committee Data:', committeeData);
        } catch (error) {
            console.error('Error fetching committee:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSectionsIdChange = async event => {
        const selectedSectionsId = event.target.value;
        setSectionsId(selectedSectionsId);

        if (!selectedSectionsId) {
            setVillage([]);
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseURL}/${Village}`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { Sections: selectedSectionsId },
            });
            setVillage(response.data.obj);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleVillageIdChange = async event => {
        const selectedVillageId = event.target.value;
        setVillageId(selectedVillageId);

        if (!selectedVillageId) {
            setElections([]);
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseURL}/${ELECTION}`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { villageId: selectedVillageId },
            });

            const electionData = response.data.obj || [];
            setElections(Array.isArray(electionData) ? electionData : []);
        } catch (error) {
            console.error('Error fetching elections:', error);
            setElections([]);
        } finally {
            setLoading(false);
        }
    };

    const handleElectionCenterChange = async event => {
        const selectedElectionCenterId = event.target.value;
        setElectionCenterId(selectedElectionCenterId);
        setCommId(''); // إعادة التعيين فقط إذا كان منطقيًا

        if (selectedElectionCenterId) {
            await fetchComittee(selectedElectionCenterId);
        } else {
            setCommitee([]); // إعادة تعيين اللجان إذا لم يتم اختيار مقر
        }
    };

    const fetchVoter = useCallback(async () => {
        const params = {
            GovId: govId || 0,
            ElectoralId: electoralId || 0,
            Sections: sectionsId || 0,
            villageId: villageId || 0,
            ElectionCenterId: electionCenterId || 0,
            CommId: CommId || 0,
        };

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseURL}/${VOTERS}`, {
                headers: { Authorization: `Bearer ${token}` },
                params,
            });

            if (response.data && Array.isArray(response.data.obj)) {
                setVoters(response.data.obj);
            } else {
                console.error('Invalid response format:', response.data);
                setVoters([]);
            }
        } catch (error) {
            console.error('Error fetching voter data:', error);
            setVoters([]);
        } finally {
            setLoading(false);
        }
    }, [govId, electoralId, sectionsId, villageId, electionCenterId, CommId]);

    useEffect(() => {
        fetchVoter();
    }, [fetchVoter]);

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

    const fetchSections = async selectedElectoralId => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseURL}/${IncorporatedSections}`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { electoralId: selectedElectoralId },
            });
            setSections(response.data.obj);
        } catch (error) {
            console.error('Error fetching sections:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchComittee = async selectedElectionCenterId => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseURL}/${COMMITTEE}`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { electionCenterId: selectedElectionCenterId },
            });
            console.log('Committee Response:', response.data);
            const data = response.data.obj || [];
            setCommitee(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching committee:', error);
            setCommitee([]);
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
                        <h2 className="">الناخبين</h2>
                        <div>
                            <Link to="/add-voter">
                                <button className="btn btn-primary">اضافة ناخب</button>
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
                                {/*  الاقسام */}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="ElectoralId" className="d-flex mb-1">
                                        الاقسام
                                    </label>
                                    <select
                                        className="form-select"
                                        onChange={handleSectionsIdChange}
                                        value={sectionsId}
                                        disabled={!electoralId}
                                    >
                                        <option value="">اختر القسم</option>
                                        {sections.map(section => (
                                            <option key={section.id} value={section.id}>
                                                {section.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* القري */}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="villageId" className="d-flex mb-1">
                                        القري
                                    </label>
                                    <select
                                        className="form-select"
                                        onChange={handleVillageIdChange}
                                        value={villageId}
                                        disabled={!sectionsId}
                                    >
                                        <option value="">اختر القرية</option>
                                        {village.map(v => (
                                            <option key={v.id} value={v.id}>
                                                {v.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* المقر الانتخابي */}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="electionCenterId" className="d-flex mb-1">
                                        المقر الانتخابي
                                    </label>
                                    <select
                                        className="form-select"
                                        onChange={handleElectionCenterChange}
                                        value={electionCenterId}
                                        disabled={!villageId}
                                    >
                                        <option value="">اختر المقر</option>
                                        {Array.isArray(elections) &&
                                            elections.map(election => (
                                                <option key={election.id} value={election.id}>
                                                    {election.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                {/*  اللجنة */}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="CommId" className="d-flex mb-1">
                                        اللجنة
                                    </label>
                                    <select
                                        className="form-select"
                                        onChange={handleCommitteeChange}
                                        value={CommId}
                                        disabled={!electionCenterId}
                                    >
                                        <option value="">اختر اللجنة</option>
                                        {Array.isArray(commitee) &&
                                            commitee.map(committee => (
                                                <option key={committee.id} value={committee.id}>
                                                    {committee.name}
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
                                    الاسم
                                </TableCell>
                                <TableCell className="table-row" sx={{ fontSize: '18px' }}>
                                    تم الانتخاب
                                </TableCell>
                                <TableCell className="table-row" sx={{ fontSize: '18px' }}>
                                    تاريخ الانتخاب
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(voters) && voters.length > 0 ? (
                                voters.map(c => (
                                    <TableRow key={c.id}>
                                        <TableCell className="table-content">{c.name}</TableCell>
                                        <TableCell className="table-content">
                                            {c.hasVoted ? (
                                                <CheckIcon color="success" />
                                            ) : (
                                                <CloseIcon color="error" />
                                            )}
                                        </TableCell>
                                        <TableCell className="table-content">
                                            {c.votedAt ? c.votedAt : '_'}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell className="text-center" colSpan={3}>
                                        <h5>لا توجد بيانات للجنة</h5>
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

export default AllVoter;
