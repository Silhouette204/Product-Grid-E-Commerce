document.addEventListener('DOMContentLoaded', () => {
  renderArchivedTable();
});

function renderArchivedTable() {
  const tableBody = document.querySelector('#archived-history-list');
  if (!tableBody) return;

  // HUGUTIN ANG DATA GALING SA ARCHIVE KEY SA LOCALSTORAGE
  const archivedOrders = JSON.parse(localStorage.getItem('computer_grid_archived')) || [];

  if (archivedOrders.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="3" class="p-0">
          <div class="w-full text-center py-20 px-4 bg-primary border border-zinc-800 rounded-b-xl flex flex-col items-center justify-center min-h-[300px]">
            <i class="fa-solid fa-folder-closed text-5xl mb-4 text-zinc-400 block"></i>
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
          <span class="font-bold uppercase">${item.brand} ${item.model}</span>
          <span class="font-mono font-bold text-zinc-600">Qty: ${item.quantity}</span>
        </div>
      `).join('');
    } else {
      itemsHtmlBlock = `<span class="text-zinc-900 font-semibold">${order.itemsSummary || 'Computer Components'}</span>`;
    }

    return `
      <tr class="bg-primary hover:bg-zinc-50 transition duration-150 border-b border-zinc-200 text-zinc-900">
        <td class="p-4 align-top space-y-2">
          <div class="flex items-center gap-2 mb-1.5">
            <span class="text-[10px] bg-zinc-500 text-secondary px-2 py-0.5 rounded uppercase font-mono font-bold">${order.invoiceNo || 'SI-ARCHIVE'}</span>
            <span class="text-[11px] text-zinc-400 font-mono font-semibold">${order.date || 'N/A'}</span>
          </div>
          <div class="space-y-1 max-w-md">
            ${itemsHtmlBlock}
          </div>
        </td>
        <td class="p-4 align-middle font-mono text-sm text-zinc-500 font-bold tracking-wide line-through">
          ${order.referenceNo}
        </td>
        <td class="p-4 align-middle text-center relative">
          <div class="inline-block text-left relative dropdown-container">
            <button type="button" onclick="toggleArchiveDropdown(event, ${index})" class="inline-flex items-center gap-2 bg-secondary text-white font-bold px-4 py-2 rounded-lg text-xs uppercase tracking-wider transition hover:bg-zinc-700 shadow-md cursor-pointer font-mono">
              Actions <i class="fa-solid fa-chevron-down text-[10px]"></i>
            </button>
            
            <div id="archive-dropdown-${index}" class="hidden absolute right-0 mt-2 w-40 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl z-50 py-1.5 font-sans">
              <button type="button" onclick="viewSpecificArchivedReceipt(${index})" class="w-full text-left px-4 py-2 text-xs text-zinc-200 hover:bg-zinc-800 font-semibold transition flex items-center gap-2 cursor-pointer">
                <i class="fa-solid fa-receipt text-orange-400"></i> View Receipt
              </button>

              <button type="button" onclick="restoreOrderToHistory(${index})" class="w-full text-left px-4 py-2 text-xs text-green-400 hover:bg-zinc-800 font-semibold transition flex items-center gap-2 cursor-pointer border-t border-zinc-900">
                <i class="fa-solid fa-trash-arrow-up"></i> Restore Order
              </button>

              <button type="button" onclick="deleteReceiptPermanently(${index})" class="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-zinc-800 font-semibold transition flex items-center gap-2 cursor-pointer border-t border-zinc-900">
                <i class="fa-solid fa-trash-can"></i> Delete Receipt
              </button>
              
            </div>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// DROPDOWN VIEW CONTROL SWITCH FOR VAULT
window.toggleArchiveDropdown = function(event, index) {
  event.stopPropagation();
  document.querySelectorAll('[id^="archive-dropdown-"]').forEach(el => {
    if (el.id !== `archive-dropdown-${index}`) el.classList.add('hidden');
  });
  document.querySelector(`#archive-dropdown-${index}`).classList.toggle('hidden');
};

document.addEventListener('click', () => {
  document.querySelectorAll('[id^="archive-dropdown-"]').forEach(el => el.classList.add('hidden'));
});


//for toast conditions (succesfull green, orange restore, red delete)
// REUSABLE TOAST NOTIFICATION ENGINE
function showToast(message, type = 'success') {
  const container = document.querySelector('#toast-container');
  if (!container) return;

  // Gumawa ng bagong div para sa toast card
  const toast = document.createElement('div');
  
  // Timpla ng kulay base sa type (success, info, o error/danger)
  let bgClass = 'bg-zinc-900 border-zinc-800 text-zinc-100';
  let iconClass = 'fa-circle-info text-blue-400';
  
  if (type === 'success') {
    bgClass = 'bg-zinc-950 border-green-500/30 text-green-400';
    iconClass = 'fa-circle-check text-green-400';
  } else if (type === 'danger') {
    bgClass = 'bg-zinc-950 border-red-500/30 text-red-400';
    iconClass = 'fa-triangle-exclamation text-red-400';
  } else if (type === 'info') {
    bgClass = 'bg-zinc-950 border-orange-500/30 text-orange-400';
    iconClass = 'fa-clock-rotate-left text-orange-400';
  }

  // Bagong structure ng lumulutang na card na may Tailwind Animations at transition shadow
  toast.className = `flex items-center gap-3 px-5 py-3.5 border rounded-xl shadow-2xl transition-all duration-300 ease-out transform translate-y-5 opacity-0 pointer-events-auto font-sans text-xs uppercase font-bold tracking-wider ${bgClass}`;
  
  toast.innerHTML = `
    <i class="fa-solid ${iconClass} text-base"></i>
    <span>${message}</span>
  `;

  // Isalpak sa container panel
  container.appendChild(toast);

  // Trigger smooth fade-in at pag-angat (Animation slide-up effect)
  setTimeout(() => {
    toast.classList.remove('translate-y-5', 'opacity-0');
  }, 10);

  // Awtomatikong mawawala pagkatapos ng 3 segundo (3000ms)
  setTimeout(() => {
    toast.classList.add('translate-y-5', 'opacity-0');
    // Hintaying matapos ang transition bago tuluyang burahin sa DOM node tree
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}


// CRITICAL ACTION: PERMANENTLY REMOVE FROM BROWSER DATABASE
window.deleteReceiptPermanently = function(index) {
  if (confirm("Are you sure you want to permanently delete this receipt record? This action cannot be undone.")) {
    let archivedOrders = JSON.parse(localStorage.getItem('computer_grid_archived')) || [];
    
    // Alisin sa array permanently gamit ang splice index
    archivedOrders.splice(index, 1);
    
    // Ibalik ang bawas na array sa localstorage
    localStorage.setItem('computer_grid_archived', JSON.stringify(archivedOrders));
    
    showToast("Receipt record permanently destroyed from cache", "danger");
    // Re-render table layout
    renderArchivedTable();
  }
};

// RECEIPT RENDER BLOCKS COPY-PASTE (Gaya ng sa order page para gumana pa rin ang modal view)
window.viewSpecificArchivedReceipt = function(index) {
  const archivedOrders = JSON.parse(localStorage.getItem('computer_grid_archived')) || [];
  const selectedOrder = archivedOrders[index];
  if (!selectedOrder) return;

  const contentContainer = document.querySelector('#history-receipt-content');
  const historyModal = document.querySelector('#history-receipt-modal');

  contentContainer.innerHTML = `
    <div class="text-center space-y-1 pt-2">
      <h3 class="text-xl font-black tracking-widest text-white uppercase">Virtual Receipt</h3>
      <h4 class="text-sm font-bold tracking-wider text-zinc-500 uppercase">ARCHIVED PARTITION</h4>
      <p class="text-gray-500 font-bold select-none pt-1">===================================</p>
    </div>
    <div class="space-y-1.5 bg-zinc-900/40 p-3.5 rounded border border-white/5 text-xs">
      <div><span class="text-gray-500 font-bold">NAME:</span> <span class="text-gray-100 font-bold">${selectedOrder.customerName || 'N/A'}</span></div>
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
        <span class="text-orange-400 text-lg font-black">${selectedOrder.totalAmount}</span>
      </div>
    </div>
  `;
  historyModal.classList.remove('hidden');
};

window.closeHistoryReceipt = function() {
  document.querySelector('#history-receipt-modal').classList.add('hidden');
};



//restore function 
// RESTORE DATA ENGINE: Ibalik ang record mula Archive papuntang Active Orders
window.restoreOrderToHistory = function(index) {
  // 1. Kumuha ng kopya ng dalawang databases mula sa local storage cache
  let archivedOrders = JSON.parse(localStorage.getItem('computer_grid_archived')) || [];
  let activeOrders = JSON.parse(localStorage.getItem('computer_grid_orders')) || [];

  // 2. Hugutin ang target item gamit ang index mula sa archive list (Tatanggalin sya dun)
  const itemToRestore = archivedOrders.splice(index, 1)[0];

  if (itemToRestore) {
    // 3. I-push pabalik sa PINAKA-UNAHAN ng active orders array list
    activeOrders.unshift(itemToRestore);

    // 4. I-save ang pagbabago sa magkahiwalay na Storage Keys ng browser natin
    localStorage.setItem('computer_grid_archived', JSON.stringify(archivedOrders));
    localStorage.setItem('computer_grid_orders', JSON.stringify(activeOrders));

    // 5. Mabilis na UI Notification (Optional pero maganda para alam ng user)

    showToast("Order entry successfully restored to active logs", "info");
    
    // 6. Re-render ang Archive table para mawala agad ang ni-restore na row
    renderArchivedTable();
  }
};