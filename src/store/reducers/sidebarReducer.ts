const initialState = {
  isOpenSidebar: false
};

const sidebarReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SHOW_SIDEBAR":
      return { ...state, isOpenSidebar: true };
    case "HIDE_SIDEBAR":
      return { ...state, isOpenSidebar: false };
    default:
      return state;
  }
};

export default sidebarReducer;
