import { formatDate, formatPrice } from "../lib/utils";
import { Button } from "./ui/Button";

const ReceiptModal = ({ receipt, onClose }) => {
  // const dateStr = receipt?.timestamp
  //   ? new Date(receipt.timestamp).toLocaleString()
  //   : "";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-md w-[95%] max-w-lg p-5">
        <h3 className="text-lg font-semibold mb-2">Order Receipt</h3>

        <div className="text-sm text-gray-700 space-y-1 mb-4">
          <p><span className="font-medium">Order ID:</span> {receipt?.orderId}</p>
          <p><span className="font-medium">Name:</span> {receipt?.customer?.name}</p>
          <p><span className="font-medium">Email:</span> {receipt?.customer?.email}</p>
          <p><span className="font-medium">Placed At:</span> {formatDate(receipt.timestamp)}</p>
        </div>

        <div className="border border-slate-300 rounded-md overflow-hidden mb-4">
          <div className="bg-gray-100 px-3 py-2 font-medium text-sm">Items</div>
          <ul className="divide-y">
            {receipt?.items?.map((item, i) => (
              <li key={i} className="px-3 py-2 text-sm flex md:flex-row flex-col justify-between gap-2">
                <span>Id : {item.product}</span>
                <span>Qty : {item.qty}</span>
                <span>{formatPrice(item.price)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-base font-semibold font-robotos">Total</span>
          <span className="text-base font-bold">{formatPrice(receipt?.total)}</span>
        </div>

        <div className="flex justify-end">
          <Button className="bg-[#714815] hover:bg-[#5a380f] text-white" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
