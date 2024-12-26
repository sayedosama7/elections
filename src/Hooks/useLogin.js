import { useMutation } from 'react-query';
import axios from 'axios';
import { baseURL, LOGIN } from '../Components/Api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const loginUser = async ({ username, password }) => {
    const response = await axios.post(
        `${baseURL}/${LOGIN}`,
        { userName: username, password: password },
        { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
};

export const useLogin = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const mutation = useMutation(loginUser, {
        onSuccess: data => {
            if (data.isSuccess) {
                const token = data.obj?.data?.token || '';
                localStorage.setItem('token', token);
                navigate('/home');
            } else {
                setError(data.message || 'حدث خطأ غير متوقع.');
            }
        },
        onError: () => {
            setError('اسم المستخدم أو كلمة المرور غير صحيحة.');
        },
    });

    return { ...mutation, error };
};
