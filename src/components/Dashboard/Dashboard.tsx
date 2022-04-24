import { SyntheticEvent } from "react";
import { TSortingType } from "../../types";

import "./Dashboard.scss";

interface IDashboardComponent {
  sortIt: (sort: TSortingType) => void;
}

const Dashboard = ({ sortIt }: IDashboardComponent) => {
  const sortByName = (event: SyntheticEvent<HTMLButtonElement>) => {
    const sort = event.currentTarget.name as TSortingType;
    sortIt(sort);
  };

  return (
    <div className="Dashboard">
      <div>Сортировка</div>
      <button className="btn" key={"byCity"} name={"city"} onClick={sortByName}>
        по городу
      </button>
      <button
        className="btn"
        key={"byCompany"}
        name={"company"}
        onClick={sortByName}
      >
        по компании
      </button>
      <a
        className="SourceLink"
        href="https://github.com/olegbutrin/users-info"
        target={"_blank"}
        rel={"noreferrer"}
      >
        [source code]
      </a>
    </div>
  );
};

export default Dashboard;
