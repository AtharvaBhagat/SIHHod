import s from "./../../../styles/MyProjects.module.scss";
import d from "./../../../styles/Dashboard.module.scss";

import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import Link from "next/link";

import { sha256, sha224 } from "js-sha256";

const Project = (id) => {
  const [tags, setTags] = useState([]);
  const [isKeyReleased, setIsKeyReleased] = useState(false);

  const [h3, seth3] = useState("");

  let userUUID;
  if (typeof window !== "undefined") {
    userUUID = localStorage.getItem("uuid");
  }

  let [user, setUser] = useState({
    ProjectName: "",
    ProjectDesc: "",
    TeamName: "",
    Stack: [],
    Step1: "",
    Step2: "",
    Step3: "",
    Step4: "",
    theme: 0,
    status: 0,
    leaderUUID: "",
    projUUID: "",
    GithubLink: "",
    YoutubeLink: "",
    Image1Link: "",
    Image2Link: "",
    TeamMembers: [],
    Requester: [],
    MentorName: [],
  });

  let Inboc = [];

  const getData = () => {
    db.collection(`projects`)
      .doc(id.id)
      .get()
      .then((doc) => {
        let userdetails = { ...doc.data() };
        Inboc.push(userdetails);
        setUser(...Inboc);
      });
  };

  const StatusUpdater = (stat) => {
    db.collection(`projects`)
      .doc(id.id)
      .update({ status: stat })
      .then(() => window.location.reload());
  };

  useEffect(() => {
    setTimeout(() => getData(), 100);
  }, []);

  return (
    <>
      <div className={d.board}>
        <div className={d.dashbar}>
          <img src="/sihDashboard.gif" className={d.dashlogo} />
          <Link href="/dashboard">
            <h3 className={d.create}> Dashboard </h3>
          </Link>
        </div>
      </div>

      <div className={s.projSet}>
        <div className={s.proj}>
          <div className={s.details}>
            <h1>{user.ProjectName}</h1>
            <h4>{user.ProjectDesc}</h4>
            <h4>{user.TeamName}</h4>
            <div className="stackTags2">
              {user.Stack.map((tag) => (
                <p>{tag}</p>
              ))}
            </div>
            <div
              className={s.StatusShow}
              style={{
                backgroundColor:
                  user.status == 5
                    ? "aqua"
                    : user.status == 6
                    ? "gold"
                    : user.status == 7
                    ? "green"
                    : user.status == 8
                    ? "red"
                    : "",
              }}
            >
              <h3>
                {user.status == 0
                  ? "Working on Step 1"
                  : user.status == 1
                  ? "Working on Step 2"
                  : user.status == 2
                  ? "Working on Step 3"
                  : user.status == 3
                  ? "Working on Step 4"
                  : user.status == 4
                  ? "Ready to Submit"
                  : user.status == 5
                  ? "Waiting for Mentor Approval"
                  : user.status == 6
                  ? "Waiting for HOD Approval"
                  : user.status == 7
                  ? "Approved"
                  : user.status == 8
                  ? "Rejected"
                  : "In progress"}
              </h3>
            </div>
          </div>
          <div className={s.editor}>
            <span>
              <img src="https://pngimg.com/uploads/github/github_PNG83.png"></img>
              <a href={user.GithubLink} className={s.des}>
                {user.GithubLink}
              </a>
            </span>
            <span>
              <img src="https://icon-library.com/images/icon-youtube/icon-youtube-18.jpg"></img>
              <a href={user.YoutubeLink} className={s.des}>
                {user.YoutubeLink}
              </a>
            </span>
            <span>
              <img src={user.Image1Link} className={s.Bigger}></img>

              <img src={user.Image2Link} className={s.Bigger}></img>
            </span>
          </div>
        </div>
        <div className={s.road}>
          <h3>Milestones</h3>
          <div className={s.roadObject}>
            <h1
              style={{
                backgroundColor: user.status >= 1 ? "rgb(82, 224, 80)" : "",
              }}
            >
              1
            </h1>
            <h2
              style={{
                color: user.status >= 1 ? "rgb(82, 224, 80)" : "",
              }}
            >
              {user.Step1}
            </h2>
          </div>
          <div className={s.roadObject}>
            <h1
              style={{
                backgroundColor: user.status >= 2 ? "rgb(82, 224, 80)" : "",
              }}
            >
              2
            </h1>
            <h2
              style={{
                color: user.status >= 2 ? "rgb(82, 224, 80)" : "",
              }}
            >
              {user.Step2}
            </h2>
          </div>
          <div className={s.roadObject}>
            <h1
              style={{
                backgroundColor: user.status >= 3 ? "rgb(82, 224, 80)" : "",
              }}
            >
              3
            </h1>
            <h2
              style={{
                color: user.status >= 3 ? "rgb(82, 224, 80)" : "",
              }}
            >
              {user.Step3}
            </h2>
          </div>
          <div className={s.roadObject}>
            <h1
              style={{
                backgroundColor: user.status >= 4 ? "rgb(82, 224, 80)" : "",
              }}
            >
              4
            </h1>
            <h2
              style={{
                color: user.status >= 4 ? "rgb(82, 224, 80)" : "",
              }}
            >
              {user.Step4}
            </h2>
          </div>
          <h2>Team Members</h2>
          {user.TeamMembers.length == 0 ? "No Members on Board" : ""}

          {user.TeamMembers.map((req) => (
            <div className={s.reqBox}>
              <h4>{req}</h4>
            </div>
          ))}
          <h2>Mentors Assigned </h2>
          {user.MentorName.length == 0
            ? "No Mentors on Board"
            : user.MentorName}

          <br />

          {user.status == 6 && (
            <div>
              <button onClick={() => StatusUpdater(7)} className="SaveButton">
                Approve Project
              </button>
              <button onClick={() => StatusUpdater(8)} className="SaveButton">
                Reject Project
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Project;
