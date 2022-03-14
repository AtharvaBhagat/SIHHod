import s from "../styles/Dashboard.module.scss";
import { useState, useEffect } from "react";

import logo from "../components/res/sihDashboard.gif";

import userLogo from "../components/res/user.png";
import messageLogo from "../components/res/message.png";
import teamsLogo from "../components/res/teams.png";
import fileLogo from "../components/res/file.png";
import searchLogo from "../components/res/explore.png";
import Colleagues from "../components/DashboardComponents/Colleagues";
import ExplorePage from "../components/DashboardComponents/Explore";

const Dashboard = () => {
  let departmentUUID;
  let collegeUUID;
  if (typeof window !== "undefined") {
    departmentUUID = localStorage.getItem("departmentUUID");
    collegeUUID = localStorage.getItem("collegeUUID");
  }

  let [dashmenu, setdashmenu] = useState(4);
  return (
    <div className={s.Dashboard}>
      <div className={s.board}>
        <div className={s.dashbar}>
          <img src={logo.src} className={s.dashlogo} />
          <div className={s.navigator}>
            
            <div
              className={s.navBox}
              onClick={() => setdashmenu(1)}
              style={{
                width: dashmenu == 1 ? "9vw" : "",
                backgroundColor: dashmenu == 1 ? "rgb(132, 8, 235)" : "",
              }}
            >
              <img src={searchLogo.src} />
              <h3>Explore</h3>
            </div>
            <div
              className={s.navBox}
              onClick={() => setdashmenu(2)}
              style={{
                width: dashmenu == 2 ? "11vw" : "",
                backgroundColor: dashmenu == 2 ? "rgb(132, 8, 235)" : "",
              }}
            >
              <img src={messageLogo.src} />
              <h3>Notifications</h3>
            </div>
            

            <div
              className={s.navBox}
              onClick={() => setdashmenu(4)}
              style={{
                width: dashmenu == 4 ? "10vw" : "",
                backgroundColor: dashmenu == 4 ? "rgb(132, 8, 235)" : "",
              }}
            >
              <img src={teamsLogo.src} />
              <h3>Colleagues</h3>
            </div>
          </div>
        </div>
      </div>
      <div className={s.Component}>
        
        {dashmenu == 1 && (
          <ExplorePage
            departmentUUID={departmentUUID}
            collegeUUID={collegeUUID}
          />
        )}
        {dashmenu == 4 && (
          <Colleagues
            departmentUUID={departmentUUID}
            collegeUUID={collegeUUID}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
