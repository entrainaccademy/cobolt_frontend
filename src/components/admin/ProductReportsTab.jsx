'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  FileText,
  Download,
  Calendar,
  Filter,
  Search,
  RefreshCw,
  Loader2,
  CheckCircle,
  AlertCircle,
  Clock,
  User,
  Shield,
  Layers,
  BarChart3,
  TrendingUp,
  Tag,
  Info,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  History,
  FileDown,
  Sparkles,
} from 'lucide-react';
import {
  fetchProductActivityReportApi,
  fetchAvailableReportMonthsApi,
} from '../../lib/api';
import { generateProductActivityPdf } from '../../lib/activityReportPdf';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Helper to generate default months list if backend is not yet reachable
const getDefaultMonthsList = () => {
  const list = [];
  const now = new Date();
  const curY = now.getUTCFullYear();
  const curM = now.getUTCMonth() + 1;
  const cur = new Date(Date.UTC(curY, curM - 1, 1));
  const minDate = new Date(Date.UTC(2026, 7, 1)); // Back to August 2026
  while (cur >= minDate) {
    const y = cur.getUTCFullYear();
    const m = cur.getUTCMonth() + 1;
    const isCurrent = y === curY && m === curM;
    const isBaseline = y < 2026 || (y === 2026 && m < 11);
    list.push({
      year: y,
      month: m,
      label: `${MONTH_NAMES[m - 1]} ${y}`,
      badge: isCurrent ? 'Current Month' : isBaseline ? 'Baseline / Pre-Tracking' : '',
      isHistoricalBaseline: isBaseline,
      hasActivity: isCurrent,
    });
    cur.setUTCMonth(cur.getUTCMonth() - 1);
  }
  return list;
};

// Helper for baseline fallback data
const createBaselineFallback = (year, month) => {
  const monthName = `${MONTH_NAMES[month - 1]} ${year}`;
  const isHistorical = year < 2026 || (year === 2026 && month < 11);
  return {
    success: true,
    period: {
      year,
      month,
      monthName,
      startDate: new Date(Date.UTC(year, month - 1, 1)).toISOString(),
      endDate: new Date(Date.UTC(year, month, 0, 23, 59, 59, 999)).toISOString(),
    },
    summary: {
      totalActivities: 0,
      filteredCount: 0,
      creates: 0,
      updates: 0,
      deletes: 0,
      uniqueProductsAffected: 0,
      attributedCount: 0,
      unattributedCount: 0,
      attributionRate: 100,
      topCategories: [],
      activeAdmins: [],
    },
    trackingMetadata: {
      systemTrackingStartDate: '2026-11-03T00:00:00.000Z',
      isHistoricalBaseline: isHistorical,
      policyStatement:
        'Audit-grade product activity logging was activated on November 3, 2026. Catalog items created prior to this date remain in the product inventory baseline; historical change logs are not fabricated or back-filled to maintain data integrity.',
    },
    pagination: {
      page: 1,
      limit: 50,
      total: 0,
      totalPages: 1,
    },
    activities: [],
  };
};

