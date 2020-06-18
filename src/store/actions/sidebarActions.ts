export type SideBarType = {type: string}

export const showSidebar = (): SideBarType => {
  return {
    type: "SHOW_SIDEBAR"
  };
};

export const hideSidebar = (): SideBarType => {
  return {
    type: "HIDE_SIDEBAR"
  };
};
