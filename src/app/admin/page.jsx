'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Shield,
  Lock,
  Mail,
  Search,
  Plus,
  Edit2,
  Trash2,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  X,
  Upload,
  ArrowUpDown,
  Star,
  ExternalLink,
  LogOut,
  RefreshCw,
  Loader2,
  Package,
  Layers,
  Check,
  ChevronRight,
  MoveUp,
  MoveDown,
  MessageSquare,
  Inbox,
  Phone,
  FileText,
  Table,
  Clock,
  Calendar,
  Briefcase,
  User,
  Download,
} from 'lucide-react';
import {
  adminLogin,
  getAdminProfile,
  fetchProducts,
  fetchCategories,
  createProductApi,
  updateProductApi,
  deleteProductApi,
  updateProductStatusApi,
  manageProductPhotosApi,
  uploadPhotoApi,
  fetchInquiriesApi,
  updateInquiryStatusApi,
  deleteInquiryApi,
  fetchApplicationsApi,
  updateApplicationStatusApi,
  deleteApplicationApi,
} from '../../lib/api';

const getSrc = (img) => {
  if (!img) return '/slider1.webp';
  if (typeof img === 'object' && img?.src) return img.src;
  if (typeof img === 'string') {
    let s = img.trim();
    if (s.startsWith('http://cobolt-backend.onrender.com')) {
      s = s.replace('http://', 'https://');
    } else if (s.startsWith('http://') && s.includes('.onrender.com')) {
      s = s.replace('http://', 'https://');
    }
    return s;
  }
  return img;
};

// Helper to format date and time cleanly
const formatDateTime = (dateVal) => {
  if (!dateVal) return { date: '—', time: '—', full: '—', isRecent: false };
  try {
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return { date: '—', time: '—', full: '—', isRecent: false };

    const dateStr = d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const timeStr = d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const isRecent = Date.now() - d.getTime() < 24 * 60 * 60 * 1000;

    return {
      date: dateStr,
      time: timeStr,
      full: `${dateStr} at ${timeStr}`,
      isRecent,
    };
  } catch {
    return { date: '—', time: '—', full: '—', isRecent: false };
  }
};

// Helper to sort products with newest/recently updated at the top
const sortProductsByLatest = (list) => {
  if (!Array.isArray(list)) return [];
  return [...list].sort((a, b) => {
    const timeB = new Date(b.updatedAt || b.createdAt || 0).getTime();
    const timeA = new Date(a.updatedAt || a.createdAt || 0).getTime();
    return timeB - timeA;
  });
};

