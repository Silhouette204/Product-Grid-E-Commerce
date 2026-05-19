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
    
    // Fallback display formatting kung sakaling array or string ang structure ng items block mo
    let itemsHtmlBlock = '';
    if (Array.isArray(order.items)) {
      itemsHtmlBlock = order.items.map(item => `
        <div class="flex justify-between items-center bg-zinc-900/30 p-2 rounded border border-zinc-800/40 text-xs">
          <span class="text-zinc-200 font-bold uppercase">${item.brand} ${item.model}</span>
          <span class="text-zinc-500 font-mono">Qty: ${item.quantity}</span>
        </div>
      `).join('');
    } else {
      // String backup template description
      itemsHtmlBlock = `<span class="text-zinc-300 font-medium">${order.itemsSummary || 'Computer Components Bundle Set'}</span>`;
    }

    return `
      <tr class="bg-primary transition duration-150">
        <td class="p-4 align-top space-y-2">
          <div class="flex items-center gap-2 mb-1.5">
            <span class="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded uppercase font-mono font-bold">${order.invoiceNo || 'SI-SYSTEM'}</span>
            <span class="text-[11px] text-zinc-500 font-mono">${order.date || 'May 19, 2026'}</span>
          </div>
          <div class="space-y-1 max-w-md">
            ${itemsHtmlBlock}
          </div>
        </td>
        
        <td class="p-4 align-middle font-mono text-xs text-orange-400 font-bold tracking-wide">
          ${order.referenceNo || 'REF-EMPTY-FIELD'}
        </td>
        
        <td class="p-4 align-middle text-center">
          <button type="button" onclick="viewSpecificReceipt(${index})" class="inline-flex items-center gap-2 bg-zinc-800 text-zinc-100 font-semibold px-4 py-2 rounded-lg text-xs uppercase tracking-wider transition hover:bg-orange-400 hover:text-zinc-950 shadow-md cursor-pointer font-mono">
            <i class="fa-solid fa-receipt"></i> View
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

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