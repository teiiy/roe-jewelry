import React, { createContext, useContext, useState, useEffect } from 'react';
import defaultProducts from '../data/products.json';
import { getLiveStorefrontInventory } from '../utils/sanityClient';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 1. Cart State
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('roe_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeLightboxImage, setActiveLightboxImage] = useState(null);

  // 2. CMS Inventory State
  const [products, setProducts] = useState(() => {
    const savedInventory = localStorage.getItem('roe_inventory');
    if (savedInventory) {
      const parsed = JSON.parse(savedInventory);
      if (parsed.length >= defaultProducts.length) {
        return parsed;
      }
    }
    // Set default inventory
    localStorage.setItem('roe_inventory', JSON.stringify(defaultProducts));
    return defaultProducts;
  });

  // 3. Orders State
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('roe_orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // 4. Admin Accounts State
  const [adminUsers, setAdminUsers] = useState(() => {
    const savedAdmins = localStorage.getItem('roe_admin_users');
    const defaultAdmins = [
      {
        email: 'admin@roe-jewelry.com',
        password: 'admin',
        name: 'Atelier Director'
      }
    ];
    if (savedAdmins) {
      return JSON.parse(savedAdmins);
    }
    localStorage.setItem('roe_admin_users', JSON.stringify(defaultAdmins));
    return defaultAdmins;
  });

  // 5. Active Admin Session State
  const [currentAdmin, setCurrentAdmin] = useState(() => {
    const activeAdmin = sessionStorage.getItem('roe_active_admin');
    return activeAdmin ? JSON.parse(activeAdmin) : null;
  });

  // 6. Wishlist / Likes State
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('roe_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Synchronize cart with localStorage
  useEffect(() => {
    localStorage.setItem('roe_cart', JSON.stringify(cart));
  }, [cart]);

  // Synchronize inventory with localStorage
  useEffect(() => {
    localStorage.setItem('roe_inventory', JSON.stringify(products));
  }, [products]);

  // Synchronize orders with localStorage
  useEffect(() => {
    localStorage.setItem('roe_orders', JSON.stringify(orders));
  }, [orders]);

  // Synchronize admin users with localStorage
  useEffect(() => {
    localStorage.setItem('roe_admin_users', JSON.stringify(adminUsers));
  }, [adminUsers]);

  // Synchronize wishlist with localStorage
  useEffect(() => {
    localStorage.setItem('roe_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Fetch live inventory from Sanity CMS on mount
  useEffect(() => {
    const fetchCmsInventory = async () => {
      try {
        const liveProducts = await getLiveStorefrontInventory();
        if (liveProducts && liveProducts.length > 0) {
          setProducts(liveProducts);
        }
      } catch (error) {
        console.error("Failed to load inventory from Sanity CMS, using fallback:", error);
      }
    };
    fetchCmsInventory();
  }, []);

  // 6. Cart Helper Functions
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // 7. CMS Inventory Actions
  const addProduct = (newProduct) => {
    setProducts((prev) => {
      const updated = [...prev, { ...newProduct, id: String(prev.length + 1) }];
      return updated;
    });
  };

  const editProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const resetProducts = () => {
    setProducts(defaultProducts);
  };

  // 8. Order Actions
  const addOrder = (orderInfo) => {
    const newOrder = {
      ...orderInfo,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      status: 'Prepared' // Default status: Prepared, In Transit, Delivered
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  // 9. Admin Authorization Actions
  const registerAdmin = (newAdmin) => {
    setAdminUsers((prev) => [...prev, newAdmin]);
  };

  const loginAdmin = (email, password) => {
    const user = adminUsers.find((u) => u.email === email && u.password === password);
    if (user) {
      setCurrentAdmin(user);
      sessionStorage.setItem('roe_active_admin', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setCurrentAdmin(null);
    sessionStorage.removeItem('roe_active_admin');
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.includes(productId);
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        selectedProduct,
        setSelectedProduct,
        activeLightboxImage,
        setActiveLightboxImage,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        // CMS State and Actions
        products,
        orders,
        adminUsers,
        currentAdmin,
        addProduct,
        editProduct,
        deleteProduct,
        resetProducts,
        addOrder,
        registerAdmin,
        loginAdmin,
        logoutAdmin,
        wishlist,
        toggleWishlist,
        isInWishlist
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
