/* eslint-disable no-unused-vars */
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

const AllCandidates = () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div className="box-container">
                {loading && <Loading />}
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
                                    <label htmlFor="Name" className="d-flex mb-1">
                                        اسم المرشح
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>
                                {/* اسم الشهرة */}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="CanditateNickname" className="d-flex mb-1">
                                        اسم الشهرة
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>
                                {/* اسم الشهرة */}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="CanditateNickname" className="d-flex mb-1">
                                        اسم الشهرة
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>
                                {/* اسم المجلس */}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="CoubcilName" className="d-flex mb-1">
                                        اسم المجلس
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>
                                {/* اسم الحزب */}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="PartyName" className="d-flex mb-1">
                                        اسم الحزب
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>
                                {/* الرمز الانتخابي*/}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="Coded" className="d-flex mb-1">
                                        الرمز الانتخابي
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>
                                {/* سنة الانتخاب*/}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="YearOFelection" className="d-flex mb-1">
                                        سنة الانتخاب
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>
                                {/* سنة الانتخاب*/}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="DateOfBirth" className="d-flex mb-1">
                                        تاريخ الميلاد
                                    </label>
                                    <input type="date" className="form-control" />
                                </div>
                                {/* الرقم القومي*/}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="NationalId" className="d-flex mb-1">
                                        الرقم القومي
                                    </label>
                                    <input type="number" className="form-control" />
                                </div>
                                {/* الرقم */}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="PhoneNumber" className="d-flex mb-1">
                                        PhoneNumber
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>
                                {/* السن عند الترشح*/}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="AgeAtNomination" className="d-flex mb-1">
                                        السن عند الترشح
                                    </label>
                                    <input type="number" className="form-control" />
                                </div>
                                {/* الايميل*/}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="Email" className="d-flex mb-1">
                                        البريد الالكتروني
                                    </label>
                                    <input type="email" className="form-control" />
                                </div>
                                {/* المؤهل الدراسي*/}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="JobQualification" className="d-flex mb-1">
                                        المؤهل الدراسي
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>
                                {/* الوظيفة الحالية*/}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="CurrentJob" className="d-flex mb-1">
                                        الوظيفة الحالية
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>
                                {/* اسم الدائرة الانتخابية*/}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="ElectoralDistrictId" className="d-flex mb-1">
                                        اسم الدائرة الانتخابية
                                    </label>
                                    <select className="form-select">
                                        <option value="">1</option>
                                        <option value="">2</option>
                                        <option value="">3</option>
                                        <option value="">4</option>
                                    </select>
                                </div>
                                {/* النوع  */}
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="Gender" className="d-flex mb-1">
                                        النوع
                                    </label>
                                    <select className="form-select">
                                        <option value="1">ذكر</option>
                                        <option value="2">انثي</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </DialogContent>
                <DialogActions>
                    <button className="btn btn-primary" onClick={handleClose}>
                        حفظ
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AllCandidates;
