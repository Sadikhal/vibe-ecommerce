import React, { useEffect } from "react";
import ListingCard from "../components/ListingCard";
import { useSelector, useDispatch } from "react-redux";
import { Loader} from "../components/ui/Loaders";
import { fetchProducts } from "../redux/productSlice";
import Container from "../components/layout/Container";

const Home = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Container className="px-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-4 py-7">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="col-span-full text-center py-8">
          <h3 className="text-red-500 font-medium">Error loading products</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      ) : (
        products?.map((item) => <ListingCard key={item._id} data={item} />)
      )}
    </Container>
  );
};

export default Home;
