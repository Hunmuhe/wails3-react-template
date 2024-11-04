import React from 'react';
import { GreetService } from '../../bindings/changeme';
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const LoginPage: React.FC = () => {
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [error, setError] = React.useState("")
    const location = useLocation()
    const navigate = useNavigate()

    const Login = () => {
        if (username === "" || password === "") {
            setError("Please enter username and password 正确账号username,密码password");
            return;
        }
        GreetService.Login(username, password).then((resultValue: any) => {
            console.log("resultValue", resultValue);
        }).catch((err: any) => {
            console.log("errx", err);
            setError(err);
        });
    }

    React.useEffect(() => {
        if (location.search === "?login=true") {
            navigate('/layout');
        }
    }, [location.search, navigate]);

    return (
        <>
            <div className="text-center text-3xl font-bold pt-5 pb-5">
                Login
            </div>
            <div className="space-y-4">
                <div className="mx-5">
                    <Label>Username</Label>
                    <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="mx-5">
                    <Label>Password</Label>
                    <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className=' mx-5'>
                    <Button className='w-full' onClick={Login}>登陆</Button>
                </div>
            </div>
            <div className="text-red-500 pt-5 mx-5">
                {error}
            </div>
        </>
    );
};

export default LoginPage;