import { api } from './api.js';
import { initI18n } from './i18n.js';

document.addEventListener('DOMContentLoaded', () => {
  initI18n();
  initMobileMenu();
  initHeroSlider();
  initRfqModal();
  loadNavCategories();
});

// Mobile Menu Toggle
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
        navMenu.classList.remove('open');
      }
    });
  }
}

// Hero Slider Auto-Play
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');

  if (!slides || slides.length === 0) return;

  let current = 0;
  let timer = null;

  function showSlide(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });
    current = index;
  }

  function nextSlide() {
    let next = (current + 1) % slides.length;
    showSlide(next);
  }

  function prevSlide() {
    let prev = (current - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => {
    nextSlide();
    resetTimer();
  });

  if (prevBtn) prevBtn.addEventListener('click', () => {
    prevSlide();
    resetTimer();
  });

  function startTimer() {
    timer = setInterval(nextSlide, 6000);
  }

  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }

  startTimer();
}

// RFQ Modal & Quote Form Handler
function initRfqModal() {
  const modal = document.getElementById('rfqModal');
  const openButtons = document.querySelectorAll('.open-rfq-modal');
  const closeButton = document.getElementById('closeRfqModal');
  const quoteForm = document.getElementById('rfqForm');
  const productSelect = document.getElementById('rfqProductSelect');

  if (!modal) return;

  // Open modal triggers
  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prefillProduct = btn.getAttribute('data-product-name');
      if (prefillProduct && productSelect) {
        // If it exists in select, select it or set custom input
        let found = false;
        for (let opt of productSelect.options) {
          if (opt.value === prefillProduct) {
            productSelect.value = prefillProduct;
            found = true;
            break;
          }
        }
        if (!found) {
          const newOpt = new Option(prefillProduct, prefillProduct, true, true);
          productSelect.add(newOpt);
        }
      }
      modal.classList.add('active');
    });
  });

  // Close modal
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // Handle Form Submit
  if (quoteForm) {
    quoteForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = quoteForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      const customerName = document.getElementById('rfqName').value.trim();
      const phone = document.getElementById('rfqPhone').value.trim();
      const email = document.getElementById('rfqEmail') ? document.getElementById('rfqEmail').value.trim() : '';
      const company = document.getElementById('rfqCompany') ? document.getElementById('rfqCompany').value.trim() : '';
      const productInterest = productSelect ? productSelect.value : 'Tư vấn kỹ thuật';
      const requirements = document.getElementById('rfqRequirements') ? document.getElementById('rfqRequirements').value.trim() : '';

      if (!customerName || !phone) {
        alert('Vui lòng nhập Họ tên và Số điện thoại liên hệ!');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Đang gửi yêu cầu...';

      try {
        const res = await api.submitQuote({
          customerName,
          phone,
          email,
          company,
          productInterest,
          requirements
        });

        if (res.success) {
          const currentBrand = (window.__itcSettings && window.__itcSettings.brandName) || 'ITC TECHNOLOGY';
          alert(`Cảm ơn Quý khách! ${currentBrand} đã tiếp nhận yêu cầu báo giá kỹ thuật và sẽ liên hệ trong vòng 30 phút.`);
          quoteForm.reset();
          modal.classList.remove('active');
        } else {
          alert(res.message || 'Có lỗi xảy ra, vui lòng thử lại.');
        }
      } catch (err) {
        alert('Không thể kết nối đến máy chủ. Vui lòng gọi trực tiếp hotline: 0983 684 968');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }
}

// Populate navigation dropdown categories dynamically
async function loadNavCategories() {
  const navDropdown = document.getElementById('navCategoryList');
  const footerCategoryList = document.getElementById('footerCategoryList');
  const rfqProductSelect = document.getElementById('rfqProductSelect');

  try {
    const res = await api.getCategories();
    if (res.success && res.data) {
      const all = res.data;
      const mainCats = all.filter(c => !c.parentId);

      if (navDropdown) {
        navDropdown.innerHTML = mainCats.map(cat => {
          const subCats = all.filter(c => c.parentId === cat.id);
          let subHtml = '';
          if (subCats.length > 0) {
            subHtml = subCats.map(s => `
              <li>
                <a class="dropdown-link" href="/products.html?category=${s.slug}" style="padding-left: 28px; font-size: 13px; opacity: 0.88;">
                  <span>↳ ${s.name}</span>
                </a>
              </li>
            `).join('');
          }
          return `
            <li>
              <a class="dropdown-link" href="/products.html?category=${cat.slug}" style="font-weight: 700; color: var(--primary);">
                <span>${cat.name}</span>
              </a>
            </li>
            ${subHtml}
          `;
        }).join('');
      }

      if (footerCategoryList) {
        footerCategoryList.innerHTML = mainCats.map(cat => `
          <li>
            <a href="/products.html?category=${cat.slug}"><strong>${cat.name}</strong></a>
          </li>
        `).join('');
      }

      if (rfqProductSelect) {
        let optHtml = `<option value="">-- Chọn nhóm ngành / sản phẩm quan tâm --</option>`;
        mainCats.forEach(cat => {
          const subCats = all.filter(c => c.parentId === cat.id);
          if (subCats.length > 0) {
            optHtml += `<optgroup label="${cat.name}">`;
            optHtml += `<option value="${cat.name}">Tất cả - ${cat.name}</option>`;
            subCats.forEach(s => {
              optHtml += `<option value="${s.name}">${s.name}</option>`;
            });
            optHtml += `</optgroup>`;
          } else {
            optHtml += `<option value="${cat.name}"><strong>${cat.name}</strong></option>`;
          }
        });
        rfqProductSelect.innerHTML = optHtml;
      }
    }
  } catch (err) {
    console.warn('Could not load categories:', err);
  }
}

// Helper to format phone display (e.g., 0983 684 968)
export function formatPhone(val) {
  if (!val) return '';
  const digits = String(val).replace(/\D/g, '');
  if (digits.length === 10) {
    return digits.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
  } else if (digits.length === 11) {
    return digits.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
  }
  return val;
}

// Universal Company Settings Application
export function applyCompanySettings(s) {
  if (!s) return;
  window.__itcSettings = s;
  const brand = s.brandName || 'ITC TECHNOLOGY';
  const company = s.companyName || 'CÔNG TY TNHH CÔNG NGHỆ ITC';

  const rawPhone = (s.hotline || '0983684968').replace(/\D/g, '');
  const formattedHotline = formatPhone(s.hotlineDisplay || s.hotline || '0983 684 968');
  const email = s.email || 'trunghn@thietbicongnghiep-vn.com.vn';
  const address = s.address || 'Biệt thự số 58, đường Tulip 04, khu đô thị Vinhomes Riverside, phường Phúc Lợi, Thành Phố Hà Nội, Việt Nam';
  const factoryAddress = s.factoryAddress || address;
  const taxCode = s.taxCode || '0102367857';
  const slogan = s.slogan || 'GIẢI PHÁP ĐỒ GÁ JIG, XE ĐẨY CÔNG NGHIỆP & MÁY TỰ ĐỘNG HÓA TIÊU CHUẨN QUỐC TẾ';
  const zalo = s.zaloLink || `https://zalo.me/${rawPhone}`;

  // 1. Update Document Title & Meta Description
  if (document.title) {
    document.title = document.title
      .replace(/ITC AUTOMATION|ITC TECHNOLOGY/gi, brand)
      .replace(/CÔNG TY TNHH CÔNG NGHỆ ITC/gi, company);
  }
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && metaDesc.content) {
    metaDesc.content = metaDesc.content
      .replace(/ITC AUTOMATION|ITC TECHNOLOGY/gi, brand)
      .replace(/CÔNG TY TNHH CÔNG NGHỆ ITC/gi, company);
  }

  // 1.1. Dynamic Logo & Favicon
  const logoUrl = s.logoUrl || '/images/itc_logo.png';
  document.querySelectorAll('.brand-logo .logo-img, .brand-logo img, .admin-brand-logo, .login-brand-logo, img.dyn-logo, img.logo-img, .logo-img-footer').forEach(img => {
    if (img.getAttribute('src') !== logoUrl) {
      img.src = logoUrl;
    }
  });
  document.querySelectorAll('link[rel="icon"]').forEach(link => {
    if (link.getAttribute('href') !== logoUrl) {
      link.href = logoUrl;
    }
  });

  // 2. Main Brand Headings (Header Logo, Footer Logo, Hero)
  document.querySelectorAll('.brand-logo .logo-text h1, .dyn-brand, [data-dyn="brand"]').forEach(el => {
    el.textContent = brand;
  });
  document.querySelectorAll('.brand-logo .logo-text h2').forEach(el => {
    el.textContent = brand;
  });
  document.querySelectorAll('.brand-logo .logo-text p, .dyn-slogan, [data-dyn="slogan"]').forEach(el => {
    el.textContent = slogan;
  });

  // 3. Company Legal Name
  document.querySelectorAll('.dyn-company, [data-dyn="company"]').forEach(el => {
    el.textContent = company;
  });

  // 4. Hotline & Phone Links
  document.querySelectorAll('.dyn-hotline, [data-dyn="hotline"]').forEach(el => {
    el.textContent = formattedHotline;
  });
  document.querySelectorAll('a[href^="tel:"], .dyn-hotline-link, [data-dyn="hotline-link"]').forEach(el => {
    el.href = `tel:${rawPhone}`;
    if (el.querySelector('.dyn-hotline')) {
      return;
    }
    // Cleanly replace phone text if present without partial regex slicing
    if (/\d{4,}/.test(el.textContent)) {
      el.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && /\d{4,}/.test(node.textContent)) {
          const trimmed = node.textContent.trim();
          if (/^(?:Hotline:\s*)?[\d\s.\-]{7,}$/i.test(trimmed)) {
            node.textContent = /^Hotline:/i.test(trimmed) ? `Hotline: ${formattedHotline}` : formattedHotline;
          } else {
            node.textContent = node.textContent.replace(/(?:Hotline:\s*)?[\d\s.\-]{8,15}/, (m) => {
              return /^Hotline:/i.test(m.trim()) ? `Hotline: ${formattedHotline}` : formattedHotline;
            });
          }
        }
      });
    }
  });

  // Floating Contact Buttons
  document.querySelectorAll('.float-phone').forEach(el => {
    el.href = `tel:${rawPhone}`;
    el.title = `Gọi Hotline ${formattedHotline}`;
  });
  document.querySelectorAll('.float-zalo').forEach(el => {
    el.href = zalo;
    el.title = `Chat Zalo ${formattedHotline}`;
  });

  // 5. Email & Mailto Links
  document.querySelectorAll('.dyn-email, [data-dyn="email"]').forEach(el => {
    el.textContent = email;
  });
  document.querySelectorAll('a[href^="mailto:"], .dyn-email-link, [data-dyn="email-link"]').forEach(el => {
    el.href = `mailto:${email}`;
    el.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && /@/.test(node.textContent)) {
        node.textContent = email;
      }
    });
  });

  // 6. Addresses & Tax Code
  document.querySelectorAll('.dyn-address, [data-dyn="address"]').forEach(el => {
    el.textContent = address;
  });
  document.querySelectorAll('.dyn-factory-address, [data-dyn="factoryAddress"]').forEach(el => {
    el.textContent = factoryAddress;
  });
  document.querySelectorAll('.dyn-taxcode, [data-dyn="taxcode"]').forEach(el => {
    el.textContent = taxCode;
  });

  // 7. Zalo Links
  document.querySelectorAll('a[href*="zalo.me"], .dyn-zalo-link, [data-dyn="zalo"]').forEach(el => {
    el.href = zalo;
  });

  // 8. Footer Structured Blocks
  const footerAboutP = document.querySelector('.footer-about p:not(.footer-contact-item p)');
  if (footerAboutP) {
    footerAboutP.innerHTML = `<strong>${company}</strong> (Thương hiệu ${brand}) - ${slogan}. Đơn vị chuyên sâu thiết kế, chế tạo đồ gá JIG hàn, xe đẩy part công nghiệp, máy tự động SPM và tích hợp robot thông minh.`;
  }
  const footerCopy = document.querySelector('.footer-bottom > div:first-child');
  if (footerCopy) {
    footerCopy.innerHTML = `© ${new Date().getFullYear()} ${company} - ${brand}. MST: ${taxCode}. All Rights Reserved.`;
  }

  // 9. Comprehensive Deep Scan for All Headings & Important Text Blocks
  // Automatically transforms any static mention of previous brand or company in titles and sections
  const scanSelectors = 'h1, h2, h3, h4, h5, h6, .hero-title, .hero-subtitle, .section-title, .section-subtitle, .ticker-content a, .contact-detail p, .topbar-item span';
  document.querySelectorAll(scanSelectors).forEach(parent => {
    parent.childNodes.forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        let text = child.textContent;
        let modified = false;

        // Replace older/alternative brand names if found
        if (/ITC AUTOMATION/i.test(text)) {
          text = text.replace(/ITC AUTOMATION/gi, brand);
          modified = true;
        } else if (text.includes('ITC TECHNOLOGY') && brand !== 'ITC TECHNOLOGY') {
          text = text.replace(/ITC TECHNOLOGY/g, brand);
          modified = true;
        }

        // Replace company name
        if (text.includes('CÔNG TY TNHH CÔNG NGHỆ ITC') && company !== 'CÔNG TY TNHH CÔNG NGHỆ ITC') {
          text = text.replace(/CÔNG TY TNHH CÔNG NGHỆ ITC/g, company);
          modified = true;
        }

        if (modified) {
          child.textContent = text;
        }
      }
    });
  });

  // 10. Dynamic Render for Capacity & Stats Bar (Hồ Sơ Năng Lực Nổi Bật)
  if (Array.isArray(s.highlights) && s.highlights.length >= 3) {
    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) {
      renderStatsBar(statsGrid, s.highlights);
    }
  }

  // 11. Technical Support Box (Products sidebar & support widgets - Ảnh 1)
  const supportWidget = s.supportWidget || {
    title: 'Cần Tư Vấn Kỹ Thuật?',
    desc: 'Đội ngũ kỹ sư cơ điện tử của ITC sẵn sàng hỗ trợ bạn 24/7.',
    btnText: 'Gửi Yêu Cầu Báo Giá'
  };
  document.querySelectorAll('.dyn-support-title, [data-dyn="support-title"]').forEach(el => {
    el.textContent = supportWidget.title;
  });
  document.querySelectorAll('.dyn-support-desc, [data-dyn="support-desc"]').forEach(el => {
    el.textContent = supportWidget.desc;
  });
  document.querySelectorAll('.dyn-support-btn, [data-dyn="support-btn"]').forEach(el => {
    el.textContent = supportWidget.btnText || 'Gửi Yêu Cầu Báo Giá';
  });

  // 12. Factory Infrastructure & Machining Technology (Hạ Tầng Nhà Máy & Công Nghệ Gia Công - Ảnh 2)
  if (s.factoryCapabilities) {
    if (s.factoryCapabilities.subtitle) {
      document.querySelectorAll('.dyn-cap-subtitle, [data-dyn="cap-subtitle"]').forEach(el => {
        el.textContent = s.factoryCapabilities.subtitle;
      });
    }
    if (s.factoryCapabilities.title) {
      document.querySelectorAll('.dyn-cap-title, [data-dyn="cap-title"]').forEach(el => {
        el.textContent = s.factoryCapabilities.title;
      });
    }
    if (s.factoryCapabilities.desc) {
      document.querySelectorAll('.dyn-cap-desc, [data-dyn="cap-desc"]').forEach(el => {
        el.textContent = s.factoryCapabilities.desc;
      });
    }
    const capGrid = document.getElementById('capabilitiesGrid') || document.querySelector('.capability-grid');
    if (capGrid && Array.isArray(s.factoryCapabilities.items) && s.factoryCapabilities.items.length >= 3) {
      renderFactoryCapabilities(capGrid, s.factoryCapabilities);
    }
  }
}

