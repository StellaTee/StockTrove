import { create } from "zustand";

interface Notification {
  stockPriceChange: boolean;
  breakingNews: boolean;
}

interface NotificationrStore {
  notification: Notification;
  toggleStockPriceChange: () => void;
  toggleBreakingNews: () => void;
}

const useNotificationStore = create<NotificationrStore>((set) => ({
  notification: {stockPriceChange: false, breakingNews : false} as Notification,
  toggleStockPriceChange: () => {
    set((store) => ({ notification: { ...store.notification, stockPriceChange: !store.notification.stockPriceChange} }));
    
  
  },
  toggleBreakingNews : () => {
    set((store) => ({ notification: { ...store.notification, breakingNews: !store.notification.breakingNews} }));
    
  
  }
}));



export default useNotificationStore;
