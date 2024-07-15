'use client';

import React, { useState } from "react";
import StocksF from "../StocksF";
import Modal from "../Modal";

const page = () => {
    const [symbol, setSymbol] = useState("Bitcoin");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSymbolChange = (newSymbol: string) => {
    setSymbol(newSymbol);
  };
  return (
    <div className="p-6">
        <div className="flex justify-center items-center">

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white p-2 rounded mb-4"
        >
        Change Symbol
      </button>
          </div>
      <StocksF symbol={symbol} />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSymbolChange}
      />
    </div>
  );
};

export default page;
