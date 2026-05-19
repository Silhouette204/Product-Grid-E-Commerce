document.addEventListener('DOMContentLoaded', () => {
  renderOrdersTable();
});

function renderOrdersTable() {
  const tableBody = document.querySelector('#orders-history-list');
  if (!tableBody) return;

  // Hugutin ang nakatagong dynamic logs ng transaction list mula sa storage database natin
  const orders = JSON.parse(localStorage.getItem('computer_grid_orders')) || [];

  // EDGE CASE: Kapag malinis pa at walang record na nakasulat
  if (orders.length === 0) {
    tableBody.innerHTML = `
      <tr>
      <td colspan="3" class="p-0">
        <div class="w-full text-center py-20 px-4 bg-primary border border-zinc-800 rounded-b-xl flex flex-col items-center justify-center min-h-[300px]">
          <i class="fa-solid fa-box-open text-5xl mb-4 text-zinc-700 block"></i>
          <span class="font-bold text-secondary text-lg block">No transaction records found.</span>
          <p class="text-xs text-zinc-500 mt-2 max-w-xs leading-relaxed">
            Your processed order history lists will appear here automatically after checkout.
          </p>
        </div>
      </td>
    </tr>
    `;
    return;
  }

  // CORE RENDER LOOP: Isa-isahing ilapat ang records papuntang Structural Columns
tableBody.innerHTML = orders.map((order, index) => {
  let itemsHtmlBlock = '';
  if (Array.isArray(order.items)) {
    itemsHtmlBlock = order.items.map(item => `
      <div class="flex justify-between items-center bg-zinc-100 p-2 rounded border border-zinc-200 text-xs text-zinc-900">
        <span class="font-bold uppercase">${item.brand} ${item.model}</span>
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
          <span class="text-[10px] bg-zinc-800 text-white px-2 py-0.5 rounded uppercase font-mono font-bold">${order.invoiceNo || 'SI-SYSTEM'}</span>
          <span class="text-[11px] text-zinc-500 font-mono font-semibold">${order.date || 'May 19, 2026'}</span>
        </div>
        <div class="space-y-1 max-w-md">
          ${itemsHtmlBlock}
        </div>
      </td>
      
      <td class="p-4 align-middle font-mono text-sm text-orange-600 font-black tracking-wide">
        ${order.referenceNo || 'REF-EMPTY-FIELD'}
      </td>
      
      <td class="p-4 align-middle text-center relative">
        <div class="inline-block text-left relative dropdown-container">
          <button type="button" onclick="toggleDropdown(event, ${index})" class="inline-flex items-center gap-2 bg-zinc-900 text-white font-bold px-4 py-2 rounded-lg text-xs uppercase tracking-wider transition hover:bg-zinc-700 shadow-md cursor-pointer font-mono">
            Actions <i class="fa-solid fa-chevron-down text-[10px]"></i>
          </button>
          
          <div id="dropdown-${index}" class="hidden absolute right-0 mt-2 w-40 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl z-50 py-1.5 font-sans">
            <button type="button" onclick="viewSpecificReceipt(${index})" class="w-full text-left px-4 py-2 text-xs text-zinc-200 hover:bg-zinc-800 font-semibold transition flex items-center gap-2 cursor-pointer">
              <i class="fa-solid fa-receipt text-orange-400"></i> View Receipt
            </button>
            <button type="button" onclick="archiveOrder(${index})" class="w-full text-left px-4 py-2 text-xs text-zinc-200 hover:bg-zinc-800 font-semibold transition flex items-center gap-2 cursor-pointer border-t border-zinc-900">
              <i class="fa-solid fa-box-archive text-zinc-400"></i> Get Archive
            </button>
          </div>
        </div>
      </td>
    </tr>
  `;
}).join('');



window.toggleDropdown = function(event, index) {
  event.stopPropagation();
  // Isara muna ang lahat ng bukas na dropdowns
  document.querySelectorAll('[id^="dropdown-"]').forEach(el => {
    if (el.id !== `dropdown-${index}`) el.classList.add('hidden');
  });
  // Buksan o isara ang pinindot
  const currentDropdown = document.querySelector(`#dropdown-${index}`);
  currentDropdown.classList.toggle('hidden');
};

// ISARA ANG DROPDOWN KAPAG NAG-CLICK SA LABAS
document.addEventListener('click', () => {
  document.querySelectorAll('[id^="dropdown-"]').forEach(el => el.classList.add('hidden'));
});


// VIEW CONTROLLER ENGINE TRIGGER
window.viewSpecificReceipt = function(index) {
  const orders = JSON.parse(localStorage.getItem('computer_grid_orders')) || [];
  const selectedOrder = orders[index];
  if (!selectedOrder) return;

  const contentContainer = document.querySelector('#history-receipt-content');
  const historyModal = document.querySelector('#history-receipt-modal');

  // I-render ang saktong duplicate layout ng original thermal receipt block natin kagabi
  contentContainer.innerHTML = `
    <div class="text-center space-y-1 pt-2">
      <h3 class="text-xl font-black tracking-widest text-white uppercase">Virtual Receipt</h3>
      <h4 class="text-sm font-bold tracking-wider text-orange-400 uppercase">Product Grid</h4>
      <p class="text-gray-500 font-bold select-none pt-1">===================================</p>
      <p class="text-sm font-black tracking-widest text-white uppercase bg-zinc-900 py-1.5 rounded border border-white/5">Official Receipt</p>
      <p class="text-gray-500 font-bold select-none">===================================</p>
    </div>

    <div class="space-y-1.5 bg-zinc-900/40 p-3.5 rounded border border-white/5 text-xs">
      <div><span class="text-gray-500 font-bold">NAME:</span> <span class="text-gray-100 font-bold">${selectedOrder.customerName || 'N/A'}</span></div>
      <div><span class="text-gray-500 font-bold">ADDRESS:</span> <span class="text-gray-300 break-words">${selectedOrder.address || 'N/A'}</span></div>
      <div><span class="text-gray-500 font-bold">REFERENCE NO:</span> <span class="text-orange-400 font-black tracking-wide">${selectedOrder.referenceNo}</span></div>
    </div>

    <div class="border-t border-dashed border-zinc-800 pt-3 space-y-1.5 bg-zinc-900/20 p-3 rounded">
      <div class="flex justify-between">
        <span class="text-gray-500 font-bold">SUB TOTAL:</span>
        <span class="text-gray-300 font-bold">${selectedOrder.subtotal || '₱0.00'}</span>
      </div>
      <div class="flex justify-between text-xs">
        <span class="text-gray-500">TAX (12% VAT):</span>
        <span class="text-gray-400">${selectedOrder.tax || '₱0.00'}</span>
      </div>
      <div class="flex justify-between text-xs">
        <span class="text-gray-500">SHIPPING FEE:</span>
        <span class="text-gray-400">₱50.00</span>
      </div>
      <div class="flex justify-between items-center text-base font-sans font-black border-t border-dashed border-zinc-800 pt-2.5 mt-2">
        <span class="text-gray-100 uppercase tracking-wide text-sm">TOTAL AMOUNT:</span>
        <span class="text-orange-400 text-lg font-black">${selectedOrder.totalAmount}</span>
      </div>
    </div>

    <div class="w-full text-left pt-1 space-y-1 text-xs font-mono text-gray-500">
      <div class="flex justify-between"><span>TXN NO:</span><span class="text-gray-400 font-bold">${selectedOrder.txnNo || 'TXN-XXXXXX'}</span></div>
      <div class="flex justify-between"><span>INVOICE NO:</span><span class="text-gray-400 font-bold">${selectedOrder.invoiceNo || 'SI-XXXXXX'}</span></div>
    </div>
  `;

  historyModal.classList.remove('hidden');
};

window.closeHistoryReceipt = function() {
  document.querySelector('#history-receipt-modal').classList.add('hidden');
};




//archive function 
window.archiveOrder = function(index) {
  let orders = JSON.parse(localStorage.getItem('computer_grid_orders')) || [];
  let archivedOrders = JSON.parse(localStorage.getItem('computer_grid_archived')) || [];
  
  // 1. Hugutin ang order item gamit ang index at tanggalin sa active table array
  const itemToArchive = orders.splice(index, 1)[0];
  
  // 2. Itapon ang nakuhang item papunta sa archive database area
  archivedOrders.unshift(itemToArchive);
  
  // 3. I-update ang dalawang magkahiwalay na key sa storage environment
  localStorage.setItem('computer_grid_orders', JSON.stringify(orders));
  localStorage.setItem('computer_grid_archived', JSON.stringify(archivedOrders));
  
  // 4. Re-render para magbago agad ang listahan sa screen nang hindi nagre-reload ang page
  renderOrdersTable();
};
}