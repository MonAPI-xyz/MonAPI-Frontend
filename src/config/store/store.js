import createStore from 'unistore';

// Your initial global app state
export const store = createStore({
  user: {'email': ''}
});

// Your actions for mutating the global state
export let actions = store => ({
  async getUser(state) {
    return {user: {'email': 'user@gmail.com'}};
  },
});

// export const store = createStore({ count: 0, stuff: [] })
 
// export const actions = store => ({
//   // Actions can just return a state update:
//   increment(state) {
//     // The returned object will be merged into the current state
//     console.log('state.count+1',state.count+1)
//     return { count: state.count+1 }
//   },

//   getUser(state) {
//     // The returned object will be merged into the current state
//     return state.count;
//   },
 
//   // The above example as an Arrow Function:
//   increment2: ({ count }) => ({ count: count+1 }),
 
//   // Actions receive current state as first parameter and any other params next
//   // See the "Increment by 10"-button below
//   incrementBy: ({ count }, incrementAmount) => {
//     return { count: count+incrementAmount }
//   },
// });