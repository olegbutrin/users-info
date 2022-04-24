import { TFetchUsers } from "../types";

const API_URL = "https://jsonplaceholder.typicode.com/users";


export const fetchUsers: TFetchUsers = (onSuccess, onError) => {
  fetch(API_URL)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Request failed: " + res.statusText);
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((error: Error) => {
      onError(error.message);
    });
};
