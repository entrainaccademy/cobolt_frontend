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

  // Dashboard Tabs: 'products' | 'inquiries'
  const [activeTab, setActiveTab] = useState('products');

  // Customer Inquiries state
  const [inquiries, setInquiries] = useState([]);
  const [inquiryStats, setInquiryStats] = useState({ total: 0, new: 0, contacted: 0, archived: 0 });
  const [inquiriesLoading, setInquiriesLoading] = useState(false);
  const [selectedInquiryStatus, setSelectedInquiryStatus] = useState('all');
  const [inquirySearch, setInquirySearch] = useState('');
  const [selectedInquiryModal, setSelectedInquiryModal] = useState(null);
  const [inquiryBackendPending, setInquiryBackendPending] = useState(false);
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
      if (allProducts) setProducts(allProducts);
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
    }
  }, [token]);

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
    try {
      await updateProductStatusApi(product.id, { isAvailable: newStatus }, token);
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, isAvailable: newStatus } : p))
      );
      showToast(`Updated '${product.name}' availability to ${newStatus ? 'In Stock' : 'Pre-Order'}`);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Quick toggle featured
  const toggleFeatured = async (product) => {
    const newFeatured = !product.isFeatured;
    try {
      await updateProductStatusApi(product.id, { isFeatured: newFeatured }, token);
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, isFeatured: newFeatured } : p))
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
      await deleteProductApi(deletingProduct.id, token);
      setProducts((prev) => prev.filter((p) => p.id !== deletingProduct.id));
      showToast(`Product '${deletingProduct.name}' deleted successfully.`);
      setDeleteModalOpen(false);
      setDeletingProduct(null);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Filter products for display
  const filteredProducts = products.filter((p) => {
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
                    <td colSpan={6} className="text-center py-12 text-sm text-gray-500">
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

      {/* --- PRODUCT EDIT / CREATE MODAL --- */}
      {productModalOpen && (
        <ProductFormModal
          token={token}
          product={currentProduct}
          categories={categories}
          onClose={() => setProductModalOpen(false)}
          onSuccess={(saved) => {
            if (currentProduct) {
              setProducts((prev) => prev.map((p) => (p.id === currentProduct.id ? saved : p)));
              showToast(`'${saved.name}' updated successfully.`);
            } else {
              setProducts((prev) => [saved, ...prev]);
              showToast(`'${saved.name}' created successfully.`);
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
            setPhotosProduct(updated);
            setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
            showToast('Photos updated successfully.');
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
  const [isAvailable, setIsAvailable] = useState(product ? product.isAvailable !== false : true);
  const [isFeatured, setIsFeatured] = useState(product?.isFeatured || false);

  // Dynamic Specs
  const [specs, setSpecs] = useState(
    Array.isArray(product?.specs) && product.specs.length > 0
      ? product.specs.map((s) => ({ label: s.label || '', value: s.value || '' }))
      : [{ label: '', value: '' }]
  );

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
    setSpecs([...specs, { label: '', value: '' }]);
  };

  const updateSpecRow = (idx, field, val) => {
    const updated = [...specs];
    updated[idx][field] = val;
    setSpecs(updated);
  };

  const removeSpecRow = (idx) => {
    setSpecs(specs.filter((_, i) => i !== idx));
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
      specs: specs.filter((s) => s.label.trim() && s.value.trim()),
      accessories: accessories.filter(Boolean),
      isAvailable,
      isFeatured,
    };

    try {
      setSaving(true);
      let res;
      if (isEditing) {
        res = await updateProductApi(product.id, payload, token);
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
            <p className="text-xs text-gray-500">
              {isEditing ? `Editing product with slug: ${product.id}` : 'Create a new catalog item stored in MongoDB'}
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
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Technical Specifications Table
              </label>
              <button
                type="button"
                onClick={addSpecRow}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#DE1D3A] hover:underline cursor-pointer"
              >
                <Plus className="w-3 h-3" /> Add Spec Row
              </button>
            </div>

            <div className="space-y-2 border border-gray-200 rounded-xl p-3 bg-gray-50/50">
              {specs.map((spec, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Spec Label (e.g. Motor Power)"
                    value={spec.label}
                    onChange={(e) => updateSpecRow(idx, 'label', e.target.value)}
                    className="w-2/5 px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#DE1D3A]"
                  />
                  <input
                    type="text"
                    placeholder="Value (e.g. 1.5 HP / 1100W)"
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
            </div>
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
        product.id,
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

