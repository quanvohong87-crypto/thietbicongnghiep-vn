/**
 * Admin Authentication & Session Management
 */

export function checkAuth() {
  const token = localStorage.getItem('itc_admin_token');
  const user = JSON.parse(localStorage.getItem('itc_admin_user') || 'null');

  const isLoginPage = window.location.pathname.includes('/login');

  if (!token || !user) {
    // If not already on login page, redirect
    if (!isLoginPage) {
      window.location.replace('/admin/login');
    }
    return null;
  }

  // Update Topbar UI
  const nameEl = document.getElementById('adminCurrentUserName');
  const roleEl = document.getElementById('adminCurrentUserRole');
  const avatarEl = document.getElementById('adminCurrentUserAvatar');

  if (nameEl) nameEl.textContent = user.name || user.username;
  if (roleEl) roleEl.textContent = user.role === 'superadmin' ? 'Quản trị viên cấp cao' : 'Nhân viên quản lý';
  if (avatarEl) avatarEl.textContent = (user.name || user.username).charAt(0).toUpperCase();

  return { token, user };
}

export function logout() {
  localStorage.removeItem('itc_admin_token');
  localStorage.removeItem('itc_admin_user');
  document.cookie = 'itc_admin_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
  try { fetch('/api/auth/logout'); } catch(e) {}
  window.location.replace('/admin/login?action=logout');
}

export function applyAdminBrand(s) {
  if (!s) return;
  if (s.brandName) {
    document.querySelectorAll('.brand-name').forEach(el => el.textContent = s.brandName);
  }
  if (s.logoUrl) {
    document.querySelectorAll('.admin-brand-logo, .login-brand-logo').forEach(el => {
      if (el.getAttribute('src') !== s.logoUrl) el.src = s.logoUrl;
    });
    document.querySelectorAll('link[rel="icon"]').forEach(link => {
      if (link.getAttribute('href') !== s.logoUrl) link.href = s.logoUrl;
    });
  }
}

// Bind logout buttons and sync brand name
document.addEventListener('DOMContentLoaded', () => {
  // If not on login page, check auth immediately
  if (!window.location.pathname.includes('/login')) {
    checkAuth();
  }

  // Dynamic brand name & logo in admin sidebar
  try {
    const cached = localStorage.getItem('webitc_settings');
    if (cached) applyAdminBrand(JSON.parse(cached));

    fetch('/api/settings').then(r => r.json()).then(res => {
      if (res.success && res.data) {
        localStorage.setItem('webitc_settings', JSON.stringify(res.data));
        applyAdminBrand(res.data);
      }
    }).catch(() => {});
  } catch(e) {}

  document.querySelectorAll('.btn-logout').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Bạn có chắc chắn muốn đăng xuất khỏi trang quản trị?')) {
        logout();
      }
    });
  });

  // Initialize mobile off-canvas drawer and bottom navigation
  initAdminMobileNav();
});

/**
 * Responsive Mobile Navigation Drawer & Dock for Admin CMS
 */
