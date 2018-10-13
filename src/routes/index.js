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
export const goToWelcome = () => ({ type: 'goToWelcome' });
export const goToShop = () => ({ type: 'SHOP' });
export const goToCheckout = () => ({ type: 'CHECKOUT' });
export const goToReceipt = () => {console.log('FIRING'); return ({ type: 'RECEIPT' })};

export default routes;
