<<<<<<< HEAD
const DEFAULT_BACKEND_URL = 'http://localhost:5000';
=======
const DEFAULT_BACKEND_URL = 'https://cobolt-backend.onrender.com';
>>>>>>> ca192ae (admin portal)

export const getBackendUrl = () => {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || DEFAULT_BACKEND_URL;
  }
  return process.env.NEXT_PUBLIC_API_URL || DEFAULT_BACKEND_URL;
};

/**
 * Fetch list of products with optional query parameters
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

    const res = await fetch(url, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }

    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error('Error fetching products from backend:', error.message);
    return null;
  }
}

/**
 * Fetch a single product by its slug id or MongoDB _id
 */
export async function fetchProductById(id) {
  try {
    if (!id) return null;
    const backendUrl = getBackendUrl();
    const res = await fetch(`${backendUrl}/api/products/${encodeURIComponent(id)}`, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return {
      product: data.product,
      relatedProducts: data.relatedProducts || [],
    };
  } catch (error) {
    console.error(`Error fetching product '${id}' from backend:`, error.message);
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
<<<<<<< HEAD
=======

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

>>>>>>> ca192ae (admin portal)
