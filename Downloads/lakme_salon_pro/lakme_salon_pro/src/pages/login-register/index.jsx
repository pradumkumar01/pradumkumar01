import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';
import { Link } from 'react-router-dom';

const LoginRegister = () => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form data
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex?.test(phone);
  };

  const validatePassword = (password) => {
    return password?.length >= 8;
  };

  const handleLoginSubmit = (e) => {
    e?.preventDefault();
    const newErrors = {};
    
    if (!loginData?.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(loginData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!loginData?.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors)?.length === 0) {
      setIsLoading(true);
      // Mock login process
      setTimeout(() => {
        setIsLoading(false);
        console.log('Login successful');
      }, 2000);
    }
  };

  const handleRegisterSubmit = (e) => {
    e?.preventDefault();
    const newErrors = {};
    
    if (!registerData?.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!registerData?.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(registerData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!registerData?.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(registerData?.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!registerData?.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(registerData?.password)) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!registerData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (registerData?.password !== registerData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!acceptTerms) {
      newErrors.terms = 'Please accept the terms and conditions';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors)?.length === 0) {
      setShowOtpModal(true);
    }
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log(`${provider} login initiated`);
    }, 1500);
  };

  const PasswordStrengthIndicator = ({ password }) => {
    const getStrength = () => {
      if (!password) return { level: 0, text: '' };
      if (password?.length < 6) return { level: 1, text: 'Weak', color: 'bg-error' };
      if (password?.length < 8) return { level: 2, text: 'Fair', color: 'bg-warning' };
      if (password?.length >= 8) return { level: 3, text: 'Strong', color: 'bg-success' };
    };

    const strength = getStrength();
    if (!password) return null;

    return (
      <div className="mt-2">
        <div className="flex space-x-1 mb-1">
          {[1, 2, 3]?.map((level) => (
            <div
              key={level}
              className={`h-1 flex-1 rounded-full ${
                level <= strength?.level ? strength?.color : 'bg-muted'
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">{strength?.text}</p>
      </div>
    );
  };

  const OtpModal = () => (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-modal max-w-md w-full p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Smartphone" size={24} className="text-primary" />
          </div>
          <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
            Verify Your Phone
          </h3>
          <p className="text-muted-foreground mb-6">
            We've sent a verification code to +91 {registerData?.phone}
          </p>
          
          <div className="flex justify-center space-x-2 mb-6">
            {[1, 2, 3, 4, 5, 6]?.map((digit) => (
              <input
                key={digit}
                type="text"
                maxLength="1"
                className="w-12 h-12 text-center border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring text-lg font-medium"
              />
            ))}
          </div>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowOtpModal(false)}
            >
              Cancel
            </Button>
            <Button className="flex-1">
              Verify
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            Didn't receive code? 
            <button className="text-primary hover:underline ml-1">
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-heading font-bold text-3xl text-foreground mb-4">
              Welcome to Lakme Salon
            </h1>
            <p className="text-muted-foreground">
              Sign in to book appointments and manage your beauty journey
            </p>
          </div>

          {/* Tab Toggle */}
          <div className="flex bg-muted rounded-lg p-1 mb-8">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'login' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'register' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <Input
                label="Email or Phone"
                type="email"
                placeholder="Enter your email or phone number"
                value={loginData?.email}
                onChange={(e) => setLoginData({ ...loginData, email: e?.target?.value })}
                error={errors?.email}
                required
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={loginData?.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e?.target?.value })}
                  error={errors?.password}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
                >
                  <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <Input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e?.target?.checked)}
                  />
                  <span className="text-sm text-foreground">Remember me</span>
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button 
                type="submit" 
                fullWidth 
                loading={isLoading}
                className="h-12"
              >
                Sign In
              </Button>
            </form>
          )}

          {/* Register Form */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-6">
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={registerData?.name}
                onChange={(e) => setRegisterData({ ...registerData, name: e?.target?.value })}
                error={errors?.name}
                required
              />

              <Input
                label="Email"
                type="email"
                placeholder="Enter your email address"
                value={registerData?.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e?.target?.value })}
                error={errors?.email}
                required
              />

              <Input
                label="Phone Number"
                type="tel"
                placeholder="Enter 10-digit phone number"
                value={registerData?.phone}
                onChange={(e) => setRegisterData({ ...registerData, phone: e?.target?.value })}
                error={errors?.phone}
                required
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={registerData?.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e?.target?.value })}
                  error={errors?.password}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
                >
                  <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
                </button>
                <PasswordStrengthIndicator password={registerData?.password} />
              </div>

              <div className="relative">
                <Input
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  value={registerData?.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e?.target?.value })}
                  error={errors?.confirmPassword}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
                >
                  <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={16} />
                </button>
              </div>

              <div className="space-y-2">
                <label className="flex items-start space-x-2">
                  <Input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e?.target?.checked)}
                    className="mt-0.5"
                  />
                  <span className="text-sm text-foreground">
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors?.terms && (
                  <p className="text-sm text-destructive">{errors?.terms}</p>
                )}
              </div>

              <Button 
                type="submit" 
                fullWidth 
                className="h-12"
              >
                Create Account
              </Button>
            </form>
          )}

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-border"></div>
            <span className="px-4 text-sm text-muted-foreground">Or continue with</span>
            <div className="flex-1 border-t border-border"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <Button
              variant="outline"
              fullWidth
              onClick={() => handleSocialLogin('Google')}
              loading={isLoading}
            >
              <Icon name="Chrome" size={16} className="text-red-500" />
              Continue with Google
            </Button>

            <Button
              variant="outline"
              fullWidth
              onClick={() => handleSocialLogin('Facebook')}
              loading={isLoading}
            >
              <Icon name="Facebook" size={16} className="text-blue-600" />
              Continue with Facebook
            </Button>

            <Button
              variant="outline"
              fullWidth
              onClick={() => handleSocialLogin('Apple')}
              loading={isLoading}
            >
              <Icon name="Apple" size={16} />
              Continue with Apple
            </Button>
          </div>

          {/* Guest Checkout */}
          <div className="text-center mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground mb-3">
              Want to book without an account?
            </p>
            <Button variant="ghost" className="text-primary">
              Continue as Guest
            </Button>
          </div>
        </div>
      </main>
      {/* OTP Modal */}
      {showOtpModal && <OtpModal />}
    </div>
  );
};

export default LoginRegister;