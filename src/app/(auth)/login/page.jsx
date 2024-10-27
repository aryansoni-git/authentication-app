'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Card, CardHeader, CardBody, CardFooter, Input, Button } from '@nextui-org/react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

import Link from 'next/link';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleLogin = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('https://authentication-app-henna.vercel.app/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                const { token } = await res.json();
                localStorage.setItem('token', token);
                router.push('/protected');
            } else {
                const data = await res.json();
                setError(data.error || 'Invalid email or password');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <Card className="w-full max-w-md p-6 space-y-6">
                <CardHeader>
                    <h1 className="text-2xl font-bold text-center w-full text-black">Log In</h1>
                </CardHeader>

                <CardBody>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <Input
                            type="email"
                            label="Email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            variant="bordered"
                            className="max-w-full text-gray-600"
                            isDisabled={isLoading}
                        />

                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            variant="bordered"
                            endContent={
                                <button
                                    className="focus:outline-none"
                                    type="button"
                                    onClick={toggleVisibility}
                                >
                                    {isVisible ? (
                                        <EyeIcon className="w-4 h-4 text-gray-400" />
                                    ) : (
                                        <EyeOffIcon className="w-4 h-4 text-gray-400" />
                                    )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                            className="max-w-full text-gray-600"
                            isDisabled={isLoading}
                        />

                        <Button
                            type="submit"
                            color="primary"
                            className="w-full"
                            size="lg"
                            isLoading={isLoading}
                        >
                            {isLoading ? "Logging in..." : "Log In"}
                        </Button>

                        {error && (
                            <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                                <p className="text-red-500 text-center text-sm">
                                    {error}
                                </p>
                            </div>
                        )}
                    </form>
                </CardBody>

                <CardFooter>
                    <div className="w-full space-y-2">
                        <p className="text-center text-sm text-gray-600">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="text-primary font-medium hover:underline">
                                Sign up
                            </Link>
                        </p>
                        <p className="text-center text-sm text-gray-600">
                            <Link href="/" className="text-primary font-medium hover:underline">
                                Forgot password?
                            </Link>
                        </p>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
