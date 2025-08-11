/* eslint-disable */

'use client';

import React, { useState, Suspense } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, Chrome, AlertCircle, Sparkles } from 'lucide-react';

interface SignInFormData {
  email: string;
  password: string;
}

function SignInForm() {
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [focusedField, setFocusedField] = useState<string>('');
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || '/';
  const urlError = searchParams?.get('error');

  // Handle URL errors from NextAuth
  React.useEffect(() => {
    if (urlError) {
      switch (urlError) {
        case 'CredentialsSignin':
          setError('Invalid email or password. Please try again.');
          break;
        case 'OAuthSignin':
        case 'OAuthCallback':
        case 'OAuthCreateAccount':
          setError('Error with OAuth provider. Please try again.');
          break;
        case 'EmailCreateAccount':
          setError('Could not create account with this email.');
          break;
        case 'Callback':
          setError('Authentication error. Please try again.');
          break;
        case 'OAuthAccountNotLinked':
          setError('Email already exists with different provider.');
          break;
        case 'EmailSignin':
          setError('Unable to send verification email.');
          break;
        case 'CredentialsSignup':
          setError('Account creation failed. Please try again.');
          break;
        case 'SessionRequired':
          setError('Please sign in to access this page.');
          break;
        default:
          setError('An error occurred during authentication.');
      }
    }
  }, [urlError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError(''); // Clear error when user starts typing
  };

  const validateForm = (): boolean => {
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    return true;
  };

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password. Please check your credentials.');
      } else if (result?.ok) {
        // Wait for session to be established
        const session = await getSession();
        if (session) {
          router.push(callbackUrl);
          router.refresh();
        }
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      await signIn('google', { 
        callbackUrl,
        redirect: true 
      });
    } catch (error) {
      console.error('Google sign in error:', error);
      setError('Google sign-in failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Glassmorphism Header */}
          <div className="relative bg-gradient-to-r from-purple-600/80 via-blue-600/80 to-indigo-600/80 backdrop-blur-sm px-8 py-8 text-center">
            <div className="absolute inset-0 bg-white/10"></div>
            <div className="relative z-10">
              <div className="mb-4 flex justify-center">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-white/80 text-lg">Sign in to continue your journey</p>
            </div>
          </div>

          <div className="p-8">
            {/* Error Message with Animation */}
            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-start space-x-3 animate-in slide-in-from-top duration-300 backdrop-blur-sm">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-red-300 font-medium">Authentication Error</p>
                  <p className="text-sm text-red-200 mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Google Sign In with Hover Effects */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="group w-full mb-6 bg-white/5 backdrop-blur-sm border border-white/20 hover:border-white/40 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 hover:shadow-xl hover:shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="p-2 bg-white rounded-full group-hover:rotate-12 transition-transform duration-300">
                <Chrome className="w-5 h-5 text-red-500" />
              </div>
              <span className="text-lg">{isLoading ? 'Signing in...' : 'Continue with Google'}</span>
            </button>

            {/* Enhanced Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-6 bg-slate-950/50 backdrop-blur-sm text-white/70 font-medium rounded-full border border-white/10">
                  Or sign in with email
                </span>
              </div>
            </div>

            {/* Enhanced Form */}
            <form onSubmit={handleCredentialsSignIn} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-white/90 mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                    focusedField === 'email' ? 'text-purple-400' : 'text-white/50'
                  }`} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200 text-white placeholder-white/50 hover:border-white/30 hover:bg-white/10"
                    placeholder="Enter your email"
                  />
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 transition-opacity duration-200 pointer-events-none ${
                    focusedField === 'email' ? 'opacity-100' : ''
                  }`}></div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-white/90 mb-2">
                  Password
                </label>
                <div className="relative group">
                  <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                    focusedField === 'password' ? 'text-purple-400' : 'text-white/50'
                  }`} />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    className="w-full pl-12 pr-14 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200 text-white placeholder-white/50 hover:border-white/30 hover:bg-white/10"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-purple-400 transition-all duration-200 p-1 rounded-lg hover:bg-white/10"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 transition-opacity duration-200 pointer-events-none ${
                    focusedField === 'password' ? 'opacity-100' : ''
                  }`}></div>
                </div>
              </div>

              {/* Enhanced Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center group">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-white/30 rounded bg-white/10 backdrop-blur-sm"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-white/80 group-hover:text-white transition-colors">
                    Remember me
                  </label>
                </div>
                <a 
                  href="/auth/forgot-password" 
                  className="text-sm text-purple-300 hover:text-purple-200 font-medium transition-all duration-200 hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              {/* Enhanced Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-500 hover:via-blue-500 hover:to-indigo-500 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-lg">Signing in...</span>
                    </div>
                  ) : (
                    <span className="text-lg">Sign In</span>
                  )}
                </div>
              </button>
            </form>

            {/* Enhanced Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-white/70 text-base">
                Don't have an account?{' '}
                <a 
                  href="/auth/signup" 
                  className="font-semibold text-purple-300 hover:text-purple-200 transition-all duration-200 hover:underline"
                >
                  Create account
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-white/50 leading-relaxed">
            By signing in, you agree to our{' '}
            <a href="/terms" className="text-purple-300 hover:text-purple-200 transition-colors hover:underline">
              Terms of Service
            </a>
            {' '}and{' '}
            <a href="/privacy" className="text-purple-300 hover:text-purple-200 transition-colors hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-12 h-12 border-4 border-blue-500/30 border-t-transparent rounded-full animate-spin animate-reverse"></div>
        </div>
      </div>
    }>
      <SignInForm />
    </Suspense>
  );
}