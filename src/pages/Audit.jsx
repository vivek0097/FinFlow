import React, { useState, useMemo, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { Download, Search } from 'lucide-react';

ModuleRegistry.registerModules([AllCommunityModule]);

const Audit = () => {
  const gridRef = useRef(); 

  const [rowData] = useState([
    { date: '2026-03-10', desc: 'Amazon Cloud Services', cat: 'Software', amount: 4500, type: 'expense' },
    { date: '2026-03-09', desc: 'Client Payment - Project X', cat: 'Freelance', amount: 85000, type: 'income' },
    { date: '2026-03-08', desc: 'Starbucks Coffee', cat: 'Food', amount: 450, type: 'expense' },
    { date: '2026-03-05', desc: 'HDFC Home Loan EMI', cat: 'Bills', amount: 25000, type: 'expense' },
    { date: '2026-03-04', desc: 'Netflix Subscription', cat: 'Entertainment', amount: 649, type: 'expense' },
  ]);

  const [columnDefs] = useState([
    { field: 'date', headerName: 'Date', filter: true, flex: 1, minWidth: 120 },
    { field: 'desc', headerName: 'Description', filter: 'agTextColumnFilter', flex: 2, minWidth: 200, cellClass: 'font-bold' },
    { 
      field: 'cat', 
      headerName: 'Category', 
      flex: 1,
      minWidth: 130,
      cellRenderer: (p) => (
        <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-full">
          {p.value}
        </span>
      )
    },
    { 
      field: 'amount', 
      headerName: 'Amount',
      flex: 1,
      minWidth: 130,
      type: 'rightAligned',
      cellClassRules: {
        'text-emerald-500 font-black': "data.type === 'income'",
        'text-rose-500 font-black': "data.type === 'expense'",
      },
      valueFormatter: (p) => (p.data.type === 'income' ? '+ ' : '- ') + '₹' + p.value.toLocaleString()
    },
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
  }), []);

  // Export Function
  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv({
      fileName: `FinFlow_Audit_${new Date().toISOString().split('T')[0]}.csv`,
    });
  }, []);

  const onFilterTextChange = (e) => {
    gridRef.current.api.setGridOption('quickFilterText', e.target.value);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">Audit Log</h1>
          <p className="text-sm text-slate-500">Manage and track every transaction</p>
        </div>
        
        {/* Export Button  */}
        <button 
          onClick={onBtnExport}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-lg shadow-indigo-100 dark:shadow-none transition-all active:scale-95"
        >
          <Download size={18} /> Export CSV
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-gray-100 dark:border-slate-800 flex items-center shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            className="w-full pl-12 pr-4 py-3 bg-transparent border-none focus:ring-0 outline-none dark:text-white text-sm"
            onChange={onFilterTextChange}
          />
        </div>
      </div>

      <div 
        className="ag-theme-quartz dark:ag-theme-quartz-dark shadow-xl rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-800" 
        style={{ height: 450, width: '100%' }}
      >
        <AgGridReact
          ref={gridRef} 
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          pagination={true}
          paginationPageSize={10}
          rowHeight={60}
          headerHeight={50}
         enableCellTextSelection={true} 
         ensureDomOrder={true}
        />
      </div>
    </div>
  );
};

export default Audit;