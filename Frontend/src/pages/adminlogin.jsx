import { useState } from 'react';
import { LockKeyhole, ShieldCheck } from 'lucide-react';

export { AdminDashboard } from './admin.jsx';

export function AdminPasswordGate({ onUnlock }) {
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const expectedPassword = import.meta.env.VITE_ADMIN_PASSWORD;

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!expectedPassword) {
			setError('Admin password is not configured. Add VITE_ADMIN_PASSWORD to Frontend/.env.local.');
			return;
		}
		if (password !== expectedPassword) {
			setError('Incorrect password.');
			return;
		}
		setError('');
		onUnlock();
	};

	return (
		<div className="mx-auto flex w-full max-w-md items-center px-4 py-20">
			<form
				onSubmit={handleSubmit}
				className="w-full space-y-5 rounded-2xl border border-cyan-400/20 bg-[#0a1224] p-7 shadow-2xl shadow-black/30"
			>
				<div className="text-center">
					<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-200">
						<ShieldCheck className="h-6 w-6" />
					</div>
					<h1 className="text-2xl font-bold text-white">Admin Access</h1>
					<p className="mt-2 text-sm text-slate-400">Enter the admin password to continue.</p>
				</div>

				<label className="block space-y-2 text-sm font-medium text-slate-200">
					Password
					<span className="relative block">
						<LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
						<input
							type="password"
							required
							autoComplete="current-password"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-3 text-white outline-none transition focus:border-cyan-300"
						/>
					</span>
				</label>

				{error && (
					<p role="alert" className="rounded-lg border border-rose-400/20 bg-rose-400/[0.07] px-3 py-2 text-sm text-rose-200">
						{error}
					</p>
				)}

				{!expectedPassword && (
					<p className="text-xs leading-relaxed text-amber-200/80">
						Admin access is locked until a password is configured.
					</p>
				)}

				<button
					type="submit"
					disabled={!expectedPassword}
					className="w-full rounded-xl bg-cyan-300 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
				>
					Unlock Admin Management
				</button>
			</form>
		</div>
	);
}
