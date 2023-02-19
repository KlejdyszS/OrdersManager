import React from 'react';

const OrderTable = ({ orders, handleDeleteClick, handleEditClick, handleFieldChange, statusOptions, tableHeaders, opcjeDaty }) => {
    return (
        <table className="table-auto w-full">
            <thead>
                <tr>
                    <th className="px-4 py-2 w-1/10">#</th>
                    {tableHeaders.map((header) => (
                        <th key={header.name} className={header.className}>
                            {header.label}
                        </th>
                    ))}
                    <th className="px-4 py-2 w-1/24">Actions</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order, index) => (
                    <tr key={order._id}>
                        <td className="border px-4 py-2 w-1/12">{index}</td>
                        {tableHeaders.map((header) => (
                            <td className="border px-4 py-2 w-1/8 text-center" key={header.name}>
                                {header.type === 'array' ? (
                                    <div className="whitespace-pre-wrap">
                                        {order.model.map((pair, index) => (
                                            <div key={index}>
                                                {pair.word}: {pair.number} <br />
                                            </div>
                                        ))}
                                    </div>
                                ) : header.name === 'date' ? (
                                    <span className="text-gray-500 text-sm ">
                                        {new Date(order.created_at).toLocaleString('pl-PL', opcjeDaty)}
                                    </span>
                                ) : header.type === 'select' ? (
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
                                ) : header.name === 'model' ? (
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
                                onClick={() => handleEditClick(order)}
                                className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default OrderTable;