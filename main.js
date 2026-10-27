document.addEventListener('DOMContentLoaded', () => {
  let cart = 0;
  const cartCount = document.getElementById('cartCount');
  const toastEl = document.getElementById('beautyToast');
  const toast = bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 2400 });
  const toastText = document.getElementById('toastText');

  // Add-to-bag interaction
  document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', () => {
      cart += 1;
      cartCount.textContent = cart;
      toastText.textContent = `${button.dataset.product} ditambahkan ke bag`;
      toast.show();
      button.innerHTML = '<i class="bi bi-check2"></i>';
      setTimeout(() => button.innerHTML = '<i class="bi bi-plus-lg"></i>', 1100);
    });
  });

  // Wishlist toggle
  document.querySelectorAll('.wishlist-btn').forEach(button => {
    button.addEventListener('click', () => {
      button.classList.toggle('liked');
      const icon = button.querySelector('i');
      icon.className = button.classList.contains('liked') ? 'bi bi-heart-fill' : 'bi bi-heart';
      toastText.textContent = button.classList.contains('liked') ? 'Disimpan ke daftar favorit ♡' : 'Dihapus dari daftar favorit';
      toast.show();
    });
  });

  // Product category filter
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productItems = document.querySelectorAll('.product-item');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      productItems.forEach(item => {
        item.classList.toggle('d-none', filter !== 'all' && item.dataset.category !== filter);
      });
    });
  });

  // Search panel and simple on-page search
  const searchPanel = document.getElementById('searchPanel');
  const searchInput = document.getElementById('searchInput');
  document.getElementById('searchToggle').addEventListener('click', () => {
    searchPanel.classList.add('open');
    setTimeout(() => searchInput.focus(), 200);
  });
  document.getElementById('closeSearch').addEventListener('click', () => searchPanel.classList.remove('open'));
  document.getElementById('searchForm').addEventListener('submit', event => {
    event.preventDefault();
    const term = searchInput.value.trim().toLowerCase();
    if (!term) return;
    const targets = [...document.querySelectorAll('.category-card, .product-card, .journal-card')];
    const match = targets.find(el => el.innerText.toLowerCase().includes(term) || el.querySelector('img')?.alt.toLowerCase().includes(term));
    if (match) {
      match.scrollIntoView({ behavior: 'smooth', block: 'center' });
      match.classList.add('search-highlight');
      setTimeout(() => match.classList.remove('search-highlight'), 1500);
    } else {
      toastText.textContent = `Belum ada konten yang cocok dengan "${term}"`;
      toast.show();
    }
    searchPanel.classList.remove('open');
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') searchPanel.classList.remove('open');
  });

  // Newsletter validation feedback (front-end demo only)
  document.getElementById('newsletterForm').addEventListener('submit', event => {
    event.preventDefault();
    const email = document.getElementById('emailInput');
    const message = document.getElementById('formMessage');
    if (!email.checkValidity()) { email.reportValidity(); return; }
    message.textContent = 'Terima kasih! Email kamu berhasil didaftarkan (demo). ♡';
    message.classList.add('fw-semibold');
    email.value = '';
  });

  // Back to top
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => backToTop.classList.toggle('show', window.scrollY > 500));
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Close mobile menu after selecting a section
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('mainNav');
      if (menu.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(menu).hide();
    });
  });
});
