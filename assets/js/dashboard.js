/* ============================================================
   dashboard.js — Fund data, filtering, search, comparison
   ============================================================ */

(function () {
  'use strict';

  /* ── Master fund dataset ────────────────────────────────── */
  var ALL_FUNDS = [
    // EQUITY – Large Cap
    { id: 1,  name: 'Mirae Asset Large Cap Fund',            category: 'Equity', subcat: 'Large Cap',    aum: 38200,  nav: 89.42,  rating: 5, ret1y: 18.4, ret3y: 22.1, ret5y: 17.8, risk: 'Moderate', expense: 0.52, minSip: 1000 },
    { id: 2,  name: 'Axis Bluechip Fund',                    category: 'Equity', subcat: 'Large Cap',    aum: 42100,  nav: 55.68,  rating: 5, ret1y: 17.2, ret3y: 20.8, ret5y: 16.9, risk: 'Moderate', expense: 0.56, minSip: 500  },
    { id: 3,  name: 'ICICI Pru Bluechip Fund',               category: 'Equity', subcat: 'Large Cap',    aum: 51600,  nav: 98.34,  rating: 4, ret1y: 19.1, ret3y: 21.4, ret5y: 17.2, risk: 'Moderate', expense: 0.98, minSip: 100  },
    { id: 4,  name: 'SBI Bluechip Fund',                     category: 'Equity', subcat: 'Large Cap',    aum: 45800,  nav: 72.15,  rating: 4, ret1y: 16.8, ret3y: 19.5, ret5y: 15.6, risk: 'Moderate', expense: 0.88, minSip: 500  },
    { id: 5,  name: 'Kotak Bluechip Fund',                   category: 'Equity', subcat: 'Large Cap',    aum: 11200,  nav: 467.82, rating: 4, ret1y: 17.9, ret3y: 20.5, ret5y: 16.2, risk: 'Moderate', expense: 0.65, minSip: 1000 },
    // EQUITY – Mid Cap
    { id: 6,  name: 'Nippon India Growth Fund',              category: 'Equity', subcat: 'Mid Cap',      aum: 26400,  nav: 3228.5, rating: 5, ret1y: 38.7, ret3y: 31.2, ret5y: 26.4, risk: 'High',     expense: 0.98, minSip: 1000 },
    { id: 7,  name: 'Kotak Emerging Equity Fund',            category: 'Equity', subcat: 'Mid Cap',      aum: 49600,  nav: 115.2,  rating: 5, ret1y: 42.1, ret3y: 33.4, ret5y: 27.9, risk: 'High',     expense: 0.42, minSip: 500  },
    { id: 8,  name: 'HDFC Mid-Cap Opportunities',            category: 'Equity', subcat: 'Mid Cap',      aum: 68200,  nav: 184.7,  rating: 5, ret1y: 45.3, ret3y: 35.1, ret5y: 29.2, risk: 'High',     expense: 0.72, minSip: 100  },
    { id: 9,  name: 'SBI Magnum Mid Cap Fund',               category: 'Equity', subcat: 'Mid Cap',      aum: 24700,  nav: 234.8,  rating: 4, ret1y: 40.6, ret3y: 30.8, ret5y: 24.1, risk: 'High',     expense: 0.90, minSip: 500  },
    { id: 10, name: 'Axis Mid Cap Fund',                     category: 'Equity', subcat: 'Mid Cap',      aum: 29800,  nav: 96.34,  rating: 4, ret1y: 36.4, ret3y: 28.7, ret5y: 23.6, risk: 'High',     expense: 0.54, minSip: 500  },
    // EQUITY – Small Cap
    { id: 11, name: 'Quant Small Cap Fund',                  category: 'Equity', subcat: 'Small Cap',    aum: 22100,  nav: 271.6,  rating: 5, ret1y: 68.2, ret3y: 52.4, ret5y: 44.8, risk: 'Very High', expense: 0.62, minSip: 1000 },
    { id: 12, name: 'Nippon India Small Cap Fund',           category: 'Equity', subcat: 'Small Cap',    aum: 54800,  nav: 186.4,  rating: 5, ret1y: 61.8, ret3y: 47.2, ret5y: 38.9, risk: 'Very High', expense: 0.68, minSip: 1000 },
    { id: 13, name: 'HDFC Small Cap Fund',                   category: 'Equity', subcat: 'Small Cap',    aum: 29400,  nav: 112.8,  rating: 4, ret1y: 54.2, ret3y: 42.6, ret5y: 33.8, risk: 'Very High', expense: 0.62, minSip: 500  },
    { id: 14, name: 'SBI Small Cap Fund',                    category: 'Equity', subcat: 'Small Cap',    aum: 32600,  nav: 164.9,  rating: 5, ret1y: 59.4, ret3y: 45.8, ret5y: 36.2, risk: 'Very High', expense: 0.68, minSip: 500  },
    { id: 15, name: 'Axis Small Cap Fund',                   category: 'Equity', subcat: 'Small Cap',    aum: 21400,  nav: 93.72,  rating: 4, ret1y: 50.6, ret3y: 40.1, ret5y: 31.4, risk: 'Very High', expense: 0.58, minSip: 500  },
    // EQUITY – ELSS
    { id: 16, name: 'Mirae Asset Tax Saver Fund',            category: 'Equity', subcat: 'ELSS',         aum: 24800,  nav: 42.86,  rating: 5, ret1y: 26.8, ret3y: 25.4, ret5y: 21.8, risk: 'Moderate', expense: 0.47, minSip: 500  },
    { id: 17, name: 'Axis Long Term Equity Fund',            category: 'Equity', subcat: 'ELSS',         aum: 32400,  nav: 84.52,  rating: 4, ret1y: 22.4, ret3y: 22.8, ret5y: 19.6, risk: 'Moderate', expense: 0.60, minSip: 500  },
    { id: 18, name: 'ELSS — Quant Tax Plan',                 category: 'Equity', subcat: 'ELSS',         aum: 6700,   nav: 342.1,  rating: 5, ret1y: 42.6, ret3y: 38.2, ret5y: 30.6, risk: 'High',     expense: 0.57, minSip: 500  },
    // EQUITY – Sectoral
    { id: 19, name: 'Nippon India Pharma Fund',              category: 'Equity', subcat: 'Sectoral',     aum: 8200,   nav: 418.3,  rating: 4, ret1y: 48.2, ret3y: 28.6, ret5y: 22.4, risk: 'Very High', expense: 0.98, minSip: 1000 },
    { id: 20, name: 'ICICI Pru Technology Fund',             category: 'Equity', subcat: 'Sectoral',     aum: 12800,  nav: 192.6,  rating: 4, ret1y: 22.4, ret3y: 34.8, ret5y: 32.6, risk: 'Very High', expense: 0.95, minSip: 1000 },
    // EQUITY – Flexi Cap
    { id: 21, name: 'Parag Parikh Flexi Cap Fund',           category: 'Equity', subcat: 'Flexi Cap',    aum: 58400,  nav: 78.42,  rating: 5, ret1y: 32.6, ret3y: 26.4, ret5y: 22.8, risk: 'Moderate', expense: 0.58, minSip: 1000 },
    { id: 22, name: 'UTI Flexi Cap Fund',                    category: 'Equity', subcat: 'Flexi Cap',    aum: 25600,  nav: 282.4,  rating: 4, ret1y: 24.8, ret3y: 22.6, ret5y: 18.4, risk: 'Moderate', expense: 0.98, minSip: 1000 },
    // DEBT funds
    { id: 23, name: 'HDFC Short Duration Fund',              category: 'Debt',   subcat: 'Short Duration',aum: 14200, nav: 28.46,  rating: 5, ret1y: 7.4,  ret3y: 6.8,  ret5y: 7.1,  risk: 'Low',      expense: 0.42, minSip: 500  },
    { id: 24, name: 'ICICI Pru Corporate Bond Fund',         category: 'Debt',   subcat: 'Corporate Bond',aum: 22400, nav: 26.84,  rating: 5, ret1y: 7.8,  ret3y: 7.2,  ret5y: 7.6,  risk: 'Low',      expense: 0.38, minSip: 500  },
    { id: 25, name: 'Kotak Bond Short Term Fund',            category: 'Debt',   subcat: 'Short Duration',aum: 18600, nav: 48.62,  rating: 4, ret1y: 7.1,  ret3y: 6.4,  ret5y: 6.9,  risk: 'Low',      expense: 0.48, minSip: 500  },
    { id: 26, name: 'SBI Magnum Gilt Fund',                  category: 'Debt',   subcat: 'Gilt',          aum: 9800,  nav: 68.42,  rating: 4, ret1y: 9.2,  ret3y: 7.8,  ret5y: 8.4,  risk: 'Moderate', expense: 0.52, minSip: 500  },
    { id: 27, name: 'Aditya Birla SL Liquid Fund',           category: 'Debt',   subcat: 'Liquid',        aum: 42600, nav: 372.6,  rating: 5, ret1y: 6.8,  ret3y: 5.6,  ret5y: 6.2,  risk: 'Low',      expense: 0.18, minSip: 1000 },
    { id: 28, name: 'Nippon India Liquid Fund',              category: 'Debt',   subcat: 'Liquid',        aum: 28400, nav: 5892.4, rating: 4, ret1y: 6.6,  ret3y: 5.4,  ret5y: 6.0,  risk: 'Low',      expense: 0.22, minSip: 500  },
    // HYBRID funds
    { id: 29, name: 'ICICI Pru Balanced Advantage Fund',     category: 'Hybrid', subcat: 'Dynamic Asset', aum: 62400, nav: 62.48,  rating: 5, ret1y: 18.4, ret3y: 16.8, ret5y: 14.6, risk: 'Moderate', expense: 0.72, minSip: 100  },
    { id: 30, name: 'HDFC Balanced Advantage Fund',          category: 'Hybrid', subcat: 'Dynamic Asset', aum: 78600, nav: 428.6,  rating: 5, ret1y: 22.6, ret3y: 18.2, ret5y: 15.8, risk: 'Moderate', expense: 0.74, minSip: 100  },
    { id: 31, name: 'Kotak Equity Hybrid Fund',              category: 'Hybrid', subcat: 'Aggressive',    aum: 16800, nav: 54.62,  rating: 4, ret1y: 24.8, ret3y: 21.4, ret5y: 18.6, risk: 'Moderate', expense: 0.55, minSip: 1000 },
    { id: 32, name: 'Mirae Asset Hybrid Equity Fund',        category: 'Hybrid', subcat: 'Aggressive',    aum: 12600, nav: 28.64,  rating: 4, ret1y: 23.4, ret3y: 20.6, ret5y: 17.4, risk: 'Moderate', expense: 0.44, minSip: 500  },
    { id: 33, name: 'Navi Nifty 50 Index Fund',              category: 'Hybrid', subcat: 'Index/ETF',     aum: 9400,  nav: 18.42,  rating: 4, ret1y: 20.1, ret3y: 18.6, ret5y: 14.2, risk: 'Moderate', expense: 0.06, minSip: 10   },
    { id: 34, name: 'UTI Nifty 50 Index Fund',               category: 'Hybrid', subcat: 'Index/ETF',     aum: 16800, nav: 142.8,  rating: 4, ret1y: 20.4, ret3y: 18.8, ret5y: 14.4, risk: 'Moderate', expense: 0.20, minSip: 500  },
  ];

  /* ── State ──────────────────────────────────────────────── */
  var state = {
    funds: ALL_FUNDS.slice(),
    filtered: ALL_FUNDS.slice(),
    page: 1,
    perPage: 10,
    sortField: 'ret1y',
    sortDir: -1,
    filters: { category: '', subcat: '', risk: '', search: '', rating: '' },
    compareList: [],
    maxCompare: 4,
    activeTab: 'equity'
  };

  /* ── Helpers ────────────────────────────────────────────── */
  function fmt(n, dec) {
    dec = dec === undefined ? 2 : dec;
    return (n >= 0 ? '+' : '') + n.toFixed(dec) + '%';
  }
  function fmtCr(n) {
    if (n >= 100000) return '₹' + (n / 100000).toFixed(1) + 'L Cr';
    return '₹' + (n / 100).toFixed(1) + ' Cr';
  }
  function stars(r) {
    return '★'.repeat(r) + '☆'.repeat(5 - r);
  }
  function riskClass(r) {
    var m = { 'Low': 'badge-green', 'Moderate': 'badge-blue', 'High': 'badge-yellow', 'Very High': 'badge-red' };
    return m[r] || 'badge-blue';
  }

  /* ── Filter & sort ──────────────────────────────────────── */
  function applyFilters() {
    var f = state.filters;
    state.filtered = state.funds.filter(function (fund) {
      if (f.category && fund.category !== f.category) return false;
      if (f.subcat && fund.subcat !== f.subcat) return false;
      if (f.risk && fund.risk !== f.risk) return false;
      if (f.rating && fund.rating < parseInt(f.rating, 10)) return false;
      if (f.search) {
        var q = f.search.toLowerCase();
        if (fund.name.toLowerCase().indexOf(q) === -1 && fund.subcat.toLowerCase().indexOf(q) === -1) return false;
      }
      return true;
    });
    sortFunds();
    state.page = 1;
  }

  function sortFunds() {
    var field = state.sortField;
    var dir = state.sortDir;
    state.filtered.sort(function (a, b) {
      var av = a[field];
      var bv = b[field];
      if (typeof av === 'string') av = av.toLowerCase();
      if (typeof bv === 'string') bv = bv.toLowerCase();
      if (av < bv) return -dir;
      if (av > bv) return dir;
      return 0;
    });
  }

  /* ── Render fund table ──────────────────────────────────── */
  function renderFundTable(containerId, categoryFilter) {
    var container = document.getElementById(containerId);
    if (!container) return;

    // Apply category pre-filter if given
    if (categoryFilter) state.filters.category = categoryFilter;
    applyFilters();

    var start = (state.page - 1) * state.perPage;
    var slice = state.filtered.slice(start, start + state.perPage);
    var total = state.filtered.length;

    container.innerHTML = '';

    if (slice.length === 0) {
      container.innerHTML = '<div style="padding:40px;text-align:center;color:var(--text-muted)">No funds match your criteria. <button onclick="window.resetFilters()" class="btn btn-outline btn-sm" style="margin-left:10px">Reset Filters</button></div>';
      renderPagination(total);
      return;
    }

    var html = '<div class="table-wrap"><table aria-label="Mutual Funds Table"><thead><tr>' +
      thCell('Fund Name', 'name') +
      thCell('Category', 'subcat') +
      thCell('AUM', 'aum') +
      thCell('NAV (₹)', 'nav') +
      thCell('1Y Return', 'ret1y') +
      thCell('3Y Return', 'ret3y') +
      thCell('5Y Return', 'ret5y') +
      thCell('Risk', 'risk') +
      thCell('Rating', 'rating') +
      thCell('Expense', 'expense') +
      '<th>Action</th>' +
      '</tr></thead><tbody>';

    slice.forEach(function (f) {
      var isSelected = state.compareList.some(function (c) { return c.id === f.id; });
      html += '<tr>' +
        '<td><div class="fund-name-cell"><span class="fund-name">' + esc(f.name) + '</span></div></td>' +
        '<td><span class="badge badge-blue">' + esc(f.subcat) + '</span></td>' +
        '<td>' + fmtCr(f.aum) + '</td>' +
        '<td class="fw-600">₹' + f.nav.toLocaleString('en-IN') + '</td>' +
        '<td><span class="return-val ' + (f.ret1y >= 0 ? 'pos' : 'neg') + '">' + fmt(f.ret1y) + '</span></td>' +
        '<td><span class="return-val ' + (f.ret3y >= 0 ? 'pos' : 'neg') + '">' + fmt(f.ret3y) + '</span></td>' +
        '<td><span class="return-val ' + (f.ret5y >= 0 ? 'pos' : 'neg') + '">' + fmt(f.ret5y) + '</span></td>' +
        '<td><span class="badge ' + riskClass(f.risk) + '">' + esc(f.risk) + '</span></td>' +
        '<td style="color:#f59e0b">' + stars(f.rating) + '</td>' +
        '<td>' + f.expense + '%</td>' +
        '<td><button class="btn-compare' + (isSelected ? ' selected' : '') + '" data-id="' + f.id + '" aria-pressed="' + isSelected + '" aria-label="' + (isSelected ? 'Remove from comparison' : 'Add to comparison') + '">' + (isSelected ? '✓ Added' : '+ Compare') + '</button></td>' +
        '</tr>';
    });

    html += '</tbody></table></div>';
    container.innerHTML = html;

    // Bind compare buttons
    container.querySelectorAll('.btn-compare').forEach(function (btn) {
      btn.addEventListener('click', function () {
        toggleCompare(parseInt(this.getAttribute('data-id'), 10));
      });
    });

    renderPagination(total);
  }

  function thCell(label, field) {
    var sorted = state.sortField === field;
    var icon = sorted ? (state.sortDir === 1 ? ' ▲' : ' ▼') : ' ⇅';
    return '<th class="' + (sorted ? 'sorted' : '') + '" data-field="' + field + '" tabindex="0" role="columnheader" aria-sort="' + (sorted ? (state.sortDir === 1 ? 'ascending' : 'descending') : 'none') + '">' + label + '<span class="sort-icon">' + icon + '</span></th>';
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ── Sort on header click ───────────────────────────────── */
  document.addEventListener('click', function (e) {
    var th = e.target.closest('th[data-field]');
    if (!th) return;
    var field = th.getAttribute('data-field');
    if (state.sortField === field) {
      state.sortDir *= -1;
    } else {
      state.sortField = field;
      state.sortDir = -1;
    }
    var tableEl = th.closest('table');
    if (tableEl) {
      var containerId = tableEl.closest('[id]') && tableEl.closest('[id]').id;
      if (containerId) renderFundTable(containerId, state.filters.category || null);
    }
  });

  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('th[data-field]')) {
      e.target.click();
    }
  });

  /* ── Pagination ─────────────────────────────────────────── */
  function renderPagination(total) {
    var pEl = document.getElementById('pagination');
    if (!pEl) return;
    var totalPages = Math.ceil(total / state.perPage);
    var start = (state.page - 1) * state.perPage + 1;
    var end = Math.min(state.page * state.perPage, total);

    var btns = '';
    for (var p = 1; p <= totalPages; p++) {
      if (p === 1 || p === totalPages || Math.abs(p - state.page) <= 1) {
        btns += '<button class="page-btn' + (p === state.page ? ' active' : '') + '" data-page="' + p + '">' + p + '</button>';
      } else if (Math.abs(p - state.page) === 2) {
        btns += '<span style="padding:0 4px;color:var(--text-muted)">…</span>';
      }
    }

    pEl.innerHTML =
      '<div class="pagination">' +
      '<span class="pagination-info">Showing ' + start + '–' + end + ' of ' + total + ' funds</span>' +
      '<div class="pagination-btns">' +
      '<button class="page-btn" data-page="' + (state.page - 1) + '" ' + (state.page === 1 ? 'disabled' : '') + '>‹</button>' +
      btns +
      '<button class="page-btn" data-page="' + (state.page + 1) + '" ' + (state.page === totalPages ? 'disabled' : '') + '>›</button>' +
      '</div></div>';

    pEl.querySelectorAll('.page-btn:not(:disabled)').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var p = parseInt(this.getAttribute('data-page'), 10);
        if (p >= 1 && p <= totalPages) {
          state.page = p;
          var containerId = pEl.closest('[data-table-container]') && pEl.closest('[data-table-container]').querySelector('[id]') && pEl.closest('[data-table-container]').querySelector('[id]').id;
          containerId = containerId || 'fundTable';
          renderFundTable(containerId, state.filters.category || null);
          document.getElementById(containerId) && document.getElementById(containerId).scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ── Comparison feature ─────────────────────────────────── */
  function toggleCompare(id) {
    var idx = state.compareList.findIndex(function (f) { return f.id === id; });
    if (idx > -1) {
      state.compareList.splice(idx, 1);
      window.showToast && window.showToast('Removed from comparison', 'info');
    } else {
      if (state.compareList.length >= state.maxCompare) {
        window.showToast && window.showToast('Maximum ' + state.maxCompare + ' funds can be compared at once', 'warning');
        return;
      }
      var fund = ALL_FUNDS.find(function (f) { return f.id === id; });
      if (fund) {
        state.compareList.push(fund);
        window.showToast && window.showToast('Added "' + fund.name + '" to comparison', 'success');
      }
    }
    updateComparisonBar();
    // Re-render to update button states
    var tableEl = document.getElementById('fundTable');
    if (tableEl) renderFundTable('fundTable', state.filters.category || null);
    var eqTableEl = document.getElementById('equityTable');
    if (eqTableEl) renderFundTable('equityTable', 'Equity');
    var debtTableEl = document.getElementById('debtTable');
    if (debtTableEl) renderFundTable('debtTable', 'Debt');
    var hybridTableEl = document.getElementById('hybridTable');
    if (hybridTableEl) renderFundTable('hybridTable', 'Hybrid');
  }

  function updateComparisonBar() {
    var bar = document.getElementById('comparisonBar');
    if (!bar) return;
    if (state.compareList.length === 0) {
      bar.classList.add('hidden');
      return;
    }
    bar.classList.remove('hidden');
    var chips = document.getElementById('comparisonChips');
    if (chips) {
      chips.innerHTML = state.compareList.map(function (f) {
        return '<div class="comparison-chip">' + esc(f.name.split(' ').slice(0, 3).join(' ')) + '<button onclick="window.removeCompare(' + f.id + ')" aria-label="Remove ' + esc(f.name) + ' from comparison">✕</button></div>';
      }).join('');
    }
    var countEl = document.getElementById('compareCount');
    if (countEl) countEl.textContent = state.compareList.length + '/' + state.maxCompare;
  }

  window.removeCompare = function (id) { toggleCompare(id); };

  window.clearComparison = function () {
    state.compareList = [];
    updateComparisonBar();
    ['fundTable', 'equityTable', 'debtTable', 'hybridTable'].forEach(function (tid) {
      var el = document.getElementById(tid);
      if (el) renderFundTable(tid, state.filters.category || null);
    });
  };

  window.openCompareModal = function () {
    if (state.compareList.length < 2) {
      window.showToast && window.showToast('Select at least 2 funds to compare', 'warning');
      return;
    }
    var modal = document.getElementById('compareModal');
    if (!modal) return;
    modal.classList.add('open');
    renderCompareTable();
  };

  window.closeCompareModal = function () {
    var modal = document.getElementById('compareModal');
    if (modal) modal.classList.remove('open');
  };

  function renderCompareTable() {
    var body = document.getElementById('compareTableBody');
    if (!body) return;
    var funds = state.compareList;
    var fields = [
      { label: 'Category',   key: 'category' },
      { label: 'Sub-category', key: 'subcat' },
      { label: 'AUM',        key: 'aum',     fmt: function (v) { return fmtCr(v); } },
      { label: 'NAV',        key: 'nav',     fmt: function (v) { return '₹' + v.toLocaleString('en-IN'); } },
      { label: '1Y Return',  key: 'ret1y',   fmt: fmt, best: true,  lower: false },
      { label: '3Y Return',  key: 'ret3y',   fmt: fmt, best: true,  lower: false },
      { label: '5Y Return',  key: 'ret5y',   fmt: fmt, best: true,  lower: false },
      { label: 'Risk',       key: 'risk' },
      { label: 'Rating',     key: 'rating',  fmt: stars, best: true, lower: false },
      { label: 'Expense Ratio', key: 'expense', fmt: function (v) { return v + '%'; }, best: true, lower: true },
      { label: 'Min SIP',    key: 'minSip',  fmt: function (v) { return '₹' + v; } },
    ];

    var html = '<table class="compare-table" role="table"><thead><tr><th>Metric</th>' +
      funds.map(function (f) { return '<th>' + esc(f.name) + '</th>'; }).join('') +
      '</tr></thead><tbody>';

    fields.forEach(function (field) {
      html += '<tr><td>' + field.label + '</td>';
      var vals = funds.map(function (f) { return f[field.key]; });
      var bestIdx = -1;
      if (field.best) {
        bestIdx = field.lower
          ? vals.indexOf(Math.min.apply(null, vals))
          : vals.indexOf(Math.max.apply(null, vals));
      }
      funds.forEach(function (f, i) {
        var val = field.fmt ? field.fmt(f[field.key]) : esc(String(f[field.key]));
        html += '<td class="' + (i === bestIdx ? 'best' : '') + '">' + val + '</td>';
      });
      html += '</tr>';
    });

    html += '</tbody></table>';
    body.innerHTML = html;
  }

  /* ── Filters wiring ─────────────────────────────────────── */
  window.resetFilters = function () {
    state.filters = { category: '', subcat: '', risk: '', search: '', rating: '' };
    document.querySelectorAll('.filter-select, .filter-input').forEach(function (el) {
      el.value = '';
    });
    var tableId = document.getElementById('fundTable') ? 'fundTable' :
                  document.getElementById('equityTable') ? 'equityTable' :
                  document.getElementById('debtTable') ? 'debtTable' : null;
    if (tableId) renderFundTable(tableId, null);
  };

  function wireFilters(tableId, categoryFilter) {
    var searchEl = document.getElementById('searchInput');
    var categoryEl = document.getElementById('categoryFilter');
    var subcatEl = document.getElementById('subcatFilter');
    var riskEl = document.getElementById('riskFilter');
    var ratingEl = document.getElementById('ratingFilter');
    var resetBtn = document.getElementById('resetFilters');

    function onChange() {
      if (searchEl)   state.filters.search   = searchEl.value.trim();
      if (categoryEl) state.filters.category = categoryEl.value;
      if (subcatEl)   state.filters.subcat   = subcatEl.value;
      if (riskEl)     state.filters.risk     = riskEl.value;
      if (ratingEl)   state.filters.rating   = ratingEl.value;
      renderFundTable(tableId, categoryFilter);
    }

    if (searchEl)   searchEl.addEventListener('input',  onChange);
    if (categoryEl) categoryEl.addEventListener('change', onChange);
    if (subcatEl)   subcatEl.addEventListener('change',  onChange);
    if (riskEl)     riskEl.addEventListener('change',    onChange);
    if (ratingEl)   ratingEl.addEventListener('change',  onChange);
    if (resetBtn)   resetBtn.addEventListener('click',   window.resetFilters);
  }

  /* ── Modal close ────────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    var modal = document.getElementById('compareModal');
    if (modal && e.target === modal) window.closeCompareModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') window.closeCompareModal();
  });

  /* ── Public API ─────────────────────────────────────────── */
  window.MFDashboard = {
    _state: state,
    init: function (tableId, options) {
      options = options || {};
      if (options.category !== undefined) state.filters.category = options.category;
      if (options.subcat  !== undefined) state.filters.subcat   = options.subcat;
      renderFundTable(tableId, state.filters.category || null);
      wireFilters(tableId, state.filters.category || null);
      updateComparisonBar();
    },
    getData: function () { return ALL_FUNDS; }
  };

})();