export default function ProductReportsTab({ token, admin, categories = [], showToast }) {
  const currentDate = useMemo(() => new Date(), []);
  const [selectedYear, setSelectedYear] = useState(currentDate.getUTCFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getUTCMonth() + 1);

  const [availableMonths, setAvailableMonths] = useState(getDefaultMonthsList());
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAction, setSelectedAction] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backendMissing, setBackendMissing] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [expandedRowId, setExpandedRowId] = useState(null);

  // Load available months on mount
  useEffect(() => {
    if (!token) return;
    fetchAvailableReportMonthsApi(token)
      .then((data) => {
        if (data.months && data.months.length > 0) {
          setAvailableMonths(data.months);
        }
      })
      .catch((err) => {
        // Graceful fallback: months list already populated by getDefaultMonthsList()
        console.warn('Note: Using local available months while backend updates:', err.message);
      });
  }, [token]);

  // Load report data whenever month, year, or filters change
  const loadReport = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const data = await fetchProductActivityReportApi(
        {
          year: selectedYear,
          month: selectedMonth,
          category: selectedCategory !== 'All' ? selectedCategory : '',
          action: selectedAction !== 'ALL' ? selectedAction : '',
          search: searchQuery.trim(),
          limit: 100,
        },
        token
      );
      setReportData(data);
      setBackendMissing(false);
    } catch (err) {
      console.warn('Report fetch note:', err.message);
      if (
        err.message &&
        (err.message.includes('does not exist on this API') ||
          err.message.includes('404') ||
          err.message.includes('Failed to fetch'))
      ) {
        // Backend on Render hasn't been updated with reportRoutes yet
        setBackendMissing(true);
        setReportData(createBaselineFallback(selectedYear, selectedMonth));
      } else {
        if (showToast) showToast('Failed to load activity report: ' + err.message, 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear, selectedMonth, selectedCategory, selectedAction, token]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadReport();
  };

  const handleMonthChange = (e) => {
    const val = e.target.value;
    const [y, m] = val.split('-').map(Number);
    if (y && m) {
      setSelectedYear(y);
      setSelectedMonth(m);
    }
  };

  const handleDownloadPdf = async () => {
    if (!reportData) return;
    try {
      setDownloadingPdf(true);
      let fullData = reportData;
      if (!backendMissing) {
        try {
          fullData = await fetchProductActivityReportApi(
            {
              year: selectedYear,
              month: selectedMonth,
              category: selectedCategory !== 'All' ? selectedCategory : '',
              action: selectedAction !== 'ALL' ? selectedAction : '',
              search: searchQuery.trim(),
              limit: 0,
            },
            token
          );
        } catch (e) {
          fullData = reportData;
        }
      }

      const monthName = `${MONTH_NAMES[selectedMonth - 1]} ${selectedYear}`;
      generateProductActivityPdf({
        reportData: fullData,
        selectedMonthName: monthName,
        adminUser: admin,
      });

      if (showToast) {
        showToast(`Downloaded leadership report for ${monthName}`, 'success');
      }
    } catch (err) {
      console.error('Error generating PDF:', err);
      if (showToast) showToast('Failed to generate PDF report: ' + err.message, 'error');
    } finally {
      setDownloadingPdf(false);
    }
  };

  const selectedMonthName = `${MONTH_NAMES[selectedMonth - 1]} ${selectedYear}`;
  const summary = reportData?.summary || {};
  const activities = reportData?.activities || [];
  const trackingMetadata = reportData?.trackingMetadata || {};
  const isHistorical = trackingMetadata?.isHistoricalBaseline;

  // Format helper for display
  const formatDateTime = (dateVal) => {
    if (!dateVal) return { date: '—', time: '—' };
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return { date: '—', time: '—' };
    return {
      date: d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      isRecent: Date.now() - d.getTime() < 24 * 60 * 60 * 1000,
    };
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header Banner */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="p-2 bg-[#DE1D3A]/10 text-[#DE1D3A] rounded-xl">
                <BarChart3 className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl font-extrabold text-gray-900 font-display flex items-center gap-2">
                  Product Activity Reports
                  <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Live Audit
                  </span>
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Real database records tracking product catalog additions, price updates, status changes, and admin attribution.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={loadReport}
              disabled={loading}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
              title="Refresh Report Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={downloadingPdf || loading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#DE1D3A] hover:bg-[#c41832] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-[#DE1D3A]/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {downloadingPdf ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4" />
                  <span>Download Leadership PDF</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Date Selector & Filters Bar */}
        <div className="mt-6 pt-5 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Monthly Date Selector */}
          <div>
            <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span>Report Month</span>
            </label>
            <select
              value={`${selectedYear}-${selectedMonth}`}
              onChange={handleMonthChange}
              className="w-full px-3 py-2 text-xs font-semibold text-gray-800 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#DE1D3A] focus:bg-white transition-colors"
            >
              {availableMonths.map((m) => (
                <option key={`${m.year}-${m.month}`} value={`${m.year}-${m.month}`}>
                  {m.label} {m.badge ? `— ${m.badge}` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Action Filter */}
          <div>
            <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              <span>Action Type</span>
            </label>
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold text-gray-800 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#DE1D3A] focus:bg-white transition-colors"
            >
              <option value="ALL">All Actions</option>
              <option value="CREATE">Product Added (CREATE)</option>
              <option value="UPDATE">Product Updated (UPDATE)</option>
              <option value="STATUS_CHANGE">Status Changed (STATUS)</option>
              <option value="PHOTOS_UPDATE">Photos Modified (PHOTOS)</option>
              <option value="DELETE">Product Removed (DELETE)</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-gray-400" />
              <span>Category</span>
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold text-gray-800 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#DE1D3A] focus:bg-white transition-colors"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div>
            <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-gray-400" />
              <span>Search Activities</span>
            </label>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Product, slug, admin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3 pr-8 py-2 text-xs text-gray-800 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#DE1D3A] focus:bg-white transition-colors"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Backend Deployment Pending Callout (if active API hasn't deployed reportRoutes yet) */}
      {backendMissing && (
        <div className="bg-amber-50/90 border border-amber-300 p-4 rounded-2xl flex items-start gap-3 text-amber-900 text-xs">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-[13px]">Remote Backend Deployment Pending</p>
            <p className="leading-relaxed opacity-95">
              The frontend is currently pointed to the cloud backend at <code className="bg-amber-100 font-mono px-1.5 py-0.5 rounded font-bold">https://cobolt-backend.onrender.com</code>, which does not yet have the newly committed <code className="bg-amber-100 font-mono px-1.5 py-0.5 rounded font-bold">/api/reports</code> endpoint deployed.
            </p>
            <p className="font-semibold pt-1">
              To activate live database activity reports:
            </p>
            <ul className="list-disc list-inside space-y-0.5 pl-1 opacity-90">
              <li>
                <strong>Option 1 (Production):</strong> Push the backend commit to GitHub (<code className="bg-amber-100 font-mono px-1 rounded">git -C d:\cobolt\backend push origin main</code>) so Render automatically deploys the new endpoints.
              </li>
              <li>
                <strong>Option 2 (Local Development):</strong> Run the local backend on port 5000 (<code className="bg-amber-100 font-mono px-1 rounded">npm run dev</code> in <code className="font-mono">d:\cobolt\backend</code>) and set <code className="font-mono">NEXT_PUBLIC_API_URL=http://localhost:5000</code> in <code className="font-mono">frontend/.env.local</code>.
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Historical Baseline Transparency Banner */}
      <div
        className={`p-4 rounded-2xl border text-xs flex items-start gap-3 transition-colors ${
          isHistorical
            ? 'bg-amber-50/80 border-amber-200 text-amber-900'
            : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}
      >
        <span className={`p-1.5 rounded-lg shrink-0 ${isHistorical ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-700'}`}>
          <History className="w-4 h-4" />
        </span>
        <div className="space-y-1">
          <p className="font-bold text-[13px]">
            {isHistorical ? 'Historical Catalog Baseline Period' : 'Audit Trail & Tracking Protocol'}
          </p>
          <p className="leading-relaxed opacity-90">
            {isHistorical
              ? `You are viewing ${selectedMonthName}, which precedes the deployment of audit-grade product activity logging (Activated: November 3, 2026). Products created during this period remain in the catalog inventory baseline; historical edit logs are not synthesized or backfilled to protect authentic audit integrity.`
              : `Product activity tracking was initiated on November 3, 2026. All additions, updates, status changes, and photo adjustments are captured in real-time directly from MongoDB transactions with verified administrator attribution.`}
          </p>
        </div>
      </div>

      {/* Summary KPI Cards (5 Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Total Activities */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Actions</span>
            <BarChart3 className="w-4 h-4 text-[#DE1D3A]" />
          </div>
          <p className="text-2xl font-black text-gray-900 mt-2 font-display">
            {loading ? '—' : summary.totalActivities || 0}
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">Recorded in {selectedMonthName}</p>
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#DE1D3A]" />
        </div>

        {/* Products Added */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Products Added</span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-emerald-600 mt-2 font-display">
            {loading ? '—' : summary.creates || 0}
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">New catalog items</p>
          <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500" />
        </div>

        {/* Products Modified */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">Modifications</span>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-black text-blue-600 mt-2 font-display">
            {loading ? '—' : summary.updates || 0}
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">Details, status & photos</p>
          <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500" />
        </div>

        {/* Products Removed */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700">Removed</span>
            <AlertCircle className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-2xl font-black text-rose-600 mt-2 font-display">
            {loading ? '—' : summary.deletes || 0}
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">Deleted items</p>
          <div className="absolute top-0 left-0 right-0 h-1 bg-rose-500" />
        </div>

        {/* Unique Products Affected */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs relative overflow-hidden col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">Products Affected</span>
            <Layers className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-black text-purple-600 mt-2 font-display">
            {loading ? '—' : summary.uniqueProductsAffected || 0}
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">
            Attribution: <span className="font-semibold text-gray-600">{summary.attributionRate || 100}%</span>
          </p>
          <div className="absolute top-0 left-0 right-0 h-1 bg-purple-500" />
        </div>
      </div>

      {/* Category Breakdown Chips (if activities present) */}
      {summary.topCategories && summary.topCategories.length > 0 && (
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-1">
            Top Categories:
          </span>
          {summary.topCategories.map((c) => (
            <span
              key={c.category}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            >
              <span>{c.category}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-white text-[10px] font-bold text-[#DE1D3A] shadow-2xs">
                {c.count}
              </span>
            </span>
          ))}
        </div>
      )}

      {/* Detailed Activity Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-gray-900 font-display">
              Activity Audit Log ({activities.length})
            </h3>
            <p className="text-xs text-gray-400">
              Complete chronological breakdown of catalog updates for {selectedMonthName}.
            </p>
          </div>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedAction('ALL');
                setSelectedCategory('All');
              }}
              className="text-xs text-[#DE1D3A] hover:underline font-semibold cursor-pointer"
            >
              Clear Filters
            </button>
          )}
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin text-[#DE1D3A] mb-3" />
            <p className="text-xs font-semibold">Loading real database activity records...</p>
          </div>
        ) : activities.length === 0 ? (
          <div className="py-16 px-6 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-gray-800">
              No product activity recorded in {selectedMonthName}
            </h4>
            <p className="text-xs text-gray-500 max-w-md mx-auto mt-1">
              {isHistorical
                ? 'Activity tracking was initiated on November 3, 2026. Activities prior to this date remain in the initial catalog baseline.'
                : 'No product additions, edits, status toggles, or deletions matched your current filters.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4 w-40">Date & Time</th>
                  <th className="py-3 px-4 min-w-[200px]">Product</th>
                  <th className="py-3 px-4 w-36">Category</th>
                  <th className="py-3 px-4 w-28 text-center">Action</th>
                  <th className="py-3 px-4 w-48">Admin Attribution</th>
                  <th className="py-3 px-4 w-60">Audit Notes</th>
                  <th className="py-3 px-3 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                {activities.map((act, index) => {
                  const dt = formatDateTime(act.timestamp);
                  const isExpanded = expandedRowId === act._id;

                  // Action badge styling
                  let actionBadgeClass = 'bg-gray-100 text-gray-700 border-gray-200';
                  let actionText = act.action;
                  if (act.action === 'CREATE') {
                    actionBadgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                    actionText = 'ADDED';
                  } else if (act.action === 'UPDATE') {
                    actionBadgeClass = 'bg-blue-50 text-blue-700 border-blue-200';
                    actionText = 'UPDATED';
                  } else if (act.action === 'STATUS_CHANGE') {
                    actionBadgeClass = 'bg-amber-50 text-amber-700 border-amber-200';
                    actionText = 'STATUS';
                  } else if (act.action === 'PHOTOS_UPDATE') {
                    actionBadgeClass = 'bg-purple-50 text-purple-700 border-purple-200';
                    actionText = 'PHOTOS';
                  } else if (act.action === 'DELETE') {
                    actionBadgeClass = 'bg-rose-50 text-rose-700 border-rose-200';
                    actionText = 'REMOVED';
                  }

                  const hasAttribution = act.performedBy && act.performedBy.isAvailable;

                  return (
                    <React.Fragment key={act._id || index}>
                      <tr className="hover:bg-gray-50/70 transition-colors group">
                        {/* Number */}
                        <td className="py-3.5 px-4 text-center font-mono text-gray-400 text-[11px]">
                          {index + 1}
                        </td>

                        {/* Date & Time */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="font-semibold text-gray-900 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            <span>{dt.date}</span>
                            {dt.isRecent && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#DE1D3A]/10 text-[#DE1D3A]">
                                Today
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-gray-400 pl-5">{dt.time}</div>
                        </td>

                        {/* Product Name & ID */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-gray-900 leading-tight">
                            {act.productName}
                          </div>
                          <div className="text-[11px] font-mono text-gray-400 mt-0.5">
                            ID: {act.productId}
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-medium bg-gray-100 text-gray-700">
                            {act.category}
                          </span>
                        </td>

                        {/* Action Badge */}
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider border ${actionBadgeClass}`}
                          >
                            {actionText}
                          </span>
                        </td>

                        {/* Admin Attribution */}
                        <td className="py-3.5 px-4">
                          {hasAttribution ? (
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                                <Shield className="w-3.5 h-3.5 text-[#DE1D3A]" />
                              </span>
                              <div className="min-w-0">
                                <p className="font-semibold text-gray-900 truncate text-xs">
                                  {act.performedBy.name || 'Admin'}
                                </p>
                                <p className="text-[10px] text-gray-400 truncate">
                                  {act.performedBy.email || act.performedBy.role || 'Verified User'}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] text-gray-400 italic bg-gray-50 border border-gray-100">
                              <Info className="w-3 h-3 text-gray-400" />
                              <span>Attribution Unavailable</span>
                            </span>
                          )}
                        </td>

                        {/* Details / Action Notes */}
                        <td className="py-3.5 px-4">
                          <p className="text-xs text-gray-700 font-medium leading-snug">
                            {act.actionLabel || 'Catalog update'}
                          </p>
                          {act.details && act.details.changedFields && act.details.changedFields.length > 0 && (
                            <p className="text-[10px] text-gray-400 mt-0.5">
                              Fields: <span className="text-gray-600 font-semibold">{act.details.changedFields.join(', ')}</span>
                            </p>
                          )}
                          {act.details?.price !== undefined && act.details?.price !== null && (
                            <p className="text-[10px] text-gray-500 font-mono mt-0.5">
                              Price: ₹{Number(act.details.price).toLocaleString('en-IN')}
                            </p>
                          )}
                        </td>

                        {/* Expand toggle */}
                        <td className="py-3.5 px-3 text-right">
                          {act.details && Object.keys(act.details).length > 0 && (
                            <button
                              type="button"
                              onClick={() => setExpandedRowId(isExpanded ? null : act._id)}
                              className="text-gray-400 hover:text-gray-700 p-1 rounded hover:bg-gray-100 transition-colors cursor-pointer"
                              title="View full audit payload"
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          )}
                        </td>
                      </tr>

                      {/* Expanded Raw Details Drawer */}
                      {isExpanded && (
                        <tr className="bg-slate-50/80 border-b border-gray-100">
                          <td colSpan={8} className="py-3 px-6">
                            <div className="bg-white p-3.5 rounded-xl border border-gray-200 text-xs font-mono space-y-2">
                              <div className="flex items-center justify-between text-gray-500 font-sans text-[11px] font-bold uppercase tracking-wider">
                                <span>Detailed Audit Payload</span>
                                <span>Record ID: {act._id}</span>
                              </div>
                              <pre className="text-[11px] text-slate-800 overflow-x-auto p-2 bg-slate-50 rounded-lg max-h-48">
                                {JSON.stringify(
                                  {
                                    action: act.action,
                                    label: act.actionLabel,
                                    product: { id: act.productId, name: act.productName, category: act.category },
                                    performedBy: act.performedBy,
                                    details: act.details,
                                    timestamp: act.timestamp,
                                  },
                                  null,
                                  2
                                )}
                              </pre>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
