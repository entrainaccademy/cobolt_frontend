const DEFAULT_BACKEND_URL = 'https://cobolt-backend.onrender.com';

export const getBackendUrl = () => {
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    }
    return process.env.NEXT_PUBLIC_API_URL || DEFAULT_BACKEND_URL;
  }
  if (process.env.NODE_ENV === 'development') {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  }
  return process.env.NEXT_PUBLIC_API_URL || DEFAULT_BACKEND_URL;
};

/**
 * Fetch list of products with optional query parameters with fast timeout fallback
 */
export async function fetchProducts({ search = '', category = '', isAvailable, isFeatured } = {}) {
  try {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category && category !== 'All') params.append('category', category);
    if (typeof isAvailable !== 'undefined') params.append('isAvailable', String(isAvailable));
    if (typeof isFeatured !== 'undefined') params.append('isFeatured', String(isFeatured));

    const backendUrl = getBackendUrl();
    const url = `${backendUrl}/api/products${params.toString() ? `?${params.toString()}` : ''}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 60 },
      headers: { Accept: 'application/json' },
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.products || [];
  } catch (error) {
    return null;
  }
}

/**
 * Fetch a single product by its slug id or MongoDB _id with fast timeout fallback
 */
export async function fetchProductById(id) {
  try {
    if (!id) return null;
    const backendUrl = getBackendUrl();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${backendUrl}/api/products/${encodeURIComponent(id)}`, {
      signal: controller.signal,
      next: { revalidate: 60 },
      headers: { Accept: 'application/json' },
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return {
      product: data.product,
      relatedProducts: data.relatedProducts || [],
    };
  } catch (error) {
    return null;
  }
}

/**
 * Fetch product categories
 */
export async function fetchCategories() {
  try {
    const backendUrl = getBackendUrl();
    const res = await fetch(`${backendUrl}/api/categories`, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.categories || [];
  } catch (error) {
    console.error('Error fetching categories from backend:', error.message);
    return null;
  }
}

/**
 * Admin Login
 */
export async function adminLogin(email, password) {
  const backendUrl = getBackendUrl();
  const res = await fetch(`${backendUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Login failed. Please check credentials.');
  }
  return data;
}

/**
 * Admin Get Profile
 */
export async function getAdminProfile(token) {
  const backendUrl = getBackendUrl();
  const res = await fetch(`${backendUrl}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to authenticate admin.');
  }
  return data.admin;
}

/**
 * Admin Create Product
 */
export async function createProductApi(productData, token) {
  const backendUrl = getBackendUrl();
  const res = await fetch(`${backendUrl}/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to create product.');
  }
  return data.product;
}

/**
 * Admin Update Product
 */
export async function updateProductApi(id, productData, token) {
  const backendUrl = getBackendUrl();
  const res = await fetch(`${backendUrl}/api/products/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to update product.');
  }
  return data.product;
}

/**
 * Admin Delete Product
 */
export async function deleteProductApi(id, token) {
  const backendUrl = getBackendUrl();
  const res = await fetch(`${backendUrl}/api/products/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to delete product.');
  }
  return data;
}

/**
 * Admin Update Product Status (Availability / Featured)
 */
export async function updateProductStatusApi(id, statusData, token) {
  const backendUrl = getBackendUrl();
  const res = await fetch(`${backendUrl}/api/products/${encodeURIComponent(id)}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(statusData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to update status.');
  }
  return data.product;
}

/**
 * Admin Manage Product Photos
 */
export async function manageProductPhotosApi(id, photoData, token) {
  const backendUrl = getBackendUrl();
  const res = await fetch(`${backendUrl}/api/products/${encodeURIComponent(id)}/photos`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(photoData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to update product photos.');
  }
  return data.product;
}

/**
 * Admin Upload Photo
 */
export async function uploadPhotoApi(file, token) {
  const backendUrl = getBackendUrl();
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`${backendUrl}/api/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to upload photo.');
  }
  return data.url || data.path;
}

/**
 * Public: Submit machinery / contact inquiry
 */
export async function submitContactInquiry(inquiryData) {
  const backendUrl = getBackendUrl();
  const res = await fetch(`${backendUrl}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inquiryData),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error('Contact API endpoint is being deployed on Render. Please push the latest backend commit or contact us via WhatsApp.');
    }
    throw new Error(data.message || 'Failed to submit inquiry. Please try again.');
  }
  return data;
}

/**
 * Admin: Fetch customer inquiries
 */
