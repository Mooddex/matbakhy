'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {  AlertCircle, CheckCircle, UserPlus } from 'lucide-react';
import GoogleAuth from '../auth/GoogleAuth';

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Form Container */}
      <div className="relative z-10 max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          
          {/* Header */}
          <div className="relative bg-gradient-to-r from-emerald-600/80 via-green-600/80 to-teal-600/80 backdrop-blur-sm px-8 py-8 text-center">
            <div className="absolute inset-0 bg-white/10"></div>
            <div className="relative z-10">
              <div className="mb-4 flex justify-center">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <UserPlus className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Join the Community</h1>
              <p className="text-white/80 text-lg">Create your account today</p>
            </div>
          </div>

          {/* Body */}
          <div className="p-8">
            {/* Error */}
            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-start space-x-3 animate-in slide-in-from-top duration-300 backdrop-blur-sm">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-red-300 font-medium">Registration Error</p>
                  <p className="text-sm text-red-200 mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="mb-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex items-start space-x-3 animate-in slide-in-from-top duration-300 backdrop-blur-sm">
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-emerald-300 font-medium">Success!</p>
                  <p className="text-sm text-emerald-200 mt-1">{success}</p>
                </div>
              </div>
            )}

            {/* Google Auth Button */}
            <GoogleAuth
              isLoading={isLoading}
              onSuccess={(dbUser) => {
                console.log('User signed up and saved to DB:', dbUser);
                setSuccess('Google sign-up successful!');
                router.push('/');
              }}
              onError={(err) => {
                console.error(err);
                setError('Google sign-up failed. Please try again.');
              }}
            />

            {/* Sign In Link */}
            <div className="mt-8 text-center">
              <p className="text-white/70 text-base">
                Already have an account?{' '}
                <a
                  href="/signin"
                  className="font-semibold text-emerald-300 hover:text-emerald-200 transition-all duration-200 hover:underline"
                >
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
