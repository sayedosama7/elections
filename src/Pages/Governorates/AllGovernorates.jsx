/* eslint-disable no-unused-vars */
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import axios from 'axios';
import { Loading } from '../../Components/Loading';
import GovernoratesList from './GovernoratesList';
import { baseURL, GOVERNATE_CREATE } from '../../Components/Api';

const AllGovernorates = () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [governorates, setGovernorates] = useState(['']);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setGovernorates(['']);
        setError('');
        setMessage('');
    };

    const handleGovernorateChange = (index, value) => {
        const updatedGovernorates = [...governorates];
        updatedGovernorates[index] = value;
        setGovernorates(updatedGovernorates);
    };

    const addGovernorateField = () => {
        setGovernorates([...governorates, '']);
    };

    const handleSubmit = async () => {
        if (governorates.some(name => !name.trim())) {
            setMessage('يجب ملء جميع الحقول.');
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseURL}/${GOVERNATE_CREATE}`, governorates, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.isSuccess) {
                setMessage('تمت الإضافة بنجاح.');
                setGovernorates(['']);
                handleClose();
            } else {
                setMessage(response.data.message || 'حدث خطأ أثناء الإضافة.');
            }
        } catch (error) {
            setMessage('حدث خطأ أثناء الإضافة.');
            console.error('Error adding governorates:', error);
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
                        <h2 className="">المحافظات</h2>
                        <div>
                            <button className="btn btn-primary" onClick={handleClickOpen}>
                                اضافة محافظة
                            </button>
                        </div>
                    </div>
                    <GovernoratesList />
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
                    اضافة محافظة
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
                    <div className="container">
                        <div className="row">
                            {governorates.map((governorate, index) => (
                                <div className="col-md-4 mb-2" key={index}>
                                    <label htmlFor={`governorate-${index}`} className="d-flex mb-1">
                                        اسم المحافظة {index + 1}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id={`governorate-${index}`}
                                        value={governorate}
                                        onChange={e =>
                                            handleGovernorateChange(index, e.target.value)
                                        }
                                    />
                                </div>
                            ))}
                            <div className="col-md-12 mb-2">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={addGovernorateField}
                                >
                                    إضافة محافظة جديدة
                                </button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                {message && <p className="text-danger text-center">{message}</p>}
                <DialogActions>
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        حفظ
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AllGovernorates;
