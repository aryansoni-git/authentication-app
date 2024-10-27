'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Card, CardHeader, CardBody, Button } from '@nextui-org/react';
import {
    UserCircle,
    Bell,
    Settings,
    LogOut,
    Activity,
    Calendar,
    MessageSquare,
    Briefcase
} from 'lucide-react';


export default function ProtectedPage() {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState('User');
    const [metrics, setMetrics] = useState({
        tasks: 12,
        meetings: 3,
        messages: 8,
        projects: 4
    });


    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        const fetchData = async () => {
            try {
                const res = await fetch('/api/protected-route', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    setMessage(data.message);
                } else {
                    localStorage.removeItem('token');
                    router.push('/login');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
                        <div className="flex items-center space-x-4">
                            <Button
                                isIconOnly
                                variant="light"
                                aria-label="Notifications"
                            >
                                <Bell className="w-5 h-5" />
                            </Button>
                            <Button
                                isIconOnly
                                variant="light"
                                aria-label="Settings"
                            >
                                <Settings className="w-5 h-5" />
                            </Button>
                            <Button
                                color="danger"
                                variant="light"
                                startContent={<LogOut className="w-4 h-4" />}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Card */}
                <Card className="mb-6">
                    <CardBody className="flex items-center space-x-4">
                        <UserCircle className="w-12 h-12 text-primary" />
                        <div>
                            <h2 className="text-2xl font-bold text-center text-black">Welcome back, {userName}!</h2>
                            <p className="text-gray-600">{message || "Your dashboard is ready"}</p>
                        </div>
                    </CardBody>
                </Card>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="bg-blue-50">
                        <CardBody className="flex items-center space-x-4">
                            <Activity className="w-8 h-8 text-blue-500" />
                            <div>
                                <p className="text-sm text-gray-600">Active Tasks</p>
                                <h3 className="text-xl font-bold text-center text-gray-500">{metrics.tasks}</h3>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="bg-green-50">
                        <CardBody className="flex items-center space-x-4">
                            <Calendar className="w-8 h-8 text-green-500" />
                            <div>
                                <p className="text-sm text-gray-600">Today&apos;s Meetings</p>
                                <h3 className="text-xl font-bold text-center text-gray-500">{metrics.meetings}</h3>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="bg-purple-50">
                        <CardBody className="flex items-center space-x-4">
                            <MessageSquare className="w-8 h-8 text-purple-500" />
                            <div>
                                <p className="text-sm text-gray-600">New Messages</p>
                                <h3 className="text-xl font-bold text-center text-gray-500">{metrics.messages}</h3>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="bg-orange-50">
                        <CardBody className="flex items-center space-x-4">
                            <Briefcase className="w-8 h-8 text-orange-500" />
                            <div>
                                <p className="text-sm text-gray-600">Active Projects</p>
                                <h3 className="text-xl font-bold text-center text-gray-500">{metrics.projects}</h3>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {/* Activity Timeline */}
                <Card>
                    <CardHeader>
                        <h3 className="text-lg font-semibold text-black">Recent Activity</h3>
                    </CardHeader>
                    <CardBody>
                        <div className="space-y-4">
                            {[
                                'Updated project documentation',
                                'Attended team meeting',
                                'Completed task review',
                                'Submitted weekly report'
                            ].map((activity, index) => (
                                <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                                    <p className="text-gray-600">{activity}</p>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>
            </main>
        </div>
    );
}
