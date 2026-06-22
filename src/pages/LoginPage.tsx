import { useState } from 'react';
import type { FormEvent } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import logo from '../assets/images/logo.svg';

const RULES = [
  'Email must end with @gmail.com',
  'Password must be at least 9 characters long',
];

const validate = (email: string, password: string) => {
  const errors = [];
  if (!email.endsWith('@gmail.com')) errors.push(RULES[0]);
  if (password.length <= 8) errors.push(RULES[1]);
  return errors;
};

const ValidationModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-sm p-6">
      <h2 className="text-lg font-medium text-textDark dark:text-slate-100 mb-3">Check your input</h2>
      <ul className="space-y-2 mb-6">
        {RULES.map((rule) => (
          <li key={rule} className="flex items-start gap-2 text-sm text-textGray dark:text-slate-300">
            <span className="mt-0.5 h-4 w-4 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0 text-xs font-bold">!</span>
            {rule}
          </li>
        ))}
      </ul>
      <button
        onClick={onClose}
        className="w-full bg-primary text-white font-medium py-2.5 rounded-xl hover:bg-opacity-90 transition"
      >
        Got it
      </button>
    </div>
  </div>
);

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const validationErrors = validate(email, password);
    if (validationErrors.length > 0) {
      setShowModal(true);
      return;
    }

    if (isRegistering && password !== confirmPassword) {
      setError('Passwords do not match. Please make sure both fields are identical.');
      return;
    }

    setLoading(true);
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bgLight dark:bg-slate-900 flex items-center justify-center px-4">
      {showModal && <ValidationModal onClose={() => setShowModal(false)} />}

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md w-full max-w-md p-8">
        <div className="flex justify-center mb-6">
          <Link to="/">
            <img src={logo} alt="FoodDelivery" className="h-12 w-12" />
          </Link>
        </div>

        <h1 className="text-2xl font-medium text-textDark dark:text-slate-100 text-center mb-2">
          {isRegistering ? 'Create an account' : 'Welcome back'}
        </h1>
        <p className="text-textGray dark:text-slate-300 text-center text-sm mb-8">
          {isRegistering
            ? 'Sign up to start ordering food'
            : 'Sign in to your account'}
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-textDark dark:text-slate-200 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@gmail.com"
              className="w-full border border-gray-200 dark:border-slate-600 dark:bg-slate-700 rounded-xl px-4 py-3 text-sm text-textDark dark:text-slate-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textDark dark:text-slate-200 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-200 dark:border-slate-600 dark:bg-slate-700 rounded-xl px-4 py-3 text-sm text-textDark dark:text-slate-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            />
          </div>

          {isRegistering && (
            <div>
              <label className="block text-sm font-medium text-textDark dark:text-slate-200 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-200 dark:border-slate-600 dark:bg-slate-700 rounded-xl px-4 py-3 text-sm text-textDark dark:text-slate-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white font-medium py-3 rounded-xl hover:bg-opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Please wait…' : isRegistering ? 'Sign up' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-sm text-textGray dark:text-slate-300 mt-6">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => { setIsRegistering((v) => !v); setError(''); setConfirmPassword(''); }}
            className="text-primary font-medium hover:underline"
          >
            {isRegistering ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
