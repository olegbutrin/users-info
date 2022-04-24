import { TUser } from "../../types";
import Spinner from "../Spinner/Spinner";

import "./Users.scss";

interface IUsersComponent {
  title: string;
  request: boolean;
  users: Array<TUser>;
  onUserSelect: (id: number) => void;
  onUserRefresh: () => void;
}

interface IUserCardComponent {
  id: number;
  name: string;
  city: string;
  company: string;
  onUserSelect: (id: number) => void;
}

const UserCard = ({
  id,
  name,
  city,
  company,
  onUserSelect,
}: IUserCardComponent) => {
  return (
    <div className="Card">
      <div className="info">
        <span className="label">ФИО:</span>
        {name}
      </div>
      <div className="info">
        <span className="label">город:</span>
        {city}
      </div>
      <div className="rowFlex">
        <div className="info">
          <span className="label">компания:</span>
          {company}
        </div>
        <div
          className="link"
          onClick={() => {
            onUserSelect(id);
          }}
        >
          Подробнее
        </div>
      </div>
    </div>
  );
};

const Users = ({
  title,
  request,
  users,
  onUserSelect,
  onUserRefresh,
}: IUsersComponent) => {
  return (
    <div className="Users">
      <div className="rowFlex" style={{ marginBottom: "20px" }}>
        <h3>{title}</h3>
        <button className="btn" onClick={onUserRefresh}>
          Обновить
        </button>
      </div>
      <div className="Cards">
        {request && <Spinner />}
        {!request &&
          users.length &&
          users.map((user) => {
            return (
              <UserCard
                key={user.id}
                id={user.id}
                name={user.name}
                city={user.address.city}
                company={user.company.name}
                onUserSelect={onUserSelect}
              />
            );
          })}
        {!request && (
          <div className="count">Найдено {users.length} пользователей</div>
        )}
      </div>
    </div>
  );
};

export default Users;
