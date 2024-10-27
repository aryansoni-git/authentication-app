'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Card, CardHeader, CardBody, CardFooter, Input, Button } from '@nextui-org/react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const router = useRouter();

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSignup = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        if (res.ok) {
            router.push('/login');
        } else {
            const data = await res.json();
            setError(data.error || 'Something went wrong');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <Card className="w-full max-w-md p-6 space-y-6">
                <CardHeader>
                    <h1 className="text-2xl font-bold text-center text-black w-full">Sign Up</h1>
                </CardHeader>

                <CardBody>
                    <form onSubmit={handleSignup} className="space-y-4">
                        <Input
                            type="email"
                            label="Email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            variant="bordered"
                            className="max-w-full text-gray-600"
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
                        />

                        <Button
                            type="submit"
                            color="primary"
                            className="w-full"
                            size="lg"
                        >
                            Sign Up
                        </Button>

                        {error && (
                            <p className="text-red-500 text-center text-sm mt-2">
                                {error}
                            </p>
                        )}
                    </form>
                </CardBody>

                <CardFooter>
                    <p className="text-center text-sm text-gray-600 w-full">
                        Already have an account?{" "}
                        <a href="/login" className="text-primary font-medium">
                            Log in
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
