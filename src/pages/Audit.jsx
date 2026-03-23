import React, { useState,useEffect, useMemo, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { Download, Search, Calendar,PencilLine, Trash2 } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import { AddTransactionModal } from '../components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import toast from 'react-hot-toast';


ModuleRegistry.registerModules([AllCommunityModule]);

const Audit = () => {
  const gridRef = useRef(); 
  const { sendRequest, loading } = useFetch();
  const [startDate, setStartDate] = useState(moment().startOf('month').toDate());
  const [endDate, setEndDate] = useState(new Date());
  const [rowData, setRowData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);




// 2. Validation Handler: Jab From Date badle
  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (moment(date).isAfter(endDate)) {
      setEndDate(date);
    }
  };


  const loadTransactions = async () => {
   
    const from = moment(startDate).format('DD/MMM/YYYY');
    const to = moment(endDate).format('DD/MMM/YYYY');
    
    const data = await sendRequest(`/transactions?from=${from}&to=${to}`, 'GET');
    setRowData(data);
  };

  useEffect(() => {
    loadTransactions();
  }, [startDate, endDate]);

  const [columnDefs] = useState([
   { 
        field: 'date', 
        headerName: 'Date', 
        filter: true, 
        flex: 1, 
        minWidth: 140,
        valueFormatter: (params) => {
          return params.value ? moment(params.value).format('DD/MMM/YYYY') : '';
        }
      },
    { field: 'description', headerName: 'Description', filter: 'agTextColumnFilter', flex: 2, minWidth: 200, cellClass: 'font-bold' },
    { 
      field: 'category', 
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
    {
    headerName: 'Actions',
    field: 'actions',
    width: 100,
    cellRenderer: (params) => (
      <div className="flex items-center gap-2">
        {/* ---edit  button */}
      <button 
        onClick={() => {
          setSelectedTx(params.data); 
          setIsModalOpen(true); 
        }}
        className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors"
      >
        <PencilLine size={16} className="text-indigo-500" />
      </button>

      {/* DELETE BUTTON */}
        <button 
          onClick={() => handleDelete(params.data._id)} 
          className="p-2 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors"
          title="Delete"
        >
          <Trash2 size={16} className="text-rose-500" />
        </button>
        </div>
    )
  }
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



//---delete  handler fun-------------------
const handleDelete = async (id) => {
  // Debugging ke liye id check karein
  console.log("Deleting ID:", id); 

  if (!id) {
    toast.error("Bhai, Transaction ID hi nahi mili!");
    return;
  }

  if (window.confirm("Do you want to delete this record?")) {
    const tid = toast.loading("Deleting...");
    try {
      // DELETE request mein aksar 2nd parameter (body) null bhejna padta hai 
      // agar useFetch axios.delete(url, body) follow kar raha hai.
      await sendRequest(`/transactions/${id}`, 'DELETE', null); 
      
      toast.success("Delete ho gaya!", { id: tid });
      loadTransactions(); 
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Error: " + (err.response?.data?.msg || err.message), { id: tid });
    }
  }
};

  return (
    <>


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




{/* Date Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Range:</span>
        </div>
        
      {/* FROM DATE PICKER */}
      <div className="flex flex-col">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 ml-1">From</label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd/MMM/yyyy"
          maxDate={new Date()} // Future ki dates disable
          className="bg-slate-50 dark:bg-white/5 border-none rounded-xl px-4 py-2 text-sm font-bold outline-none focus:ring-2 ring-indigo-500/20 w-40"
        />
      </div>

      <div className="text-slate-300 mt-4">—</div>

      {/* TO DATE PICKER */}
      <div className="flex flex-col">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 ml-1">To</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate} 
          maxDate={new Date()} 
          dateFormat="dd/MMM/yyyy"
          className="bg-slate-50 dark:bg-white/5 border-none rounded-xl px-4 py-2 text-sm font-bold outline-none focus:ring-2 ring-indigo-500/20 w-40"
        />
      </div>
        
        <button 
          onClick={loadTransactions}
          className="ml-auto bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
        >
          Apply Filter
        </button>
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
    {/* ====form ==add transaction================ */}
    <AddTransactionModal 
      isOpen={isModalOpen} 
      onClose={() => {
        setIsModalOpen(false);
        setSelectedTx(null);
      }} 
      editData={selectedTx} 
      onRefresh={loadTransactions} 
    />
    </>
  );
};

export default Audit;