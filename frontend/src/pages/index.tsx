import React from 'react';
import { GreetService } from '../../bindings/changeme';
import { useLocation, useNavigate } from 'react-router-dom'

const LoginPage: React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const Login = () => {
        GreetService.Login("username", "password").then((resultValue: string) => {
            console.log(resultValue);
        }).catch((err: any) => {
            console.log(err);
        });
    }

    React.useEffect(() => {
        if (location.search === "?login=true") {
            navigate('/layout');
        }
    }, [location.search, navigate]);

    return (
        <>
            <div>
                Login
                <button onClick={Login}>Login</button>
            </div>
        </>
    );
};

export default LoginPage;