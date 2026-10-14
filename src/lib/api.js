const DEFAULT_BACKEND_URL = 'http://localhost:5000';

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
