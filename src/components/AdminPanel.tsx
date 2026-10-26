import React, { useState, useEffect } from 'react';
import { NURSING_PRACTICES, SUBTOPIC_SPECIFICATIONS } from '../data/tableOfSpecifications';
import { generateSqlSchema, downloadFile } from '../utils/exportSql';
import { generateTosExam } from '../data/questionGenerator';
import {
  ShieldCheck,
  Database,
  FileCode2,
  CheckCircle2,
  AlertCircle,
  Layers,
  FileSpreadsheet,
  ExternalLink,
  Users,
  Search,
  Award,
  Loader2,
  RefreshCw,
  Lock,
  Eye,
  TrendingUp,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CloudStorageService, PERMANENT_ADMIN_EMAIL } from '../services/cloudStorage';
import { StudentRosterItem } from '../types';
import { StudentInspectionModal } from './StudentInspectionModal';

export const AdminPanel: React.FC = () => {
  const { user, isAdmin, openLoginModal } = useAuth();

  // Active sub-navigation tab (Only 2 views: Student Roster and TOS Matrix)
  const [activeSubTab, setActiveSubTab] = useState<'roster' | 'tos'>('roster');

  // Student Roster & Cohort Analytics State
  const [roster, setRoster] = useState<StudentRosterItem[]>([]);
  const [loadingRoster, setLoadingRoster] = useState(false);
  const [rosterSearch, setRosterSearch] = useState('');
  const [rosterFilter, setRosterFilter] = useState<'all' | 'passed' | 'review'>('all');
  const [inspectingStudent, setInspectingStudent] = useState<StudentRosterItem | null>(null);

  // TOS Validation State
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    total: number;
    messages: string[];
  } | null>(null);

  // If user is not an admin, default to TOS view
  useEffect(() => {
    if (!isAdmin) {
      setActiveSubTab('tos');
    } else {
      setActiveSubTab('roster');
      loadCohortRoster();
    }
  }, [isAdmin, user]);

  const loadCohortRoster = async () => {
    setLoadingRoster(true);
    try {
      const data = await CloudStorageService.getStudentRoster();
      setRoster(data);
    } catch (err) {
      console.error('Error fetching student roster:', err);
    } finally {
      setLoadingRoster(false);
    }
  };

  // Cohort Analytics Calculations
  const totalStudents = roster.length;
  const activeExaminees = roster.filter((s) => (s.totalAttempts ?? 0) > 0);
  const totalAttemptsAcrossCohort = roster.reduce((sum, s) => sum + (s.totalAttempts ?? 0), 0);
  const averageHighestScore =
    activeExaminees.length > 0
      ? (
          activeExaminees.reduce((sum, s) => sum + (s.highestScore ?? 0), 0) /
          activeExaminees.length
        ).toFixed(1)
      : '0';
  const passingRate =
    activeExaminees.length > 0
      ? (
          (activeExaminees.filter((s) => s.hasPassed).length / activeExaminees.length) *
          100
        ).toFixed(1)
      : '0';

  // Filter student roster
  const filteredRoster = roster.filter((student) => {
    const query = rosterSearch.toLowerCase();
    const matchesSearch =
      student.displayName.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query);

    if (!matchesSearch) return false;

    if (rosterFilter === 'passed') return student.hasPassed;
    if (rosterFilter === 'review') return !student.hasPassed && (student.totalAttempts ?? 0) > 0;

    return true;
  });

  // Validate Question Bank integrity according to TOS
  const handleRunValidation = () => {
    const questions = generateTosExam('full_500', 1);
    const messages: string[] = [];
    let valid = true;

    // Check 1: Exactly 500 items
    if (questions.length === 500) {
      messages.push('✓ Exactly 500 questions generated for Full Pre-Board Examination.');
    } else {
      valid = false;
      messages.push(`✗ Generated ${questions.length} questions, expected 500.`);
    }

    // Check 2: 5 Nursing Practice groups with 100 items each
    const npCounts: Record<string, number> = {};
    const subCounts: Record<string, number> = {};

    questions.forEach((q) => {
      npCounts[q.practiceId] = (npCounts[q.practiceId] || 0) + 1;
      subCounts[q.subtopicId] = (subCounts[q.subtopicId] || 0) + 1;
    });

    for (const [pId, pInfo] of Object.entries(NURSING_PRACTICES)) {
      if (npCounts[pId] === 100) {
        messages.push(`✓ ${pInfo.title} has exactly 100 items (100% quota satisfied).`);
      } else {
        valid = false;
        messages.push(`✗ ${pInfo.title} count mismatch: ${npCounts[pId] || 0}/100.`);
      }
    }

    // Check 3: Subtopic quotas match TOS
    for (const [sId, sInfo] of Object.entries(SUBTOPIC_SPECIFICATIONS)) {
      if (subCounts[sId] === sInfo.itemCount) {
        messages.push(`✓ ${sInfo.name}: exactly ${sInfo.itemCount} items (${sInfo.placementRange}).`);
      } else {
        valid = false;
        messages.push(`✗ ${sInfo.name} mismatch: ${subCounts[sId] || 0}/${sInfo.itemCount}.`);
      }
    }

    setValidationResult({
      valid,
      total: questions.length,
      messages,
    });
  };

  const handleDownloadSql = () => {
    const sql = generateSqlSchema();
    downloadFile(sql, 'phinma_nur225_pnle_preboard_xampp.sql', 'application/sql');
  };

  const handleDownloadCsv = () => {
    const questions = generateTosExam('full_500', 1);
    const headers = [
      'Item No.',
      'NP Placement',
      'Nursing Practice',
      'Subtopic',
      'Item Placement',
      'Difficulty',
      'Question Text',
      'Option A',
      'Option B',
      'Option C',
      'Option D',
      'Correct Answer',
      'Core Clinical Concept',
      'Why Correct',
      'Reference',
    ];

    const escapeCsv = (str: string) => `"${(str || '').replace(/"/g, '""')}"`;

    const rows = questions.map((q) => {
      const subInfo = SUBTOPIC_SPECIFICATIONS[q.subtopicId];
      return [
        q.itemNumber,
        q.npItemNumber,
        escapeCsv(NURSING_PRACTICES[q.practiceId]?.title || q.practiceId),
        escapeCsv(subInfo?.name || q.subtopicId),
        escapeCsv(subInfo?.placementRange || ''),
        escapeCsv(q.difficulty),
        escapeCsv(q.questionText),
        escapeCsv(q.options.A),
        escapeCsv(q.options.B),
        escapeCsv(q.options.C),
        escapeCsv(q.options.D),
        escapeCsv(q.correctOption),
        escapeCsv(q.rationale.core),
        escapeCsv(q.rationale.whyCorrect),
        escapeCsv(q.reference),
      ];
    });

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    downloadFile(csvContent, 'phinma_nur225_500_tos_questions.csv', 'text/csv');
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8 pb-28 md:pb-8">
      {/* Title & Portal Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-teal-700" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Administrator & TOS Center
            </h1>
            {isAdmin && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-100 text-teal-800 border border-teal-200">
                Administrator
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 font-medium">
            PHINMA EDUCATION · NUR 225_099: Nursing Seminar 1 · Candidate Performance & Roster Oversight
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isAdmin && (
            <button
              onClick={loadCohortRoster}
              className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Refresh Roster Data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
          )}

          <a
            href="https://console.firebase.google.com/project/ai-studio-applet-webapp-13a5c/firestore/databases/ai-studio-pnlenursingprebo-990415bd-9582-49ba-ab64-f8b181dbc5cb/data"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Database className="w-4 h-4" />
            <span className="hidden sm:inline">Cloud Firestore DB</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Subnavigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveSubTab('roster')}
          className={`py-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 shrink-0 cursor-pointer ${
            activeSubTab === 'roster'
              ? 'border-teal-700 text-teal-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Student Candidate Roster & Scores</span>
          {isAdmin && roster.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-teal-100 text-teal-800">
              {roster.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveSubTab('tos')}
          className={`py-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 shrink-0 cursor-pointer ${
            activeSubTab === 'tos'
              ? 'border-teal-700 text-teal-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Table of Specifications Matrix & SQL</span>
        </button>
      </div>

      {/* SUBTAB 1: Student Cohort & Exam Scores */}
      {activeSubTab === 'roster' && (
        <div className="space-y-6">
          {!isAdmin ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-4 max-w-xl mx-auto shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto border border-amber-200">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Administrator Access Restricted</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
                  The candidate roster, student scorecards, category mastery breakdowns, and exam review sheets are reserved exclusively for the administrator.
                </p>
                <div className="mt-3 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-200">
                  System Administrator: <code className="font-bold text-teal-800">{PERMANENT_ADMIN_EMAIL}</code>
                </div>
              </div>
              <button
                onClick={openLoginModal}
                className="px-5 py-2.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs transition-colors"
              >
                Sign In With Admin Account
              </button>
            </div>
          ) : (
            <>
              {/* Cohort Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Registered Candidates
                    </span>
                    <Users className="w-4 h-4 text-teal-600" />
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 tabular-nums">
                    {totalStudents}
                  </div>
                  <span className="text-xs text-slate-500 mt-1 block">
                    {activeExaminees.length} have taken exams
                  </span>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Total Exams Taken
                    </span>
                    <Award className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 tabular-nums">
                    {totalAttemptsAcrossCohort}
                  </div>
                  <span className="text-xs text-slate-500 mt-1 block">
                    Full pre-board & NP booklets
                  </span>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Cohort Average Score
                    </span>
                    <TrendingUp className="w-4 h-4 text-teal-600" />
                  </div>
                  <div className="text-3xl font-extrabold text-teal-800 tabular-nums">
                    {averageHighestScore}%
                  </div>
                  <span className="text-xs text-slate-500 mt-1 block">
                    Benchmark passing: 75%
                  </span>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Cohort Pass Rate
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-3xl font-extrabold text-emerald-700 tabular-nums">
                    {passingRate}%
                  </div>
                  <span className="text-xs text-slate-500 mt-1 block">
                    {activeExaminees.filter((s) => s.hasPassed).length} of {activeExaminees.length} passed
                  </span>
                </div>
              </div>

              {/* Roster Controls: Search & Filter */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search candidate name or student email..."
                    value={rosterSearch}
                    onChange={(e) => setRosterSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-teal-600 bg-slate-50"
                  />
                </div>

                <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
                  <button
                    onClick={() => setRosterFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                      rosterFilter === 'all'
                        ? 'bg-teal-700 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    All Candidates ({roster.length})
                  </button>

                  <button
                    onClick={() => setRosterFilter('passed')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                      rosterFilter === 'passed'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                    }`}
                  >
                    Passed (≥75%)
                  </button>

                  <button
                    onClick={() => setRosterFilter('review')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                      rosterFilter === 'review'
                        ? 'bg-amber-600 text-white'
                        : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                    }`}
                  >
                    Needs Review (&lt;75%)
                  </button>
                </div>
              </div>

              {/* Live Student Table */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
                {loadingRoster ? (
                  <div className="p-12 text-center text-slate-500 text-xs flex flex-col items-center justify-center gap-2">
                    <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
                    <span>Loading candidate cohort from Cloud Firestore...</span>
                  </div>
                ) : filteredRoster.length === 0 ? (
                  <div className="p-12 text-center text-slate-500 text-xs space-y-2">
                    <Users className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="font-bold text-slate-700">No candidates found</p>
                    <p className="text-slate-400">
                      {rosterSearch
                        ? 'No students matching your search criteria.'
                        : 'No candidate accounts have been registered yet.'}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-700">
                      <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                        <tr>
                          <th className="py-3 px-4">Candidate Name</th>
                          <th className="py-3 px-4">Student Email</th>
                          <th className="py-3 px-4">Attempts</th>
                          <th className="py-3 px-4">Highest Score</th>
                          <th className="py-3 px-4">Latest Score</th>
                          <th className="py-3 px-4">Cohort Status</th>
                          <th className="py-3 px-4 text-right">Performance Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredRoster.map((student) => {
                          const hasAttempts = (student.totalAttempts ?? 0) > 0;
                          return (
                            <tr key={student.id} className="hover:bg-slate-50/70 transition-colors">
                              <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-bold shrink-0">
                                  {student.displayName.slice(0, 2).toUpperCase()}
                                </div>
                                <span className="truncate max-w-[160px]">{student.displayName}</span>
                              </td>

                              <td className="py-3 px-4 text-slate-600 font-mono text-[11px]">
                                {student.email}
                              </td>

                              <td className="py-3 px-4 font-bold text-slate-900 tabular-nums">
                                {student.totalAttempts || 0}
                              </td>

                              <td className="py-3 px-4 font-extrabold text-teal-800 tabular-nums">
                                {hasAttempts ? `${(student.highestScore ?? 0).toFixed(1)}%` : '—'}
                              </td>

                              <td className="py-3 px-4 font-extrabold text-slate-800 tabular-nums">
                                {hasAttempts ? `${(student.latestScore ?? 0).toFixed(1)}%` : '—'}
                              </td>

                              <td className="py-3 px-4">
                                {hasAttempts ? (
                                  <span
                                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold ${
                                      student.hasPassed
                                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                                    }`}
                                  >
                                    {student.hasPassed ? (
                                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                    ) : (
                                      <AlertCircle className="w-3 h-3 text-amber-600" />
                                    )}
                                    <span>{student.hasPassed ? 'Passed' : 'Needs Review'}</span>
                                  </span>
                                ) : (
                                  <span className="text-[11px] text-slate-400 font-medium">
                                    No attempts yet
                                  </span>
                                )}
                              </td>

                              <td className="py-3 px-4 text-right">
                                <button
                                  onClick={() => setInspectingStudent(student)}
                                  className="px-3 py-1.5 text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>Inspect Breakdown</span>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* SUBTAB 2: Table of Specifications & SQL Export */}
      {activeSubTab === 'tos' && (
        <div className="space-y-6">
          {/* Validation & Export Action Bar */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                TOS Curriculum Validator & Export
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Inspect official PHINMA NUR 225_099 question bank alignment across NP 1 through NP 5.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleRunValidation}
                className="px-3.5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Validate 500 Items</span>
              </button>
              <button
                onClick={handleDownloadSql}
                className="px-3.5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <FileCode2 className="w-4 h-4 text-teal-600" />
                <span>Export XAMPP SQL</span>
              </button>
              <button
                onClick={handleDownloadCsv}
                className="px-3.5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Validation Results */}
          {validationResult && (
            <div
              className={`p-6 rounded-2xl border transition-all ${
                validationResult.valid
                  ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50/70 border-rose-300 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2 mb-3 font-bold text-sm">
                {validationResult.valid ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-700" />
                )}
                <span>
                  {validationResult.valid
                    ? 'Table of Specifications Validation Passed (500 Items Verified)'
                    : 'Validation Discrepancies Detected'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                {validationResult.messages.map((msg, i) => (
                  <div key={i} className="flex items-start gap-1.5 font-medium">
                    <span>{msg}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Official Table of Specification Table */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Official Table of Specifications Matrix (NUR 225_099)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Full breakdown of 500 total multiple-choice items with specific question placement ranges.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Subject / Nursing Practice</th>
                    <th className="py-3 px-4">Specific Subtopic Concept</th>
                    <th className="py-3 px-4 text-center">TOS Placement</th>
                    <th className="py-3 px-4 text-center">Items</th>
                    <th className="py-3 px-4 text-right">Weight %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {Object.values(NURSING_PRACTICES).map((np) => {
                    return np.subtopics.map((subId, subIdx) => {
                      const sub = SUBTOPIC_SPECIFICATIONS[subId];
                      return (
                        <tr key={subId} className="hover:bg-slate-50/70 transition-colors">
                          {subIdx === 0 ? (
                            <td
                              rowSpan={np.subtopics.length}
                              className="py-3 px-4 font-bold align-top border-r border-slate-100"
                            >
                              <span
                                className="px-2 py-0.5 rounded text-[11px] font-bold text-white inline-block mb-1"
                                style={{ backgroundColor: np.color }}
                              >
                                {np.title}
                              </span>
                              <div className="text-slate-900">{np.shortTitle}</div>
                              <div className="text-[10px] text-slate-400 font-normal">
                                100 Items Total (20% weight)
                              </div>
                            </td>
                          ) : null}

                          <td className="py-3 px-4">
                            <span className="font-bold text-slate-900 block">{sub.name}</span>
                            <span className="text-[11px] text-slate-500">{sub.description}</span>
                          </td>

                          <td className="py-3 px-4 text-center font-mono font-bold text-slate-800">
                            {sub.placementRange}
                          </td>

                          <td className="py-3 px-4 text-center font-bold text-slate-900 tabular-nums">
                            {sub.itemCount}
                          </td>

                          <td className="py-3 px-4 text-right font-bold text-teal-800 tabular-nums">
                            {sub.percentage}%
                          </td>
                        </tr>
                      );
                    });
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Student Deep-Dive Inspection Modal */}
      {inspectingStudent && (
        <StudentInspectionModal
          student={inspectingStudent}
          onClose={() => setInspectingStudent(null)}
        />
      )}
    </div>
  );
};
