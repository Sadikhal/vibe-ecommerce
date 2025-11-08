import { RiDeleteBin6Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { formatPrice } from "../lib/utils";

const CartItem = ({ item, onRemove, onQtyChange, showQuantity = true }) => {
  const dec = () => onQtyChange(Math.max(1, (item.quantity || 1) - 1));
  const inc = () => onQtyChange((item.quantity || 1) + 1);

  return (
    <div className="border border-gray-300 rounded-md mb-3 p-4">
      <div className="flex gap-4">
        <div className="flex-[0.3]">
          <Link to={`/product/${item.productId}`}>
            <img
              src={item.image}
              alt={item.title}
              className="object-contain rounded-md h-28 w-28"
              loading="lazy"
            />
          </Link>
          {showQuantity && (
            <div className="flex items-center gap-1 mt-2 text-[#171212]">
              <button
                onClick={dec}
                className="w-6 h-6 flex items-center justify-center rounded-full border cursor-pointer border-gray-300"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-10 flex items-center justify-center h-6 border border-gray-300 rounded-md">
                {item.quantity}
              </span>
              <button
                onClick={inc}
                className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 cursor-pointer"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex justify-end">
            <button onClick={onRemove} className="text-teal-700 cursor-pointer" aria-label="Remove item">
              <RiDeleteBin6Fill />
            </button>
          </div>

          <div className="flex flex-col gap-2 mt-1">
            <Link to={`/product/${item.productId}`}>
              <h3 className="sm:font-bold font-semibold text-gray-900 truncate text-wrap text-sm md:text-base">
                {item.title}
              </h3>
            </Link>

            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-800 text-xs sm:text-sm">
                {formatPrice(item?.price)}
              </span>
            </div>

            <div className="text-xs sm:text-sm text-gray-700">
              <span className="font-bold text-teal-800">14 days</span> return available
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
