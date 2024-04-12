const initialState = {
    entities: [],
    unsaved: false,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SAVE_ENTITIES_UNSUCCESSFUL':
        return {
          ...state,
          entities: action.payload,
          unsaved: true,
        };
      // Add other cases as needed
      default:
        return state;
    }
  };
  
  export default reducer;