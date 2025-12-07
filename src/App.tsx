import React, { useState } from 'react';
import { Printer, ShoppingCart, MessageSquare, X, Plus, Minus } from 'lucide-react';

export default function PrintShop() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCustomOrder, setShowCustomOrder] = useState(false);
  const [customOrderForm, setCustomOrderForm] = useState({
    name: '',
    email: '',
    description: '',
    reference: ''
  });
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Modernūs Vazos',
      price: 15.99,
      image: '🏺',
      description: 'Geometrinio dizaino vaza namų dekorui'
    },
    {
      id: 2,
      name: 'Telefono Laikiklis',
      price: 8.99,
      image: '📱',
      description: 'Reguliuojamas telefono laikiklis stalui'
    },
    {
      id: 3,
      name: 'Raktų Pakabukas',
      price: 5.99,
      image: '🔑',
      description: 'Unikalus 3D spausdintas pakabukas'
    },
    {
      id: 4,
      name: 'Vazonėlis',
      price: 12.99,
      image: '🌱',
      description: 'Mažas vazonėlis sukkulentams'
    },
    {
      id: 5,
      name: 'Kabliukai Sienai',
      price: 6.99,
      image: '🪝',
      description: 'Stiprūs kabliukai drabužiams (3 vnt)'
    },
    {
      id: 6,
      name: 'Žvakidė',
      price: 11.99,
      image: '🕯️',
      description: 'Moderna žvakidė arbatinei žvakei'
    },
    {
      id: 7,
      name: 'Rašiklių Stovas',
      price: 9.99,
      image: '✏️',
      description: 'Organizatorius darbo stalui'
    },
    {
      id: 8,
      name: 'Auskarai',
      price: 7.99,
      image: '💎',
      description: 'Lengvi geometriniai auskarai'
    }
  ];

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, change) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleCustomOrderSubmit = () => {
    if (customOrderForm.name && customOrderForm.email && customOrderForm.description) {
      setOrderSubmitted(true);
      setTimeout(() => {
        setOrderSubmitted(false);
        setShowCustomOrder(false);
        setCustomOrderForm({ name: '', email: '', description: '', reference: '' });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 sticky top-0 z-40 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Printer className="w-8 h-8" />
            <h1 className="text-2xl font-bold">3D Print Shop</h1>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setShowCustomOrder(true)}
              className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-purple-50 transition flex items-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              Užsakyti Spaudą
            </button>
            <button
              onClick={() => setShowCart(true)}
              className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition flex items-center gap-2 relative"
            >
              <ShoppingCart className="w-5 h-5" />
              Krepšelis
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Unikalūs 3D Spausdinti Gaminiai</h2>
          <p className="text-xl">Rankomis pagaminti Vilniuje 🇱🇹</p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Mūsų Produktai</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 h-48 flex items-center justify-center text-7xl">
                {product.image}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">€{product.price}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition"
                  >
                    Į Krepšelį
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Order Info */}
      <div className="bg-blue-50 py-12 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Nematai ko reikia?</h2>
          <p className="text-lg text-gray-600 mb-6">
            Galiu atspausdinti beveik bet ką! Aprašyk ką nori, ir aš pasiūlysiu geriausią sprendimą.
          </p>
          <button
            onClick={() => setShowCustomOrder(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition"
          >
            Užpildyti Užklausos Formą
          </button>
        </div>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Krepšelis</h2>
              <button onClick={() => setShowCart(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Krepšelis tuščias</p>
              ) : (
                <>
                  {cart.map(item => (
                    <div key={item.id} className="border-b py-4 flex justify-between items-center">
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-blue-600 font-bold">€{item.price}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="bg-gray-200 rounded-full p-1 hover:bg-gray-300"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="bg-gray-200 rounded-full p-1 hover:bg-gray-300"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 ml-2"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xl font-semibold">Viso:</span>
                      <span className="text-2xl font-bold text-blue-600">€{getTotalPrice()}</span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition">
                      Pereiti prie Apmokėjimo
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Custom Order Modal */}
      {showCustomOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center rounded-t-lg">
              <h2 className="text-2xl font-bold">Užsakymo Forma</h2>
              <button onClick={() => setShowCustomOrder(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              {orderSubmitted ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">Užklausa Gauta!</h3>
                  <p className="text-gray-600">Susisiekiu su jumis per 24 valandas</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jūsų Vardas *
                    </label>
                    <input
                      type="text"
                      value={customOrderForm.name}
                      onChange={(e) => setCustomOrderForm({...customOrderForm, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Vardenis Pavardenis"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      El. paštas *
                    </label>
                    <input
                      type="email"
                      value={customOrderForm.email}
                      onChange={(e) => setCustomOrderForm({...customOrderForm, email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="jusu@email.lt"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ką norėtumėte atspausdinti? *
                    </label>
                    <textarea
                      value={customOrderForm.description}
                      onChange={(e) => setCustomOrderForm({...customOrderForm, description: e.target.value})}
                      rows="5"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Aprašykite kuo detaliau: dydį, spalvą, paskirtį, kiekį..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nuoroda į pavyzdį (nebūtina)
                    </label>
                    <input
                      type="url"
                      value={customOrderForm.reference}
                      onChange={(e) => setCustomOrderForm({...customOrderForm, reference: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://..."
                    />
                  </div>

                  <button
                    onClick={handleCustomOrderSubmit}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition"
                  >
                    Siųsti Užklausą
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    Atsakysiu per 24 valandas su kaina ir galimybėmis
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4 mt-12">
        <div className="container mx-auto text-center">
          <p className="mb-2">© 2024 3D Print Shop - Vilnius</p>
          <p className="text-gray-400 text-sm">Pagaminta su meile ir PLA 🖨️</p>
        </div>
      </footer>
    </div>
  );
}
