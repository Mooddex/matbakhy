'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, Chrome, AlertCircle, CheckCircle, UserPlus } from 'lucide-react';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ApiResponse {
  success?: boolean;
  error?: string;
  message?: string;
}

export default function SignUpPage() {
  const [formData, setFormData] = useState<SignUpFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<string>('');
  
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Full name is required');
      return false;
    }
    if (formData.name.trim().length < 2) {
      setError('Name must be at least 2 characters');
      return false;
    }
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
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!termsAccepted) {
      setError('Please accept the Terms of Service and Privacy Policy');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // First, create the user account
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.toLowerCase().trim(),
          password: formData.password,
        }),
      });

      const data: ApiResponse = await response.json();

      if (response.ok && data.success) {
        setSuccess('Account created successfully! Signing you in...');
        
        // Auto sign-in after successful registration
        setTimeout(async () => {
          const result = await signIn('credentials', {
            email: formData.email,
            password: formData.password,
            redirect: false,
          });
          
          if (result?.ok) {
            router.push('/');
            router.refresh();
          } else {
            router.push('/auth/signin?message=Account created. Please sign in.');
          }
        }, 1000);
        
      } else {
        setError(data.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { 
        callbackUrl: '/',
        redirect: true 
      });
    } catch (error) {
      console.error('Google sign up error:', error);
      setError('Google sign-up failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Glassmorphism Header */}
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

          <div className="p-8">
            {/* Error Message with Animation */}
            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-start space-x-3 animate-in slide-in-from-top duration-300 backdrop-blur-sm">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-red-300 font-medium">Registration Error</p>
                  <p className="text-sm text-red-200 mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Success Message with Animation */}
            {success && (
              <div className="mb-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex items-start space-x-3 animate-in slide-in-from-top duration-300 backdrop-blur-sm">
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-emerald-300 font-medium">Success!</p>
                  <p className="text-sm text-emerald-200 mt-1">{success}</p>
                </div>
              </div>
            )}

            {/* Google Sign Up with Hover Effects */}
            <button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={isLoading}
              className="group w-full mb-6 bg-white/5 backdrop-blur-sm border border-white/20 hover:border-white/40 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 hover:shadow-xl hover:shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="p-2 bg-white rounded-full group-hover:rotate-12 transition-transform duration-300">
                <Chrome className="w-5 h-5 text-red-500" />
              </div>
              <span className="text-lg">{isLoading ? 'Creating account...' : 'Continue with Google'}</span>
            </button>

            {/* Enhanced Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-6 bg-slate-950/50 backdrop-blur-sm text-white/70 font-medium rounded-full border border-white/10">
                  Or create account with email
                </span>
              </div>
            </div>

            {/* Enhanced Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-semibold text-white/90 mb-2">
                  Full Name
                </label>
                <div className="relative group">
                  <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                    focusedField === 'name' ? 'text-emerald-400' : 'text-white/50'
                  }`} />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField('')}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 text-white placeholder-white/50 hover:border-white/30 hover:bg-white/10"
                    placeholder="Enter your full name"
                  />
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-green-500/20 opacity-0 transition-opacity duration-200 pointer-events-none ${
                    focusedField === 'name' ? 'opacity-100' : ''
                  }`}></div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-white/90 mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                    focusedField === 'email' ? 'text-emerald-400' : 'text-white/50'
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
                    className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 text-white placeholder-white/50 hover:border-white/30 hover:bg-white/10"
                    placeholder="Enter your email"
                  />
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-green-500/20 opacity-0 transition-opacity duration-200 pointer-events-none ${
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
                    focusedField === 'password' ? 'text-emerald-400' : 'text-white/50'
                  }`} />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    className="w-full pl-12 pr-14 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 text-white placeholder-white/50 hover:border-white/30 hover:bg-white/10"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-emerald-400 transition-all duration-200 p-1 rounded-lg hover:bg-white/10"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-green-500/20 opacity-0 transition-opacity duration-200 pointer-events-none ${
                    focusedField === 'password' ? 'opacity-100' : ''
                  }`}></div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-white/90 mb-2">
                  Confirm Password
                </label>
                <div className="relative group">
                  <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                    focusedField === 'confirmPassword' ? 'text-emerald-400' : 'text-white/50'
                  }`} />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('confirmPassword')}
                    onBlur={() => setFocusedField('')}
                    className="w-full pl-12 pr-14 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 text-white placeholder-white/50 hover:border-white/30 hover:bg-white/10"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-emerald-400 transition-all duration-200 p-1 rounded-lg hover:bg-white/10"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-green-500/20 opacity-0 transition-opacity duration-200 pointer-events-none ${
                    focusedField === 'confirmPassword' ? 'opacity-100' : ''
                  }`}></div>
                </div>
              </div>

              {/* Enhanced Terms Checkbox */}
              <div className="flex items-start space-x-3 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/20">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-white/30 rounded bg-white/10 backdrop-blur-sm"
                />
                <label htmlFor="terms" className="text-sm text-white/80 leading-5">
                  I agree to the{' '}
                  <a href="/terms" className="text-emerald-300 hover:text-emerald-200 font-medium transition-colors hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-emerald-300 hover:text-emerald-200 font-medium transition-colors hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Enhanced Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-500 hover:via-green-500 hover:to-teal-500 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-lg">Creating account...</span>
                    </div>
                  ) : (
                    <span className="text-lg">Create Account</span>
                  )}
                </div>
              </button>
            </form>

            {/* Enhanced Sign In Link */}
            <div className="mt-8 text-center">
              <p className="text-white/70 text-base">
                Already have an account?{' '}
                <a 
                  href="/auth/signin" 
                  className="font-semibold text-emerald-300 hover:text-emerald-200 transition-all duration-200 hover:underline"
                >
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-white/50 leading-relaxed">
            By creating an account, you agree to our{' '}
            <a href="/terms" className="text-emerald-300 hover:text-emerald-200 transition-colors hover:underline">
              Terms of Service
            </a>
            {' '}and{' '}
            <a href="/privacy" className="text-emerald-300 hover:text-emerald-200 transition-colors hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}