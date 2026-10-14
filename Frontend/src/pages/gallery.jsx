import { useState } from 'react';
import { Image as ImageIcon, Upload } from 'lucide-react';
import { compressImageFile } from './utils.js';

export function GalleryPage({ gallery, onSelectGalleryItem, onSaveGalleryItem, showNotification }) {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    category: 'Workshop',
    date: new Date().toISOString().slice(0, 10),
    description: '',
    imageUrl: ''
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
            Visual Archive
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            DATRIQ Event Gallery
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Snapshots from workshops, hackathons, and club milestones at St. Joseph's University.
          </p>
        </div>
        <button
          onClick={() => setUploadOpen(!uploadOpen)}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 self-start sm:self-auto"
        >
          <Upload className="w-4 h-4" /> Upload Event Photo
        </button>
      </div>

      {uploadOpen && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!newPhoto.title) return;
            onSaveGalleryItem(newPhoto);
            setNewPhoto({
              title: '',
              category: 'Workshop',
              date: new Date().toISOString().slice(0, 10),
              description: '',
              imageUrl: ''
            });
            setUploadOpen(false);
          }}
          className="p-6 rounded-3xl bg-[#0A1228] border border-cyan-500/40 space-y-4 text-xs"
        >
          <h3 className="text-base font-bold text-white">Add Photo to Club Gallery</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              required
              placeholder="Photo / Event Title *"
              value={newPhoto.title}
              onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
            />
            <select
              value={newPhoto.category}
              onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
            >
              <option value="Workshop">Workshop</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Symposium">Symposium</option>
              <option value="Community">Community</option>
            </select>
            <input
              type="date"
              value={newPhoto.date}
              onChange={(e) => setNewPhoto({ ...newPhoto, date: e.target.value })}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
            />
          </div>
          <textarea
            rows={2}
            placeholder="Caption or description..."
            value={newPhoto.description}
            onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
          />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  try {
                    const compressed = await compressImageFile(file, 800, 600, false);
                    setNewPhoto({ ...newPhoto, imageUrl: compressed });
                  } catch {
                    showNotification('Error processing photo', 'error');
                  }
                }
              }}
              className="text-slate-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:text-cyan-300"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold"
            >
              Publish Photo
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {gallery.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectGalleryItem(item)}
            className="cursor-pointer group rounded-3xl bg-[#0A1228] border border-slate-800 hover:border-cyan-500/40 overflow-hidden transition-all shadow-lg"
          >
            <div className="h-56 bg-gradient-to-br from-slate-900 via-cyan-950/50 to-purple-950/50 relative flex items-center justify-center overflow-hidden">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="text-center p-6">
                  <ImageIcon className="w-12 h-12 text-cyan-400/70 mx-auto mb-2" />
                  <span className="text-xs font-bold text-cyan-300">{item.category}</span>
                </div>
              )}
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between text-[11px] text-cyan-400 font-mono">
                <span>{item.category}</span>
                <span>{item.date}</span>
              </div>
              <h3 className="text-base font-bold text-white mt-1.5 group-hover:text-cyan-300">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
