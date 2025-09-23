import React, { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Courses from './components/Courses';
import Resources from './components/Resources';
import NoticeBoard from './components/NoticeBoard';
import Quiz from './components/Quiz';
import Teachers from './components/Teachers';
import Dashboard from './dashboard'; // make sure file name matches

export default function AppLayout() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div>
      <button
        className="md:hidden fixed top-4 left-4 z-30 bg-white rounded-full shadow-lg p-2"
        aria-label="Open navigation menu"
        onClick={() => setNavOpen(true)}
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="12" fill="#3B82F6"/>
          <rect x="7" y="9" width="10" height="2" rx="1" fill="#fff"/>
          <rect x="7" y="13" width="10" height="2" rx="1" fill="#fff"/>
        </svg>
      </button>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:relative top-0 left-0 h-full w-64 bg-white shadow-lg flex flex-col p-6 gap-6 z-40 transition-transform duration-300 ${navOpen ? 'translate-x-0 fixed' : '-translate-x-full fixed'} md:translate-x-0`}
        style={{ maxWidth: '100vw' }}
      >
        <div className="flex items-center gap-3 mb-8 mt-6">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold">RE</div>
          <div>
            <h1 className="text-lg font-semibold text-gray-800">Rural Education</h1>
            <p className="text-xs text-gray-500">Empowering rural classrooms</p>
          </div>
        </div>
        <nav className="flex flex-col gap-3">
          <NavLink to="/" end className={({isActive}) => isActive ? 'font-bold text-blue-600' : 'text-gray-700'} onClick={() => setNavOpen(false)}>Dashboard</NavLink>
          <NavLink to="/courses" className={({isActive}) => isActive ? 'font-bold text-blue-600' : 'text-gray-700'} onClick={() => setNavOpen(false)}>Courses</NavLink>
          <NavLink to="/resources" className={({isActive}) => isActive ? 'font-bold text-blue-600' : 'text-gray-700'} onClick={() => setNavOpen(false)}>Resources</NavLink>
          <NavLink to="/notices" className={({isActive}) => isActive ? 'font-bold text-blue-600' : 'text-gray-700'} onClick={() => setNavOpen(false)}>Notice Board</NavLink>
          <NavLink to="/quiz" className={({isActive}) => isActive ? 'font-bold text-blue-600' : 'text-gray-700'} onClick={() => setNavOpen(false)}>Quiz</NavLink>
          <NavLink to="/teachers" className={({isActive}) => isActive ? 'font-bold text-blue-600' : 'text-gray-700'} onClick={() => setNavOpen(false)}>Teachers</NavLink>
        </nav>
        <div className="mt-auto text-xs text-gray-400">Status: <span className="text-green-600">Online</span></div>
        {/* Close button for mobile nav */}
        <button
          className="md:hidden absolute top-4 right-4 bg-blue-100 rounded-full p-2"
          aria-label="Close navigation menu"
          onClick={() => setNavOpen(false)}
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="#3B82F6"/>
            <path stroke="#fff" strokeWidth="2" strokeLinecap="round" d="M8 8l8 8M16 8l-8 8"/>
          </svg>
        </button>
      </aside>
      </div>

      {navOpen && (
        <div className="fixed inset-0 bg-opacity-40 z-30 md:hidden" onClick={() => setNavOpen(false)}></div>
      )}

      {/* Main Content */}
      <div className='w-full'>
      <main className={`flex-1 p-4 mt-16 md:mt-0 md:p-10 transition-all blur-0 ${navOpen ? 'blur-sm' : ''}`}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/notices" element={<NoticeBoard />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/teachers" element={<Teachers />} />
        </Routes>
      </main>
      </div>
    </div>
  );
}