const routes = {
  WELCOME: {
    path: '/',
  },
  SHOP: {
    path: '/shop'
  },
  CHECKOUT: {
    path: '/checkout'
  }
};

// Route Action Creators
export const goToShop = () => ({ type: 'SHOP' });
export const goToCheckout = () => ({ type: 'CHECKOUT' });

export default routes;
