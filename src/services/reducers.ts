import { combineReducers, Reducer } from "redux";
import * as constants from "./constants";
import { TAppStore } from "../types";
import { TAppActions } from "./actions";

export const initialState: TAppStore = {
  sort: "city",
  preview: null,
  request: false,
  error: "",
  users: [],
};

export const appReducer: Reducer<TAppStore, TAppActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case constants.USERS_REQUEST:
      return { ...state, request: true };
    case constants.USERS_ERROR:
      return { ...state, request: false, error: action.payload };
    case constants.USERS_SUCCESS:
      return { ...state, request: false, error: "", users: action.payload };
    case constants.SORT_MODE:
      return { ...state, sort: action.payload };
    case constants.PREVIEW_USER:
      return { ...state, preview: action.payload };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({ app: appReducer });
