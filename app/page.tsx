"use client";

import React, { useState, useEffect } from 'react';

interface SyllabusItem {
  id: number;
  subject: string;
  icon: string;
  topic: string;
  status: "Pending" | "In Progress" | "Completed";
  revisions: number;
  confidence: "Low" | "Medium" | "High";
  theme: { bg: string; text: string; statusBg: string; statusText: string };
}

interface TaskItem {
  id: number;
  text: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
  due: string;
}

interface SessionLog {
  id: number;
  subject: string;
  minutes: number;
  timestamp: string;
}

const INITIAL_SYLLABUS: SyllabusItem[] = [
  {
    id: 1,
    subject: "C Programming & DS",
    icon: "code",
    topic: "Pointers, Recursion & Binary Trees",
    status: "Completed",
    revisions: 2,
    confidence: "High",
    theme: { bg: "bg-[#10b981]/20", text: "text-[#065f46]", statusBg: "bg-[#d1fae5]", statusText: "text-[#065f46]" }
  },
  {
    id: 2,
    subject: "Theory of Computation",
    icon: "schema",
    topic: "DFA Minimization & Context-Free Grammars",
    status: "Completed",
    revisions: 1,
    confidence: "High",
    theme: { bg: "bg-[#8b5cf6]/20", text: "text-[#5b21b6]", statusBg: "bg-[#ede9fe]", statusText: "text-[#5b21b6]" }
  },
  {
    id: 3,
    subject: "DBMS",
    icon: "database",
    topic: "B+ Trees & Conflict Serializability",
    status: "In Progress",
    revisions: 0,
    confidence: "Medium",
    theme: { bg: "bg-[#f59e0b]/20", text: "text-[#855300]", statusBg: "bg-[#fef3c7]", statusText: "text-[#92400e]" }
  },
  {
    id: 4,
    subject: "Computer Networks",
    icon: "hub",
    topic: "TCP Flow/Congestion Control & Subnetting",
    status: "In Progress",
    revisions: 0,
    confidence: "Medium",
    theme: { bg: "bg-[#0ea5e9]/20", text: "text-[#0369a1]", statusBg: "bg-[#e0f2fe]", statusText: "text-[#0369a1]" }
  },
  {
    id: 5,
    subject: "Operating Systems",
    icon: "memory",
    topic: "Virtual Memory Paging & Semaphore Synchronization",
    status: "Pending",
    revisions: 0,
    confidence: "Low",
    theme: { bg: "bg-[#ef4444]/20", text: "text-[#991b1b]", statusBg: "bg-[#fee2e2]", statusText: "text-[#991b1b]" }
  },
  {
    id: 6,
    subject: "Comp. Org. & Arch.",
    icon: "developer_board",
    topic: "Pipeline Hazards & Cache Mapping Techniques",
    status: "Pending",
    revisions: 0,
    confidence: "Low",
    theme: { bg: "bg-[#6b7280]/20", text: "text-[#374151]", statusBg: "bg-[#f3f4f6]", statusText: "text-[#374151]" }
  }
];

const INITIAL_TASKS: TaskItem[] = [
  { id: 1, text: "Solve 20 GATE PYQs on B+ Trees", completed: false, priority: "High", due: "Today" },
  { id: 2, text: "Revise TCP 3-Way Handshake & Flow Control", completed: true, priority: "Medium", due: "Yesterday" },
  { id: 3, text: "Complete Paging & Translation Lookaside Buffer notes", completed: false, priority: "High", due: "Tomorrow" }
];

