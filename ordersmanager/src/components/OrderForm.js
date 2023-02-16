import React from 'react';
import OrderPreview from './OrderPreview';
import { formFields, statusOptions } from '../constants';

const OrderForm = ({
    newOrder,
    handleInputChange,
    handleStatusChange,
    handleAddOrder,
    handleUpdateOrder,
}) => {
    return (
        <form
            onSubmit={newOrder._id ? () => handleUpdateOrder(newOrder._id) : handleAddOrder}
            className="bg-white shadow-md my-4 p-4 grid grid-cols-2 gap-4"
        >
            <div className="flex flex-col">
                <h2 className="text-2xl font-medium mb-4 text-center">
                    {newOrder._id ? 'Edit Order' : 'Add New Order'}
                </h2>
                {formFields.map((field) => (
                    <div key={field.id} className="mb-4">
                        <label htmlFor={field.name} className="block text-gray-700 font-bold mb-2">
                            {field.label}:
                        </label>
                        <input
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            value={newOrder[field.name]}
                            onChange={handleInputChange}
                            className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm w-full py-2 px-3"
                        />
                    </div>
                ))}
                <div className="mb-4">
                    <label htmlFor="status" className="block text-gray-700 font-bold mb-2">
                        Status:
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={newOrder.status}
                        onChange={handleStatusChange}
                        className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm w-full py-2 px-3"
                    >
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <OrderPreview order={newOrder} />
            <div className="col-span-2 flex justify-center">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    {newOrder._id ? 'Update Order' : 'Add Order'}
                </button>
            </div>
        </form>
    );
};

export default OrderForm;