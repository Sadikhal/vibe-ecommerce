import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder, clearReceipt } from "../redux/orderSlice";
import { fetchCart } from "../redux/cartSlice";
import PriceDetails from "../components/PriceDetails";
import ReceiptModal from "../components/ReceiptModal";

const Checkout = () => {
  const dispatch = useDispatch();
  const { items, total, loading: cartLoading } = useSelector((s) => s.cart);
  const { loading: orderLoading, receipt } = useSelector((s) => s.order);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const isCartEmpty = !items || items.length === 0;

  const totalPrice = useMemo(() => Number(total || 0), [total]);
  const totalDiscount = 0; 

  const onPlaceOrder = () => {
    if (isCartEmpty) return;
    dispatch(placeOrder({ name, email }));
  };

  const closeReceipt = () => {
    dispatch(clearReceipt());
  };

  return (
    <div className="min-h-[70vh] bg-bgGreen py-6">
      <div className="max-w-6xl mx-2 p-3 bg-white rounded-md">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="rounded-md p-4 flex-1 border border-borderSlate">
            <h2 className="font-semibold mb-3">Customer Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col">
                <label className="text-sm text-gray-700">Name</label>
                <input
                  className="border border-slate-300 rounded-md px-3 py-2 outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Abin"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-700">Email</label>
                <input
                  className="border border-slate-300 rounded-md px-3 py-2 outline-none"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="abin@example.com"
                />
              </div>
            </div>

            <h2 className="font-semibold mt-6 mb-2">Items</h2>
            {isCartEmpty ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              <div>
                {items.map((it) => (
                  <div key={it.id} className="py-3 flex items-center gap-3 border-b border-borderSlate">
                    <img
                      src={it.image}
                      alt={it.title}
                      className="w-14 h-14 rounded object-contain border border-slate-300"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium truncate">{it.title}</p>
                      <p className="text-xs text-gray-600">Qty: {it.quantity}</p>
                    </div>
                    <div className="text-sm font-semibold">₹{Number(it.price).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <PriceDetails
            disabled={isCartEmpty || orderLoading || cartLoading || !name || !email}
            items={items}
            totalPrice={totalPrice}
            totalDiscount={totalDiscount}
            onPlaceOrder={onPlaceOrder}
            isCheckout={true} 
            loading={orderLoading}
          />
        </div>
      </div>

      {receipt && <ReceiptModal receipt={receipt} onClose={closeReceipt} />}
    </div>
  );
};

export default Checkout;
