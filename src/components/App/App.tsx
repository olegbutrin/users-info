import { useEffect, useState } from "react";
import { getUsers, setSort, setPreview } from "../../services/actions";
import { useDispatch, useSelector } from "../../services/hooks";
import { TSortingType, TUser } from "../../types";
import Dashboard from "../Dashboard/Dashboard";
import UserDetails from "../UserDetails/UserDetails";
import Users from "../Users/Users";

import "./App.scss";

const App = () => {
  const dispatch = useDispatch();
  const { sort, preview, request, users } = useSelector((store) => store.app);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const [sortedUsers, setSortedUsers] = useState<Array<TUser>>([]);

  useEffect(() => {
    setSortedUsers(
      [...users].sort(
        sort === "city"
          ? (a, b) => {
              return a.address.city.localeCompare(b.address.city);
            }
          : (a, b) => {
              return a.company.name.localeCompare(b.company.name);
            }
      )
    );
  }, [users, sort]);

  const [previewData, setPreviewData] = useState<TUser | null>(null);

  useEffect(() => {
    if (preview !== null) {
      const selectedUser = users.find((user) => {
        return user.id === preview;
      });
      setPreviewData(selectedUser ? { ...selectedUser } : null);
    }
  }, [users, preview]);

  const setSortMode = (mode: TSortingType) => {
    dispatch(setSort(mode));
  };

  const setPreviewUser = (id: number) => {
    dispatch(setPreview(id));
  };

  const saveUserDetails = (user: TUser) => {
    dispatch(setPreview(null));
    console.log(JSON.stringify(user));
  };

  const cancelUserDetails = () => {
    dispatch(setPreview(null));
    console.log("User edit was cancelled");
  };

  return (
    <div className="App">
      <Dashboard sortIt={setSortMode} />
      <div className="Paper">
        {!preview && (
          <Users
            key={"users"}
            title={"Список пользователей"}
            request={request}
            users={sortedUsers}
            onUserSelect={setPreviewUser}
            onUserRefresh={() => {
              dispatch(getUsers());
            }}
          />
        )}
        {preview && previewData !== null && (
          <UserDetails
            key={"details"}
            title={"Профиль пользователя"}
            user={previewData}
            onSave={saveUserDetails}
            onCancel={cancelUserDetails}
          />
        )}
      </div>
    </div>
  );
};

export default App;
