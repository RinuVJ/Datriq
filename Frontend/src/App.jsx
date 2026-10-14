import { useState, useEffect, useMemo, useRef } from 'react';
import { Database, Brain, Cpu, Code2, BarChart3, Trophy, Image as ImageIcon, Mail, Phone, MapPin, Shield, CheckCircle2, AlertCircle, ChevronRight, X, Settings } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { INITIAL_TEAM_MEMBERS, INITIAL_EVENTS, INITIAL_PROJECTS, INITIAL_GALLERY, INITIAL_TESTIMONIALS } from './pages/data.js';
import { DatriqLogo, CollegeLogoBadge } from './pages/components.jsx';
import { HomePage } from './pages/home.jsx';
import { AboutPage } from './pages/abt.jsx';
import { TeamPage } from './pages/team.jsx';
import { EventsPage } from './pages/events.jsx';
import { EventCalendarPage } from './pages/eventscalender.jsx';
import { GalleryPage } from './pages/gallery.jsx';
import { JoinClubPage } from './pages/join.jsx';
import { MemberProfilePage } from './pages/profile.jsx';
import { ContactPage } from './pages/contact.jsx';
import { AdminDashboard, AdminPasswordGate } from './pages/adminlogin.jsx';
import { EventRegistrationModal, DigitalIdCardModal } from './pages/modals.jsx';
import { Navbar } from './Navbar.jsx';

const appId = globalThis.__app_id || 'datriq-sju-club';
let auth = null;
let db = null;

try {
  if (globalThis.__firebase_config) {
    const firebaseConfig = JSON.parse(globalThis.__firebase_config);
    if (firebaseConfig && firebaseConfig.apiKey) {
      const firebaseApp = initializeApp(firebaseConfig);
      auth = getAuth(firebaseApp);
      db = getFirestore(firebaseApp);
    }
  }
} catch (err) {
  console.warn('Firebase initialization fallback active:', err);
}

