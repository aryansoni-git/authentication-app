'use client';

import { Card, CardBody, Button } from "@nextui-org/react";
import {
  Shield,
  Zap,
  Lock,
  Users,
  ArrowRight,
  CheckCircle2,
  Github
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const features = [
    {
      icon: <Shield className="w-12 h-12 text-blue-500" />,
      title: "Secure Authentication",
      description: "Enterprise-grade security with advanced encryption and token-based authentication."
    },
    {
      icon: <Zap className="w-12 h-12 text-yellow-500" />,
      title: "Lightning Fast",
      description: "Optimized performance with quick response times and seamless user experience."
    },
    {
      icon: <Lock className="w-12 h-12 text-green-500" />,
      title: "Privacy First",
      description: "Your data is protected with state-of-the-art security measures and encryption."
    },
    {
      icon: <Users className="w-12 h-12 text-purple-500" />,
      title: "Team Ready",
      description: "Built for teams of all sizes with collaborative features and role management."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Lock className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">AuthApp</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                as={Link}
                href="/login"
                variant="light"
                color="primary"
              >
                Login
              </Button>
              <Button
                as={Link}
                href="/signup"
                color="primary"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <h1 className="text-5xl font-bold text-gray-900">
              Secure Authentication
              <span className="text-primary"> Made Simple</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience enterprise-grade security with our modern authentication solution.
              Get started in minutes with our developer-friendly platform.
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                as={Link}
                href="/signup"
                color="primary"
                size="lg"
                className="font-semibold"
                endContent={<ArrowRight className="w-5 h-5" />}
              >
                Get Started Free
              </Button>
              <Button
                as={Link}
                href="https://github.com"
                size="lg"
                variant="bordered"
                className="font-semibold text-black"
                startContent={<Github className="w-5 h-5" />}
              >
                View on GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardBody className="text-center space-y-4 p-6">
                <div className="flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-black">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-24 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black">Why Choose AuthApp?</h2>
            <p className="text-gray-600 mt-4">Everything you need for robust authentication</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-black">
            {[
              "Quick setup in minutes",
              "Modern security standards",
              "Comprehensive documentation",
              "24/7 technical support",
              "Regular security updates",
              "Developer-friendly API"
            ].map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white p-4 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <Card className="bg-primary text-white">
          <CardBody className="text-center p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="mb-8 text-lg opacity-90">
              Join thousands of developers who trust AuthApp for their authentication needs.
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                as={Link}
                href="/signup"
                color="default"
                size="lg"
                className="font-semibold bg-white text-primary"
              >
                Create Free Account
              </Button>
              <Button
                as={Link}
                href="/docs"
                variant="bordered"
                size="lg"
                className="font-semibold border-white text-white"
              >
                View Documentation
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4 text-black">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-gray-600 hover:text-primary">Features</Link></li>
                <li><Link href="/pricing" className="text-gray-600 hover:text-primary">Pricing</Link></li>
                <li><Link href="/docs" className="text-gray-600 hover:text-primary">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-black">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-600 hover:text-primary">About</Link></li>
                <li><Link href="/blog" className="text-gray-600 hover:text-primary">Blog</Link></li>
                <li><Link href="/careers" className="text-gray-600 hover:text-primary">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-black">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/help" className="text-gray-600 hover:text-primary">Help Center</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-primary">Contact</Link></li>
                <li><Link href="/status" className="text-gray-600 hover:text-primary">Status</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-black">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-600 hover:text-primary">Privacy</Link></li>
                <li><Link href="/terms" className="text-gray-600 hover:text-primary">Terms</Link></li>
                <li><Link href="/security" className="text-gray-600 hover:text-primary">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-gray-600">
            <p>© 2024 AuthApp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}