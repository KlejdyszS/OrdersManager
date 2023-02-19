export const formFields = [
    { id: 'email', name: 'email', label: 'Email', type: 'email' },
    { id: 'model', name: 'model', label: 'Model', type: 'text' },
    { id: 'color', name: 'color', label: 'Uwagi', type: 'text' },
  ];
  
  export const statusOptions = [
    { label: 'Nowe', value: 'Nowe' },
    { label: 'W trakcie realizacji', value: 'W trakcie realizacji' },
    { label: 'Zrealizowane', value: 'Zrealizowane' },
    { label: 'Oczekuje na płatność', value: 'Oczekuje na płatność' },
  ];
  
  export const tableHeaders = [
    { name: '_id', label: 'ID', type: 'text', className: 'px-4 py-2 w-1/10', sortable: true },
    { name: 'email', label: 'Email', type: 'email', className: 'px-4 py-2 w-1/10', sortable: true },
    { name: 'model', label: 'Model/Ilość', type: 'text', className: 'px-4 py-2 w-1/10' },
    { name: 'color', label: 'Uwagi', type: 'textfield', className: 'px-4 py-2 w-1/10' },
    { name: 'date', label: 'Date', type: 'text', className: 'px-4 py-2 w-1/10', sortable: true },
    { name: 'status', label: 'Status', type: 'select', className: 'px-4 py-2 w-1/10', sortable: true },
  ];
  
  export const opcjeDaty = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric' 
  };

  