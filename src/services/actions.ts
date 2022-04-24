import { Dispatch } from "redux";
import * as constants from "./constants";
import { fetchUsers } from "./api";
import { TRawData, TSortingType } from "../types";

export interface IUserRequest {
  readonly type: typeof constants.USERS_REQUEST;
}

export interface IUserSuccess {
  readonly type: typeof constants.USERS_SUCCESS;
  readonly payload: TRawData;
}

export interface IUserError {
  readonly type: typeof constants.USERS_ERROR;
  readonly payload: string;
}

export interface ISortMode {
  readonly type: typeof constants.SORT_MODE;
  readonly payload: TSortingType;
}

export interface IPreviewUser {
  readonly type: typeof constants.PREVIEW_USER;
  readonly payload: number;
}

export type TAppActions =
  | IUserRequest
  | IUserSuccess
  | IUserError
  | ISortMode
  | IPreviewUser;

export const getUsers = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: constants.USERS_REQUEST });
    fetchUsers(
      (data) => {
        dispatch({ type: constants.USERS_SUCCESS, payload: data });
      },
      (error) => {
        dispatch({ type: constants.USERS_ERROR, payload: error });
      }
    );
  };
};

export const setSort = (mode: TSortingType) => {
  return (dispatch: Dispatch) => {
    dispatch({type: constants.SORT_MODE, payload: mode});
  }
}

export const setPreview = (id: number | null) => {
  return (dispatch: Dispatch) => {
    dispatch({type: constants.PREVIEW_USER, payload: id})
  }
}
