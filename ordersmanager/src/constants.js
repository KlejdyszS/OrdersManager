export const formFields = [
    { id: 'email', name: 'email', label: 'Email', type: 'email' },
    { id: 'quantity', name: 'quantity', label: 'Quantity', type: 'number' },
    { id: 'model', name: 'model', label: 'Model', type: 'text' },
    { id: 'color', name: 'color', label: 'Color', type: 'text' },
  ];
  
  export const statusOptions = [
    { label: 'Nowe', value: 'Nowe' },
    { label: 'W trakcie realizacji', value: 'W trakcie realizacji' },
    { label: 'Zrealizowane', value: 'Zrealizowane' },
    { label: 'Oczekuje na płatność', value: 'Oczekuje na płatność' },
  ];
  
  export const tableHeaders = [
    { name: '_id', label: 'ID', type: 'text', className: 'px-4 py-2 w-1/10' },
    { name: 'email', label: 'Email', type: 'email', className: 'px-4 py-2 w-1/10' },
    { name: 'quantity', label: 'Quantity', type: 'number', className: 'px-4 py-2 w-1/10' },
    { name: 'model', label: 'Model', type: 'text', className: 'px-4 py-2 w-1/10' },
    { name: 'color', label: 'Color', type: 'text', className: 'px-4 py-2 w-1/10' },
    { name: 'date', label: 'Date', type: 'text', className: 'px-4 py-2 w-1/10' },
    { name: 'status', label: 'Status', type: 'select', className: 'px-4 py-2 w-1/10' },
  ];
  
  export const opcjeDaty = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric' 
  };