export default function App() {
  // Navigation & UI State
  const [activePage, setActivePage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Firebase Auth & Sync State
  const [firebaseUser, setFirebaseUser] = useState(null);
  const eventSeedMigrationStarted = useRef(false);

  // Logged-in Club Member / Admin Session State
  const [currentUser, setCurrentUser] = useState(null);
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);

  // Core Database Collections State (Synced with Firestore)
  const [branding, setBranding] = useState({
    datriqLogoUrl: '',
    collegeLogoUrl: '',
    clubEmail: 'datriq.club@sju.edu.in',
    clubPhone: '+91 98400 12345',
    clubLocation: 'Department of Data Science, St. Joseph\'s University',
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    instagramUrl: 'https://instagram.com'
  });
  const [teamMembers, setTeamMembers] = useState(INITIAL_TEAM_MEMBERS);
  const [registeredMembers, setRegisteredMembers] = useState([]);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [eventRegistrations, setEventRegistrations] = useState([]);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [gallery, setGallery] = useState(INITIAL_GALLERY);
  const [testimonials, setTestimonials] = useState(INITIAL_TESTIMONIALS);
  const [inquiries, setInquiries] = useState([]);

  // Modals State
  const [selectedEventForReg, setSelectedEventForReg] = useState(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState(null);
  const [rulesModalOpen, setRulesModalOpen] = useState(false);
  const [memberIdCardModalOpen, setMemberIdCardModalOpen] = useState(false);

  // Helper to show non-blocking toast notifications (Never uses alert())
  const showNotification = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((prev) => (prev && prev.message === message ? null : prev));
    }, 4500);
  };

  // ============================================================================
  // FIREBASE AUTHENTICATION & REAL-TIME FIRESTORE LISTENERS
  // ============================================================================
  useEffect(() => {
    if (!auth) {
      return;
    }

    const initAuth = async () => {
      try {
        if (globalThis.__initial_auth_token) {
          await signInWithCustomToken(auth, globalThis.__initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) {
        console.warn('Auth sign-in fallback:', err);
      }
    };

    initAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!db || !firebaseUser) return;

    // 1. Branding Settings Listener
    const brandingDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'settings', 'branding');
    const unsubBranding = onSnapshot(
      brandingDocRef,
      (snap) => {
        if (snap.exists()) {
          setBranding((prev) => ({ ...prev, ...snap.data() }));
        }
      },
      (err) => console.warn('Branding sync warning:', err)
    );

    // 2. Team Leadership Members Listener (Seeds exact leadership if empty)
    const teamColRef = collection(db, 'artifacts', appId, 'public', 'data', 'team_members');
    const unsubTeam = onSnapshot(
      teamColRef,
      (snap) => {
        if (snap.empty) {
          INITIAL_TEAM_MEMBERS.forEach((member) => {
            setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'team_members', member.id), member).catch(() => {});
          });
        } else {
          const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          list.sort((a, b) => (a.order || 99) - (b.order || 99));
          setTeamMembers(list);
        }
      },
      (err) => console.warn('Team sync warning:', err)
    );

    // 3. Registered Student Members Listener
    const membersColRef = collection(db, 'artifacts', appId, 'public', 'data', 'registered_members');
    const unsubMembers = onSnapshot(
      membersColRef,
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setRegisteredMembers(list);
      },
      (err) => console.warn('Members sync warning:', err)
    );

    // 4. Events Listener
    const eventsColRef = collection(db, 'artifacts', appId, 'public', 'data', 'events');
    const unsubEvents = onSnapshot(
      eventsColRef,
      (snap) => {
        if (snap.empty) {
          INITIAL_EVENTS.forEach((evt) => {
            setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'events', evt.id), evt).catch(() => {});
          });
        } else {
          const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          const legacySeedIds = new Set(['evt-1', 'evt-2', 'evt-3', 'evt-4']);
          const existingIds = new Set(list.map((event) => event.id));
          const missingActivities = INITIAL_EVENTS.filter((event) => !existingIds.has(event.id));
          const legacySeeds = list.filter((event) => legacySeedIds.has(event.id));

          if ((missingActivities.length || legacySeeds.length) && !eventSeedMigrationStarted.current) {
            eventSeedMigrationStarted.current = true;
            missingActivities.forEach((event) => {
              setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'events', event.id), event).catch(() => {});
            });
            legacySeeds.forEach((event) => {
              deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'events', event.id)).catch(() => {});
            });
            setEvents(
              [...list.filter((event) => !legacySeedIds.has(event.id)), ...missingActivities]
                .sort((a, b) => new Date(a.date) - new Date(b.date))
            );
          } else {
            list.sort((a, b) => new Date(a.date) - new Date(b.date));
            setEvents(list);
          }
        }
      },
      (err) => console.warn('Events sync warning:', err)
    );

    // 5. Event Registrations Listener
    const regColRef = collection(db, 'artifacts', appId, 'public', 'data', 'event_registrations');
    const unsubRegs = onSnapshot(
      regColRef,
      (snap) => {
        setEventRegistrations(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      },
      (err) => console.warn('Event registrations sync warning:', err)
    );

    // 6. Projects Listener
    const projColRef = collection(db, 'artifacts', appId, 'public', 'data', 'projects');
    const unsubProjs = onSnapshot(
      projColRef,
      (snap) => {
        if (snap.empty) {
          INITIAL_PROJECTS.forEach((proj) => {
            setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'projects', proj.id), proj).catch(() => {});
          });
        } else {
          setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        }
      },
      (err) => console.warn('Projects sync warning:', err)
    );

    // 7. Gallery Listener
    const galColRef = collection(db, 'artifacts', appId, 'public', 'data', 'gallery');
    const unsubGal = onSnapshot(
      galColRef,
      (snap) => {
        if (snap.empty) {
          INITIAL_GALLERY.forEach((item) => {
            setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'gallery', item.id), item).catch(() => {});
          });
        } else {
          setGallery(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        }
      },
      (err) => console.warn('Gallery sync warning:', err)
    );

    // 8. Testimonials Listener
    const testColRef = collection(db, 'artifacts', appId, 'public', 'data', 'testimonials');
    const unsubTest = onSnapshot(
      testColRef,
      (snap) => {
        if (snap.empty) {
          INITIAL_TESTIMONIALS.forEach((item) => {
            setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'testimonials', item.id), item).catch(() => {});
          });
        } else {
          setTestimonials(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        }
      },
      (err) => console.warn('Testimonials sync warning:', err)
    );

    // 9. Contact Inquiries Listener
    const inqColRef = collection(db, 'artifacts', appId, 'public', 'data', 'inquiries');
    const unsubInq = onSnapshot(
      inqColRef,
      (snap) => {
        setInquiries(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      },
      (err) => console.warn('Inquiries sync warning:', err)
    );

    return () => {
      unsubBranding();
      unsubTeam();
      unsubMembers();
      unsubEvents();
      unsubRegs();
      unsubProjs();
      unsubGal();
      unsubTest();
      unsubInq();
    };
  }, [firebaseUser]);

  // ============================================================================
  // REAL-TIME DATABASE STATISTICS (Strictly computed from actual DB records)
  // ============================================================================
  const liveStats = useMemo(() => {
    const totalRegisteredMembers = teamMembers.length + registeredMembers.length;
    const totalEvents = events.length;
    const totalWorkshops = events.filter(
      (e) => e.category && e.category.toLowerCase().includes('workshop')
    ).length;
    const totalProjects = projects.length;

    return {
      totalRegisteredMembers,
      leadershipCount: teamMembers.length,
      studentMemberCount: registeredMembers.length,
      totalEvents,
      totalWorkshops,
      totalProjects
    };
  }, [teamMembers, registeredMembers, events, projects]);

  // ============================================================================
  // DATABASE MUTATION HANDLERS (WITH AUTOMATIC IN-MEMORY + FIRESTORE SYNC)
  // ============================================================================
  const saveBrandingSettings = async (updatedBranding) => {
    const merged = { ...branding, ...updatedBranding };
    setBranding(merged);
    if (db && firebaseUser) {
      await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'settings', 'branding'), merged);
    }
    showNotification('Club branding & logos saved to database!');
  };

  const saveTeamMember = async (memberData, isEdit = false) => {
    const id = memberData.id || `leader-${Date.now()}`;
    const payload = {
      ...memberData,
      id,
      order: Number(memberData.order) || teamMembers.length + 1
    };

    setTeamMembers((prev) => {
      const filtered = prev.filter((m) => m.id !== id);
      return [...filtered, payload].sort((a, b) => (a.order || 99) - (b.order || 99));
    });

    if (db && firebaseUser) {
      await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'team_members', id), payload);
    }
    showNotification(isEdit ? `Updated ${payload.name}'s profile` : `Added ${payload.name} to DATRIQ Team`);
  };

  const deleteTeamMember = async (id, name) => {
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
    if (db && firebaseUser) {
      await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'team_members', id));
    }
    showNotification(`Removed ${name} from team directory`, 'info');
  };

  const reorderTeamMember = async (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= teamMembers.length) return;

    const updated = [...teamMembers];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    const reindexed = updated.map((item, idx) => ({ ...item, order: idx + 1 }));
    setTeamMembers(reindexed);

    if (db && firebaseUser) {
      for (const item of reindexed) {
        await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'team_members', item.id), item);
      }
    }
    showNotification('Team display order updated!');
  };

  const saveEvent = async (eventData, isEdit = false) => {
    const id = eventData.id || `evt-${Date.now()}`;
    const payload = { ...eventData, id };
    setEvents((prev) => {
      const filtered = prev.filter((e) => e.id !== id);
      return [payload, ...filtered].sort((a, b) => new Date(a.date) - new Date(b.date));
    });
    if (db && firebaseUser) {
      await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'events', id), payload);
    }
    showNotification(isEdit ? 'Event updated successfully!' : 'New event published to DATRIQ calendar!');
  };

  const deleteEvent = async (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    if (db && firebaseUser) {
      await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'events', id));
    }
    showNotification('Event deleted from database', 'info');
  };

  const registerForEvent = async (eventItem, attendeeDetails) => {
    const alreadyRegistered = eventRegistrations.some(
      (r) =>
        r.eventId === eventItem.id &&
        (r.email.toLowerCase() === attendeeDetails.email.toLowerCase() ||
          r.rollNumber.toLowerCase() === attendeeDetails.rollNumber.toLowerCase())
    );
    if (alreadyRegistered) {
      showNotification('You are already registered for this event!', 'error');
      return false;
    }

    const regId = `reg-${Date.now()}`;
    const payload = {
      id: regId,
      eventId: eventItem.id,
      eventTitle: eventItem.title,
      eventDate: eventItem.date,
      ...attendeeDetails,
      registeredAt: new Date().toISOString()
    };

    setEventRegistrations((prev) => [...prev, payload]);
    if (db && firebaseUser) {
      await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'event_registrations', regId), payload);
    }
    showNotification(`Successfully registered for ${eventItem.title}!`);
    setSelectedEventForReg(null);
    return true;
  };

  const saveProject = async (projectData) => {
    const id = projectData.id || `proj-${Date.now()}`;
    const payload = { ...projectData, id };
    setProjects((prev) => [...prev.filter((p) => p.id !== id), payload]);
    if (db && firebaseUser) {
      await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'projects', id), payload);
    }
    showNotification('Club project saved to database!');
  };

  const deleteProject = async (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (db && firebaseUser) {
      await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'projects', id));
    }
    showNotification('Project removed', 'info');
  };

  const saveGalleryItem = async (itemData) => {
    const id = itemData.id || `gal-${Date.now()}`;
    const payload = { ...itemData, id };
    setGallery((prev) => [payload, ...prev.filter((g) => g.id !== id)]);
    if (db && firebaseUser) {
      await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'gallery', id), payload);
    }
    showNotification('Photo added to DATRIQ Gallery!');
  };

  const deleteGalleryItem = async (id) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
    if (db && firebaseUser) {
      await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'gallery', id));
    }
    showNotification('Gallery item removed', 'info');
  };

  // Navigation Handler
  const navigateTo = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Public navigation items
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About DATRIQ' },
    { id: 'team', label: 'Our Team' },
    { id: 'events', label: 'Events' },
    { id: 'calendar', label: 'Event Calendar' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'join', label: 'Join the Club' },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <div className="min-h-screen bg-[#050914] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 flex flex-col relative overflow-x-hidden">
      {/* Ambient Background Neural Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      {/* Global Toast Notification Banner */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md animate-bounce">
          <div
            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-xl ${
              toast.type === 'error'
                ? 'bg-red-950/90 border-red-500/50 text-red-200'
                : toast.type === 'info'
                ? 'bg-slate-900/95 border-cyan-500/40 text-cyan-200'
                : 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            )}
            <span className="text-sm font-medium">{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-2 text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <Navbar
        activePage={activePage}
        branding={branding}
        navItems={navItems}
        currentUser={currentUser}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        userDropdownOpen={userDropdownOpen}
        setUserDropdownOpen={setUserDropdownOpen}
        setMemberIdCardModalOpen={setMemberIdCardModalOpen}
        setCurrentUser={setCurrentUser}
        showNotification={showNotification}
        navigateTo={navigateTo}
      />

      {/* ==================================================================== */}
      {/* DYNAMIC VIEW ROUTER */}
      {/* ==================================================================== */}
      <main className="flex-1 relative z-10">
        {activePage === 'home' && (
          <HomePage
            branding={branding}
            liveStats={liveStats}
            events={events}
            teamMembers={teamMembers}
            projects={projects}
            gallery={gallery}
            testimonials={testimonials}
            navigateTo={navigateTo}
            onSelectEventForReg={setSelectedEventForReg}
            onSelectGalleryItem={setSelectedGalleryItem}
            onSubmitInquiry={async (inq) => {
              const id = `inq-${Date.now()}`;
              const payload = { ...inq, id, createdAt: new Date().toISOString() };
              setInquiries((prev) => [payload, ...prev]);
              if (db && firebaseUser) {
                await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'inquiries', id), payload);
              }
              showNotification('Your message has been sent to the DATRIQ team!');
            }}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            branding={branding}
            liveStats={liveStats}
            projects={projects}
            navigateTo={navigateTo}
          />
        )}

        {activePage === 'team' && (
          <TeamPage
            teamMembers={teamMembers}
            registeredMembers={registeredMembers}
            isAdmin={adminAuthenticated}
            onSaveMember={saveTeamMember}
            onDeleteMember={deleteTeamMember}
            onReorderMember={reorderTeamMember}
            showNotification={showNotification}
          />
        )}

        {activePage === 'events' && (
          <EventsPage
            events={events}
            eventRegistrations={eventRegistrations}
            currentUser={currentUser}
            onSelectEventForReg={setSelectedEventForReg}
            onNavigateToAdmin={() => navigateTo('admin')}
          />
        )}

        {activePage === 'calendar' && (
          <EventCalendarPage
            events={events}
            onSelectEventForReg={setSelectedEventForReg}
          />
        )}

        {activePage === 'gallery' && (
          <GalleryPage
            gallery={gallery}
            onSelectGalleryItem={setSelectedGalleryItem}
            onSaveGalleryItem={saveGalleryItem}
            showNotification={showNotification}
          />
        )}

        {activePage === 'join' && (
          <JoinClubPage
            registeredMembers={registeredMembers}
            teamMembers={teamMembers}
            onOpenRulesModal={() => setRulesModalOpen(true)}
            onRegisterSuccess={async (newMember) => {
              const id = `mem-${Date.now()}`;
              const payload = { ...newMember, id, joinedAt: new Date().toISOString() };
              setRegisteredMembers((prev) => [...prev, payload]);
              if (db && firebaseUser) {
                await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'registered_members', id), payload);
              }
              setCurrentUser(payload);
              showNotification(`Welcome to DATRIQ, ${newMember.fullName}! Your membership is active.`);
              navigateTo('profile');
            }}
            showNotification={showNotification}
          />
        )}

        {activePage === 'profile' && (
          <MemberProfilePage
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            eventRegistrations={eventRegistrations}
            onUpdateMember={async (updated) => {
              setCurrentUser(updated);
              setRegisteredMembers((prev) =>
                prev.map((m) => (m.id === updated.id ? updated : m))
              );
              if (db && firebaseUser && updated.id) {
                await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'registered_members', updated.id), updated);
              }
              showNotification('Member profile updated!');
            }}
            onOpenIdCard={() => setMemberIdCardModalOpen(true)}
            navigateTo={navigateTo}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage
            branding={branding}
            onSubmitInquiry={async (inq) => {
              const id = `inq-${Date.now()}`;
              const payload = { ...inq, id, createdAt: new Date().toISOString() };
              setInquiries((prev) => [payload, ...prev]);
              if (db && firebaseUser) {
                await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'inquiries', id), payload);
              }
              showNotification('Thank you! Your inquiry has been recorded.');
            }}
          />
        )}

        {activePage === 'admin' && (
          !adminAuthenticated ? (
            <AdminPasswordGate onUnlock={() => setAdminAuthenticated(true)} />
          ) : (
          <AdminDashboard
            onLockAdmin={() => {
              setAdminAuthenticated(false);
              navigateTo('home');
            }}
            branding={branding}
            onSaveBranding={saveBrandingSettings}
            teamMembers={teamMembers}
            onSaveTeamMember={saveTeamMember}
            onDeleteTeamMember={deleteTeamMember}
            onReorderTeamMember={reorderTeamMember}
            registeredMembers={registeredMembers}
            onDeleteRegisteredMember={async (id) => {
              setRegisteredMembers((prev) => prev.filter((m) => m.id !== id));
              if (db && firebaseUser) {
                await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'registered_members', id));
              }
              showNotification('Student member record removed', 'info');
            }}
            events={events}
            onSaveEvent={saveEvent}
            onDeleteEvent={deleteEvent}
            eventRegistrations={eventRegistrations}
            projects={projects}
            onSaveProject={saveProject}
            onDeleteProject={deleteProject}
            gallery={gallery}
            onSaveGalleryItem={saveGalleryItem}
            onDeleteGalleryItem={deleteGalleryItem}
            testimonials={testimonials}
            onSaveTestimonial={async (t) => {
              const id = t.id || `test-${Date.now()}`;
              const payload = { ...t, id };
              setTestimonials((prev) => [...prev.filter((item) => item.id !== id), payload]);
              if (db && firebaseUser) {
                await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'testimonials', id), payload);
              }
              showNotification('Testimonial saved!');
            }}
            onDeleteTestimonial={async (id) => {
              setTestimonials((prev) => prev.filter((t) => t.id !== id));
              if (db && firebaseUser) {
                await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'testimonials', id));
              }
              showNotification('Testimonial deleted', 'info');
            }}
            inquiries={inquiries}
            showNotification={showNotification}
          />
          )
        )}
      </main>

      {/* ==================================================================== */}
      {/* PROFESSIONAL DUAL-LOGO FOOTER */}
      {/* ==================================================================== */}
      <footer className="relative z-10 bg-[#03060E] border-t border-cyan-500/20 pt-14 pb-8 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
            {/* Column 1: Dual Logos & Identity */}
            <div className="space-y-4">
              <DatriqLogo customLogoUrl={branding.datriqLogoUrl} size="md" showTagline={true} />
              <div className="pt-1">
                <CollegeLogoBadge
                  customCollegeLogoUrl={branding.collegeLogoUrl}
                  size="sm"
                />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                DATRIQ – Data Science Club is the official student-driven community for Data Science, Artificial Intelligence, Machine Learning, and Analytics at St. Joseph's University.
              </p>
            </div>

            {/* Column 2: Quick Navigation */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Platform Navigation
              </h4>
              <ul className="space-y-2.5 text-xs">
                {navItems.slice(0, 6).map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => navigateTo(item.id)}
                      className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-cyan-500" /> {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Core Technical Domains */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Core Club Domains
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-cyan-400" /> Data Science & Big Data
                </li>
                <li className="flex items-center gap-2">
                  <Brain className="w-3.5 h-3.5 text-purple-400" /> Artificial Intelligence & LLMs
                </li>
                <li className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-blue-400" /> Machine Learning & MLOps
                </li>
                <li className="flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5 text-emerald-400" /> Python & R Scientific Computing
                </li>
                <li className="flex items-center gap-2">
                  <BarChart3 className="w-3.5 h-3.5 text-amber-400" /> Business & Data Analytics
                </li>
                <li className="flex items-center gap-2">
                  <Trophy className="w-3.5 h-3.5 text-pink-400" /> National AI Hackathons
                </li>
              </ul>
            </div>

            {/* Column 4: Contact & Admin Portal */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Connect With DATRIQ
              </h4>
              <p className="text-xs flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{branding.clubLocation}</span>
              </p>
              <p className="text-xs flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{branding.clubEmail}</span>
              </p>
              <p className="text-xs flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{branding.clubPhone}</span>
              </p>
              <div className="pt-3 flex items-center gap-2">
                <button
                  onClick={() => navigateTo('admin')}
                  className="px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-medium flex items-center gap-1.5"
                >
                  <Settings className="w-3.5 h-3.5" /> Admin
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>
              © {new Date().getFullYear()} <strong className="text-slate-300">DATRIQ – Data Science Club</strong>, St. Joseph's University. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <button onClick={() => setRulesModalOpen(true)} className="hover:text-cyan-400">
                Membership Rules & Privacy Policy
              </button>
              <span>•</span>
              <span className="text-cyan-400/80 font-mono">RAW DATA RARE INTELLIGENCE</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ==================================================================== */}
      {/* GLOBAL MODALS */}
      {/* ==================================================================== */}

      {/* 1. Event Registration Modal */}
      {selectedEventForReg && (
        <EventRegistrationModal
          event={selectedEventForReg}
          currentUser={currentUser}
          onClose={() => setSelectedEventForReg(null)}
          onSubmit={(attendee) => registerForEvent(selectedEventForReg, attendee)}
        />
      )}

      {/* 3. Gallery Lightbox Modal */}
      {selectedGalleryItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-3xl w-full bg-[#0B132B] border border-cyan-500/30 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-4 flex items-center justify-between border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">
                  {selectedGalleryItem.category}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{selectedGalleryItem.title}</h3>
              </div>
              <button
                onClick={() => setSelectedGalleryItem(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex flex-col items-center">
              {selectedGalleryItem.imageUrl ? (
                <img
                  src={selectedGalleryItem.imageUrl}
                  alt={selectedGalleryItem.title}
                  className="max-h-[60vh] w-auto object-contain rounded-2xl border border-slate-700"
                />
              ) : (
                <div className="w-full h-72 rounded-2xl bg-gradient-to-br from-slate-900 via-cyan-950/40 to-purple-950/40 border border-cyan-500/30 flex flex-col items-center justify-center p-6 text-center">
                  <ImageIcon className="w-14 h-14 text-cyan-400 mb-3 opacity-80" />
                  <p className="text-base font-bold text-white">{selectedGalleryItem.title}</p>
                  <p className="text-xs text-slate-400 mt-1">{selectedGalleryItem.date}</p>
                </div>
              )}
              <p className="text-sm text-slate-300 mt-4 text-center max-w-xl">
                {selectedGalleryItem.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. Club Rules & Privacy Policy Modal */}
      {rulesModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-[#0B132B] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <Shield className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">
                  DATRIQ Membership Charter & Privacy Policy
                </h3>
              </div>
              <button
                onClick={() => setRulesModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4 py-5 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p className="font-semibold text-cyan-300">
                1. Academic Integrity & Collaborative Ethics
              </p>
              <p>
                All members of DATRIQ – Data Science Club at St. Joseph's University pledge to uphold responsible AI practices, open-source attribution, and collaborative peer learning during hackathons, workshops, and research projects.
              </p>
              <p className="font-semibold text-cyan-300">
                2. Member Data Privacy & Protection
              </p>
              <p>
                Student emails, phone numbers, and roll numbers collected through the registration portal are used strictly for official St. Joseph's University club communications, workshop certificates, and hackathon team verification. Member email addresses are kept private by default on public directories.
              </p>
              <p className="font-semibold text-cyan-300">
                3. Active Participation
              </p>
              <p>
                Registered members gain priority access to laboratory bootcamps, datasets, compute mentorship, and official DATRIQ digital credentials.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setRulesModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
              >
                I Understand & Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Digital Member ID Card Modal */}
      {memberIdCardModalOpen && currentUser && (
        <DigitalIdCardModal
          member={currentUser}
          branding={branding}
          onClose={() => setMemberIdCardModalOpen(false)}
        />
      )}
    </div>
  );
}
