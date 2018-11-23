import { set } from '../../utils/objectUtils';

const RESET_SHOP_STATE = 'shop/RESET_SHOP_STATE';
const SET_SHOP_STATE = 'shop/SET_SHOP_STATE';

export const resetShopState = () => ({
  type: RESET_SHOP_STATE
});

export const setShopState = (key, value) => ({
  type: SET_SHOP_STATE,
  key,
  value
});

const initialState = {
  designs: [
    { index: 0, name: 'Late Bloomer', description: 'The first design ever released by BRAVO Snowboarding. The industry standard for all-mountain, high-end performance at a wallet friendly price. Want just one deck in your quiver? This is it.', price: 299 },
    { index: 1, name: 'Rose Gold', description: 'Our premier offering, named after a good friend of BRAVO founder Johnny P. Slicker than a smartphone and with just as many applications: A versatile all-mountain, all-season powerhouse.', price: 599 },
    { index: 2, name: 'The Showboat', description: 'A park shark for the trick jockey. Design inspired by two famous show offs: peacocks... and skaters.', price: 450 },
    { index: 3, name: 'Red Eye', description: 'A travel friendly deck for the snowhound on the go. Short length makes getting to the powder a cinch, and a wide base makes getting over it a breeze.', price: 499 },
    { index: 4, name: 'The Swanson', description: 'Heartier than a meal of steak and whiskey and hardier than your last three boards combined. This board delivers stiffness and durability for aggressive riding styles.', price: 440 },
    { index: 5, name: 'The Maharaja', description: 'A stable cruiser delivering rock-solid feel for deep powder and steep faces. Dignified, refined, dare we say even regal.', price: 599 },
    { index: 6, name: 'Chaz', description: 'A classic, just like its namesake. Combines sharp handling and an aggressive pop for a ride that suits the eternal optimist.', price: 350 },
    { index: 7, name: 'The Thicket- Nightfall Edition', description: "It's right there in the name: your first choice for the trees. Small, agile, and responsive. Built for the rider who forges their own path. (Colorway: Ebony and Treeline Green)", price: 399} ,
    { index: 8, name: 'The Thicket- Daybreak Edition', description: "It's right there in the name: your first choice for the trees. Small, agile, and responsive. Built for the rider who forges their own path. (Colorway: Bone and Treeline Green)", price: 399 }
  ],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case RESET_SHOP_STATE:
      return initialState;
    case SET_SHOP_STATE:
      return set(action.key, action.value, state);
    default:
      return state;
  }
};

export default reducer;
