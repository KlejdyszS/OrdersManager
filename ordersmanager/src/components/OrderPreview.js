import React from 'react';

function OrderPreview({ order }) {
    const modelPairs = order.model || [];
  //  console.log(order.model)
    return (
      <div className="flex flex-col bg-gray-100 p-4 rounded-md shadow-md">
        <h2 className="text-2xl font-medium mb-4 text-center">
          Order Preview
        </h2>
        <p><span className="font-bold">Email:</span> {order.email}</p>
        <p><span className="font-bold">Quantity:</span> {order.quantity}</p>
        {modelPairs.length > 0 && (
          <div>
            <span className="font-bold">Model:</span>
            <ul>
              {modelPairs.map((pair, index) => (
                <li key={index} className="block">
                  {pair.word}:{pair.number}
                </li>
              ))}
            </ul>
          </div>
        )}
        <p><span className="font-bold">Color:</span> {order.color}</p>
        <p><span className="font-bold">Status:</span> {order.status}</p>
      </div>
    );
  }
export default OrderPreview;