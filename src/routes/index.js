const routes = {
  WELCOME: {
    path: '/',
  },
  SHOP: {
    path: '/shop'
  },
  CHECKOUT: {
    path: '/checkout'
  },
  RECEIPT: {
    path: '/receipt'
  }
};

// Route Action Creators
export const goToWelcome = () => ({ type: 'WELCOME' });
export const goToShop = () => ({ type: 'SHOP' });
export const goToCheckout = () => ({ type: 'CHECKOUT' });
export const goToReceipt = () => ({ type: 'RECEIPT' });
export const resetStates = () => ({ type: 'RESET_STATES' });

export default routes;
