import createStore from 'unistore';

// Your initial global app state
export const store = createStore({
  user: {'email': ''}
});

// Your actions for mutating the global state
export let actions = store => ({
  async setUser(state, userEmail) {
    return {user: {'email': userEmail}};
  },
});