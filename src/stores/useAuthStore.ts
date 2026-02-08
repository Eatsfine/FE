import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;

  actions: {
    login: (token: string) => void;
    logout: () => void;
  };
}

export const useAuthStore = create<AuthState>()(
  // persist: 내용물이 바뀌면 무조건 저장소에 기록
  persist(
    immer((set) => ({
      accessToken: null,
      isAuthenticated: false,

      actions: {
        login: (token) =>
          set((state) => {
            state.accessToken = token;
            state.isAuthenticated = true;
          }),
        logout: () =>
          set((state) => {
            state.accessToken = null;
            state.isAuthenticated = false;
          }),
      },
    })),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      // persist가 저장할 때 state만 저장하도록 설정
      partialize: (state) => ({
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export const useAuthActions = () => useAuthStore((state) => state.actions);
export const useAuthToken = () => useAuthStore((state) => state.accessToken);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
