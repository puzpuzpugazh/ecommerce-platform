import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isModalOpen: false,
  modalType: null,
  modalData: null,
  notifications: [],
  sidebarOpen: false,
  searchOpen: false,
  theme: 'light',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.modalType = action.payload.type;
      state.modalData = action.payload.data || null;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalType = null;
      state.modalData = null;
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
    toggleSearch: (state) => {
      state.searchOpen = !state.searchOpen;
    },
    closeSearch: (state) => {
      state.searchOpen = false;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    resetUI: (state) => {
      state.isLoading = false;
      state.isModalOpen = false;
      state.modalType = null;
      state.modalData = null;
      state.notifications = [];
      state.sidebarOpen = false;
      state.searchOpen = false;
    },
  },
});

export const {
  setLoading,
  openModal,
  closeModal,
  addNotification,
  removeNotification,
  clearNotifications,
  toggleSidebar,
  closeSidebar,
  toggleSearch,
  closeSearch,
  setTheme,
  resetUI,
} = uiSlice.actions;

export default uiSlice.reducer; 