import { useState } from 'react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import { compressImageFile, hashPassword } from './utils.js';

export function JoinClubPage({
  registeredMembers,
  onOpenRulesModal,
  onRegisterSuccess,
  navigateTo,
  showNotification
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    rollNumber: '',
    department: 'Department of Data Science',
    degree: 'B.Sc. Data Science',
    yearOfStudy: '1st Year',
    phone: '',
    password: '',
    confirmPassword: '',
    photoUrl: '',
    skills: '',
    bio: '',
    linkedin: '',
    github: '',
    agreedToRules: false
  });
  const [showPass, setShowPass] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Form Validation
    if (formData.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify your password.');
      return;
    }
    if (!formData.agreedToRules) {
      setErrorMsg('You must agree to the DATRIQ Club Membership Rules & Privacy Policy.');
      return;
    }

    // Duplicate Account Prevention (checks email & student ID / roll number)
    const emailExists = registeredMembers.some(
      (m) => m.email.toLowerCase() === formData.email.trim().toLowerCase()
    );
    const rollExists = registeredMembers.some(
      (m) => m.rollNumber.toLowerCase() === formData.rollNumber.trim().toLowerCase()
    );

    if (emailExists || rollExists) {
      setErrorMsg(
        'An account with this Email or Student ID / Roll Number is already registered. Please log in instead.'
      );
      return;
    }

    setSubmitting(true);
    try {
      const passwordHash = await hashPassword(formData.password);
      const newMemberProfile = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        rollNumber: formData.rollNumber.trim().toUpperCase(),
        department: formData.department,
        degree: formData.degree,
        yearOfStudy: formData.yearOfStudy,
        phone: formData.phone.trim(),
        passwordHash,
        photoUrl: formData.photoUrl,
        skills: formData.skills,
        bio: formData.bio,
        linkedin: formData.linkedin,
        github: formData.github,
        emailVerified: true,
        role: 'Club Member'
      };
      await onRegisterSuccess(newMemberProfile);
    } catch {
      setErrorMsg('Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="rounded-3xl bg-[#0A1228] border border-cyan-500/30 p-6 sm:p-10 shadow-2xl">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300">
            Student Membership Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Join DATRIQ – Data Science Club
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Official Student Registration for St. Joseph's University. Receive your digital membership ID card and priority access to workshops and hackathons.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5 text-xs">
          {/* Row 1: Full Name & College Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Karthik Subramanian"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-cyan-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">
                College Email or Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="student@sju.edu.in"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-cyan-400 outline-none"
              />
            </div>
          </div>

          {/* Row 2: Roll Number & Phone Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">
                Student ID / Roll Number *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 24UDS104"
                value={formData.rollNumber}
                onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-cyan-400 outline-none uppercase"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-cyan-400 outline-none"
              />
            </div>
          </div>

          {/* Row 3: Department, Degree, Year of Study */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Department *</label>
              <input
                type="text"
                required
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-cyan-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Degree / Course *</label>
              <input
                type="text"
                required
                placeholder="B.Sc. / BCA / M.Sc."
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-cyan-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Year of Study *</label>
              <select
                value={formData.yearOfStudy}
                onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-cyan-400 outline-none"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="Postgraduate (PG)">Postgraduate (PG)</option>
              </select>
            </div>
          </div>

          {/* Row 4: Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-slate-300 font-semibold mb-1.5">Password *</label>
              <input
                type={showPass ? 'text' : 'password'}
                required
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-cyan-400 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-9 text-slate-400 hover:text-white"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">
                Confirm Password *
              </label>
              <input
                type={showPass ? 'text' : 'password'}
                required
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-cyan-400 outline-none"
              />
            </div>
          </div>

          {/* Optional Fields Section */}
          <div className="pt-3 border-t border-slate-800 space-y-4">
            <p className="text-cyan-400 font-bold uppercase tracking-wider text-[11px]">
              Optional Technical Profile & Social Links
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  Skills & Experience (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Python, SQL, Machine Learning, PowerBI..."
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  Profile Picture Upload (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      try {
                        const dataUrl = await compressImageFile(file, 400, 400, false);
                        setFormData({ ...formData, photoUrl: dataUrl });
                      } catch {
                        showNotification('Failed to process image', 'error');
                      }
                    }
                  }}
                  className="w-full text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:bg-cyan-500/20 file:text-cyan-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">
                Short Introduction / Bio (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Tell us about your interest in Data Science & AI..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  LinkedIn Profile URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/..."
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  GitHub Profile URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/..."
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
            </div>
          </div>

          {/* Agreement Checkbox */}
          <div className="pt-2 flex items-start gap-2.5">
            <input
              type="checkbox"
              id="agreeRules"
              checked={formData.agreedToRules}
              onChange={(e) => setFormData({ ...formData, agreedToRules: e.target.checked })}
              className="mt-0.5 rounded border-slate-700"
            />
            <label htmlFor="agreeRules" className="text-slate-300 leading-relaxed">
              I agree to the{' '}
              <button
                type="button"
                onClick={onOpenRulesModal}
                className="text-cyan-400 underline font-semibold"
              >
                DATRIQ Club Membership Rules and Privacy Policy
              </button>{' '}
              of St. Joseph's University. *
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/20 transition-all"
          >
            {submitting ? 'Encrypting & Creating Membership...' : 'Complete Student Registration'}
          </button>

          <p className="text-center text-slate-400 pt-2">
            Already a registered member?{' '}
            <button
              type="button"
              onClick={() => navigateTo('login')}
              className="text-cyan-400 font-bold hover:underline"
            >
              Sign in here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
