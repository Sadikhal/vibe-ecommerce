// // src/components/ListingCard.jsx
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../redux/cartSlice"; // path matches your imports
// import { itemVariants } from "../lib/motion";
// import { Button } from "./ui/Button";

// const ListingCard = ({ data }) => {
//   const dispatch = useDispatch();

//   const handleAddToCart = (e) => {
//     e.preventDefault();
//     dispatch(addToCart({ productId: data?._id, qty: 1 }));
//   };

//   return (
//     <motion.div variants={itemVariants}>
//       <Link
//         to={`/product/${data?._id}`}
//         className="col-span-1 cursor-pointer w-full group relative border rounded-xl flex flex-col pb-1 border-borderSlate"
//       >
//         <div className="w-full transition duration-0">
//           <div className="flex flex-col w-full">
//             <div className="relative overflow-hidden rounded-xl">
//               <img
//                 className="aspect-square object-contain w-full duration-500 transition-transform group-hover:scale-110"
//                 src={data?.image || "/no-image.png"}
//                 alt={data?.title || data?.name}
//               />
//             </div>
//             <div className="font-semibold sm:text-[15px] text-[13px] text-[#282c3f] whitespace-nowrap font-poppins overflow-hidden px-2 pt-2 capitalize">
//               {data?.title || data?.name}
//             </div>
//             <div className="sm:text-[14px] text-[12px] font-assistant capitalize text-[#535766] overflow-hidden whitespace-nowrap px-2 font-semibold">
//               {data?.category}
//             </div>
//             <div className="flex flex-row gap-2 text-left items-baseline px-2 overflow-hidden">
//               <div className="font-bold font-assistant sm:text-[14px] text-[12px] text-slate-950 whitespace-nowrap">
//                 ₹ {data?.price}
//               </div>
//             </div>
//           </div>

//           <div className="w-full h-20 bg-white absolute bottom-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//             <Button
//               onClick={handleAddToCart}
//               className="border border-borderSlate flex flex-row gap-2 mt-2 justify-center items-center w-[95%] p-1 px-4 mx-auto cursor-pointer"
//             >
//               <div className="text-[14px] font-bold text-slate-950 font-assistant uppercase">
//                 Add to Cart
//               </div>
//             </Button>
//           </div>
//         </div>
//       </Link>
//     </motion.div>
//   );
// };

// export default ListingCard;


import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { itemVariants } from "../lib/motion";
import { Button } from "./ui/Button";

const ListingCard = ({ data }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!data?._id) return;
    dispatch(addToCart({ productId: data._id, qty: 1 }));
  };

  return (
    <motion.div variants={itemVariants}>
      <Link
        to={`/product/${data?._id}`}
        className="col-span-1 cursor-pointer w-full group relative border rounded-xl flex flex-col pb-1 border-borderSlate"
      >
        <div className="w-full transition duration-0">
          <div className="flex flex-col w-full">
            <div className="relative overflow-hidden rounded-xl">
              <img
                className="aspect-square object-contain w-full duration-500 transition-transform group-hover:scale-110"
                src={data?.image || "/no-image.png"}
                alt={data?.title || "Product"}
              />
            </div>
            <div className="font-semibold sm:text-[15px] text-[13px] text-[#282c3f] whitespace-nowrap font-poppins overflow-hidden px-2 pt-2 capitalize">
              {data?.title}
            </div>
            <div className="sm:text-[14px] text-[12px] font-assistant capitalize text-[#535766] overflow-hidden whitespace-nowrap px-2 font-semibold">
              {data?.category}
            </div>
            <div className="flex flex-row gap-2 text-left items-baseline px-2 overflow-hidden">
              <div className="font-bold font-assistant sm:text-[14px] text-[12px] text-slate-950 whitespace-nowrap">
                ₹ {data?.price}
              </div>
            </div>
          </div>

          <div className="w-full h-20 bg-white absolute bottom-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              onClick={handleAddToCart}
              className="border border-borderSlate flex flex-row gap-2 mt-2 justify-center items-center w-[95%] p-1 px-4 mx-auto cursor-pointer"
            >
              <div className="text-[14px] font-bold text-slate-950 font-assistant uppercase">
                Add to Cart
              </div>
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ListingCard;