export async function fetchInquiriesApi(params = {}, token) {
  const backendUrl = getBackendUrl();
  const url = new URL(`${backendUrl}/api/contact`);
  if (params.status) url.searchParams.set('status', params.status);
  if (params.search) url.searchParams.set('search', params.search);

  try {
    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      if (res.status === 404) {
        // Backend has not yet deployed the contact endpoint
        return {
          success: false,
          notDeployed: true,
          inquiries: [],
          stats: { total: 0, new: 0, contacted: 0, archived: 0 },
        };
      }
      throw new Error(data.message || 'Failed to fetch inquiries.');
    }
    return data;
  } catch (err) {
    if (err.message && err.message.includes('not exist on this API')) {
      return {
        success: false,
        notDeployed: true,
        inquiries: [],
        stats: { total: 0, new: 0, contacted: 0, archived: 0 },
      };
    }
    throw err;
  }
}

/**
 * Admin: Update inquiry status or notes
 */
export async function updateInquiryStatusApi(id, updateData, token) {
  const backendUrl = getBackendUrl();
  const res = await fetch(`${backendUrl}/api/contact/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to update inquiry.');
  }
  return data.inquiry;
}

/**
 * Admin: Delete inquiry
 */
export async function deleteInquiryApi(id, token) {
  const backendUrl = getBackendUrl();
  const res = await fetch(`${backendUrl}/api/contact/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to delete inquiry.');
  }
  return data;
}

/**
 * Resilient API fetcher supporting both local backend dev server and production Render backend
 */
async function safeApiFetch(endpointPath, options = {}) {
  const primaryUrl = getBackendUrl();
  const isLocalHost =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  const urlsToTry = [];
  if (isLocalHost && !primaryUrl.includes('localhost:5000')) {
    // Try local backend on port 5000 first so local dev works seamlessly, then primary URL
    urlsToTry.push(`http://localhost:5000${endpointPath}`);
    urlsToTry.push(`${primaryUrl}${endpointPath}`);
  } else {
    urlsToTry.push(`${primaryUrl}${endpointPath}`);
    if (isLocalHost) {
      urlsToTry.push(`http://localhost:5000${endpointPath}`);
    }
  }

  let lastError = null;
  let lastRes = null;

  for (const url of urlsToTry) {
    try {
      const res = await fetch(url, options);
      if (res.ok) {
        return res;
      }
      // If 404 (route not yet deployed on remote), try next candidate URL
      if (res.status === 404) {
        lastRes = res;
        continue;
      }
      return res;
    } catch (err) {
      lastError = err;
      continue;
    }
  }

  if (lastRes) return lastRes;
  throw (
    lastError ||
    new Error(
      'Unable to connect to backend server. Please verify your backend server is running.'
    )
  );
}

/**
 * Public: Submit career job application with resume file
 */
export async function submitCareerApplicationApi(formData, file) {
  const body = new FormData();
  body.append('fullName', (formData.fullName || '').trim());
  body.append('email', (formData.email || '').trim());
  body.append('phone', (formData.phone || '').trim());
  body.append('targetPosition', (formData.targetPosition || '').trim());
  body.append('experienceLevel', (formData.experienceLevel || 'Mid Level (3-5 Years)').trim());
  body.append('linkedIn', (formData.linkedIn || '').trim());
  body.append('coverNote', (formData.coverNote || '').trim());
  if (file) {
    body.append('resume', file);
  }

  const res = await safeApiFetch('/api/careers/apply', {
    method: 'POST',
    body,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(
        'Careers API is waiting to be deployed on Render. In local development, please make sure the backend is running on port 5000.'
      );
    }
    throw new Error(
      data.message || 'Failed to submit job application. Please check your details and try again.'
    );
  }
  return data;
}

/**
 * Admin: Fetch job applications
 */
export async function fetchApplicationsApi(params = {}, token) {
  const searchParams = new URLSearchParams();
  if (params.status) searchParams.set('status', params.status);
  if (params.search) searchParams.set('search', params.search);
  if (params.position) searchParams.set('position', params.position);
  const queryStr = searchParams.toString() ? `?${searchParams.toString()}` : '';

  try {
    const res = await safeApiFetch(`/api/careers/applications${queryStr}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      if (res.status === 404) {
        return {
          success: false,
          notDeployed: true,
          applications: [],
          stats: { total: 0, new: 0, reviewing: 0, shortlisted: 0, rejected: 0, archived: 0 },
        };
      }
      throw new Error(data.message || 'Failed to fetch job applications.');
    }
    return data;
  } catch (err) {
    if (err.message && err.message.includes('not exist on this API')) {
      return {
        success: false,
        notDeployed: true,
        applications: [],
        stats: { total: 0, new: 0, reviewing: 0, shortlisted: 0, rejected: 0, archived: 0 },
      };
    }
    throw err;
  }
}

/**
 * Admin: Update application status or recruiter notes
 */
export async function updateApplicationStatusApi(id, updateData, token) {
  const res = await safeApiFetch(`/api/careers/applications/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || 'Failed to update job application.');
  }
  return data.application;
}

/**
 * Admin: Delete job application
 */
export async function deleteApplicationApi(id, token) {
  const res = await safeApiFetch(`/api/careers/applications/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || 'Failed to delete job application.');
  }
  return data;
}



