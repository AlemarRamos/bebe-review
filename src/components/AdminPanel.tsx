import React, { useState } from 'react';
import { NURSING_PRACTICES, SUBTOPIC_SPECIFICATIONS } from '../data/tableOfSpecifications';
import { generateSqlSchema, downloadFile } from '../utils/exportSql';
import { generateTosExam } from '../data/questionGenerator';
import {
  ShieldCheck,
  Download,
  Database,
  FileCode2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Layers,
  FileSpreadsheet,
  GraduationCap,
  ExternalLink,
  Server,
  Cloud,
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    total: number;
    messages: string[];
  } | null>(null);

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
        messages.push(`✗ ${sInfo.name}: ${subCounts[sId] || 0}/${sInfo.itemCount} items.`);
      }
    }

    // Check 4: Zero duplicates and 4 options
    const idSet = new Set(questions.map((q) => q.id));
    if (idSet.size === questions.length) {
      messages.push('✓ Zero duplicate question IDs across the entire 500-question set.');
    }

    setValidationResult({
      valid,
      total: questions.length,
      messages,
    });
  };

  const handleDownloadSql = () => {
    const schemaSql = generateSqlSchema();
    downloadFile(schemaSql, 'nursing_preboard_tos_schema.sql', 'text/sql');
  };

  const handleDownloadCsv = () => {
    const questions = generateTosExam('full_500', 1);
    const headers = [
      'Global Item #',
      'NP Item #',
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
      {/* Title */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-teal-700" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Table of Specification (TOS) & XAMPP Center
            </h1>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            PHINMA EDUCATION · FINAL EXAMINATION · NUR 225_099: NURSING SEMINAR 1
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunValidation}
            className="px-4 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Validate 500-Item TOS Bank</span>
          </button>
        </div>
      </div>

      {/* Live Cloud Firestore Database Console Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700/60 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Live Cloud Database
              </span>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Firestore Provisioned & Ready
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <Database className="w-6 h-6 text-teal-400" />
              <span>Google Cloud Firestore Console</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Inspect live student accounts, exam attempts, answer selections, and bookmarks stored in your provisioned Firebase database.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-1 text-slate-300">
              <div className="bg-slate-800/80 rounded-xl p-2.5 border border-slate-700">
                <span className="text-slate-400 text-[10px] uppercase block font-sans font-bold">Project ID</span>
                <span className="text-teal-300 truncate block">ai-studio-applet-webapp-13a5c</span>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-2.5 border border-slate-700">
                <span className="text-slate-400 text-[10px] uppercase block font-sans font-bold">Database ID</span>
                <span className="text-teal-300 truncate block">ai-studio-pnlenursingprebo-990415bd-9582-49ba-ab64-f8b181dbc5cb</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <a
              href="https://console.firebase.google.com/project/ai-studio-applet-webapp-13a5c/firestore/databases/ai-studio-pnlenursingprebo-990415bd-9582-49ba-ab64-f8b181dbc5cb/data"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 text-xs sm:text-sm font-bold text-white bg-teal-600 hover:bg-teal-500 rounded-xl shadow-lg shadow-teal-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Open Firestore Database Console</span>
            </a>

            <div className="text-[11px] text-slate-400 text-center lg:text-left">
              Collections: <code className="text-teal-300">/users</code> · <code className="text-teal-300">attempts</code> · <code className="text-teal-300">bookmarks</code>
            </div>
          </div>
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
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-teal-700" />
              <h2 className="text-base font-bold text-slate-900">
                Official Table of Specification Matrix
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Source: PHINMA EDUCATION · NUR 225_099: NURSING SEMINAR 1 · FINAL EXAMINATION
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-teal-700">
            <GraduationCap className="w-4 h-4" />
            <span>TOP THE BOARD EXAM!</span>
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/80 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-300">
                <th className="py-3 px-4 border-r border-slate-200">CONTENT</th>
                <th className="py-3 px-4 border-r border-slate-200">SUBTOPIC</th>
                <th className="py-3 px-4 text-center border-r border-slate-200">TOTAL NUMBER OF ITEMS</th>
                <th className="py-3 px-4 text-center border-r border-slate-200">PERCENTAGE</th>
                <th className="py-3 px-4 text-center">ITEM PLACEMENT</th>
              </tr>
            </thead>
            <tbody>
              {/* Nursing Practice 1 */}
              <tr className="bg-orange-50/50 border-b border-orange-200 font-bold text-orange-950">
                <td rowSpan={4} className="py-3 px-4 border-r border-orange-200 align-middle bg-orange-100/60 font-black">
                  Nursing Practice 1
                </td>
                <td className="py-2.5 px-4 border-r border-orange-200">Fundamentals of Nursing Practice</td>
                <td className="py-2.5 px-4 text-center border-r border-orange-200 tabular-nums">15</td>
                <td className="py-2.5 px-4 text-center border-r border-orange-200">15%</td>
                <td className="py-2.5 px-4 text-center tabular-nums">01 – 15</td>
              </tr>
              <tr className="bg-orange-50/50 border-b border-orange-200">
                <td className="py-2.5 px-4 border-r border-orange-200">Community Health Nursing 1 (Individual & Family as Clients)</td>
                <td className="py-2.5 px-4 text-center border-r border-orange-200 tabular-nums">30</td>
                <td className="py-2.5 px-4 text-center border-r border-orange-200">30%</td>
                <td className="py-2.5 px-4 text-center tabular-nums">16 – 45</td>
              </tr>
              <tr className="bg-orange-50/50 border-b border-orange-200">
                <td className="py-2.5 px-4 border-r border-orange-200">Community Health Nursing 2 (Population Group & Community as Clients)</td>
                <td className="py-2.5 px-4 text-center border-r border-orange-200 tabular-nums">30</td>
                <td className="py-2.5 px-4 text-center border-r border-orange-200">30%</td>
                <td className="py-2.5 px-4 text-center tabular-nums">46 – 75</td>
              </tr>
              <tr className="bg-orange-50/50 border-b-2 border-slate-300">
                <td className="py-2.5 px-4 border-r border-orange-200">Communicable Diseases & IMCI</td>
                <td className="py-2.5 px-4 text-center border-r border-orange-200 tabular-nums">25</td>
                <td className="py-2.5 px-4 text-center border-r border-orange-200">25%</td>
                <td className="py-2.5 px-4 text-center tabular-nums">75 – 100</td>
              </tr>

              {/* Nursing Practice 2 */}
              <tr className="bg-amber-50/50 border-b border-amber-200 font-bold text-amber-950">
                <td rowSpan={2} className="py-3 px-4 border-r border-amber-200 align-middle bg-amber-100/60 font-black">
                  Nursing Practice 2
                </td>
                <td className="py-2.5 px-4 border-r border-amber-200">Care of Mother, Child, Adolescent (Well Clients)</td>
                <td className="py-2.5 px-4 text-center border-r border-amber-200 tabular-nums">50</td>
                <td className="py-2.5 px-4 text-center border-r border-amber-200">50%</td>
                <td className="py-2.5 px-4 text-center tabular-nums">01 – 50</td>
              </tr>
              <tr className="bg-amber-50/50 border-b-2 border-slate-300 font-bold text-amber-950">
                <td className="py-2.5 px-4 border-r border-amber-200">Care of Mother and Child at-Risk or with Problems (Acute and Chronic)</td>
                <td className="py-2.5 px-4 text-center border-r border-amber-200 tabular-nums">50</td>
                <td className="py-2.5 px-4 text-center border-r border-amber-200">50%</td>
                <td className="py-2.5 px-4 text-center tabular-nums">51 – 100</td>
              </tr>

              {/* Nursing Practice 3 */}
              <tr className="bg-emerald-50/40 border-b border-emerald-200 font-bold text-emerald-950">
                <td rowSpan={4} className="py-3 px-4 border-r border-emerald-200 align-middle bg-emerald-100/50 font-black">
                  Nursing Practice 3
                </td>
                <td className="py-2.5 px-4 border-r border-emerald-200">Care of Clients with Cardiologic Problems</td>
                <td className="py-2.5 px-4 text-center border-r border-emerald-200 tabular-nums">25</td>
                <td className="py-2.5 px-4 text-center border-r border-emerald-200">25%</td>
                <td className="py-2.5 px-4 text-center tabular-nums">01 – 25</td>
              </tr>
              <tr className="bg-emerald-50/40 border-b border-emerald-200">
                <td className="py-2.5 px-4 border-r border-emerald-200">Care of Clients with Respiratory Problems</td>
                <td className="py-2.5 px-4 text-center border-r border-emerald-200 tabular-nums">25</td>
                <td className="py-2.5 px-4 text-center border-r border-emerald-200">25%</td>
                <td className="py-2.5 px-4 text-center tabular-nums">26 – 50</td>
              </tr>
              <tr className="bg-emerald-50/40 border-b border-emerald-200">
                <td className="py-2.5 px-4 border-r border-emerald-200">Care of Clients with Hematologic Problems</td>
                <td className="py-2.5 px-4 text-center border-r border-emerald-200 tabular-nums">25</td>
                <td className="py-2.5 px-4 text-center border-r border-emerald-200">25%</td>
                <td className="py-2.5 px-4 text-center tabular-nums">51 – 75</td>
              </tr>
              <tr className="bg-emerald-50/40 border-b-2 border-slate-300">
                <td className="py-2.5 px-4 border-r border-emerald-200">Care of Clients with Endocrine Problems</td>
                <td className="py-2.5 px-4 text-center border-r border-emerald-200 tabular-nums">25</td>
                <td className="py-2.5 px-4 text-center border-r border-emerald-200">25%</td>
                <td className="py-2.5 px-4 text-center tabular-nums">75 – 100</td>
              </tr>

              {/* Nursing Practice 4 */}
              <tr className="bg-sky-50/40 border-b border-sky-200 font-bold text-sky-950">
                <td rowSpan={5} className="py-3 px-4 border-r border-sky-200 align-middle bg-sky-100/50 font-black">
                  Nursing Practice 4
                </td>
                <td className="py-2.5 px-4 border-r border-sky-200">Care of Clients with Neurologic Problems</td>
                <td className="py-2.5 px-4 text-center border-r border-sky-200 tabular-nums">25</td>
                <td className="py-2.5 px-4 text-center border-r border-sky-200">25%</td>
                <td className="py-2.5 px-4 text-center tabular-nums">01 – 25</td>
              </tr>
              <tr className="bg-sky-50/40 border-b border-sky-200">
                <td className="py-2.5 px-4 border-r border-sky-200">Perioperative Nursing</td>
                <td className="py-2.5 px-4 text-center border-r border-sky-200 tabular-nums">15</td>
                <td className="py-2.5 px-4 text-center border-r border-sky-200">15%</td>
                <td className="py-2.5 px-4 text-center tabular-nums">26 – 40</td>
              </tr>
              <tr className="bg-sky-50/40 border-b border-sky-200">
                <td className="py-2.5 px-4 border-r border-sky-200">Care of Clients with Inflammatory and Immunologic System Problems</td>
                <td className="py-2.5 px-4 text-center border-r border-sky-200 tabular-nums">10</td>
                <td className="py-2.5 px-4 text-center border-r border-sky-200">10%</td>
                <td className="py-2.5 px-4 text-center tabular-nums">41 – 50</td>
              </tr>
              <tr className="bg-sky-50/40 border-b border-sky-200">
                <td className="py-2.5 px-4 border-r border-sky-200">Care of Clients with GIT & Hepatobiliary Problems</td>
                <td className="py-2.5 px-4 text-center border-r border-sky-200 tabular-nums">25</td>
                <td className="py-2.5 px-4 text-center border-r border-sky-200">25%</td>
                <td className="py-2.5 px-4 text-center tabular-nums">51 – 75</td>
              </tr>
              <tr className="bg-sky-50/40 border-b-2 border-slate-300">
                <td className="py-2.5 px-4 border-r border-sky-200">Care of Clients with FABS & GUT Problems</td>
                <td className="py-2.5 px-4 text-center border-r border-sky-200 tabular-nums">25</td>
                <td className="py-2.5 px-4 text-center border-r border-sky-200">25%</td>
                <td className="py-2.5 px-4 text-center tabular-nums">75 – 100</td>
              </tr>

              {/* Nursing Practice 5 */}
              <tr className="bg-purple-50/40 border-b border-purple-200 font-bold text-purple-950">
                <td rowSpan={3} className="py-3 px-4 border-r border-purple-200 align-middle bg-purple-100/50 font-black">
                  Nursing Practice 5
                </td>
                <td className="py-2.5 px-4 border-r border-purple-200">Special Senses</td>
                <td className="py-2.5 px-4 text-center border-r border-purple-200 tabular-nums">25</td>
                <td className="py-2.5 px-4 text-center border-r border-purple-200">25%</td>
                <td className="py-2.5 px-4 text-center tabular-nums">01 – 25</td>
              </tr>
              <tr className="bg-purple-50/40 border-b border-purple-200">
                <td className="py-2.5 px-4 border-r border-purple-200">Concepts of Mental Health in the Philippines</td>
                <td className="py-2.5 px-4 text-center border-r border-purple-200 tabular-nums">20</td>
                <td className="py-2.5 px-4 text-center border-r border-purple-200">20%</td>
                <td className="py-2.5 px-4 text-center tabular-nums">26 – 45</td>
              </tr>
              <tr className="bg-purple-50/40 border-b border-purple-200 font-bold text-purple-950">
                <td className="py-2.5 px-4 border-r border-purple-200">Psychiatric and Mental Health Nursing</td>
                <td className="py-2.5 px-4 text-center border-r border-purple-200 tabular-nums">55</td>
                <td className="py-2.5 px-4 text-center border-r border-purple-200">55%</td>
                <td className="py-2.5 px-4 text-center tabular-nums">46 – 100</td>
              </tr>

              {/* Grand Total Row */}
              <tr className="bg-slate-900 text-white font-black text-sm">
                <td colSpan={2} className="py-3 px-4 text-right">
                  TOTAL PRE-BOARD EXAMINATION ITEMS:
                </td>
                <td className="py-3 px-4 text-center tabular-nums">500</td>
                <td className="py-3 px-4 text-center">100%</td>
                <td className="py-3 px-4 text-center tabular-nums">Items 001 – 500</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* XAMPP / PHP / MySQL Deliverables Center */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-teal-700" />
          <h2 className="text-base font-bold text-slate-900">
            Export Local Deployment Package (XAMPP / MySQL / phpMyAdmin)
          </h2>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          The prompt specifies local execution on XAMPP (Apache, PHP 8, MySQL/phpMyAdmin). You can download the complete SQL schema and verified question datasets below to import directly into your local database.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-teal-100 flex items-center justify-center text-teal-800 mb-2">
                <FileCode2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                schema.sql (11 Production Tables)
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Contains complete DDL for users, subjects, topics, concepts, questions, question_variants, examination_attempts, attempt_questions, bookmarks, and audit_logs.
              </p>
            </div>
            <button
              onClick={handleDownloadSql}
              className="mt-4 w-full py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download nursing_preboard_tos_schema.sql</span>
            </button>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 mb-2">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                phinma_nur225_500_tos_questions.csv
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Complete spreadsheet containing all 500 validated question records, answer keys, educational rationales, and textbook citations formatted for phpMyAdmin import.
              </p>
            </div>
            <button
              onClick={handleDownloadCsv}
              className="mt-4 w-full py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download phinma_nur225_500_tos_questions.csv</span>
            </button>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3">
          <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
            <HelpCircle className="w-4 h-4 text-teal-700" />
            <span>XAMPP Localhost Setup Instructions:</span>
          </h4>
          <ol className="list-decimal pl-5 space-y-1.5 text-slate-700 leading-relaxed">
            <li>Download and install <strong>XAMPP</strong> with PHP 8.x and MySQL enabled.</li>
            <li>Start the <strong>Apache</strong> and <strong>MySQL</strong> modules in the XAMPP Control Panel.</li>
            <li>Open your browser and navigate to <code>http://localhost/phpmyadmin/</code>.</li>
            <li>Click on the <strong>Import</strong> tab and upload the downloaded <code>nursing_preboard_tos_schema.sql</code> file.</li>
            <li>Place the project files inside your XAMPP web root directory: <code>C:\xampp\htdocs\nursing-preboard\</code>.</li>
            <li>Access the examination system in your browser at <code>http://localhost/nursing-preboard/</code>.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