export default function AdminPage() {
  const [token, setToken] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dashboard state
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');

  // Dashboard Tabs: 'products' | 'inquiries' | 'applications'
  const [activeTab, setActiveTab] = useState('products');

  // Customer Inquiries state
  const [inquiries, setInquiries] = useState([]);
  const [inquiryStats, setInquiryStats] = useState({ total: 0, new: 0, contacted: 0, archived: 0 });
  const [inquiriesLoading, setInquiriesLoading] = useState(false);
  const [selectedInquiryStatus, setSelectedInquiryStatus] = useState('all');
  const [inquirySearch, setInquirySearch] = useState('');
  const [selectedInquiryModal, setSelectedInquiryModal] = useState(null);
  const [inquiryBackendPending, setInquiryBackendPending] = useState(false);

  // Job Applications state
  const [applications, setApplications] = useState([]);
  const [applicationStats, setApplicationStats] = useState({ total: 0, new: 0, reviewing: 0, shortlisted: 0, rejected: 0, archived: 0 });
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [selectedAppStatus, setSelectedAppStatus] = useState('all');
  const [applicationSearch, setApplicationSearch] = useState('');
  const [selectedAppModal, setSelectedAppModal] = useState(null);
  const [applicationBackendPending, setApplicationBackendPending] = useState(false);
  // Modal states
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // null = new, object = editing
  const [photosModalOpen, setPhotosModalOpen] = useState(false);
  const [photosProduct, setPhotosProduct] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);

  // Notification toast
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Check existing session on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('cobolt_admin_token');
    if (savedToken) {
      getAdminProfile(savedToken)
        .then((profile) => {
          setAdmin(profile);
          setToken(savedToken);
        })
        .catch(() => {
          localStorage.removeItem('cobolt_admin_token');
          setToken(null);
          setAdmin(null);
        })
        .finally(() => setAuthChecking(false));
    } else {
      setAuthChecking(false);
    }
  }, []);

  // Fetch products and categories when authenticated
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [allProducts, allCats] = await Promise.all([
        fetchProducts(),
        fetchCategories(),
      ]);
      if (allProducts) setProducts(sortProductsByLatest(allProducts));
      if (allCats) setCategories(allCats);
    } catch (err) {
      showToast('Failed to load products from database', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch customer inquiries from backend
  const loadInquiries = async () => {
    if (!token) return;
    try {
      setInquiriesLoading(true);
      const res = await fetchInquiriesApi({}, token);
      if (res?.notDeployed) {
        setInquiryBackendPending(true);
      } else {
        setInquiryBackendPending(false);
      }
      if (res?.inquiries) setInquiries(res.inquiries);
      if (res?.stats) setInquiryStats(res.stats);
    } catch (err) {
      // Gracefully silent on transient network errors
      console.warn('Inquiry service notice:', err.message);
    } finally {
      setInquiriesLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadDashboardData();
      loadInquiries();
      loadApplications();
    }
  }, [token]);

  // Fetch job applications from backend
  const loadApplications = async () => {
    if (!token) return;
    try {
      setApplicationsLoading(true);
      const res = await fetchApplicationsApi({}, token);
      if (res?.notDeployed) {
        setApplicationBackendPending(true);
      } else {
        setApplicationBackendPending(false);
      }
      if (res?.applications) setApplications(res.applications);
      if (res?.stats) setApplicationStats(res.stats);
    } catch (err) {
      console.warn('Application service notice:', err.message);
    } finally {
      setApplicationsLoading(false);
    }
  };

  // Handle application status & notes update
  const handleUpdateApplicationStatus = async (id, newStatus, notes) => {
    try {
      const payload = {};
      if (newStatus) payload.status = newStatus;
      if (typeof notes === 'string') payload.notes = notes;
      const updated = await updateApplicationStatusApi(id, payload, token);
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? { ...app, ...updated } : app))
      );
      if (selectedAppModal && selectedAppModal._id === id) {
        setSelectedAppModal((prev) => ({ ...prev, ...updated }));
      }
      showToast(`Application updated successfully`);
      loadApplications();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Handle application delete
  const handleDeleteApplication = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job application?')) return;
    try {
      await deleteApplicationApi(id, token);
      setApplications((prev) => prev.filter((app) => app._id !== id));
      if (selectedAppModal && selectedAppModal._id === id) {
        setSelectedAppModal(null);
      }
      showToast('Job application deleted successfully');
      loadApplications();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Handle inquiry status toggle
  const handleUpdateInquiryStatus = async (id, newStatus) => {
    try {
      await updateInquiryStatusApi(id, { status: newStatus }, token);
      setInquiries((prev) =>
        prev.map((inq) => (inq._id === id ? { ...inq, status: newStatus } : inq))
      );
      if (selectedInquiryModal && selectedInquiryModal._id === id) {
        setSelectedInquiryModal((prev) => ({ ...prev, status: newStatus }));
      }
      showToast(`Inquiry marked as ${newStatus}`);
      loadInquiries();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Handle inquiry delete
  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this customer inquiry?')) return;
    try {
      await deleteInquiryApi(id, token);
      setInquiries((prev) => prev.filter((inq) => inq._id !== id));
      if (selectedInquiryModal && selectedInquiryModal._id === id) {
        setSelectedInquiryModal(null);
      }
      showToast('Inquiry deleted successfully');
      loadInquiries();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const data = await adminLogin(loginEmail, loginPassword);
      setToken(data.token);
      setAdmin(data.admin);
      localStorage.setItem('cobolt_admin_token', data.token);
      showToast(`Welcome back, ${data.admin.name || 'Admin'}!`);
    } catch (err) {
      setLoginError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('cobolt_admin_token');
    setToken(null);
    setAdmin(null);
    showToast('Logged out successfully.');
  };

  // Quick toggle availability
  const toggleAvailability = async (product) => {
    const newStatus = !product.isAvailable;
    const targetId = product._id || product.id;
    const now = new Date().toISOString();
    try {
      await updateProductStatusApi(targetId, { isAvailable: newStatus }, token);
      setProducts((prev) =>
        prev.map((p) =>
          (product._id && p._id === product._id) || p.id === product.id
            ? { ...p, isAvailable: newStatus, updatedAt: now }
            : p
        )
      );
      showToast(`Updated '${product.name}' availability to ${newStatus ? 'In Stock' : 'Pre-Order'}`);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Quick toggle featured
  const toggleFeatured = async (product) => {
    const newFeatured = !product.isFeatured;
    const targetId = product._id || product.id;
    const now = new Date().toISOString();
    try {
      await updateProductStatusApi(targetId, { isFeatured: newFeatured }, token);
      setProducts((prev) =>
        prev.map((p) =>
          (product._id && p._id === product._id) || p.id === product.id
            ? { ...p, isFeatured: newFeatured, updatedAt: now }
            : p
        )
      );
      showToast(`Product ${newFeatured ? 'marked as Featured' : 'unmarked from Featured'}`);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Execute Delete
  const confirmDelete = async () => {
    if (!deletingProduct) return;
    try {
      const targetId = deletingProduct._id || deletingProduct.id;
      await deleteProductApi(targetId, token);
      setProducts((prev) =>
        prev.filter((p) => {
          if (deletingProduct._id && p._id) return p._id !== deletingProduct._id;
          return p.id !== deletingProduct.id;
        })
      );
      showToast(`Product '${deletingProduct.name}' deleted successfully.`);
      setDeleteModalOpen(false);
      setDeletingProduct(null);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Filter products for display and keep newest/recently updated at the top
  const filteredProducts = products
    .filter((p) => {
      const matchesSearch =
        !search.trim() ||
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.id?.toLowerCase().includes(search.toLowerCase()) ||
        p.category?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;

      const matchesAvailability =
        selectedAvailability === 'All' ||
        (selectedAvailability === 'In Stock' && p.isAvailable !== false) ||
        (selectedAvailability === 'Pre-Order' && p.isAvailable === false);

      return matchesSearch && matchesCategory && matchesAvailability;
    })
    .sort((a, b) => {
      const timeB = new Date(b.updatedAt || b.createdAt || 0).getTime();
      const timeA = new Date(a.updatedAt || a.createdAt || 0).getTime();
      return timeB - timeA;
    });

  // Filter inquiries for display
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus =
      selectedInquiryStatus === 'all' || inq.status === selectedInquiryStatus;
    const matchesSearch =
      !inquirySearch.trim() ||
      inq.name?.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.email?.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.phone?.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.company?.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.subject?.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.message?.toLowerCase().includes(inquirySearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Filter job applications for display
  const filteredApplications = applications.filter((app) => {
    const matchesStatus =
      selectedAppStatus === 'all' || app.status === selectedAppStatus;
    const s = applicationSearch.toLowerCase().trim();
    const matchesSearch =
      !s ||
      app.fullName?.toLowerCase().includes(s) ||
      app.email?.toLowerCase().includes(s) ||
      app.phone?.toLowerCase().includes(s) ||
      app.targetPosition?.toLowerCase().includes(s) ||
      app.refCode?.toLowerCase().includes(s) ||
      app.experienceLevel?.toLowerCase().includes(s) ||
      app.coverNote?.toLowerCase().includes(s);
    return matchesStatus && matchesSearch;
  });
  // Calculate stats
  const stats = {
    total: products.length,
    inStock: products.filter((p) => p.isAvailable !== false).length,
    preOrder: products.filter((p) => p.isAvailable === false).length,
    featured: products.filter((p) => p.isFeatured).length,
  };

  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 text-[#DE1D3A] animate-spin" />
      </div>
    );
  }

  // --- LOGIN VIEW ---
  if (!token) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-[#F8FAFC]">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-red-50 rounded-2xl border border-red-100 text-[#DE1D3A] mb-4">
              <Shield className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold font-display text-gray-900">Cobolt Admin Portal</h1>
            <p className="text-xs text-gray-500 mt-1">Authorized personnel only</p>
          </div>

          {loginError && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@cobolt.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#DE1D3A] focus:ring-1 focus:ring-[#DE1D3A] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#DE1D3A] focus:ring-1 focus:ring-[#DE1D3A] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full mt-2 py-3 bg-[#DE1D3A] hover:bg-[#B7152D] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loginLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
            <Link href="/" className="hover:text-gray-900 transition-colors flex items-center gap-1">
              &larr; Return to Website
            </Link>
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    );
  }

  // --- DASHBOARD VIEW ---
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      {/* Toast Alert */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-semibold text-white transition-all transform animate-bounce ${
            toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'
          }`}
        >
          {toast.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
          <span>{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 hover:opacity-75">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#DE1D3A] text-white flex items-center justify-center font-bold text-sm">
              C
            </span>
            <div>
              <span className="font-bold text-sm text-gray-900 font-display">Cobolt Machineries</span>
              <span className="ml-2 px-2 py-0.5 text-[10px] bg-red-100 text-[#DE1D3A] font-bold rounded-full uppercase">
                Admin Panel
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/products"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-[#DE1D3A] font-medium transition-colors"
            >
              <span>View Public Catalog</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <div className="h-4 w-px bg-gray-200 hidden sm:block" />

            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-gray-900">{admin?.name || 'Admin'}</p>
              <p className="text-[10px] text-gray-400">{admin?.email}</p>
            </div>

            <button
              onClick={handleLogout}
              id="admin-logout-btn"
              title="Logout from Admin Panel"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-white bg-red-50 hover:bg-[#DE1D3A] border border-red-200 hover:border-[#DE1D3A] rounded-lg transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-[#DE1D3A] text-white shadow-md shadow-[#DE1D3A]/20'
                : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products Catalog ({products.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('inquiries');
              loadInquiries();
            }}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer relative ${
              activeTab === 'inquiries'
                ? 'bg-[#DE1D3A] text-white shadow-md shadow-[#DE1D3A]/20'
                : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Customer Inquiries</span>
            {inquiryStats.new > 0 && (
              <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full ${activeTab === 'inquiries' ? 'bg-white text-[#DE1D3A]' : 'bg-[#DE1D3A] text-white'}`}>
                {inquiryStats.new} new
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('applications');
              loadApplications();
            }}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer relative ${
              activeTab === 'applications'
                ? 'bg-[#DE1D3A] text-white shadow-md shadow-[#DE1D3A]/20'
                : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Job Applications ({applications.length})</span>
            {applicationStats.new > 0 && (
              <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full ${activeTab === 'applications' ? 'bg-white text-[#DE1D3A]' : 'bg-[#DE1D3A] text-white'}`}>
                {applicationStats.new} new
              </span>
            )}
          </button>
        </div>

        {activeTab === 'inquiries' ? (
          <div>
            {/* Inquiry Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500 uppercase">Total Inquiries</span>
                  <Inbox className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-2xl font-extrabold text-gray-900 mt-2 font-display">{inquiryStats.total}</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#DE1D3A] uppercase">New / Unread</span>
                  <MessageSquare className="w-4 h-4 text-[#DE1D3A]" />
                </div>
                <p className="text-2xl font-extrabold text-[#DE1D3A] mt-2 font-display">{inquiryStats.new}</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-600 uppercase">Contacted</span>
                  <Check className="w-4 h-4 text-emerald-500" />
                </div>
                <p className="text-2xl font-extrabold text-emerald-600 mt-2 font-display">{inquiryStats.contacted}</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-400 uppercase">Archived</span>
                  <Layers className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-2xl font-extrabold text-gray-500 mt-2 font-display">{inquiryStats.archived}</p>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-xs mb-6">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search inquiries by client name, email, phone, company, or message..."
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#DE1D3A] focus:ring-1 focus:ring-[#DE1D3A] transition-all"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedInquiryStatus}
                    onChange={(e) => setSelectedInquiryStatus(e.target.value)}
                    className="px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#DE1D3A] text-gray-700 font-medium"
                  >
                    <option value="all">All Statuses ({inquiryStats.total})</option>
                    <option value="new">New ({inquiryStats.new})</option>
                    <option value="contacted">Contacted ({inquiryStats.contacted})</option>
                    <option value="archived">Archived ({inquiryStats.archived})</option>
                  </select>

                  <button
                    type="button"
                    onClick={loadInquiries}
                    title="Refresh Inquiries"
                    className="p-2 text-gray-500 hover:text-gray-900 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <RefreshCw className={`w-4 h-4 ${inquiriesLoading ? 'animate-spin text-[#DE1D3A]' : ''}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-50/75 border-b border-gray-200 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    <tr>
                      <th className="px-5 py-3.5">Date</th>
                      <th className="px-5 py-3.5">Client & Company</th>
                      <th className="px-5 py-3.5">Contact Details</th>
                      <th className="px-5 py-3.5">Service / Subject</th>
                      <th className="px-5 py-3.5">Message Snippet</th>
                      <th className="px-5 py-3.5">Status</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs">
                    {filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-5 py-12 text-center text-gray-400">
                          {inquiriesLoading ? (
                            <div className="flex items-center justify-center gap-2">
                              <Loader2 className="w-4 h-4 animate-spin text-[#DE1D3A]" />
                              <span>Loading customer inquiries...</span>
                            </div>
                          ) : inquiryBackendPending ? (
                            <div className="space-y-2 p-6 max-w-md mx-auto bg-amber-50/70 border border-amber-200 rounded-2xl text-center my-4">
                              <Inbox className="w-8 h-8 mx-auto text-amber-500" />
                              <p className="font-bold text-sm text-gray-900">Backend Update Pending</p>
                              <p className="text-xs text-gray-600 leading-relaxed">
                                The live backend on Render is awaiting the latest commit. Run <code className="bg-amber-100 px-1.5 py-0.5 rounded text-amber-900 font-mono text-[11px]">git push origin main</code> in the backend directory to activate live inquiries.
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <Inbox className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                              <p className="font-semibold text-gray-600">No customer inquiries found</p>
                              <p className="text-[11px] text-gray-400">When visitors submit the contact form, leads will appear here in real-time.</p>
                            </div>
                          )}
                        </td>
                      </tr>
                    ) : (
                      filteredInquiries.map((inq) => {
                        const cleanPhone = (inq.phone || '').replace(/[^0-9+]/g, '');
                        const waNumber = cleanPhone.startsWith('+') ? cleanPhone.slice(1) : cleanPhone;
                        const formattedDate = new Date(inq.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        });

                        return (
                          <tr key={inq._id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-5 py-3.5 whitespace-nowrap text-gray-400 font-mono text-[11px]">
                              {formattedDate}
                            </td>

                            <td className="px-5 py-3.5">
                              <div className="font-bold text-gray-900">{inq.name}</div>
                              {inq.company && <div className="text-[10px] text-gray-400 font-medium">{inq.company}</div>}
                            </td>

                            <td className="px-5 py-3.5 whitespace-nowrap">
                              <div>
                                <a href={`mailto:${inq.email}`} className="text-[#DE1D3A] hover:underline font-medium">
                                  {inq.email}
                                </a>
                              </div>
                              <div className="flex items-center gap-2 mt-0.5">
                                <a href={`tel:${inq.phone}`} className="text-gray-700 hover:text-gray-900 font-mono text-[11px]">
                                  {inq.phone}
                                </a>
                                {waNumber && (
                                  <a
                                    href={`https://wa.me/${waNumber}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-green-600 hover:text-green-700 font-bold text-[10px]"
                                    title="Open WhatsApp chat"
                                  >
                                    [WA]
                                  </a>
                                )}
                              </div>
                            </td>

                            <td className="px-5 py-3.5 whitespace-nowrap">
                              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-700 mb-0.5">
                                {inq.serviceType || 'Machinery'}
                              </span>
                              <div className="text-gray-900 font-medium truncate max-w-[150px]">{inq.subject}</div>
                            </td>

                            <td className="px-5 py-3.5">
                              <p className="line-clamp-2 max-w-xs text-gray-600 text-[11px]">
                                {inq.message}
                              </p>
                            </td>

                            <td className="px-5 py-3.5 whitespace-nowrap">
                              <select
                                value={inq.status}
                                onChange={(e) => handleUpdateInquiryStatus(inq._id, e.target.value)}
                                className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${
                                  inq.status === 'new'
                                    ? 'bg-red-50 text-red-700 border-red-200'
                                    : inq.status === 'contacted'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : 'bg-gray-100 text-gray-600 border-gray-200'
                                }`}
                              >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="archived">Archived</option>
                              </select>
                            </td>

                            <td className="px-5 py-3.5 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  type="button"
                                  onClick={() => setSelectedInquiryModal(inq)}
                                  className="px-2.5 py-1 text-xs text-gray-600 hover:text-[#DE1D3A] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer font-medium"
                                >
                                  View
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteInquiry(inq._id)}
                                  title="Delete Inquiry"
                                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              <div className="px-5 py-3.5 bg-gray-50/75 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between">
                <span>Showing {filteredInquiries.length} of {inquiries.length} inquiries</span>
                <span className="text-[11px] text-gray-400">Database: MongoDB Atlas (cobolt.inquiries)</span>
              </div>
            </div>
          </div>
        ) : activeTab === 'applications' ? (
          <div>
            {/* Application Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500 uppercase">Total Applicants</span>
                  <Briefcase className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-2xl font-extrabold text-gray-900 mt-2 font-display">{applicationStats.total}</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#DE1D3A] uppercase">New / Unreviewed</span>
                  <User className="w-4 h-4 text-[#DE1D3A]" />
                </div>
                <p className="text-2xl font-extrabold text-[#DE1D3A] mt-2 font-display">{applicationStats.new}</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-blue-600 uppercase">In Review</span>
                  <Clock className="w-4 h-4 text-blue-500" />
                </div>
                <p className="text-2xl font-extrabold text-blue-600 mt-2 font-display">{applicationStats.reviewing || 0}</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-600 uppercase">Shortlisted</span>
                  <Check className="w-4 h-4 text-emerald-500" />
                </div>
                <p className="text-2xl font-extrabold text-emerald-600 mt-2 font-display">{applicationStats.shortlisted || 0}</p>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-xs mb-6">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search applicants by name, email, phone, position, or tracking code..."
                    value={applicationSearch}
                    onChange={(e) => setApplicationSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#DE1D3A] focus:ring-1 focus:ring-[#DE1D3A] transition-all"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedAppStatus}
                    onChange={(e) => setSelectedAppStatus(e.target.value)}
                    className="px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#DE1D3A] text-gray-700 font-medium"
                  >
                    <option value="all">All Statuses ({applicationStats.total})</option>
                    <option value="new">New ({applicationStats.new})</option>
                    <option value="reviewing">Reviewing ({applicationStats.reviewing || 0})</option>
                    <option value="shortlisted">Shortlisted ({applicationStats.shortlisted || 0})</option>
                    <option value="rejected">Rejected ({applicationStats.rejected || 0})</option>
                    <option value="archived">Archived ({applicationStats.archived || 0})</option>
                  </select>

                  <button
                    type="button"
                    onClick={loadApplications}
                    title="Refresh Applications"
                    className="p-2 text-gray-500 hover:text-gray-900 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`w-4 h-4 ${applicationsLoading ? 'animate-spin text-[#DE1D3A]' : ''}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-50/75 border-b border-gray-200 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    <tr>
                      <th className="px-5 py-3.5">Applied Date</th>
                      <th className="px-5 py-3.5">Candidate Name</th>
                      <th className="px-5 py-3.5">Role Applied</th>
                      <th className="px-5 py-3.5">Contact Details</th>
                      <th className="px-5 py-3.5">Resume / CV</th>
                      <th className="px-5 py-3.5">Status</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs">
                    {filteredApplications.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-5 py-12 text-center text-gray-400">
                          {applicationsLoading ? (
                            <div className="flex items-center justify-center gap-2">
                              <Loader2 className="w-4 h-4 animate-spin text-[#DE1D3A]" />
                              <span>Loading career applications...</span>
                            </div>
                          ) : applicationBackendPending ? (
                            <div className="space-y-2 p-6 max-w-md mx-auto bg-amber-50/70 border border-amber-200 rounded-2xl text-center my-4">
                              <Briefcase className="w-8 h-8 mx-auto text-amber-500" />
                              <p className="font-bold text-sm text-gray-900">Backend Update Pending</p>
                              <p className="text-xs text-gray-600 leading-relaxed">
                                The live backend is receiving the careers module. Push latest commits to activate live recruitment.
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <Briefcase className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                              <p className="font-semibold text-gray-600">No job applications found</p>
                              <p className="text-[11px] text-gray-400">When candidates apply on the Careers page, their profiles and resumes will appear here in real-time.</p>
                            </div>
                          )}
                        </td>
                      </tr>
                    ) : (
                      filteredApplications.map((app) => {
                        const cleanPhone = (app.phone || '').replace(/[^0-9+]/g, '');
                        const waNumber = cleanPhone.startsWith('+') ? cleanPhone.slice(1) : cleanPhone;
                        const formattedDate = new Date(app.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        });

                        return (
                          <tr key={app._id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-5 py-3.5 whitespace-nowrap">
                              <div className="text-gray-600 font-mono text-[11px]">{formattedDate}</div>
                              <div className="text-[10px] font-mono font-bold text-slate-400">{app.refCode}</div>
                            </td>

                            <td className="px-5 py-3.5">
                              <div className="font-bold text-gray-900">{app.fullName}</div>
                              <div className="text-[11px] text-gray-500 font-medium">{app.experienceLevel || 'Mid Level'}</div>
                              {app.linkedIn && (
                                <a
                                  href={app.linkedIn}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[10px] text-sky-600 hover:underline inline-flex items-center gap-0.5 mt-0.5 font-medium"
                                >
                                  <span>LinkedIn</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              )}
                            </td>

                            <td className="px-5 py-3.5 whitespace-nowrap">
                              <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold bg-red-50 text-[#DE1D3A] border border-red-100">
                                {app.targetPosition}
                              </span>
                            </td>

                            <td className="px-5 py-3.5 whitespace-nowrap">
                              <div>
                                <a href={`mailto:${app.email}`} className="text-[#DE1D3A] hover:underline font-medium">
                                  {app.email}
                                </a>
                              </div>
                              <div className="flex items-center gap-2 mt-0.5">
                                <a href={`tel:${app.phone}`} className="text-gray-700 hover:text-gray-900 font-mono text-[11px]">
                                  {app.phone}
                                </a>
                                {waNumber && (
                                  <a
                                    href={`https://wa.me/${waNumber}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-green-600 hover:text-green-700 font-bold text-[10px]"
                                    title="Open WhatsApp chat"
                                  >
                                    [WA]
                                  </a>
                                )}
                              </div>
                            </td>

                            <td className="px-5 py-3.5 whitespace-nowrap">
                              {app.resumeUrl ? (
                                <a
                                  href={app.resumeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-gray-700 hover:text-[#DE1D3A] bg-gray-100 hover:bg-red-50 border border-gray-200 rounded-lg transition-colors cursor-pointer"
                                  title={app.resumeOriginalName || 'Resume'}
                                >
                                  <FileText className="w-3.5 h-3.5 text-[#DE1D3A]" />
                                  <span className="truncate max-w-[100px]">{app.resumeOriginalName ? 'View CV' : 'View CV'}</span>
                                  <Download className="w-3 h-3 text-gray-400" />
                                </a>
                              ) : (
                                <span className="text-gray-400 text-[11px]">No file</span>
                              )}
                            </td>

                            <td className="px-5 py-3.5 whitespace-nowrap">
                              <select
                                value={app.status || 'new'}
                                onChange={(e) => handleUpdateApplicationStatus(app._id, e.target.value)}
                                className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${
                                  app.status === 'new'
                                    ? 'bg-red-50 text-red-700 border-red-200'
                                    : app.status === 'reviewing'
                                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                                    : app.status === 'shortlisted'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : app.status === 'rejected'
                                    ? 'bg-slate-100 text-slate-600 border-slate-200'
                                    : 'bg-gray-100 text-gray-600 border-gray-200'
                                }`}
                              >
                                <option value="new">New</option>
                                <option value="reviewing">Reviewing</option>
                                <option value="shortlisted">Shortlisted</option>
                                <option value="rejected">Rejected</option>
                                <option value="archived">Archived</option>
                              </select>
                            </td>

                            <td className="px-5 py-3.5 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  type="button"
                                  onClick={() => setSelectedAppModal(app)}
                                  className="px-2.5 py-1 text-xs text-gray-600 hover:text-[#DE1D3A] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer font-medium"
                                >
                                  Review
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteApplication(app._id)}
                                  title="Delete Application"
                                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              <div className="px-5 py-3.5 bg-gray-50/75 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between">
                <span>Showing {filteredApplications.length} of {applications.length} applications</span>
                <span className="text-[11px] text-gray-400">Database: MongoDB Atlas (cobolt.jobapplications)</span>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500 uppercase">Total Items</span>
              <Package className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-2xl font-extrabold text-gray-900 mt-2 font-display">{stats.total}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-green-600 uppercase">In Stock</span>
              <Check className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-extrabold text-green-600 mt-2 font-display">{stats.inStock}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-600 uppercase">Pre-Order</span>
              <Layers className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-extrabold text-amber-600 mt-2 font-display">{stats.preOrder}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#DE1D3A] uppercase">Featured</span>
              <Star className="w-4 h-4 text-[#DE1D3A]" />
            </div>
            <p className="text-2xl font-extrabold text-[#DE1D3A] mt-2 font-display">{stats.featured}</p>
          </div>
        </div>

        {/* Action Controls & Filters */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-xs mb-6">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by product name, model code, or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#DE1D3A] focus:ring-1 focus:ring-[#DE1D3A] transition-all"
              />
            </div>

            {/* Category Dropdown */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#DE1D3A] text-gray-700"
              >
                <option value="All">All Categories</option>
                {categories.filter((c) => c !== 'All').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {/* Availability Dropdown */}
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#DE1D3A] text-gray-700"
              >
                <option value="All">All Status</option>
                <option value="In Stock">In Stock</option>
                <option value="Pre-Order">Pre-Order</option>
              </select>

              {/* Refresh Button */}
              <button
                onClick={loadDashboardData}
                disabled={loading}
                title="Refresh from MongoDB"
                className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>

              {/* Add Product Button */}
              <button
                onClick={() => {
                  setCurrentProduct(null);
                  setProductModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#DE1D3A] hover:bg-[#B7152D] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-left">
              <thead className="bg-gray-50/75">
                <tr>
                  <th className="px-5 py-3.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Price / Offer
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Date &amp; Time
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Availability
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Featured
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Photos
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-sm text-gray-500">
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin text-[#DE1D3A]" />
                          <span>Loading machineries from database...</span>
                        </div>
                      ) : (
                        'No products match your search or filter.'
                      )}
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p, idx) => {
                    const imgSrc = getSrc(p.image);
                    const photoCount = Array.isArray(p.images) ? p.images.length : 1;
                    const rowKey = p._id ? String(p._id) : `${p.id || 'prod'}-${idx}`;

                    return (
                      <tr key={rowKey} className="hover:bg-gray-50/50 transition-colors">
                        {/* Product Image & Name */}
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg border border-gray-100 flex items-center justify-center p-1 bg-white flex-shrink-0">
                              <Image
                                src={imgSrc}
                                alt={p.name}
                                width={48}
                                height={48}
                                unoptimized
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="max-w-xs">
                              <Link
                                href={`/products/${p.id}`}
                                target="_blank"
                                className="font-bold text-xs sm:text-sm text-gray-900 hover:text-[#DE1D3A] transition-colors line-clamp-1"
                              >
                                {p.name}
                              </Link>
                              <span className="text-[10px] text-gray-400 font-mono block">
                                ID: {p.id}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-5 py-3 text-xs text-gray-600 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-700">
                            {p.category}
                          </span>
                        </td>

                        {/* Price & Offer Price */}
                        <td className="px-5 py-3 whitespace-nowrap">
                          {p.price || p.offerPrice ? (
                            <div>
                              {p.offerPrice && p.price && Number(p.offerPrice) < Number(p.price) ? (
                                <div className="space-y-0.5">
                                  <div className="font-bold text-xs text-[#DE1D3A]">
                                    ₹{Number(p.offerPrice).toLocaleString('en-IN')}
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] text-gray-400 line-through">
                                      ₹{Number(p.price).toLocaleString('en-IN')}
                                    </span>
                                    <span className="text-[9px] font-bold text-green-700 bg-green-50 px-1 rounded">
                                      {Math.round(((Number(p.price) - Number(p.offerPrice)) / Number(p.price)) * 100)}% off
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <div className="font-bold text-xs text-gray-900">
                                  ₹{Number(p.offerPrice || p.price).toLocaleString('en-IN')}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-[11px] text-gray-400 italic">On Request</span>
                          )}
                        </td>

                        {/* Date & Time */}
                        <td className="px-5 py-3 whitespace-nowrap">
                          {(() => {
                            const dt = formatDateTime(p.updatedAt || p.createdAt);
                            const isUpdated =
                              p.updatedAt &&
                              p.createdAt &&
                              new Date(p.updatedAt).getTime() > new Date(p.createdAt).getTime() + 1000;
                            return (
                              <div>
                                <div className="text-xs font-semibold text-gray-800 flex items-center gap-1.5">
                                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                  <span>{dt.date}</span>
                                </div>
                                <div className="text-[11px] text-gray-500 flex items-center gap-1 font-mono mt-0.5">
                                  <Clock className="w-3 h-3 text-gray-400" />
                                  <span>{dt.time}</span>
                                  {isUpdated ? (
                                    <span className="text-[9px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1 py-0.2 rounded font-sans font-semibold">
                                      Updated
                                    </span>
                                  ) : p.createdAt ? (
                                    <span className="text-[9px] text-blue-700 bg-blue-50 border border-blue-200 px-1 py-0.2 rounded font-sans font-semibold">
                                      New
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                            );
                          })()}
                        </td>

                        {/* Availability Toggle */}
                        <td className="px-5 py-3 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => toggleAvailability(p)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors cursor-pointer ${
                              p.isAvailable !== false
                                ? 'bg-green-50 text-green-700 hover:bg-green-100'
                                : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                p.isAvailable !== false ? 'bg-green-500' : 'bg-amber-500'
                              }`}
                            />
                            {p.isAvailable !== false ? 'In Stock' : 'Pre-Order'}
                          </button>
                        </td>

                        {/* Featured Star */}
                        <td className="px-5 py-3 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => toggleFeatured(p)}
                            title={p.isFeatured ? 'Featured Product' : 'Mark as Featured'}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              p.isFeatured
                                ? 'text-amber-500 bg-amber-50 hover:bg-amber-100'
                                : 'text-gray-300 hover:text-gray-500'
                            }`}
                          >
                            <Star className={`w-4 h-4 ${p.isFeatured ? 'fill-current' : ''}`} />
                          </button>
                        </td>

                        {/* Photos Manager */}
                        <td className="px-5 py-3 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => {
                              setPhotosProduct(p);
                              setPhotosModalOpen(true);
                            }}
                            className="inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-[#DE1D3A] font-medium p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                          >
                            <ImageIcon className="w-3.5 h-3.5 text-[#DE1D3A]" />
                            <span>{photoCount} {photoCount === 1 ? 'photo' : 'photos'}</span>
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-3 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => {
                                setCurrentProduct(p);
                                setProductModalOpen(true);
                              }}
                              title="Edit product details"
                              className="p-1.5 text-gray-500 hover:text-[#DE1D3A] hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setDeletingProduct(p);
                                setDeleteModalOpen(true);
                              }}
                              title="Delete product"
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

            <div className="px-5 py-3.5 bg-gray-50/75 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between">
              <span>Showing {filteredProducts.length} of {products.length} products</span>
              <span className="text-[11px] text-gray-400">Database: MongoDB Atlas (cobolt)</span>
            </div>
          </div>
        </div>
      )}
      </main>

      {/* --- INQUIRY DETAIL MODAL --- */}
      {selectedInquiryModal && (
        <InquiryDetailModal
          inquiry={selectedInquiryModal}
          onClose={() => setSelectedInquiryModal(null)}
          onUpdateStatus={handleUpdateInquiryStatus}
          onDelete={handleDeleteInquiry}
        />
      )}

      {/* --- JOB APPLICATION DETAIL MODAL --- */}
      {selectedAppModal && (
        <ApplicationDetailModal
          application={selectedAppModal}
          onClose={() => setSelectedAppModal(null)}
          onUpdateStatus={handleUpdateApplicationStatus}
          onDelete={handleDeleteApplication}
        />
      )}

      {/* --- PRODUCT EDIT / CREATE MODAL --- */}
      {productModalOpen && (
        <ProductFormModal
          token={token}
          product={currentProduct}
          categories={categories}
          onClose={() => setProductModalOpen(false)}
          onSuccess={(saved) => {
            const now = new Date().toISOString();
            const savedWithTime = {
              ...saved,
              updatedAt: saved?.updatedAt || now,
              createdAt: saved?.createdAt || (currentProduct?.createdAt || now),
            };
            if (currentProduct) {
              setProducts((prev) => [
                savedWithTime,
                ...prev.filter((p) => {
                  if (currentProduct._id && p._id) return p._id !== currentProduct._id;
                  return p.id !== currentProduct.id;
                }),
              ]);
              showToast(`'${savedWithTime.name}' updated successfully and moved to top.`);
            } else {
              setProducts((prev) => [savedWithTime, ...prev]);
              showToast(`'${savedWithTime.name}' created successfully and added to top.`);
            }
            setProductModalOpen(false);
          }}
        />
      )}

      {/* --- PHOTO GALLERY MODAL --- */}
      {photosModalOpen && photosProduct && (
        <PhotoGalleryModal
          token={token}
          product={photosProduct}
          onClose={() => setPhotosModalOpen(false)}
          onUpdate={(updated) => {
            const now = new Date().toISOString();
            const updatedWithTime = {
              ...updated,
              updatedAt: updated?.updatedAt || now,
            };
            setPhotosProduct(updatedWithTime);
            setProducts((prev) => [
              updatedWithTime,
              ...prev.filter((p) => {
                if (updatedWithTime._id && p._id) return p._id !== updatedWithTime._id;
                return p.id !== updatedWithTime.id;
              }),
            ]);
            showToast('Photos updated successfully and moved to top.');
          }}
        />
      )}

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {deleteModalOpen && deletingProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-base text-gray-900">Delete Product?</h3>
                <p className="text-xs text-gray-500">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed mb-6">
              Are you sure you want to permanently delete{' '}
              <strong className="text-gray-900 font-semibold">{deletingProduct.name}</strong> (
              <span className="font-mono text-gray-500">{deletingProduct.id}</span>)? It will be removed
              from the MongoDB catalog and public product pages.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setDeleteModalOpen(false);
                  setDeletingProduct(null);
                }}
                className="px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm cursor-pointer"
              >
                Yes, Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// PRODUCT FORM MODAL (Add / Edit)
// -------------------------------------------------------------
function ProductFormModal({ token, product, categories, onClose, onSuccess }) {
  const isEditing = Boolean(product);

  const [id, setId] = useState(product?.id || '');
  const [name, setName] = useState(product?.name || '');
  const [category, setCategory] = useState(product?.category || categories[1] || 'Food Preparation Machines');
  const [customCategory, setCustomCategory] = useState('');
  const [tagline, setTagline] = useState(product?.tagline || '');
  const [description, setDescription] = useState(product?.description || '');
  const [image, setImage] = useState(getSrc(product?.image) || '/slider1.webp');
  const [price, setPrice] = useState(
    product?.price !== undefined && product?.price !== null ? String(product.price) : ''
  );
  const [offerPrice, setOfferPrice] = useState(
    product?.offerPrice !== undefined && product?.offerPrice !== null ? String(product.offerPrice) : ''
  );
  const [isAvailable, setIsAvailable] = useState(product ? product.isAvailable !== false : true);
  const [isFeatured, setIsFeatured] = useState(product?.isFeatured || false);

  // Dynamic Specs & Fast Text Input Mode
  const initialSpecs =
    Array.isArray(product?.specs) && product.specs.length > 0
      ? product.specs.map((s) => ({ label: s.label || '', value: s.value || '' }))
      : [];

  const specsToText = (items) => {
    if (!Array.isArray(items) || items.length === 0) return '';
    return items
      .filter((s) => (s.label && s.label.trim()) || (s.value && s.value.trim()))
      .map((s) => `${(s.label || '').trim()} : ${(s.value || '').trim()}`)
      .join('\n');
  };

  const parseSpecsText = (text) => {
    if (!text || !text.trim()) return [];
    const lines = text.split('\n');
    const result = [];

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;

      let delimiter = ':';
      if (!line.includes(':') && line.includes('\t')) delimiter = '\t';
      else if (!line.includes(':') && line.includes('|')) delimiter = '|';

      const idx = line.indexOf(delimiter);
      if (idx !== -1) {
        const label = line.slice(0, idx).trim();
        const value = line.slice(idx + 1).trim();
        if (label || value) {
          result.push({ label: label || 'Specification', value: value || '-' });
        }
      } else {
        result.push({ label: 'Specification', value: line });
      }
    }
    return result;
  };

  const [specs, setSpecs] = useState(
    initialSpecs.length > 0 ? initialSpecs : [{ label: '', value: '' }]
  );
  const [rawSpecsText, setRawSpecsText] = useState(specsToText(initialSpecs));
  const [specInputMode, setSpecInputMode] = useState('text'); // 'text' (Fast text/paste) or 'table' (Row by row)

  // Dynamic Accessories
  const [accessories, setAccessories] = useState(
    Array.isArray(product?.accessories) ? product.accessories : []
  );
  const [newAccessory, setNewAccessory] = useState('');

  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Handle Spec Rows
  const addSpecRow = () => {
    const updated = [...specs, { label: '', value: '' }];
    setSpecs(updated);
    setRawSpecsText(specsToText(updated));
  };

  const updateSpecRow = (idx, field, val) => {
    const updated = [...specs];
    updated[idx][field] = val;
    setSpecs(updated);
    setRawSpecsText(specsToText(updated));
  };

  const removeSpecRow = (idx) => {
    const updated = specs.filter((_, i) => i !== idx);
    const finalUpdated = updated.length > 0 ? updated : [{ label: '', value: '' }];
    setSpecs(finalUpdated);
    setRawSpecsText(specsToText(finalUpdated));
  };

  const handleTablePaste = (e, idx) => {
    const pasted = e.clipboardData?.getData('text');
    if (pasted && (pasted.includes('\n') || pasted.includes(':'))) {
      const parsed = parseSpecsText(pasted);
      if (parsed.length > 0) {
        e.preventDefault();
        const existing = specs.filter((s, i) => i !== idx || (s.label.trim() && s.value.trim()));
        const merged = [...existing, ...parsed];
        setSpecs(merged.length > 0 ? merged : [{ label: '', value: '' }]);
        setRawSpecsText(specsToText(merged));
      }
    }
  };

  // Handle Accessories Tags
  const addAccessory = () => {
    if (newAccessory.trim() && !accessories.includes(newAccessory.trim())) {
      setAccessories([...accessories, newAccessory.trim()]);
      setNewAccessory('');
    }
  };

  const removeAccessory = (tag) => {
    setAccessories(accessories.filter((a) => a !== tag));
  };

  // Image File Upload
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      setError('');
      const uploadedUrl = await uploadPhotoApi(file, token);
      setImage(uploadedUrl);
    } catch (err) {
      setError(err.message || 'Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  // Save / Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const finalCategory = customCategory.trim() || category;
    if (!name.trim()) {
      setError('Product name is required.');
      return;
    }

    const payload = {
      id: id.trim() || undefined,
      name: name.trim(),
      category: finalCategory,
      tagline: tagline.trim(),
      description: description.trim(),
      image,
      images: [image],
      price: price.trim() !== '' && !isNaN(Number(price)) ? Number(price) : null,
      offerPrice: offerPrice.trim() !== '' && !isNaN(Number(offerPrice)) ? Number(offerPrice) : null,
      specs: (
        specInputMode === 'text' ? parseSpecsText(rawSpecsText) : specs
      )
        .filter((s) => (s.label && s.label.trim()) || (s.value && s.value.trim()))
        .map((s) => ({
          label: s.label?.trim() || 'Specification',
          value: s.value?.trim() || '-',
        })),
      accessories: accessories.filter(Boolean),
      isAvailable,
      isFeatured,
    };

    try {
      setSaving(true);
      let res;
      if (isEditing) {
        res = await updateProductApi(product._id || product.id, payload, token);
      } else {
        res = await createProductApi(payload, token);
      }
      onSuccess(res);
    } catch (err) {
      setError(err.message || 'Failed to save product.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 my-8 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <div>
            <h2 className="text-lg font-bold font-display text-gray-900">
              {isEditing ? `Edit: ${product.name}` : 'Add New Machinery'}
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="text-xs text-gray-500">
                {isEditing ? `Slug: ${product.id}` : 'Create a new catalog item stored in MongoDB'}
              </span>
              {isEditing && (product.updatedAt || product.createdAt) && (
                <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-600" />
                  <span>Last modified: {formatDateTime(product.updatedAt || product.createdAt).full}</span>
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Name and Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. DH-F FREQUENCY CHANGER DOUGH MIXER"
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#DE1D3A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (e.target.value !== 'CUSTOM') setCustomCategory('');
                }}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#DE1D3A]"
              >
                {categories.filter((c) => c !== 'All').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
                <option value="CUSTOM">+ Add Custom Category...</option>
              </select>

              {category === 'CUSTOM' && (
                <input
                  type="text"
                  placeholder="Enter custom category name..."
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="w-full mt-2 px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#DE1D3A]"
                />
              )}
            </div>
          </div>

          {/* Row 2: Custom Slug ID & Tagline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                URL Identifier / Slug
              </label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Auto-generated if left empty (e.g. DH-F-MIXER)"
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#DE1D3A] font-mono text-gray-700"
              />
              <p className="text-[10px] text-gray-400 mt-1">
                Controls the web page URL: /products/[slug]
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Tagline / Subheading
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. Heavy Duty Stainless Steel Meat Mincer"
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#DE1D3A]"
              />
            </div>
          </div>

          {/* Row 2.5: Product Pricing & Offers */}
          <div className="bg-gradient-to-br from-red-50/50 via-gray-50/60 to-white border border-gray-200 rounded-2xl p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-800">
                  Product Pricing &amp; Special Offers
                </label>
                <p className="text-[11px] text-gray-500">
                  Set regular catalog price and optional discounted offer price (in INR ₹).
                </p>
              </div>
              {price && offerPrice && Number(offerPrice) < Number(price) && (
                <span className="text-[11px] font-bold text-green-700 bg-green-100 border border-green-200 px-2.5 py-1 rounded-full shadow-2xs">
                  Save ₹{(Number(price) - Number(offerPrice)).toLocaleString('en-IN')} (
                  {Math.round(((Number(price) - Number(offerPrice)) / Number(price)) * 100)}% OFF)
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Regular Price (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 45000"
                    className="w-full pl-7 pr-3.5 py-2 text-xs sm:text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#DE1D3A]"
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  Standard list price (will be struck through if offer price is active).
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Offer / Sale Price (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#DE1D3A] font-bold text-xs">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(e.target.value)}
                    placeholder="e.g. 38000"
                    className="w-full pl-7 pr-3.5 py-2 text-xs sm:text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#DE1D3A]"
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  Discounted selling price displayed prominently on the website.
                </p>
              </div>
            </div>
          </div>

          {/* Row 3: Main Photo */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
              Primary Product Photo
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border border-gray-200 rounded-xl bg-gray-50/50">
              <div className="w-20 h-20 rounded-xl border border-gray-200 bg-white p-1 flex items-center justify-center flex-shrink-0">
                <Image
                  src={getSrc(image)}
                  alt="Preview"
                  width={80}
                  height={80}
                  unoptimized
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1 w-full space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Image URL or /images/products/..."
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#DE1D3A]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:border-[#DE1D3A] text-gray-700 text-xs font-medium rounded-lg cursor-pointer transition-colors shadow-2xs">
                    {uploadingImage ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#DE1D3A]" />
                    ) : (
                      <Upload className="w-3.5 h-3.5 text-[#DE1D3A]" />
                    )}
                    <span>{uploadingImage ? 'Uploading...' : 'Upload New Photo'}</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/avif"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>
                  <span className="text-[10px] text-gray-400">
                    Saves to persistent cloud storage (Cloudinary) or local uploads
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
              Detailed Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Commercial specifications, operating power, build material, warranty details..."
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#DE1D3A]"
            />
          </div>

          {/* Technical Specifications */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Technical Specifications
                </label>
                <p className="text-[11px] text-gray-500">
                  {specInputMode === 'text'
                    ? 'Type or paste specs (e.g. MODEL : OFG-5910)'
                    : 'Manage each specification row-by-row'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Switch between Fast Text Mode and Table Mode */}
                <div className="flex items-center bg-gray-100 p-0.5 rounded-lg border border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      if (specInputMode !== 'text') {
                        setRawSpecsText(specsToText(specs));
                        setSpecInputMode('text');
                      }
                    }}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                      specInputMode === 'text'
                        ? 'bg-white text-[#DE1D3A] shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" /> Fast Text / Paste
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (specInputMode !== 'table') {
                        const parsed = parseSpecsText(rawSpecsText);
                        setSpecs(parsed.length > 0 ? parsed : [{ label: '', value: '' }]);
                        setSpecInputMode('table');
                      }
                    }}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                      specInputMode === 'table'
                        ? 'bg-white text-[#DE1D3A] shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Table className="w-3.5 h-3.5" /> Table Rows
                  </button>
                </div>

                {specInputMode === 'table' && (
                  <button
                    type="button"
                    onClick={addSpecRow}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#DE1D3A] hover:underline cursor-pointer ml-1"
                  >
                    <Plus className="w-3 h-3" /> Add Row
                  </button>
                )}
              </div>
            </div>

            {specInputMode === 'text' ? (
              <div className="space-y-2 border border-gray-200 rounded-xl p-3 bg-gray-50/50">
                <div className="flex items-center justify-between text-[11px] text-gray-500">
                  <span>
                    Format: <code className="text-[#DE1D3A] bg-red-50 px-1.5 py-0.5 rounded font-mono font-bold">MODEL : DA-EOG-PZA-1D1T</code> (one per line)
                  </span>
                  <span className="font-semibold text-gray-700 bg-white px-2 py-0.5 rounded border border-gray-200 shadow-xs">
                    {parseSpecsText(rawSpecsText).length} spec{parseSpecsText(rawSpecsText).length === 1 ? '' : 's'} detected
                  </span>
                </div>

                <textarea
                  rows={8}
                  value={rawSpecsText}
                  onChange={(e) => {
                    const val = e.target.value;
                    setRawSpecsText(val);
                    setSpecs(parseSpecsText(val));
                  }}
                  placeholder={`MODEL : DA-EOG-PZA-1D1T\nRATED VOLTAGE : 220V/50HZ/1PH\nMJ/H : 16MJ/±10%\nTEMPERATURE RANGE : AMBIENT TO 400°C\nNET WEIGHT : 70KG`}
                  className="w-full px-3.5 py-2.5 text-xs font-mono bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#DE1D3A] leading-relaxed shadow-xs"
                />

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px]">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const sample = `MODEL : DA-EOG-PZA-1D1T\nRATED VOLTAGE : 220V/50HZ/1PH\nMJ/H : 16MJ/±10%\nTEMPERATURE RANGE : AMBIENT TO 400°C\nNET WEIGHT : 70KG`;
                        setRawSpecsText(sample);
                        setSpecs(parseSpecsText(sample));
                      }}
                      className="text-[#DE1D3A] hover:underline font-semibold cursor-pointer"
                    >
                      Insert Example Template
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      type="button"
                      onClick={() => {
                        setRawSpecsText('');
                        setSpecs([{ label: '', value: '' }]);
                      }}
                      className="text-gray-500 hover:text-red-600 font-medium cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>
                  <span className="text-gray-400 italic">
                    Supports colon (:), tab, or pipe (|) delimiters
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-2 border border-gray-200 rounded-xl p-3 bg-gray-50/50">
                {specs.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Spec Label (e.g. MODEL)"
                      value={spec.label}
                      onPaste={(e) => handleTablePaste(e, idx)}
                      onChange={(e) => updateSpecRow(idx, 'label', e.target.value)}
                      className="w-2/5 px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#DE1D3A]"
                    />
                    <input
                      type="text"
                      placeholder="Value (e.g. DA-EOG-PZA-1D1T)"
                      value={spec.value}
                      onChange={(e) => updateSpecRow(idx, 'value', e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#DE1D3A]"
                    />
                    <button
                      type="button"
                      onClick={() => removeSpecRow(idx)}
                      className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors cursor-pointer"
                      title="Remove row"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                {specs.length === 0 && (
                  <div className="text-center py-4 text-xs text-gray-400">
                    No specifications. Click &quot;Add Row&quot; or switch to &quot;Fast Text / Paste&quot;.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Included Accessories */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
              Included Accessories
            </label>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                placeholder="e.g. Stainless Steel Cutting Knives (x2)"
                value={newAccessory}
                onChange={(e) => setNewAccessory(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addAccessory();
                  }
                }}
                className="flex-1 px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#DE1D3A]"
              />
              <button
                type="button"
                onClick={addAccessory}
                className="px-3 py-1.5 bg-gray-800 hover:bg-black text-white text-xs font-semibold rounded-xl cursor-pointer"
              >
                Add Tag
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {accessories.map((acc, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-gray-100 text-gray-800 border border-gray-200"
                >
                  <Check className="w-3 h-3 text-green-600" />
                  <span>{acc}</span>
                  <button
                    type="button"
                    onClick={() => removeAccessory(acc)}
                    className="hover:text-red-600 transition-colors ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Toggles: Availability & Featured */}
          <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-gray-100">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
                className="w-4 h-4 text-[#DE1D3A] rounded border-gray-300 focus:ring-[#DE1D3A]"
              />
              <span className="text-xs font-medium text-gray-700">In Stock (Available for orders)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 text-[#DE1D3A] rounded border-gray-300 focus:ring-[#DE1D3A]"
              />
              <span className="text-xs font-medium text-gray-700">Featured Machinery</span>
            </label>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-[#DE1D3A] hover:bg-[#B7152D] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{isEditing ? 'Save Changes' : 'Create Product'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// PHOTO GALLERY MODAL (Add, Replace, Reorder, Remove)
// -------------------------------------------------------------
function PhotoGalleryModal({ token, product, onClose, onUpdate }) {
  const [images, setImages] = useState(
    Array.isArray(product.images) && product.images.length > 0
      ? product.images.map(getSrc)
      : [getSrc(product.image)]
  );
  const [primaryImage, setPrimaryImage] = useState(getSrc(product.image));
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [newUrlInput, setNewUrlInput] = useState('');

  // Upload single photo
  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setError('');
      const uploadedUrl = await uploadPhotoApi(file, token);
      const updated = [...images, uploadedUrl];
      setImages(updated);
      if (!primaryImage) setPrimaryImage(uploadedUrl);
    } catch (err) {
      setError(err.message || 'Photo upload failed');
    } finally {
      setUploading(false);
    }
  };

  // Add photo via direct URL
  const handleAddUrl = () => {
    if (newUrlInput.trim() && !images.includes(newUrlInput.trim())) {
      const updated = [...images, newUrlInput.trim()];
      setImages(updated);
      if (!primaryImage) setPrimaryImage(newUrlInput.trim());
      setNewUrlInput('');
    }
  };

  // Move photo left/up in order
  const movePhoto = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= images.length) return;
    const list = [...images];
    const [moved] = list.splice(index, 1);
    list.splice(targetIdx, 0, moved);
    setImages(list);
  };

  // Remove photo
  const removePhoto = (src) => {
    if (images.length <= 1) {
      setError('A product must have at least one photo.');
      return;
    }
    const filtered = images.filter((img) => img !== src);
    setImages(filtered);
    if (primaryImage === src) {
      setPrimaryImage(filtered[0]);
    }
  };

  // Save changes to backend
  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      const updated = await manageProductPhotosApi(
        product._id || product.id,
        {
          images,
          primaryImage,
        },
        token
      );
      onUpdate(updated);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save photos.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <div>
            <h2 className="text-lg font-bold font-display text-gray-900">
              Manage Photos: {product.name}
            </h2>
            <p className="text-xs text-gray-500">
              Add, replace, reorder, or remove photos. First photo or starred photo serves as main showcase.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Existing Photos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          {images.map((img, idx) => {
            const isPrimary = primaryImage === img;
            return (
              <div
                key={idx}
                className={`relative border rounded-xl p-2 bg-white flex flex-col items-center justify-between group transition-all ${
                  isPrimary
                    ? 'border-[#DE1D3A] ring-2 ring-[#DE1D3A]/20 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Image */}
                <div className="w-full h-32 flex items-center justify-center p-2 mb-2">
                  <Image
                    src={getSrc(img)}
                    alt={`Photo ${idx + 1}`}
                    width={120}
                    height={120}
                    unoptimized
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Primary Badge */}
                {isPrimary ? (
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#DE1D3A] text-white text-[9px] font-bold rounded-md uppercase tracking-wider shadow-xs">
                    Primary
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPrimaryImage(img)}
                    className="absolute top-2 left-2 px-2 py-0.5 bg-white/90 hover:bg-[#DE1D3A] hover:text-white text-gray-600 text-[9px] font-bold rounded-md uppercase tracking-wider border border-gray-200 transition-colors shadow-xs cursor-pointer"
                  >
                    Set Primary
                  </button>
                )}

                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => removePhoto(img)}
                  className="absolute top-2 right-2 p-1 bg-white/90 text-gray-400 hover:text-red-600 rounded-md border border-gray-200 transition-colors cursor-pointer shadow-xs"
                  title="Remove photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                {/* Reorder Buttons */}
                <div className="w-full flex items-center justify-between border-t border-gray-100 pt-2 text-xs text-gray-500">
                  <span className="text-[10px] text-gray-400 font-mono">Pos: {idx + 1}</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => movePhoto(idx, -1)}
                      className="p-1 hover:bg-gray-100 rounded disabled:opacity-25 transition-colors cursor-pointer"
                      title="Move left/up"
                    >
                      &larr;
                    </button>
                    <button
                      type="button"
                      disabled={idx === images.length - 1}
                      onClick={() => movePhoto(idx, 1)}
                      className="p-1 hover:bg-gray-100 rounded disabled:opacity-25 transition-colors cursor-pointer"
                      title="Move right/down"
                    >
                      &rarr;
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Upload Controls */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3 mb-6">
          <div className="flex items-center gap-2">
            <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#DE1D3A] hover:bg-[#B7152D] text-white text-xs font-bold rounded-xl cursor-pointer transition-colors shadow-xs">
              {uploading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Upload className="w-3.5 h-3.5" />
              )}
              <span>{uploading ? 'Uploading Photo...' : 'Upload from Computer'}</span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={handleUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
            <span className="text-xs text-gray-400">or add via URL below:</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Paste direct image URL (https://...)..."
              value={newUrlInput}
              onChange={(e) => setNewUrlInput(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#DE1D3A]"
            />
            <button
              type="button"
              onClick={handleAddUrl}
              className="px-3 py-1.5 bg-gray-800 hover:bg-black text-white text-xs font-semibold rounded-lg cursor-pointer"
            >
              Add URL
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-[#DE1D3A] hover:bg-[#B7152D] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>Save Photos</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * --- INQUIRY DETAIL MODAL ---
 */
function InquiryDetailModal({ inquiry, onClose, onUpdateStatus, onDelete }) {
  if (!inquiry) return null;
  const cleanPhone = (inquiry.phone || '').replace(/[^0-9+]/g, '');
  const waNumber = cleanPhone.startsWith('+') ? cleanPhone.slice(1) : cleanPhone;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-gray-200 shadow-2xl p-6 my-8 animate-fade-in">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-100 text-[#DE1D3A]">
              {inquiry.serviceType || 'Machinery Purchase'}
            </span>
            <h3 className="text-lg font-bold text-gray-900 mt-1 font-display">
              {inquiry.subject || 'Customer Inquiry'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-3.5 text-xs">
          <div>
            <span className="font-semibold text-gray-500 uppercase tracking-wider text-[10px]">Customer Name</span>
            <p className="text-sm font-bold text-gray-900">{inquiry.name}</p>
          </div>

          {inquiry.company && (
            <div>
              <span className="font-semibold text-gray-500 uppercase tracking-wider text-[10px]">Company / Facility</span>
              <p className="text-gray-900 font-medium">{inquiry.company}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-semibold text-gray-500 uppercase tracking-wider text-[10px]">Email Address</span>
              <p>
                <a href={`mailto:${inquiry.email}`} className="text-[#DE1D3A] hover:underline font-medium">
                  {inquiry.email}
                </a>
              </p>
            </div>
            <div>
              <span className="font-semibold text-gray-500 uppercase tracking-wider text-[10px]">Phone Number</span>
              <p>
                <a href={`tel:${inquiry.phone}`} className="text-gray-900 hover:text-[#DE1D3A] font-medium">
                  {inquiry.phone}
                </a>
              </p>
            </div>
          </div>

          <div>
            <span className="font-semibold text-gray-500 uppercase tracking-wider text-[10px]">Received On</span>
            <p className="text-gray-600 font-mono text-[11px]">
              {new Date(inquiry.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
            </p>
          </div>

          <div>
            <span className="font-semibold text-gray-500 uppercase tracking-wider text-[10px]">Inquiry Message</span>
            <div className="mt-1 p-3.5 bg-gray-50 rounded-xl border border-gray-200 text-gray-800 text-xs leading-relaxed whitespace-pre-wrap">
              {inquiry.message}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${inquiry.email}?subject=Re:%20${encodeURIComponent(inquiry.subject || 'Cobolt Machineries Inquiry')}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#DE1D3A] hover:bg-[#B7152D] text-white text-xs font-semibold rounded-xl transition-all shadow-xs"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Reply Email</span>
            </a>

            {waNumber && (
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-xl transition-all shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            )}
          </div>

          <div className="flex items-center gap-2">
            {inquiry.status !== 'contacted' && (
              <button
                type="button"
                onClick={() => onUpdateStatus(inquiry._id, 'contacted')}
                className="px-3 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Mark Contacted
              </button>
            )}
            <button
              type="button"
              onClick={() => onDelete(inquiry._id)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl border border-gray-200 transition-colors cursor-pointer"
              title="Delete Inquiry"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * --- JOB APPLICATION DETAIL MODAL ---
 */
function ApplicationDetailModal({ application, onClose, onUpdateStatus, onDelete }) {
  if (!application) return null;
  const [internalNotes, setInternalNotes] = useState(application.notes || '');
  const [savingNotes, setSavingNotes] = useState(false);

  const cleanPhone = (application.phone || '').replace(/[^0-9+]/g, '');
  const waNumber = cleanPhone.startsWith('+') ? cleanPhone.slice(1) : cleanPhone;

  const handleSaveNotes = async () => {
    try {
      setSavingNotes(true);
      await onUpdateStatus(application._id, application.status, internalNotes);
    } finally {
      setSavingNotes(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-gray-200 shadow-2xl p-6 my-8 animate-fade-in max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-100 text-[#DE1D3A]">
                {application.targetPosition}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-700">
                {application.refCode}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mt-1.5 font-display">
              {application.fullName}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-4 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-semibold text-gray-500 uppercase tracking-wider text-[10px]">Experience Level</span>
              <p className="text-sm font-semibold text-gray-900 mt-0.5">{application.experienceLevel || 'Mid Level'}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-500 uppercase tracking-wider text-[10px]">Application Status</span>
              <div className="mt-0.5">
                <select
                  value={application.status || 'new'}
                  onChange={(e) => onUpdateStatus(application._id, e.target.value, internalNotes)}
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${
                    application.status === 'new'
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : application.status === 'reviewing'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : application.status === 'shortlisted'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : application.status === 'rejected'
                      ? 'bg-slate-100 text-slate-600 border-slate-200'
                      : 'bg-gray-100 text-gray-600 border-gray-200'
                  }`}
                >
                  <option value="new">New</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="font-semibold text-gray-500 uppercase tracking-wider text-[10px]">Email Address</span>
              <p className="mt-0.5">
                <a href={`mailto:${application.email}`} className="text-[#DE1D3A] hover:underline font-medium">
                  {application.email}
                </a>
              </p>
            </div>
            <div>
              <span className="font-semibold text-gray-500 uppercase tracking-wider text-[10px]">Contact Phone</span>
              <p className="mt-0.5">
                <a href={`tel:${application.phone}`} className="text-gray-900 hover:text-[#DE1D3A] font-medium">
                  {application.phone}
                </a>
              </p>
            </div>
          </div>

          {application.linkedIn && (
            <div>
              <span className="font-semibold text-gray-500 uppercase tracking-wider text-[10px]">LinkedIn / Portfolio</span>
              <p className="mt-0.5">
                <a
                  href={application.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 hover:underline font-medium inline-flex items-center gap-1"
                >
                  <span>{application.linkedIn}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>
          )}

          <div>
            <span className="font-semibold text-gray-500 uppercase tracking-wider text-[10px]">Applied On</span>
            <p className="text-gray-600 font-mono text-[11px] mt-0.5">
              {new Date(application.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
            </p>
          </div>

          {/* Resume Card */}
          <div>
            <span className="font-semibold text-gray-500 uppercase tracking-wider text-[10px]">Resume / Curriculum Vitae</span>
            {application.resumeUrl ? (
              <div className="mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-100 text-[#DE1D3A] flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-xs truncate max-w-xs">
                      {application.resumeOriginalName || 'Candidate_Resume.pdf'}
                    </p>
                    <p className="text-[10px] text-gray-400">Attached Candidate Document</p>
                  </div>
                </div>
                <a
                  href={application.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-[#DE1D3A] hover:bg-[#c51831] text-white text-xs font-bold rounded-xl transition-all shadow-xs inline-flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>View / Download</span>
                </a>
              </div>
            ) : (
              <p className="text-gray-400 text-xs italic mt-1">No resume file uploaded.</p>
            )}
          </div>

          {/* Cover Note */}
          {application.coverNote && (
            <div>
              <span className="font-semibold text-gray-500 uppercase tracking-wider text-[10px]">Cover Note / Candidate Statement</span>
              <div className="mt-1 p-3.5 bg-gray-50 rounded-xl border border-gray-200 text-gray-800 text-xs leading-relaxed whitespace-pre-wrap">
                {application.coverNote}
              </div>
            </div>
          )}

          {/* Recruiter Internal Notes */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-gray-500 uppercase tracking-wider text-[10px]">
                Internal Recruiter Notes &amp; Evaluation
              </span>
              <button
                type="button"
                onClick={handleSaveNotes}
                disabled={savingNotes}
                className="text-[11px] font-bold text-[#DE1D3A] hover:underline cursor-pointer disabled:opacity-50"
              >
                {savingNotes ? 'Saving...' : 'Save Notes'}
              </button>
            </div>
            <textarea
              rows={3}
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              placeholder="Add interview notes, candidate rating, technical feedback, or follow-up steps..."
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:border-[#DE1D3A] transition-all resize-none"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${application.email}?subject=Re:%20Cobolt%20Machineries%20Application%20-%20${encodeURIComponent(application.refCode)}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#DE1D3A] hover:bg-[#B7152D] text-white text-xs font-semibold rounded-xl transition-all shadow-xs"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Reply Candidate</span>
            </a>

            {waNumber && (
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-xl transition-all shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onDelete(application._id)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl border border-gray-200 transition-colors cursor-pointer"
              title="Delete Application"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

