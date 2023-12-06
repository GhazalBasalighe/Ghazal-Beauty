import { createContext, useReducer, useContext } from "react";

const CheckboxContext = createContext();

const initialState = {
  allChecked: true,
  pendingChecked: false,
  deliveredChecked: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ALL":
      return {
        allChecked: true,
        pendingChecked: false,
        deliveredChecked: false,
      };
    case "PENDING":
      return {
        allChecked: false,
        pendingChecked: true,
        deliveredChecked: false,
      };
    case "DELIVERED":
      return {
        allChecked: false,
        pendingChecked: false,
        deliveredChecked: true,
      };
    default:
      return state;
  }
};

export const CheckboxProvider = ({ children }) => {
  const contextValue = useReducer(reducer, initialState);
  return (
    <CheckboxContext.Provider value={contextValue}>
      {children}
    </CheckboxContext.Provider>
  );
};

export const useCheckboxContext = () => useContext(CheckboxContext);
