let initialState = {
   todos: []
};

let reducer = (state = initialState, action) => {
   switch (action.type) {
      case 'add_todo':
         return {
            ...state,
            todos: state.todos.concat(1)
         }
      default:
         return state;
   }

};

export default reducer;