export function renderFactoryCapabilities(container, capData) {
  if (!container || !capData) return;
  const items = Array.isArray(capData.items) ? capData.items : [];
  if (items.length === 0) return;

  const count = Math.min(5, Math.max(3, items.length));
  if (count <= 3) {
    container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(320px, 1fr))';
  } else {
    container.style.gridTemplateColumns = `repeat(${count}, minmax(220px, 1fr))`;
  }

  const iconSvgs = {
    cnc: `<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>`,
    cmm: `<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>`,
    iso: `<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`,
    robot: `<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.38-1 1.72V7h4a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3h4V5.72A2 2 0 0 1 10 4a2 2 0 0 1 2-2m-3 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m6 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-6 5h6v1.5H9V16z"/></svg>`,
    factory: `<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>`,
    cog: `<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>`
  };

  container.innerHTML = items.slice(0, 5).map(item => {
    const iconSvg = iconSvgs[item.icon] || iconSvgs.cnc;
    return `
      <div class="capability-item">
        <div class="capability-icon">
          ${iconSvg}
        </div>
        <h3 class="capability-title">${item.title || ''}</h3>
        <p class="capability-desc">${item.desc || ''}</p>
      </div>
    `;
  }).join('');
}

export function renderStatsBar(container, items) {
  if (!container || !Array.isArray(items) || items.length === 0) return;
  const count = Math.min(5, Math.max(3, items.length));
  container.style.setProperty('--stats-cols', `repeat(${count}, 1fr)`);

  const iconSvgs = {
    doc: `<svg width="26" height="26" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>`,
    factory: `<svg width="26" height="26" fill="currentColor" viewBox="0 0 24 24"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>`,
    iso: `<svg width="26" height="26" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`,
    robot: `<svg width="26" height="26" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.38-1 1.72V7h4a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3h4V5.72A2 2 0 0 1 10 4a2 2 0 0 1 2-2m-3 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m6 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-6 5h6v1.5H9V16z"/></svg>`,
    users: `<svg width="26" height="26" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,
    cog: `<svg width="26" height="26" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>`
  };

  container.innerHTML = items.slice(0, 5).map((item, idx) => {
    let iconHtml = '';
    if (item.iconType === 'badge' || !iconSvgs[item.iconType]) {
      const badgeText = item.iconValue || item.title?.split(' ')?.[0] || '15+';
      iconHtml = `<span style="font-size: 19px; font-weight: 800; color: var(--primary); letter-spacing: -0.5px;">${badgeText}</span>`;
    } else {
      iconHtml = iconSvgs[item.iconType];
    }

    const isLast = idx === Math.min(items.length, 5) - 1;
    const borderStyle = isLast ? 'style="border-right: none;"' : '';

    return `
      <div class="stat-item" ${borderStyle}>
        <div class="stat-icon">${iconHtml}</div>
        <div>
          <div class="stat-number">${item.title || ''}</div>
          <div class="stat-label">${item.subtitle || ''}</div>
        </div>
      </div>
    `;
  }).join('');
}

// Immediate application from cache (0 delay) + Network Sync
try {
  const cachedSettings = localStorage.getItem('webitc_settings');
  if (cachedSettings) {
    applyCompanySettings(JSON.parse(cachedSettings));
  }
} catch (e) {}

// Hydrate company settings dynamically from Backend API
async function hydrateSettings() {
  try {
    const res = await api.getSettings();
    if (res.success && res.data) {
      const s = res.data;
      localStorage.setItem('webitc_settings', JSON.stringify(s));
      applyCompanySettings(s);
      window.dispatchEvent(new CustomEvent('webitc_content_updated'));
    }
  } catch (err) {
    console.warn('Could not sync company settings:', err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  hydrateSettings();
});

/**
 * Modern Sleek Toast Notification Component (Frontend)
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
    success: 'Gửi Thành Công',
    error: 'Thông Báo Lỗi',
    warning: 'Vui Lòng Kiểm Tra',
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
  timer = setTimeout(removeToast, 4000);
  item.addEventListener('mouseenter', () => clearTimeout(timer));
  item.addEventListener('mouseleave', () => { timer = setTimeout(removeToast, 1800); });
}

window.showToast = showToast;
window.alert = function(msg) {
  const isErr = /lỗi|thất bại|không|error|fail|vui lòng/i.test(msg);
  showToast(msg, isErr ? (msg.includes('vui lòng') ? 'warning' : 'error') : 'success', isErr ? 'Thông Báo' : 'Thành Công');
};
