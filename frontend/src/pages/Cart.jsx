import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart, removeFromCart, updateCartItem } from "../redux/cartSlice";
import CartItem from "../components/CartItem";
import PriceDetails from "../components/PriceDetails";

const Cart = () => {
  const dispatch = useDispatch();
  const { items: orderProducts, total, loading, error } = useSelector((s) => s.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div className="bg-bgGreen pt-6 pb-3 font-poppins">
      <div className="max-w-[2200px]
        mx-auto
        md:px-12
        sm:px-2
        px-4
        h-full">
        <div className="flex flex-col lg:flex-row gap-3 mt-2">
          <div className="bg-lamaWhite rounded-sm w-full p-2 shadow-lg lg:flex-1">
            {orderProducts.length > 0 ? (
              orderProducts.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={() => dispatch(removeFromCart(item.id))}
                  onQtyChange={(qty) => dispatch(updateCartItem({ id: item.id, qty }))}
                />
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-lg text-slate-700">Your cart is empty</p>
                <Link
                  to="/"
                  className="text-teal-700 hover:bg-slate-100 underline mt-2 inline-block p-2 px-4 hover:rounded-md"
                >
                  Continue shopping
                </Link>
              </div>
            )}
          </div>

          {orderProducts.length > 0 && (
            <PriceDetails
              loading={loading}
              error={error}
              items={orderProducts}
              totalPrice={Number(total || 0)}
              totalDiscount={0}
              isCheckout={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
