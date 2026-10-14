import { useState } from 'react';
import { Users, Plus, X, Settings } from 'lucide-react';
import { MemberProfileCard } from './components.jsx';
import { compressImageFile } from './utils.js';

export function TeamPage({
  teamMembers,
  registeredMembers,
  isAdmin,
  onSaveMember,
  onDeleteMember,
  onReorderMember,
  showNotification
}) {
  const [activeTab, setActiveTab] = useState('leadership');
  const [adminEditMode, setAdminEditMode] = useState(isAdmin);
  const [editingMember, setEditingMember] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openAddModal = () => {
    setEditingMember({
      name: '',
      designation: 'Core Member',
      department: 'Department of Data Science',
      year: '2nd Year',
      bio: '',
      skills: 'Python, Data Science, Machine Learning',
      email: '',
      emailPublic: false,
      linkedin: '',
      github: '',
      photoUrl: '',
      order: teamMembers.length + 1
    });
    setModalOpen(true);
  };

  const openEditModal = (member) => {
    setEditingMember({
      ...member,
      skills: Array.isArray(member.skills) ? member.skills.join(', ') : member.skills || ''
    });
    setModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header & Admin Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
            Official Club Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Our Team & Club Members
          </h1>
          <p className="text-sm text-slate-400 mt-2 max-w-2xl">
            Meet the official leadership team and registered student members of DATRIQ – Data Science Club at St. Joseph's University.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setAdminEditMode(!adminEditMode)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold border flex items-center gap-2 transition-all ${
              adminEditMode
                ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-600/20'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-cyan-400'
            }`}
          >
            <Settings className="w-4 h-4" />
            {adminEditMode ? 'Exit Team Admin Mode' : 'Manage / Edit Team'}
          </button>

          {adminEditMode && (
            <button
              onClick={openAddModal}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" /> Add Team Member
            </button>
          )}
        </div>
      </div>

      {/* Directory Switcher Tabs */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab('leadership')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'leadership'
              ? 'bg-cyan-500 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          Executive Leadership ({teamMembers.length})
        </button>
        <button
          onClick={() => setActiveTab('students')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'students'
              ? 'bg-cyan-500 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          Registered Student Members ({registeredMembers.length})
        </button>
      </div>

      {activeTab === 'leadership' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <MemberProfileCard
              key={member.id}
              member={member}
              isAdmin={adminEditMode}
              isFirst={index === 0}
              isLast={index === teamMembers.length - 1}
              onEdit={() => openEditModal(member)}
              onDelete={() => onDeleteMember(member.id, member.name)}
              onMoveUp={() => onReorderMember(index, 'up')}
              onMoveDown={() => onReorderMember(index, 'down')}
            />
          ))}
        </div>
      ) : (
        <div>
          {registeredMembers.length === 0 ? (
            <div className="rounded-3xl bg-[#0A1228] border border-slate-800 p-12 text-center space-y-3">
              <Users className="w-12 h-12 text-cyan-400 mx-auto opacity-80" />
              <h3 className="text-lg font-bold text-white">No General Student Registrations Yet</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Students who register through the "Join the Club" portal will automatically appear here in real time.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {registeredMembers.map((stu) => (
                <MemberProfileCard
                  key={stu.id}
                  member={{
                    id: stu.id,
                    name: stu.fullName,
                    designation: `${stu.degree || 'Student'} • ${stu.RollNumber || stu.rollNumber}`,
                    department: stu.department,
                    year: stu.yearOfStudy,
                    bio: stu.bio || 'Registered Member of DATRIQ – Data Science Club.',
                    skills: stu.skills ? String(stu.skills).split(',') : ['Data Science'],
                    email: stu.email,
                    emailPublic: false,
                    linkedin: stu.linkedin,
                    github: stu.github,
                    photoUrl: stu.photoUrl
                  }}
                  isAdmin={adminEditMode}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal for Adding/Editing Leadership Member */}
      {modalOpen && editingMember && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-[#0B132B] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {editingMember.id ? 'Edit Team Member Profile' : 'Add New Team Member'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const skillsArray = String(editingMember.skills || '')
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean);
                onSaveMember(
                  {
                    ...editingMember,
                    skills: skillsArray
                  },
                  Boolean(editingMember.id)
                );
                setModalOpen(false);
              }}
              className="space-y-4 pt-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={editingMember.name}
                    onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Designation *</label>
                  <input
                    type="text"
                    required
                    value={editingMember.designation}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, designation: e.target.value })
                    }
                    placeholder="e.g. President, Secretary, Treasurer"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Department</label>
                  <input
                    type="text"
                    value={editingMember.department}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, department: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Year of Study</label>
                  <input
                    type="text"
                    value={editingMember.year}
                    onChange={(e) => setEditingMember({ ...editingMember, year: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Short Bio</label>
                <textarea
                  rows={2}
                  value={editingMember.bio}
                  onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Skills (Comma separated)
                </label>
                <input
                  type="text"
                  value={editingMember.skills}
                  onChange={(e) => setEditingMember({ ...editingMember, skills: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    value={editingMember.email}
                    onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={Boolean(editingMember.emailPublic)}
                      onChange={(e) =>
                        setEditingMember({ ...editingMember, emailPublic: e.target.checked })
                      }
                      className="rounded border-slate-700"
                    />
                    <span>Make Email Public on Card</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">LinkedIn URL</label>
                  <input
                    type="url"
                    value={editingMember.linkedin}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, linkedin: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={editingMember.github}
                    onChange={(e) => setEditingMember({ ...editingMember, github: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>

              {/* Profile Photo Upload */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Profile Photo Upload
                </label>
                <div className="flex items-center gap-4">
                  {editingMember.photoUrl && (
                    <img
                      src={editingMember.photoUrl}
                      alt="Preview"
                      className="w-12 h-12 rounded-xl object-cover border border-cyan-400"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        try {
                          const dataUrl = await compressImageFile(file, 400, 400, false);
                          setEditingMember({ ...editingMember, photoUrl: dataUrl });
                        } catch {
                          showNotification('Could not process image file', 'error');
                        }
                      }
                    }}
                    className="text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:text-cyan-300 file:font-semibold"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold"
                >
                  Save Member Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
