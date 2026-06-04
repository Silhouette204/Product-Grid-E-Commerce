document.addEventListener('DOMContentLoaded', () => {
  renderArchivedTable();
});

function renderArchivedTable() {
  const tableBody = document.querySelector('#archived-history-list');
  if (!tableBody) return;

  const activeSession = JSON.parse(localStorage.getItem("active_user_session"));
  if (!activeSession) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="3" class="text-center py-10 text-red-400 font-bold bg-primary border border-zinc-800 rounded-b-xl">
          🔒 Session Expired. Please sign in again.
        </td>
      </tr>`;
    return;
  }

  // HUGUTIN ANG DATA GALING SA ARCHIVE KEY SA LOCALSTORAGE
  const allArchived = JSON.parse(localStorage.getItem('computer_grid_archived')) || [];

  // USER FILTER ENGINE: Ipakita lang ang inarchive ng kasalukuyang account user
  const archivedOrders = allArchived.filter(order => {
    const orderEmail = order.userEmail || order.email || "";
    return orderEmail.trim().toLowerCase() === activeSession.email.trim().toLowerCase();
  });

  if (archivedOrders.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="3" class="p-0">
          <div class="w-full text-center py-20 px-4 bg-primary border border-zinc-800 rounded-b-xl flex flex-col items-center justify-center min-h-[300px]">
            <i class="fa-solid fa-folder-closed text-5xl mb-4 text-zinc-700 block"></i>
            <span class="font-bold text-zinc-400 text-lg block">Archive vault is empty.</span>
            <p class="text-xs text-zinc-500 mt-2 max-w-xs leading-relaxed">
              Items you archive from your main order transaction table layout will appear here safely.
            </p>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = archivedOrders.map((order, index) => {
    let itemsHtmlBlock = '';
    if (Array.isArray(order.items)) {
      itemsHtmlBlock = order.items.map(item => `
        <div class="flex justify-between items-center bg-zinc-100 p-2 rounded border border-zinc-200 text-xs text-zinc-900">
          <span class="font-bold uppercase">${item.brand || ''} ${item.model || item.name || 'Component'}</span>
          <span class="font-mono font-bold text-zinc-600">Qty: ${item.quantity}</span>
        </div>
      `).join('');
    } else {
      itemsHtmlBlock = `<span class="text-zinc-900 font-semibold">${order.itemsSummary || 'Computer Components Bundle Set'}</span>`;
    }

    return `
      <tr class="bg-primary hover:bg-zinc-50 transition duration-150 border-b border-zinc-200 text-zinc-900">
        <td class="p-4 align-top space-y-2">
          <div class="flex items-center gap-2 mb-1.5">
            <span class="text-[10px] bg-zinc-500 text-white px-2 py-0.5 rounded uppercase font-mono font-bold">${order.invoiceNo || 'SI-ARCHIVE'}</span>
            <span class="text-[11px] text-zinc-400 font-mono font-semibold">${order.date || 'N/A'}</span>
          </div>
          <div class="space-y-1 max-w-md">
            ${itemsHtmlBlock}
          </div>
        </td>
        <td class="p-4 align-middle font-mono text-sm text-zinc-400 font-bold tracking-wide line-through">
          ${order.referenceNo || 'REF-EMPTY'}
        </td>
        <td class="p-4 align-middle text-center relative">
          <div class="inline-block text-left relative dropdown-container">
            <button type="button" onclick="toggleArchiveDropdown(event, ${index})" class="inline-flex items-center gap-2 bg-zinc-900 text-white font-bold px-4 py-2 rounded-lg text-xs uppercase tracking-wider transition hover:bg-zinc-700 shadow-md cursor-pointer font-mono">
              Actions <i class="fa-solid fa-chevron-down text-[10px]"></i>
            </button>
            
            <div id="archive-dropdown-${index}" class="hidden absolute right-0 mt-2 w-40 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl z-50 py-1.5 font-sans">
              <button type="button" onclick="viewSpecificArchivedReceipt(${index})" class="w-full text-left px-4 py-2 text-xs text-zinc-200 hover:bg-zinc-800 font-semibold transition flex items-center gap-2 cursor-pointer">
                <i class="fa-solid fa-receipt text-orange-400"></i> View Receipt
              </button>

              <button type="button" onclick="restoreOrderToHistory(${index})" class="w-full text-left px-4 py-2 text-xs text-emerald-400 hover:bg-zinc-800 font-semibold transition flex items-center gap-2 cursor-pointer border-t border-zinc-900">
                <i class="fa-solid fa-trash-arrow-up"></i> Restore Order
              </button>

              <button type="button" onclick="deleteReceiptPermanently(${index})" class="w-full text-left px-4 py-2 text-xs text-red-500 hover:bg-zinc-800 font-semibold transition flex items-center gap-2 cursor-pointer border-t border-zinc-900">
                <i class="fa-solid fa-trash-can"></i> Delete Receipt
              </button>
            </div>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// DROPDOWN WORKERS
window.toggleArchiveDropdown = function(event, index) {
  event.stopPropagation();
  document.querySelectorAll('[id^="archive-dropdown-"]').forEach(el => {
    if (el.id !== `archive-dropdown-${index}`) el.classList.add('hidden');
  });
  const currentDropdown = document.querySelector(`#archive-dropdown-${index}`);
  if (currentDropdown) currentDropdown.classList.toggle('hidden');
};

document.addEventListener('click', () => {
  document.querySelectorAll('[id^="archive-dropdown-"]').forEach(el => el.classList.add('hidden'));
});

// TOAST ENGINE
function showToast(message, type = 'success') {
  const container = document.querySelector('#toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  let bgClass = 'bg-zinc-950 border-green-500/30 text-green-400';
  let iconClass = 'fa-circle-check';
  
  if (type === 'danger') {
    bgClass = 'bg-zinc-950 border-red-500/30 text-red-400';
    iconClass = 'fa-triangle-exclamation';
  } else if (type === 'info') {
    bgClass = 'bg-zinc-950 border-orange-500/30 text-orange-400';
    iconClass = 'fa-clock-rotate-left';
  }

  toast.className = `flex items-center gap-3 px-5 py-3.5 border rounded-xl shadow-2xl transition-all duration-300 ease-out transform translate-y-5 opacity-0 font-sans text-xs uppercase font-bold tracking-wider ${bgClass}`;
  toast.innerHTML = `<i class="fa-solid ${iconClass} text-base"></i><span>${message}</span>`;

  container.appendChild(toast);
  setTimeout(() => toast.classList.remove('translate-y-5', 'opacity-0'), 10);
  setTimeout(() => {
    toast.classList.add('translate-y-5', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// PERMANENT REMOVAL
window.deleteReceiptPermanently = function(index) {
  if (confirm("Are you sure you want to permanently delete this receipt record? This action cannot be undone.")) {
    const activeSession = JSON.parse(localStorage.getItem("active_user_session"));
    let allArchived = JSON.parse(localStorage.getItem('computer_grid_archived')) || [];
    
    let filteredCount = 0;
    let masterIndex = -1;

    for (let i = 0; i < allArchived.length; i++) {
      const orderEmail = allArchived[i].userEmail || allArchived[i].email || "";
      if (orderEmail.trim().toLowerCase() === activeSession.email.trim().toLowerCase()) {
        if (filteredCount === index) {
          masterIndex = i;
          break;
        }
        filteredCount++;
      }
    }

    if (masterIndex !== -1) {
      allArchived.splice(masterIndex, 1);
      localStorage.setItem('computer_grid_archived', JSON.stringify(allArchived));
      showToast("Receipt record permanently destroyed from cache", "danger");
      renderArchivedTable();
    }
  }
};

// RECEIPT MECHANICS
window.viewSpecificArchivedReceipt = function(index) {
  const activeSession = JSON.parse(localStorage.getItem("active_user_session"));
  const allArchived = JSON.parse(localStorage.getItem('computer_grid_archived')) || [];
  
  const archivedOrders = allArchived.filter(order => {
    const orderEmail = order.userEmail || order.email || "";
    return orderEmail.trim().toLowerCase() === activeSession.email.trim().toLowerCase();
  });

  const selectedOrder = archivedOrders[index];
  if (!selectedOrder) return;

  const contentContainer = document.querySelector('#history-receipt-content');
  const historyModal = document.querySelector('#history-receipt-modal');

  if (!contentContainer || !historyModal) return;

  contentContainer.innerHTML = `
    <div class="text-center space-y-1 pt-2">
      <h3 class="text-xl font-black tracking-widest text-white uppercase">Virtual Receipt</h3>
      <h4 class="text-sm font-bold tracking-wider text-zinc-500 uppercase">ARCHIVED PARTITION</h4>
      <p class="text-gray-500 font-bold select-none pt-1">===================================</p>
    </div>
    <div class="space-y-1.5 bg-zinc-900/40 p-3.5 rounded border border-white/5 text-xs">
      <div><span class="text-gray-500 font-bold">NAME:</span> <span class="text-gray-100 font-bold">${selectedOrder.customerName || activeSession.username || 'N/A'}</span></div>
      <div><span class="text-gray-500 font-bold">ADDRESS:</span> <span class="text-gray-300 break-words">${selectedOrder.address || 'N/A'}</span></div>
      <div><span class="text-gray-500 font-bold">REFERENCE NO:</span> <span class="text-zinc-500 font-black tracking-wide line-through">${selectedOrder.referenceNo}</span></div>
    </div>
    <div class="border-t border-dashed border-zinc-800 pt-3 space-y-1.5 bg-zinc-900/20 p-3 rounded">
      <div class="flex justify-between">
        <span class="text-gray-500 font-bold">SUB TOTAL:</span>
        <span class="text-gray-300 font-bold">${selectedOrder.subtotal || '₱0.00'}</span>
      </div>
      <div class="flex justify-between items-center text-base font-sans font-black border-t border-dashed border-zinc-800 pt-2.5 mt-2">
        <span class="text-gray-100 uppercase tracking-wide text-sm">TOTAL AMOUNT PAID:</span>
        <span class="text-orange-400 text-lg font-black">${selectedOrder.totalAmount || selectedOrder.total}</span>
      </div>
    </div>
  `;
  historyModal.classList.remove('hidden');
};

window.closeHistoryReceipt = function() {
  const modal = document.querySelector('#history-receipt-modal');
  if (modal) modal.classList.add('hidden');
};

// RESTORE LOGIC
window.restoreOrderToHistory = function(index) {
  const activeSession = JSON.parse(localStorage.getItem("active_user_session"));
  let allArchived = JSON.parse(localStorage.getItem('computer_grid_archived')) || [];
  let allActive = JSON.parse(localStorage.getItem('computer_grid_orders')) || [];

  let filteredCount = 0;
  let masterIndex = -1;

  for (let i = 0; i < allArchived.length; i++) {
    const orderEmail = allArchived[i].userEmail || allArchived[i].email || "";
    if (orderEmail.trim().toLowerCase() === activeSession.email.trim().toLowerCase()) {
      if (filteredCount === index) {
        masterIndex = i;
        break;
      }
      filteredCount++;
    }
  }

  if (masterIndex !== -1) {
    const itemToRestore = allArchived.splice(masterIndex, 1)[0];
    allActive.unshift(itemToRestore);

    localStorage.setItem('computer_grid_archived', JSON.stringify(allArchived));
    localStorage.setItem('computer_grid_orders', JSON.stringify(allActive));

    showToast("Order entry successfully restored to active logs", "info");
    renderArchivedTable();
  }
};