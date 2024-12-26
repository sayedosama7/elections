import { useState } from 'react';
import { useLogin } from '../../Hooks/useLogin';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [linkEnabled, setLinkEnabled] = useState(false);
    const { mutate, isLoading, error } = useLogin();

    const checkInputValues = (username, password) => {
        setLinkEnabled(username.trim() !== '' && password.trim() !== '');
    };

    const handleUsernameChange = e => {
        const { value } = e.target;
        setUsername(value);
        checkInputValues(value, password);
    };

    const handlePasswordChange = e => {
        const { value } = e.target;
        setPassword(value);
        checkInputValues(username, value);
    };

    const handleLogin = e => {
        e.preventDefault();
        if (linkEnabled) {
            mutate({ username, password });
        }
    };

    return (
        <div className="all-login">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 m-auto vh-100">
                        <div className="d-flex justify-content-center flex-column h-100">
                            <h3 className="text-center mb-4" style={{ fontWeight: '600' }}>
                                تسجيل الدخول
                            </h3>
                            <form onSubmit={handleLogin}>
                                <div className="form-group mb-3">
                                    <label htmlFor="username">اسم المستخدم</label>
                                    <input
                                        type="text"
                                        className="form-control my-2"
                                        id="username"
                                        value={username}
                                        onChange={handleUsernameChange}
                                        autoComplete="username"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password">كلمة المرور</label>
                                    <input
                                        type="password"
                                        className="form-control my-2"
                                        id="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        autoComplete="password"
                                    />
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block text-center mb-2"
                                        disabled={!linkEnabled || isLoading}
                                    >
                                        {isLoading ? 'جارٍ تسجيل الدخول...' : 'دخول'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
