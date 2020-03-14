export default (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        loading: false,
        users: action.payload
      };
    case "USER_ERROR":
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
