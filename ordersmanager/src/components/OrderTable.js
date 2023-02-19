import React, { useState } from 'react';


const OrderTable = ({ orders, handleDeleteClick, handleEditClick, handleFieldChange, statusOptions, tableHeaders, opcjeDaty }) => {
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
   console.log(orders);
    const handleHeaderClick = (fieldName) => {
        if (fieldName === sortField) {
            setSortDirection(sortDirection === 1 ? -1 : 1);
        } else {
            setSortField(fieldName);
            setSortDirection(1);
        }
    };
   
    const filteredOrders = orders.filter((order) => {
        const values = Object.values(order).map((value) => {
          if (typeof value === 'string') {
            return value.toLowerCase();
          } else if (Array.isArray(value)) {
            return value.map((item) => {
              if (typeof item === 'string') {
                return item.toLowerCase();
              } else {
                return '';
              }
            }).join(' ');
          } else {
            return '';
          }
        });
        const concatenatedValues = values.join(' ');
        return concatenatedValues.toLowerCase().includes(searchTerm.toLowerCase());
      });
  
    const sortedOrders = [...filteredOrders].sort((a, b) => {
        if (sortField === 'date') {
            const fieldA = new Date(a.created_at);
            const fieldB = new Date(b.created_at);
            return (fieldA - fieldB) * sortDirection;
        } else {
            const fieldA = a[sortField];
            const fieldB = b[sortField];
            if (typeof fieldA === 'string' && typeof fieldB === 'string') {
                return fieldA.localeCompare(fieldB) * sortDirection;
            } else if (typeof fieldA === 'number' && typeof fieldB === 'number') {
                return (fieldA - fieldB) * sortDirection;
            } else {
                return 0;
            }
        }
    });

  return (
  <div>
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm py-2 px-3 w-full"
      />
    </div>
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-2 w-1/10">#</th>
          {tableHeaders.map((header) => (
            <th
              key={header.name}
              className={header.className}
              onClick={() => header.sortable && handleHeaderClick(header.name)}
              style={{ cursor: header.sortable ? "pointer" : "default" }}
            >
              {header.label}
              {header.sortable && sortField === header.name && (
                <span>{sortDirection === 1 ? " ▲" : " ▼"}</span>
              )}
            </th>
          ))}
          <th className="px-4 py-2 w-1/24">Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedOrders.map((order, index) => (
          <tr key={order._id}>
            <td className="border px-4 py-2 w-1/12">{index}</td>
            {tableHeaders.map((header) => (
              <td className="border px-4 py-2 w-1/8 text-center" key={header.name}>
                {header.type === "array" ? (
                  <div className="whitespace-pre-wrap">
                    {order.model.map((pair, index) => (
                      <div key={index}>
                        {pair.word}: {pair.number} <br />
                      </div>
                    ))}
                  </div>
                ) : header.name === "date" ? (
                  <span className="text-gray-500 text-sm ">
                    {new Date(order.created_at).toLocaleString("pl-PL", opcjeDaty)}
                  </span>
                ) : header.type === "select" ? (
                  <select
                    value={order[header.name]}
                    onChange={(e) => handleFieldChange(e, order._id, header.name)}
                    className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm w-full py-2 px-3"
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : header.name === "model" ? (
                  <div className="whitespace-pre-wrap">
                    {order[header.name].map((pair, index) => (
                      <React.Fragment key={index}>
                        {pair.word}:{pair.number}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
                ) : (
                  <span>{order[header.name]}</span>
                )}
              </td>
            ))}
            <td className="border px-4 py-2 w-1/12 text-center">
              <button
                onClick={() => handleDeleteClick(order._id)}
                className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              >
                Delete
          </button>
          <button
            onClick={() => handleEditClick(order._id)}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Edit
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div>
);
                }

export default OrderTable;