export function initAdminMobileNav() {
  if (window.location.pathname.includes('/login')) return;

  const sidebar = document.querySelector('.admin-sidebar');
  const header = document.querySelector('.admin-header');
  if (!sidebar || !header) return;

  // 1. Ensure Backdrop
  let backdrop = document.querySelector('.admin-sidebar-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'admin-sidebar-backdrop';
    document.body.appendChild(backdrop);
  }

  // 2. Ensure Mobile Toggle Hamburger Button in header
  let toggleBtn = header.querySelector('.admin-mobile-toggle');
  if (!toggleBtn) {
    toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'admin-mobile-toggle';
    toggleBtn.setAttribute('aria-label', 'Mở Menu Quản Trị');
    toggleBtn.innerHTML = `
      <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    `;
    header.insertBefore(toggleBtn, header.firstChild);
  }

  // 3. Ensure Close Button inside sidebar-brand
  const brand = sidebar.querySelector('.sidebar-brand');
  if (brand && !brand.querySelector('.sidebar-close-btn')) {
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'sidebar-close-btn';
    closeBtn.setAttribute('aria-label', 'Đóng Menu');
    closeBtn.innerHTML = `
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    `;
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      closeSidebar();
    });
    brand.appendChild(closeBtn);
  }

  // 4. Ensure Bottom Navigation Dock on Mobile
  let bottomNav = document.querySelector('.admin-bottom-nav');
  if (!bottomNav) {
    const currentPath = window.location.pathname.replace(/\/+$/, '') || '/admin';
    const isAct = (p) => currentPath === p || (p !== '/admin' && currentPath.startsWith(p));

    bottomNav = document.createElement('nav');
    bottomNav.className = 'admin-bottom-nav';
    bottomNav.innerHTML = `
      <a href="/admin" class="bottom-nav-item ${isAct('/admin') ? 'active' : ''}">
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
        <span>Tổng quan</span>
      </a>
      <a href="/admin/products" class="bottom-nav-item ${isAct('/admin/products') ? 'active' : ''}">
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
        <span>Sản phẩm</span>
      </a>
      <a href="/admin/quotes" class="bottom-nav-item ${isAct('/admin/quotes') ? 'active' : ''}">
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
        <span>Báo giá</span>
        <span class="bottom-nav-badge" id="bottomQuotesCount" style="display:none;">0</span>
      </a>
      <a href="/admin/settings" class="bottom-nav-item ${isAct('/admin/settings') ? 'active' : ''}">
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
        <span>Cài đặt</span>
      </a>
      <button type="button" class="bottom-nav-item" id="btnBottomOpenDrawer" aria-label="Mở Menu">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
        <span>Menu</span>
      </button>
    `;
    document.body.appendChild(bottomNav);

    const btnDrawer = bottomNav.querySelector('#btnBottomOpenDrawer');
    if (btnDrawer) {
      btnDrawer.addEventListener('click', toggleSidebar);
    }
  }

  // 5. Open / Close Toggle Logic
  function openSidebar() {
    sidebar.classList.add('open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  function toggleSidebar(e) {
    if (e) e.preventDefault();
    if (sidebar.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }

  toggleBtn.addEventListener('click', toggleSidebar);
  backdrop.addEventListener('click', closeSidebar);

  // Close when pressing Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });

  // Close when clicking any nav link inside drawer
  sidebar.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 992) {
        closeSidebar();
      }
    });
  });

  // Sync quotes badge count if available
  const syncBadge = () => {
    const origBadge = document.getElementById('sidebarQuotesCount');
    const bottomBadge = document.getElementById('bottomQuotesCount');
    if (origBadge && bottomBadge) {
      const cnt = parseInt(origBadge.textContent) || 0;
      if (cnt > 0) {
        bottomBadge.textContent = cnt;
        bottomBadge.style.display = 'block';
      } else {
        bottomBadge.style.display = 'none';
      }
    }
  };
  syncBadge();
  setTimeout(syncBadge, 1500);
}

/**
 * Modern Sleek Toast Notification Component
 */
export function showToast(message, type = 'success', title = '') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`,
    error: `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
    warning: `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
    info: `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 16v-4m0-4h.01"/></svg>`
  };

  const defaultTitles = {
    success: 'Thành Công',
    error: 'Thông Báo Lỗi',
    warning: 'Cảnh Báo',
    info: 'Thông Tin'
  };

  const finalTitle = title || defaultTitles[type] || 'Thông Báo';
  const icon = icons[type] || icons.info;

  const item = document.createElement('div');
  item.className = `toast-item toast-${type}`;
  item.innerHTML = `
    <div class="toast-icon-wrap">${icon}</div>
    <div class="toast-content">
      <div class="toast-title">${finalTitle}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close" aria-label="Đóng">
      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
    <div class="toast-progress"></div>
  `;

  container.appendChild(item);

  let timer = null;
  const removeToast = () => {
    if (item.classList.contains('toast-hiding')) return;
    item.classList.add('toast-hiding');
    setTimeout(() => {
      item.remove();
      if (container.children.length === 0) container.remove();
    }, 300);
  };

  item.querySelector('.toast-close').addEventListener('click', removeToast);
  timer = setTimeout(removeToast, 3800);
  item.addEventListener('mouseenter', () => clearTimeout(timer));
  item.addEventListener('mouseleave', () => { timer = setTimeout(removeToast, 1800); });
}

// Global binding
window.showToast = showToast;

// Replace harsh native browser alert with modern toast
window.alert = function(msg) {
  const isErr = /lỗi|thất bại|không|error|fail/i.test(msg);
  showToast(msg, isErr ? 'error' : 'success', isErr ? 'Thông Báo' : 'Thành Công');
};