export default function TrackSyDashboard() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "syllabus" | "sessions" | "tasks">("dashboard");
  const [syllabusData, setSyllabusData] = useState<SyllabusItem[]>(INITIAL_SYLLABUS);
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [sessionLogs, setSessionLogs] = useState<SessionLog[]>([
    { id: 1, subject: "C Programming & DS", minutes: 50, timestamp: "Today, 10:30 AM" },
    { id: 2, subject: "DBMS", minutes: 25, timestamp: "Today, 12:00 PM" }
  ]);
  const [totalStudyMinutes, setTotalStudyMinutes] = useState(2550);
  const [isClient, setIsClient] = useState(false);

  const [newTaskInput, setNewTaskInput] = useState("");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("DBMS");
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [initialSessionMinutes, setInitialSessionMinutes] = useState(25);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedSyllabus = localStorage.getItem("tracksy_syllabus");
    if (savedSyllabus) {
      try { setSyllabusData(JSON.parse(savedSyllabus)); } catch (e) {}
    }
    const savedMinutes = localStorage.getItem("tracksy_study_minutes");
    if (savedMinutes) {
      setTotalStudyMinutes(parseFloat(savedMinutes) || 2550);
    }
    const savedTasks = localStorage.getItem("tracksy_tasks");
    if (savedTasks) {
      try { setTasks(JSON.parse(savedTasks)); } catch (e) {}
    }
    const savedLogs = localStorage.getItem("tracksy_logs");
    if (savedLogs) {
      try { setSessionLogs(JSON.parse(savedLogs)); } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("tracksy_syllabus", JSON.stringify(syllabusData));
      localStorage.setItem("tracksy_study_minutes", totalStudyMinutes.toString());
      localStorage.setItem("tracksy_tasks", JSON.stringify(tasks));
      localStorage.setItem("tracksy_logs", JSON.stringify(sessionLogs));
    }
  }, [syllabusData, totalStudyMinutes, tasks, sessionLogs, isClient]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
        setTotalStudyMinutes((prev) => prev + (1 / 60));
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      const newLog: SessionLog = {
        id: Date.now(),
        subject: selectedTopic,
        minutes: initialSessionMinutes,
        timestamp: "Just now"
      };
      setSessionLogs([newLog, ...sessionLogs]);
      alert(`🎉 Session complete! Logged ${initialSessionMinutes} mins of deep work on ${selectedTopic}.`);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const toggleTimer = () => setIsTimerRunning(!isTimerRunning);
  const resetTimer = (mins: number = 25) => {
    setIsTimerRunning(false);
    setInitialSessionMinutes(mins);
    setTimerSeconds(mins * 60);
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const toggleStatus = (id: number) => {
    setSyllabusData((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus: "Pending" | "In Progress" | "Completed" =
            item.status === "Pending" ? "In Progress" : item.status === "In Progress" ? "Completed" : "Pending";
          const statusBg =
            nextStatus === "Completed" ? "bg-[#d1fae5]" : nextStatus === "In Progress" ? "bg-[#fef3c7]" : "bg-[#fee2e2]";
          const statusText =
            nextStatus === "Completed" ? "text-[#065f46]" : nextStatus === "In Progress" ? "text-[#92400e]" : "text-[#991b1b]";
          return { ...item, status: nextStatus, theme: { ...item.theme, statusBg, statusText } };
        }
        return item;
      })
    );
  };

  const incrementRevision = (id: number) => {
    setSyllabusData(prev => prev.map(item => item.id === id ? { ...item, revisions: item.revisions + 1 } : item));
  };

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addTask = () => {
    if (!newTaskInput.trim()) return;
    const newTask: TaskItem = {
      id: Date.now(),
      text: newTaskInput.trim(),
      completed: false,
      priority: "Medium",
      due: "Upcoming"
    };
    setTasks([newTask, ...tasks]);
    setNewTaskInput("");
    setIsTaskModalOpen(false);
  };

  const completedTopics = syllabusData.filter((i) => i.status === "Completed").length;
  const inProgressTopics = syllabusData.filter((i) => i.status === "In Progress").length;
  const pendingTopics = syllabusData.filter((i) => i.status === "Pending").length;
  const completionPercentage = Math.round((completedTopics / syllabusData.length) * 100);
  const displayHours = (totalStudyMinutes / 60).toFixed(1);

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
      `}</style>

      <div className="text-[#1b1c1a] min-h-screen">
        <nav className="h-screen w-64 fixed left-0 top-0 bg-[#f5f3ef] shadow-sm flex flex-col py-4 z-20">
          <div className="px-6 mb-10">
            <h1 className="text-2xl font-bold text-[#855300]">TrackSy</h1>
            <p className="text-sm text-[#534434]">Syllabus-Centric Study OS</p>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <button 
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-4 px-6 py-3 transition-colors duration-200 text-left ${activeTab === "dashboard" ? "text-[#855300] font-bold border-r-4 border-[#855300] bg-[#eae7df]" : "text-[#534434] hover:text-[#855300]"}`}
            >
              <span className="material-symbols-outlined">dashboard</span>
              <span className="text-sm">Dashboard</span>
            </button>
            <button 
              onClick={() => setActiveTab("syllabus")}
              className={`flex items-center gap-4 px-6 py-3 transition-colors duration-200 text-left ${activeTab === "syllabus" ? "text-[#855300] font-bold border-r-4 border-[#855300] bg-[#eae7df]" : "text-[#534434] hover:text-[#855300]"}`}
            >
              <span className="material-symbols-outlined">menu_book</span>
              <span className="text-sm">Syllabus Breakdown</span>
            </button>
            <button 
              onClick={() => setActiveTab("sessions")}
              className={`flex items-center gap-4 px-6 py-3 transition-colors duration-200 text-left ${activeTab === "sessions" ? "text-[#855300] font-bold border-r-4 border-[#855300] bg-[#eae7df]" : "text-[#534434] hover:text-[#855300]"}`}
            >
              <span className="material-symbols-outlined">schedule</span>
              <span className="text-sm">Study Sessions</span>
            </button>
            <button 
              onClick={() => setActiveTab("tasks")}
              className={`flex items-center gap-4 px-6 py-3 transition-colors duration-200 text-left ${activeTab === "tasks" ? "text-[#855300] font-bold border-r-4 border-[#855300] bg-[#eae7df]" : "text-[#534434] hover:text-[#855300]"}`}
            >
              <span className="material-symbols-outlined">check_circle</span>
              <span className="text-sm">Tasks & Goals</span>
            </button>
          </div>

          <div className="px-4 mb-4">
            <button 
              onClick={() => setIsTimerOpen(true)}
              className="w-full bg-[#855300] hover:bg-[#6b4200] text-white py-3 rounded-xl font-medium shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">timer</span>
              <span>Start Session</span>
            </button>
          </div>
        </nav>

        <main className="ml-64 p-8 min-h-screen">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-lg text-[#855300] border-b-2 border-[#855300] pb-1 cursor-pointer">GATE CS 2027</span>
              <span className="text-sm text-gray-500">Target: Top 100 AIR</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsTaskModalOpen(true)}
                className="bg-[#855300] hover:bg-[#6b4200] text-white text-sm px-4 py-2 rounded-full font-medium transition-all shadow-sm flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">add</span> New Task
              </button>
            </div>
          </div>

          {activeTab === "dashboard" && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-[#1b1c1a]">Welcome back, Tanishq!</h2>
                <p className="text-[#534434] text-sm mt-1">
                  You are currently at {completionPercentage}% completion on core technical subjects.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="tonal-card p-6 rounded-2xl flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Study Hours</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-[#1b1c1a]">{displayHours}</span>
                      <span className="text-gray-500 font-medium">hrs</span>
                    </div>
                    <p className="text-xs text-emerald-600 font-medium mt-2">↑ Active Tracker Enabled</p>
                  </div>
                  <div className="p-3 bg-[#fef3c7] text-[#855300] rounded-xl">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                </div>

                <div className="tonal-card p-6 rounded-2xl flex justify-between items-start">
                  <div className="w-full mr-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Syllabus Completion</p>
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="text-4xl font-black text-[#1b1c1a]">{completionPercentage}</span>
                      <span className="text-xl font-bold text-gray-500">%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${completionPercentage}%` }} />
                    </div>
                  </div>
                  <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
                    <span className="material-symbols-outlined">trending_up</span>
                  </div>
                </div>

                <div className="tonal-card p-6 rounded-2xl flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Pending Revisions</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-[#1b1c1a]">{inProgressTopics + pendingTopics}</span>
                      <span className="text-gray-500 font-medium">topics</span>
                    </div>
                    <p className="text-xs text-amber-700 font-medium mt-2">{inProgressTopics} in progress • {pendingTopics} unvisited</p>
                  </div>
                  <div className="p-3 bg-[#fee2e2] text-[#991b1b] rounded-xl">
                    <span className="material-symbols-outlined">flag</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 tonal-card rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-[#1b1c1a]">Syllabus Quick-View</h3>
                    <span className="text-xs text-gray-400">Click status badge to toggle</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-gray-100 text-gray-400 text-xs">
                          <th className="pb-3 font-medium">Subject</th>
                          <th className="pb-3 font-medium">Topic</th>
                          <th className="pb-3 font-medium text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {syllabusData.map((item) => (
                          <tr key={item.id} className="hover:bg-amber-50/30 transition-colors">
                            <td className="py-4 flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${item.theme.bg} ${item.theme.text}`}>
                                <span className="material-symbols-outlined text-sm">{item.icon}</span>
                              </div>
                              <span className="font-semibold text-gray-800">{item.subject}</span>
                            </td>
                            <td className="py-4 text-gray-600">{item.topic}</td>
                            <td className="py-4 text-right">
                              <button
                                onClick={() => toggleStatus(item.id)}
                                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all hover:scale-105 active:scale-95 ${item.theme.statusBg} ${item.theme.statusText}`}
                              >
                                {item.status}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="tonal-card rounded-2xl p-6">
                    <h3 className="font-bold text-lg text-[#1b1c1a] mb-2">Quick Focus</h3>
                    <p className="text-xs text-[#534434] mb-4">Start a 25/50 min focus block tied to your curriculum.</p>
                    <button
                      onClick={() => setIsTimerOpen(true)}
                      className="w-full bg-[#fbf9f5] border border-[#d8c3ad] hover:bg-[#855300] hover:text-white text-[#855300] font-medium py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base">play_circle</span>
                      <span>Launch Timer</span>
                    </button>
                  </div>

                  <div className="tonal-card rounded-2xl p-6 border-l-4 border-l-[#ef4444]">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-sm text-[#1b1c1a]">Weak Topic Flagged</h4>
                      <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Needs Rev.</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">Operating Systems</p>
                    <p className="text-xs text-gray-500 mt-1">Virtual Memory & Paging Algorithms</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "syllabus" && (
            <div className="tonal-card rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-bold text-xl text-[#1b1c1a]">GATE CS Curriculum & Mastery Matrix</h3>
                  <p className="text-xs text-gray-500 mt-1">Track revision iterations (R1, R2, R3) and confidence levels.</p>
                </div>
              </div>

              <div className="space-y-4">
                {syllabusData.map((item) => (
                  <div key={item.id} className="p-4 rounded-xl border border-gray-100 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${item.theme.bg} ${item.theme.text}`}>
                        <span className="material-symbols-outlined">{item.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{item.subject}</h4>
                        <p className="text-sm text-gray-600">{item.topic}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <span className="text-xs text-gray-400 block font-semibold">REVISIONS</span>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-sm font-bold text-gray-800">{item.revisions} done</span>
                          <button 
                            onClick={() => incrementRevision(item.id)} 
                            className="text-xs text-[#855300] hover:bg-amber-100 rounded px-1.5 py-0.5 font-bold ml-1"
                          >
                            +1
                          </button>
                        </div>
                      </div>

                      <div className="text-center">
                        <span className="text-xs text-gray-400 block font-semibold">CONFIDENCE</span>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full mt-1 inline-block ${
                          item.confidence === "High" ? "bg-emerald-100 text-emerald-800" :
                          item.confidence === "Medium" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"
                        }`}>
                          {item.confidence}
                        </span>
                      </div>

                      <button
                        onClick={() => toggleStatus(item.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold ${item.theme.statusBg} ${item.theme.statusText}`}
                      >
                        {item.status}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "sessions" && (
            <div className="tonal-card rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-bold text-xl text-[#1b1c1a]">Logged Study Sessions</h3>
                  <p className="text-xs text-gray-500 mt-1">Audit trail of completed focus sessions and deep-work blocks.</p>
                </div>
                <button
                  onClick={() => setIsTimerOpen(true)}
                  className="bg-[#855300] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#6b4200]"
                >
                  Start New Session
                </button>
              </div>

              <div className="divide-y divide-gray-100">
                {sessionLogs.map((log) => (
                  <div key={log.id} className="py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-100 text-[#855300] rounded-lg">
                        <span className="material-symbols-outlined text-sm">timelapse</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{log.subject}</p>
                        <p className="text-xs text-gray-400">{log.timestamp}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-[#855300]">+{log.minutes} mins</span>
                      <p className="text-[11px] text-emerald-600">Deep Work Completed</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "tasks" && (
            <div className="tonal-card rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-bold text-xl text-[#1b1c1a]">Action Items & Problem Practice</h3>
                  <p className="text-xs text-gray-500 mt-1">Keep track of PYQ sets, test series revisions, and notes.</p>
                </div>
                <button 
                  onClick={() => setIsTaskModalOpen(true)}
                  className="bg-[#855300] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#6b4200]"
                >
                  + Add Task
                </button>
              </div>

              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="p-3.5 rounded-xl border border-gray-100 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        checked={task.completed} 
                        onChange={() => toggleTask(task.id)}
                        className="w-4 h-4 accent-[#855300] cursor-pointer"
                      />
                      <span className={`text-sm ${task.completed ? "line-through text-gray-400" : "font-medium text-gray-800"}`}>
                        {task.text}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">{task.due}</span>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                        task.priority === "High" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {isTaskModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl">
              <h3 className="text-lg font-bold text-[#855300] mb-4">Add Study Task</h3>
              <input 
                type="text" 
                placeholder="e.g. Solve 10 PYQs on Normalization..." 
                value={newTaskInput}
                onChange={(e) => setNewTaskInput(e.target.value)}
                className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#855300] mb-4"
              />
              <div className="flex gap-2">
                <button 
                  onClick={addTask}
                  className="flex-1 bg-[#855300] text-white py-2.5 rounded-xl font-bold text-sm hover:bg-[#6b4200]"
                >
                  Create
                </button>
                <button 
                  onClick={() => setIsTaskModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {isTimerOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-amber-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-[#855300]">Focus Session</h3>
                <button 
                  onClick={() => { setIsTimerRunning(false); setIsTimerOpen(false); }}
                  className="text-gray-400 hover:text-black material-symbols-outlined"
                >
                  close
                </button>
              </div>

              <div className="mb-4">
                <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">Target Subject</label>
                <select 
                  value={selectedTopic} 
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:outline-none focus:border-[#855300]"
                >
                  {syllabusData.map((item) => (
                    <option key={item.id} value={item.subject}>
                      {item.subject} - {item.topic}
                    </option>
                  ))}
                </select>
              </div>

              <div className="my-8 text-center">
                <span className="text-6xl font-black text-[#1b1c1a] tracking-tight font-mono">
                  {formatTimer(timerSeconds)}
                </span>
                <p className="text-xs text-gray-400 mt-2">
                  {isTimerRunning ? "Session in progress... stay focused!" : "Paused"}
                </p>
              </div>

              <div className="flex gap-3 justify-center mb-6">
                <button onClick={() => resetTimer(25)} className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg font-medium">25 min</button>
                <button onClick={() => resetTimer(50)} className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg font-medium">50 min</button>
                <button onClick={() => resetTimer(5)} className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg font-medium">5 min Break</button>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={toggleTimer}
                  className={`flex-1 py-3 rounded-xl font-bold text-white transition-all ${
                    isTimerRunning ? "bg-amber-600 hover:bg-amber-700" : "bg-[#855300] hover:bg-[#6b4200]"
                  }`}
                >
                  {isTimerRunning ? "Pause" : "Start Focus"}
                </button>
                <button onClick={() => resetTimer(25)} className="px-5 py-3 rounded-xl font-bold bg-gray-100 hover:bg-gray-200 text-gray-700">Reset</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}