import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LogOut, Plus, Trash2, Edit, Package, ShoppingBag, Users, CheckCircle, RefreshCw, X } from 'lucide-react';
import './AtelierAdmin.css';

const AtelierAdmin = () => {
  const {
    products,
    orders,
    adminUsers,
    currentAdmin,
    addProduct,
    editProduct,
    deleteProduct,
    resetProducts,
    loginAdmin,
    logoutAdmin,
    registerAdmin
  } = useApp();

  // Active Tab: 'inventory' | 'orders' | 'accounts'
  const [activeTab, setActiveTab] = useState('inventory');
  
  // Login Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register Form States
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regMsg, setRegMsg] = useState('');

  // Product Form States (Add/Edit)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [prodForm, setProdForm] = useState({
    title: '',
    price: '',
    description: '',
    category: 'necklaces',
    image: '/images/product_necklace.png',
    tagsString: '',
    sizes: ['Small', 'Medium', 'Large'],
    finishes: ['Yellow Gold', 'Rose Gold', 'White Gold']
  });

  const handleSizeChange = (size) => {
    setProdForm(prev => {
      const sizes = prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes };
    });
  };

  const handleFinishChange = (finish) => {
    setProdForm(prev => {
      const finishes = prev.finishes.includes(finish)
        ? prev.finishes.filter(f => f !== finish)
        : [...prev.finishes, finish];
      return { ...prev, finishes };
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProdForm(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    const success = loginAdmin(loginEmail, loginPassword);
    if (!success) {
      setLoginError('Invalid credentials. Access Denied.');
    }
  };

  // Handle Register Admin
  const handleRegisterAdmin = (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) return;
    
    // Check if email already exists
    const exists = adminUsers.some(u => u.email === regEmail);
    if (exists) {
      setRegMsg('Director account already exists with this email.');
      return;
    }

    registerAdmin({ name: regName, email: regEmail, password: regPassword });
    setRegName('');
    setRegEmail('');
    setRegPassword('');
    setRegMsg('Director account registered successfully.');
  };

  // Open Product Form for Create
  const handleNewProductClick = () => {
    setEditingId(null);
    setProdForm({
      title: '',
      price: '',
      description: '',
      category: 'necklaces',
      image: '/images/product_necklace.png',
      tagsString: '',
      sizes: ['Small', 'Medium', 'Large'],
      finishes: ['Yellow Gold', 'Rose Gold', 'White Gold']
    });
    setIsFormOpen(true);
  };

  // Open Product Form for Edit
  const handleEditClick = (product) => {
    setEditingId(product.id);
    setProdForm({
      title: product.title,
      price: String(product.price),
      description: product.description,
      category: product.category || getProductCategory(product),
      image: product.image,
      tagsString: product.tags ? product.tags.join(', ') : '',
      sizes: product.sizes || ['Small', 'Medium', 'Large'],
      finishes: product.finishes || ['Yellow Gold', 'Rose Gold', 'White Gold']
    });
    setIsFormOpen(true);
  };

  // Map product title/description to standard categories
  const getProductCategory = (product) => {
    const title = product.title.toLowerCase();
    if (title.includes('bangle') || title.includes('cuff') || title.includes('bracelet')) return 'bracelets';
    if (title.includes('pendant') || title.includes('necklace') || title.includes('choker')) return 'necklaces';
    if (title.includes('studs') || title.includes('earring') || title.includes('brooch')) return 'fine-jewelry';
    if (title.includes('ring') || title.includes('band')) return 'rings';
    return 'fine-jewelry';
  };

  // Submit Product Form (Create or Edit)
  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!prodForm.title || !prodForm.price || !prodForm.description) return;

    const formattedProduct = {
      title: prodForm.title,
      price: parseFloat(prodForm.price),
      description: prodForm.description,
      image: prodForm.image,
      category: prodForm.category,
      tags: prodForm.tagsString ? prodForm.tagsString.split(',').map(s => s.trim()).filter(Boolean) : [],
      sizes: prodForm.sizes,
      finishes: prodForm.finishes
    };

    if (editingId) {
      editProduct({ ...formattedProduct, id: editingId });
    } else {
      addProduct(formattedProduct);
    }
    
    setIsFormOpen(false);
  };

  // Change Order Status
  const handleOrderStatusChange = (orderId, newStatus) => {
    // Modify status in localStorage orders list
    const savedOrders = localStorage.getItem('roe_orders');
    if (savedOrders) {
      const parsed = JSON.parse(savedOrders);
      const updated = parsed.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
      localStorage.setItem('roe_orders', JSON.stringify(updated));
      
      // Forces re-render by calling reset page hook or reloading local state
      window.location.reload();
    }
  };

  const imagesList = [
    { label: 'Necklace Accent', path: '/images/product_necklace.png' },
    { label: 'Emerald Studs', path: '/images/product_studs.png' },
    { label: 'Classic Ring', path: '/images/product_ring.png' },
    { label: 'Gold Bangle', path: '/images/product_bangle.png' }
  ];

  // If not logged in, render the login card
  if (!currentAdmin) {
    return (
      <div className="admin-login-page container">
        <div className="login-card">
          <div className="login-brand">ROE ATELIER</div>
          <h2>Director Authorization</h2>
          <p className="login-sub">Enter credentials to manage boutique inventory & bookings.</p>
          
          <form onSubmit={handleLoginSubmit} className="login-form">
            <div className="login-group">
              <label>Director Email</label>
              <input 
                type="email" 
                value={loginEmail} 
                onChange={(e) => setLoginEmail(e.target.value)} 
                required 
                placeholder="admin@roe-jewelry.com"
              />
            </div>
            
            <div className="login-group">
              <label>Atelier Passkey</label>
              <input 
                type="password" 
                value={loginPassword} 
                onChange={(e) => setLoginPassword(e.target.value)} 
                required 
                placeholder="••••••••"
              />
            </div>
            
            {loginError && <p className="login-error-msg">{loginError}</p>}
            
            <button type="submit" className="login-submit-btn">Authorize Entry</button>
          </form>
          <div className="login-hints">
            <p><strong>Demo Credentials:</strong></p>
            <p>Email: <code>admin@roe-jewelry.com</code></p>
            <p>Passkey: <code>admin</code></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-page container">
      {/* Dashboard Header */}
      <header className="dashboard-header">
        <div>
          <span className="db-eyebrow">ATELIER BACK-OFFICE CMS</span>
          <h1 className="db-title">Boutique Administration</h1>
        </div>
        
        <div className="db-user-panel">
          <div className="db-user-info">
            <span className="db-user-role">Director In Session</span>
            <span className="db-user-name">{currentAdmin.name}</span>
          </div>
          <button onClick={logoutAdmin} className="db-logout-btn" title="Sign Out">
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="db-tabs">
        <button 
          onClick={() => setActiveTab('inventory')} 
          className={`db-tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
        >
          <Package size={16} />
          <span>Atelier Inventory</span>
        </button>
        <button 
          onClick={() => setActiveTab('orders')} 
          className={`db-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
        >
          <ShoppingBag size={16} />
          <span>Boutique Bookings & Orders ({orders.length})</span>
        </button>
        <button 
          onClick={() => setActiveTab('accounts')} 
          className={`db-tab-btn ${activeTab === 'accounts' ? 'active' : ''}`}
        >
          <Users size={16} />
          <span>Atelier Directors ({adminUsers.length})</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="db-tab-content">
        
        {/* TAB 1: INVENTORY */}
        {activeTab === 'inventory' && (
          <div className="db-inventory-pane">
            <div className="pane-header-actions">
              <h3>Signature Pieces ({products.length})</h3>
              <div className="pane-buttons">
                <button onClick={resetProducts} className="pane-btn-secondary">
                  <RefreshCw size={14} />
                  <span>Reset default pieces</span>
                </button>
                <button onClick={handleNewProductClick} className="pane-btn-primary">
                  <Plus size={14} />
                  <span>Add New Piece</span>
                </button>
              </div>
            </div>

            {/* Inventory table list */}
            <div className="db-table-wrapper">
              <table className="db-table">
                <thead>
                  <tr>
                    <th>IMAGE</th>
                    <th>PRODUCT ID</th>
                    <th>PIECE TITLE</th>
                    <th>PRICE (USD)</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <div className="db-table-img-frame">
                          <img src={product.image} alt={product.title} />
                        </div>
                      </td>
                      <td><code>#{product.id}</code></td>
                      <td>
                        <div className="db-table-product-title">
                          <strong>{product.title}</strong>
                          <p>{product.description.substring(0, 50)}...</p>
                        </div>
                      </td>
                      <td><strong>${product.price.toFixed(2)}</strong></td>
                      <td>
                        <div className="db-table-actions">
                          <button 
                            onClick={() => handleEditClick(product)} 
                            className="db-action-btn edit-btn" 
                            title="Edit"
                          >
                            <Edit size={14} />
                          </button>
                          <button 
                            onClick={() => deleteProduct(product.id)} 
                            className="db-action-btn delete-btn" 
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS */}
        {activeTab === 'orders' && (
          <div className="db-orders-pane">
            <h3>Boutique Bookings & Checkouts</h3>
            
            {orders.length === 0 ? (
              <div className="db-empty-pane">
                <p>No transactions or bookings recorded yet.</p>
              </div>
            ) : (
              <div className="orders-cards-list">
                {orders.map((order, idx) => (
                  <div key={idx} className="order-details-card">
                    <div className="order-card-header">
                      <div>
                        <span className="order-badge">ORDER ID</span>
                        <h4><code>{order.id}</code></h4>
                      </div>
                      <div className="order-meta-info">
                        <span>{order.date} at {order.time}</span>
                        <div className="order-status-select-container">
                          <label>Status:</label>
                          <select 
                            value={order.status || 'Prepared'}
                            onChange={(e) => handleOrderStatusChange(order.id, e.target.value)}
                            className={`order-status-select ${(order.status || 'Prepared').replace(/\s+/g, '-').toLowerCase()}`}
                          >
                            <option value="Prepared">Prepared (Packaging)</option>
                            <option value="In Transit">In Transit</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="order-card-body">
                      {/* Customer details */}
                      <div className="order-customer-section">
                        <h5>Customer Details</h5>
                        <p><strong>Name:</strong> {order.shipping.firstName} {order.shipping.lastName}</p>
                        <p><strong>Email:</strong> {order.shipping.email}</p>
                        <p><strong>Delivery Address:</strong> {order.shipping.address}, {order.shipping.city}, {order.shipping.zip}</p>
                      </div>

                      {/* Items details */}
                      <div className="order-items-section">
                        <h5>Items Purchased</h5>
                        <ul className="order-items-preview-list">
                          {order.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="order-item-detail-row">
                              <span>{item.title} (x{item.quantity})</span>
                              <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                            </li>
                          ))}
                        </ul>
                        <div className="order-total-summary">
                          <span>Total Paid:</span>
                          <strong>${order.total.toFixed(2)}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ADMIN ACCOUNTS */}
        {activeTab === 'accounts' && (
          <div className="db-accounts-pane">
            <div className="db-accounts-grid">
              
              {/* List */}
              <div className="accounts-list-panel">
                <h3>Registered Boutique Directors</h3>
                <div className="accounts-cards-stack">
                  {adminUsers.map((user, idx) => (
                    <div key={idx} className="admin-user-card">
                      <div className="admin-avatar">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="admin-meta">
                        <h4>{user.name}</h4>
                        <p>{user.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="accounts-form-panel">
                <h3>Register New Director</h3>
                <form onSubmit={handleRegisterAdmin} className="new-admin-form">
                  <div className="form-group">
                    <label>Director Name</label>
                    <input 
                      type="text" 
                      value={regName} 
                      onChange={(e) => setRegName(e.target.value)} 
                      required 
                      placeholder="e.g. Alexandra V."
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Boutique Email</label>
                    <input 
                      type="email" 
                      value={regEmail} 
                      onChange={(e) => setRegEmail(e.target.value)} 
                      required 
                      placeholder="e.g. alexandra@roe-jewelry.com"
                    />
                  </div>

                  <div className="form-group">
                    <label>Atelier Passkey</label>
                    <input 
                      type="password" 
                      value={regPassword} 
                      onChange={(e) => setRegPassword(e.target.value)} 
                      required 
                      placeholder="Password"
                    />
                  </div>

                  <button type="submit" className="pane-btn-primary reg-submit-btn">Register Account</button>
                  {regMsg && <p className="reg-info-msg">{regMsg}</p>}
                </form>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* MODAL INVENTORY FORM FOR ADD/EDIT */}
      {isFormOpen && (
        <div className="admin-modal-wrapper">
          <div className="admin-modal-backdrop" onClick={() => setIsFormOpen(false)} />
          <div className="admin-modal-panel">
            <button onClick={() => setIsFormOpen(false)} className="admin-modal-close">
              <X size={18} />
            </button>
            
            <h3>{editingId ? 'Modify Atelier Piece' : 'Register New Atelier Piece'}</h3>
            
            <form onSubmit={handleProductSubmit} className="admin-piece-form">
              <div className="form-group">
                <label>Piece Title</label>
                <input 
                  type="text" 
                  value={prodForm.title} 
                  onChange={(e) => setProdForm({ ...prodForm, title: e.target.value })} 
                  required 
                  placeholder="e.g. Aurora Diamond Studs"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price (USD)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    value={prodForm.price} 
                    onChange={(e) => setProdForm({ ...prodForm, price: e.target.value })} 
                    required 
                    placeholder="7.00"
                  />
                </div>

                <div className="form-group">
                  <label>Collection Category</label>
                  <select 
                    value={prodForm.category} 
                    onChange={(e) => setProdForm({ ...prodForm, category: e.target.value })}
                  >
                    <option value="necklaces">Necklaces</option>
                    <option value="bracelets">Bracelets</option>
                    <option value="fine-jewelry">Fine Jewelry</option>
                    <option value="rings">Rings</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Tags & Materials (comma separated)</label>
                <input 
                  type="text" 
                  value={prodForm.tagsString} 
                  onChange={(e) => setProdForm({ ...prodForm, tagsString: e.target.value })} 
                  placeholder="e.g. 18K Yellow Gold, Brilliant-cut diamonds, Emerald accents"
                />
              </div>

              <div className="form-row checkbox-metadata-row">
                <div className="form-group checkbox-group">
                  <label>Available Sizes</label>
                  <div className="checkbox-options-grid">
                    {['Small', 'Medium', 'Large', 'One Size'].map((size) => (
                      <label key={size} className="checkbox-item-label">
                        <input 
                          type="checkbox" 
                          checked={prodForm.sizes.includes(size)}
                          onChange={() => handleSizeChange(size)}
                        />
                        <span>{size}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group checkbox-group">
                  <label>Available Finishes</label>
                  <div className="checkbox-options-grid">
                    {['Yellow Gold', 'Rose Gold', 'White Gold'].map((finish) => (
                      <label key={finish} className="checkbox-item-label">
                        <input 
                          type="checkbox" 
                          checked={prodForm.finishes.includes(finish)}
                          onChange={() => handleFinishChange(finish)}
                        />
                        <span>{finish}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-group media-upload-group">
                <label>Media / Product Image Asset</label>
                <div className="media-selector-layout">
                  <div className="file-upload-box">
                    <span>Upload Custom Image</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="custom-file-input"
                    />
                  </div>
                  <div className="preset-select-box">
                    <span>Or Select Preset</span>
                    <select 
                      value={prodForm.image} 
                      onChange={(e) => setProdForm({ ...prodForm, image: e.target.value })}
                    >
                      {imagesList.map((img) => (
                        <option key={img.path} value={img.path}>{img.label}</option>
                      ))}
                    </select>
                  </div>
                  {prodForm.image && (
                    <div className="image-form-preview">
                      <img src={prodForm.image} alt="Preview" />
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>artisanal description</label>
                <textarea 
                  rows="3" 
                  value={prodForm.description} 
                  onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })} 
                  required 
                  placeholder="Describe the craftsmanship, metal plating, gemstone cuts..."
                />
              </div>

              <button type="submit" className="db-submit-piece-btn">
                {editingId ? 'Update Atelier Inventory' : 'Register Piece In Inventory'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AtelierAdmin;
