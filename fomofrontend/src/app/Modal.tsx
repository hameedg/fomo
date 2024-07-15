import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (symbol: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const symbols = ["Tether", "Bitcoin", "Ethereum", "BNB", "Solana"];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Change Symbol</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {symbols.map((symbol) => (
            <button
              key={symbol}
              onClick={() => {
                onSubmit(symbol);
                onClose();
              }}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            >
              {symbol}
            </button>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 text-white p-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
