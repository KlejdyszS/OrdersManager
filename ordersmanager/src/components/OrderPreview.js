import React from 'react';

function OrderPreview({ order }) {
    return (
        <div className="flex flex-col bg-gray-100 p-4 rounded-md shadow-md">
            <h2 className="text-2xl font-medium mb-4 text-center">
                Order Preview
            </h2>
            <p><span className="font-bold">Email:</span> {order.email}</p>
            <p><span className="font-bold">Quantity:</span> {order.quantity}</p>
            <p><span className="font-bold">Model:</span> {order.model}</p>
            <p><span className="font-bold">Color:</span> {order.color}</p>
            <p><span className="font-bold">Status:</span> {order.status}</p>
        </div>
    );
}

export default OrderPreview;