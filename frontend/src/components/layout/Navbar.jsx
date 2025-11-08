import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/productSlice";
import Container from "./Container";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [localSearch, setLocalSearch] = useState("");

  const cartCount = useSelector((state) => state.cart?.items?.length || 0);

  // Debounced Search when search have more than 3 letters
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const trimmed = localSearch.trim();
      if (trimmed.length >= 3) {
        dispatch(fetchProducts({ search: trimmed }));
        navigate("/"); 
      }
      if (trimmed.length === 0) {
        dispatch(fetchProducts());
        navigate("/");
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [localSearch, dispatch, navigate]);

  //  Manual form submit 
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = localSearch.trim();

    if (trimmed.length >= 3) {
      dispatch(fetchProducts({ search: trimmed }));
    } else {
      dispatch(fetchProducts());
    }
    navigate("/");
  };

  return (
    <div className="w-full py-4 items-center h-[100px] border-b border-borderSlate shadow-sm shadow-gray-200">
      <Container className="flex flex-row items-center w-full justify-between">
        {/* Logo */}
          <Link to="/" className="w-[70px] h-5 sm:w-[125px] sm:h-[38px] md:w-[150px] md:h-[50px] sm:flex hidden items-center justify-center">
            <img src="/logo cart.png" className="w-24 h-24 sm:w-24 sm:h-24 rounded-sm object-contain" alt="logo" />
          </Link>
        {/*Search Section */}
        <div className="flex flex-row gap-5 items-center py-4 xs:min-w-[260px] w-[70%] min-w-60 sm:min-w-80 md:w-[40%]">
          <form
            onSubmit={handleSearchSubmit}
            className="flex w-full max-w-xl border border-borderSlate h-8 rounded-sm bg-[#feffff] sm:h-[38px]"
          >
            <button type="submit" className="px-3">
              <IoSearchOutline className="h-full w-full py-1 text-gray-300" />
            </button>
            <input
              type="text"
              placeholder="Search products..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="bg-inherit text-black h-full p-2 w-full rounded-sm outline-none capitalize"
            />
          </form>
        </div>
         {/* cart count */}
        <div className="flex items-center font-bold mr-4">
          <Link to="/cart" className="relative">
            <MdOutlineShoppingCart className="h-7 w-7 text-slate-800" />
            <div className="absolute -right-1 -top-1 bg-[#095b4e] text-[10px] h-4 w-4 text-white rounded-full flex justify-center items-center">
              {cartCount}
            </div>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
