import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  Star, 
  Filter, 
  Search, 
  Loader, 
  ShoppingCart, 
  Heart, 
  Grid3X3,
  List,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { getProducts } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Products = () => {
  const dispatch = useDispatch();
  const { products, isLoading, isError, message, totalPages, currentPage } = useSelector((state) => state.product);
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    brand: searchParams.get('brand') || '',
    sortBy: searchParams.get('sortBy') || 'newest'
  });

  const categories = ['Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Sports', 'Books'];
  const brands = ['Apple', 'Samsung', 'Nike', 'Adidas', 'Sony', 'Levi\'s', 'L\'Oreal', 'LEGO'];
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popular', label: 'Most Popular' }
  ];

  useEffect(() => {
    const params = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params[key] = value;
    });
    setSearchParams(params);
    
    dispatch(getProducts({ ...filters, page: 1 }));
  }, [filters, dispatch, setSearchParams]);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success(`${product.name} added to cart!`);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      brand: '',
      sortBy: 'newest'
    });
  };

  const handlePageChange = (page) => {
    dispatch(getProducts({ ...filters, page }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Products</h1>
              <p className="text-gray-600 mt-1">
                {products?.length || 0} products found
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className=" left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
                />
              </div>
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-3">
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span className="text-sm font-medium">Filters</span>
                {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-200 rounded-full overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-pink-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-pink-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={false}
            animate={{ width: 'auto', marginBottom: '10px', marginTop: '10px' }}
            className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-80 flex-shrink-0`}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 w-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-pink-600 hover:text-pink-700 font-medium"
                >
                  Clear All
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={filters.category === category}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                        className="text-pink-500 focus:ring-pink-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Brands</h4>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="radio"
                        name="brand"
                        value={brand}
                        checked={filters.brand === brand}
                        onChange={(e) => handleFilterChange('brand', e.target.value)}
                        className="text-pink-500 focus:ring-pink-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Sort By</h4>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Loading/Error States */}
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="text-center">
                  <Loader className="animate-spin h-12 w-12 text-pink-600 mx-auto mb-4" />
                  <p className="text-gray-600">Loading products...</p>
                </div>
              </div>
            ) : isError ? (
              <div className="text-center py-20">
                <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
                  <p className="text-red-600 text-lg">{message || 'Failed to load products.'}</p>
                </div>
              </div>
            ) : !products || products.length === 0 ? (
              <div className="text-center py-20">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 max-w-md mx-auto">
                  <p className="text-gray-600 text-lg">No products found.</p>
                </div>
              </div>
            ) : (
              <>
                {/* Products Grid */}
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1'
                }`}>
                  {products.map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 ${
                        viewMode === 'list' ? 'flex' : ''
                      }`}
                    >
                      {/* Product Image */}
                      <div className={`relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden ${
                        viewMode === 'list' ? 'w-48 h-48' : 'h-48'
                      }`}>
                        <Link to={`/product/${product._id}`} className="block h-full">
                          {product.images && product.images[0] ? (
                            <img 
                              src={product.images[0]} 
                              alt={product.name} 
                              height={300}
                              // width={300}
                              className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-300" 
                            />
                          ) : (
                            <div className="h-full flex items-center justify-center">
                              <span className="text-gray-400 text-sm">No Image</span>
                            </div>
                          )}
                        </Link>
                        
                        {/* Quick Actions */}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button 
                            onClick={() => handleAddToCart(product)}
                            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors mb-2"
                          >
                            <ShoppingCart className="h-4 w-4 text-gray-600" />
                          </button>
                          <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                            <Heart className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                        {/* Category & Brand */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-medium text-pink-600 bg-pink-50 px-2 py-1 rounded-full">
                            {product.category}
                          </span>
                          {product.brand && (
                            <span className="text-xs text-gray-500">• {product.brand}</span>
                          )}
                        </div>

                        {/* Product Name */}
                        <Link to={`/product/${product._id}`} className="block">
                          <h3 className={`font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-pink-600 transition-colors ${
                            viewMode === 'list' ? 'text-lg' : ''
                          }`}>
                            {product.name}
                          </h3>
                        </Link>

                        {/* Rating */}
                        <div className="flex items-center mb-3">
                          <div className="flex text-yellow-400 mr-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`h-4 w-4 fill-current ${
                                  star <= Math.round(product.averageRating || 0) 
                                    ? 'text-yellow-400' 
                                    : 'text-gray-200'
                                }`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            ({product.numReviews || 0})
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <span className={`font-bold text-gray-900 ${
                              viewMode === 'list' ? 'text-xl' : 'text-lg'
                            }`}>
                              ${product.price.toFixed(2)}
                            </span>
                            {product.compareAtPrice && product.compareAtPrice > product.price && (
                              <span className="text-sm text-gray-500 line-through">
                                ${product.compareAtPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">
                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                          </span>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={!product.stock || product.stock === 0}
                          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-pink-600 hover:to-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          {!product.stock || product.stock === 0 ? (
                            <span>Out of Stock</span>
                          ) : (
                            <>
                              <ShoppingCart className="h-4 w-4" />
                              <span>Add to Cart</span>
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12">
                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            currentPage === page
                              ? 'bg-pink-500 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products; 