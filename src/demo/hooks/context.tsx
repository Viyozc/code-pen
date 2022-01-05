import React, { createContext, useReducer } from "react";

type Action = {
  payload: any;
  type: string;
};
const reducer = (state: any, action: Action) => {
  console.log("action", action);
  switch (action.type) {
    case "user":
      state.user = action.payload;
      break;
    case "loading":
      state.loading = action.payload;
      break;
    default:
      return state;
  }
  return state;
};

const defaultData: any = {};
export const Context = createContext(defaultData);

export default function useStore({ children }: { children: React.ReactNode }) {
  const [store, dispatch]: [any, (d: { payload: any; type: "users" }) => any] =
    useReducer(reducer, defaultData);
  return (
    <Context.Provider value={{ store, dispatch }}>{children}</Context.Provider>
  );
}
