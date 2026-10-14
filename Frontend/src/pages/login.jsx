import { useState } from 'react';
import { LogIn, AlertCircle } from 'lucide-react';
import { hashPassword } from './utils.js';

export function LoginPage({
  registeredMembers,
  teamMembers,
  onLoginSuccess,
  onOpenForgotPassword,
  navigateTo
}) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const cleanId = identifier.trim().toLowerCase();
    const passHash = await hashPassword(password);

    // Check registered student members
    const foundStudent = registeredMembers.find(
      (m) =>
        m.email.toLowerCase() === cleanId || m.rollNumber.toLowerCase() === cleanId
    );

    if (foundStudent) {
      if (foundStudent.passwordHash === passHash) {
        onLoginSuccess(foundStudent);
        return;
      } else {
        setError('Invalid password for this student account.');
        return;
      }
    }

    // Also allow executive leadership quick demo sign-in using their official name or email
    const foundLeader = teamMembers.find(
      (l) =>
        l.email?.toLowerCase() === cleanId || l.name.toLowerCase() === cleanId
    );
    if (foundLeader) {
      onLoginSuccess({
        id: foundLeader.id,
        fullName: foundLeader.name,
        email: foundLeader.email,
        rollNumber: `EXEC-${foundLeader.order}`,
        department: foundLeader.department,
        degree: foundLeader.designation,
        yearOfStudy: foundLeader.year,
        role: foundLeader.designation,
        skills: Array.isArray(foundLeader.skills) ? foundLeader.skills.join(', ') : '',
        photoUrl: foundLeader.photoUrl,
        isAdmin: true
      });
      return;
    }

    setError(
      'No account found with that Email or Student Roll Number. Please register via "Join the Club" first.'
    );
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="rounded-3xl bg-[#0A1228] border border-cyan-500/30 p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
            <LogIn className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">DATRIQ Member Login</h1>
          <p className="text-xs text-slate-400">
            Sign in with your College Email or Student Roll Number
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">
              College Email or Roll Number
            </label>
            <input
              type="text"
              required
              placeholder="student@sju.edu.in or 24UDS104"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-cyan-400 outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-slate-300 font-semibold">Password</label>
              <button
                type="button"
                onClick={onOpenForgotPassword}
                className="text-cyan-400 hover:underline text-[11px]"
              >
                Forgot Password?
              </button>
            </div>
            <input
              type="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-cyan-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-extrabold text-xs shadow-lg"
          >
            Sign In to Portal
          </button>
        </form>

        <div className="pt-4 border-t border-slate-800 text-center space-y-2 text-xs">
          <p className="text-slate-400">
            New to DATRIQ?{' '}
            <button
              onClick={() => navigateTo('join')}
              className="text-cyan-400 font-bold hover:underline"
            >
              Create Student Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
