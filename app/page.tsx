"use client";

import React, { useState } from 'react';

export default function TrackSyDashboard() {
  const [syllabusData, setSyllabusData] = useState([
    {
      id: 1,
      subject: "Math",
      icon: "functions",
      topic: "Calculus: Limits & Derivatives",
      status: "Completed",
      theme: { bg: "bg-[#f59e0b]/20", text: "text-[#855300]", statusBg: "bg-[#d3eabe]/30", statusText: "text-[#576a47]" }
    },
    {
      id: 2,
      subject: "Biology",
      icon: "biotech",
      topic: "Cell Structure and Function",
      status: "In Progress",
      theme: { bg: "bg-[#e99f87]/20", text: "text-[#894f3b]", statusBg: "bg-[#f59e0b]/30", statusText: "text-[#613b00]" }
    }
  ]);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <style>{`
        body { font-family: 'Geist', sans-serif; background-color: #fbf9f5; }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .tonal-card {
            background-color: #ffffff;
            box-shadow: 0 10px 40px -10px rgba(133, 83, 0, 0.04);
            border: 1px solid rgba(216, 195, 173, 0.3);
            transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .tonal-card:hover {
            transform: translateY(-2px);
            border-color: #f59e0b;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e4e2de; border-radius: 10px; }
      `}</style>

      <div className="text-[#1b1c1a]">
        {/* SideNavBar Anchor */}
        <nav className="h-screen w-64 fixed left-0 top-0 bg-[#f5f3ef] shadow-sm flex flex-col py-4 z-20">
          <div className="px-6 mb-10">
            <h1 className="text-2xl font-bold text-[#855300]">TrackSy</h1>
            <p className="text-sm text-[#534434]">Study Smart</p>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <a className="flex items-center gap-4 px-6 py-3 transition-colors duration-200 hover:text-[#855300] text-[#855300] font-bold border-r-4 border-[#855300] active:scale-95" href="#">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="text-sm">Dashboard</span>
            </a>
            <a className="flex items-center gap-4 px-6 py-3 transition-colors duration-200 hover:text-[#855300] text-[#534434] active:scale-95" href="#">
              <span className="material-symbols-outlined">menu_book</span>
              <span className="text-sm">Syllabus</span>
            </a>
            <a className="flex items-center gap-4 px-6 py-3 transition-colors duration-200 hover:text-[#855300] text-[#534434] active:scale-95" href="#">
              <span className="material-symbols-outlined">timer</span>
              <span className="text-sm">Study Sessions</span>
            </a>
            <a className="flex items-center gap-4 px-6 py-3 transition-colors duration-200 hover:text-[#855300] text-[#534434] active:scale-95" href="#">
              <span className="material-symbols-outlined">check_circle</span>
              <span className="text-sm">Tasks</span>
            </a>
          </div>
          <div className="px-4 mb-4">
            <button className="w-full bg-[#855300] text-white py-3 rounded-xl text-sm shadow-sm transition-all hover:bg-[#653e00] active:scale-95">
              Start Session
            </button>
          </div>
          <div className="mt-auto border-t border-[#d8c3ad] pt-4 flex flex-col gap-1">
            <a className="flex items-center gap-4 px-6 py-3 transition-colors duration-200 hover:text-[#855300] text-[#534434] active:scale-95" href="#">
              <span className="material-symbols-outlined">settings</span>
              <span className="text-sm">Settings</span>
            </a>
            <a className="flex items-center gap-4 px-6 py-3 transition-colors duration-200 hover:text-[#855300] text-[#534434] active:scale-95" href="#">
              <span className="material-symbols-outlined">help_outline</span>
              <span className="text-sm">Help</span>
            </a>
          </div>
        </nav>

        {/* TopAppBar Anchor */}
        <header className="fixed top-0 right-0 w-[calc(100%-16rem)] z-10 bg-[#fbf9f5] border-b border-[#d8c3ad] flex justify-between items-center px-6 h-16 ml-64">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <a className="text-base text-[#855300] font-bold border-b-2 border-[#855300] transition-all duration-200" href="#">Focus Mode</a>
              <a className="text-base text-[#534434] hover:text-[#855300] transition-all duration-200" href="#">Resources</a>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-1 justify-end">
            <div className="relative w-64 mr-4 focus-within:ring-2 focus-within:ring-[#f59e0b] rounded-full">
              <input className="w-full bg-[#f5f3ef] border-none rounded-full py-2 pl-10 pr-4 text-base focus:outline-none transition-all" placeholder="Search sessions..." type="text" />
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#534434]" style={{ fontSize: '18px' }}>search</span>
            </div>
            <button className="bg-[#d3eabe] text-[#576a47] px-4 py-2 rounded-lg text-sm hover:opacity-80 active:opacity-60 transition-all">
              New Task
            </button>
            <div className="flex items-center gap-2 text-[#534434]">
              <button className="p-2 rounded-full hover:bg-[#eae8e4] transition-colors">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="p-2 rounded-full hover:bg-[#eae8e4] transition-colors">
                <span className="material-symbols-outlined">account_circle</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Canvas */}
        <main className="ml-64 pt-24 px-6 pb-10 min-h-screen">
          <div className="max-w-[1440px] mx-auto">
            
            {/* Welcome Header */}
            <div className="mb-10">
              <h2 className="text-4xl font-bold text-[#1b1c1a] mb-1">Welcome back, Alex!</h2>
              <p className="text-lg text-[#534434]">You've reached 85% of your weekly study goal. Keep the momentum!</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <div className="tonal-card rounded-xl p-6 flex flex-col justify-between min-h-[160px]">
                <div className="flex justify-between items-start">
                  <span className="text-sm text-[#534434]">Total Study Hours</span>
                  <div className="bg-[#f59e0b]/10 p-2 rounded-lg">
                    <span className="material-symbols-outlined text-[#855300]">schedule</span>
                  </div>
                </div>
                <div>
                  <p className="text-4xl font-bold text-[#1b1c1a]">42.5 <span className="text-xl font-normal text-[#534434]">hrs</span></p>
                  <p className="text-xs text-[#b7cea3] mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>trending_up</span> +12% from last week
                  </p>
                </div>
              </div>

              <div className="tonal-card rounded-xl p-6 flex flex-col justify-between min-h-[160px]">
                <div className="flex justify-between items-start">
                  <span className="text-sm text-[#534434]">Syllabus Completion %</span>
                  <div className="bg-[#d3eabe]/20 p-2 rounded-lg">
                    <span className="material-symbols-outlined text-[#516441]">auto_graph</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between items-end mb-1">
                    <p className="text-4xl font-bold text-[#1b1c1a]">65<span className="text-xl font-normal text-[#534434]">%</span></p>
                  </div>
                  <div className="w-full h-2 bg-[#eae8e4] rounded-full overflow-hidden">
                    <div className="h-full bg-[#f59e0b] rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>

              <div className="tonal-card rounded-xl p-6 flex flex-col justify-between min-h-[160px]">
                <div className="flex justify-between items-start">
                  <span className="text-sm text-[#534434]">Pending Revisions</span>
                  <div className="bg-[#e99f87]/20 p-2 rounded-lg">
                    <span className="material-symbols-outlined text-[#894f3b]">history_edu</span>
                  </div>
                </div>
                <div>
                  <p className="text-4xl font-bold text-[#1b1c1a]">12 <span className="text-xl font-normal text-[#534434]">items</span></p>
                  <button className="text-sm text-[#855300] mt-1 hover:underline flex items-center gap-1">
                    View all items <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bento Layout Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 tonal-card rounded-xl overflow-hidden flex flex-col">
                <div className="p-6 border-b border-[#d8c3ad] flex justify-between items-center bg-[#ffffff]">
                  <h3 className="text-xl font-medium text-[#1b1c1a]">Syllabus Quick-View</h3>
                  <button className="text-[#534434] hover:text-[#855300]">
                    <span className="material-symbols-outlined">more_horiz</span>
                  </button>
                </div>
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left">
                    <thead className="bg-[#f5f3ef] text-[#534434] text-sm">
                      <tr>
                        <th className="px-6 py-4 font-medium">Subject</th>
                        <th className="px-6 py-4 font-medium">Topic</th>
                        <th className="px-6 py-4 font-medium text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#d8c3ad] text-base">
                      {syllabusData.map((item) => (
                        <tr key={item.id} className="hover:bg-[#f5f3ef] transition-colors">
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded ${item.theme.bg} flex items-center justify-center`}>
                                <span className={`material-symbols-outlined ${item.theme.text}`} style={{ fontSize: '18px' }}>{item.icon}</span>
                              </div>
                              {item.subject}
                            </div>
                          </td>
                          <td className="px-6 py-5 text-[#534434]">{item.topic}</td>
                          <td className="px-6 py-5 text-right">
                            <span className={`px-3 py-1 rounded-full ${item.theme.statusBg} ${item.theme.statusText} text-xs font-medium`}>{item.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>                  
                  </table>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="tonal-card rounded-xl p-6 bg-gradient-to-br from-[#f5f3ef] to-[#efeeea] relative overflow-hidden h-[240px]">
                  <div className="relative z-10">
                    <h4 className="text-xl font-medium text-[#855300] mb-2">Focus Mode</h4>
                    <p className="text-base text-[#534434] mb-6">Enter a deep study state with curated ambient sounds.</p>
                    <button className="bg-white/80 backdrop-blur-sm border border-[#d8c3ad] px-6 py-2 rounded-full text-sm text-[#1b1c1a] hover:bg-white transition-all flex items-center gap-2">
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>play_arrow</span> Tune In
                    </button>
                  </div>
                </div>

                <div className="tonal-card rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm font-bold text-[#1b1c1a] uppercase tracking-wider">Next Priority</h4>
                    <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-pulse"></span>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full bg-[#ffddb8] flex-shrink-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#855300]">edit_note</span>
                    </div>
                    <div>
                      <h5 className="text-lg font-medium text-[#1b1c1a]">Bio Report Finalizing</h5>
                      <p className="text-xs text-[#534434] mt-1">Due Today, 5:00 PM</p>
                      <div className="mt-4 flex gap-2">
                        <span className="px-2 py-1 rounded bg-[#e99f87]/20 text-[#894f3b] text-[10px] font-bold uppercase tracking-tighter">High Priority</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
