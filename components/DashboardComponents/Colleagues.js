import s from "../../styles/Colleagues.module.scss";
import { useState, useEffect } from "react";
import { db } from "../../firebase";

const Colleagues = (props) => {
  let [colleaguesArray, setColleaguesArray] = useState([
    {
      fullName: "",
      userName: "",
    },
  ]);

  let [usernamesArray, setUsernamesArray] = useState([]);

  let [newColleague, setNewColleague] = useState({
    fullName: "",
    userName: "",
    password: "",
    IsAMentorTo: [],
    departmentUUID: props.departmentUUID,
    collegeUUID: props.collegeUUID,
  });

  const getData = () => {
    let Inboc = [];
    let Inboe = [];

    db.collection(
      `colleges/${props.collegeUUID}/Departments/${props.departmentUUID}/Mentors`
    )
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          let userdetails = { ...doc.data() };
          Inboc.push(userdetails);
          Inboe.push(userdetails.userName);
        });
        setColleaguesArray(Inboc);
        setUsernamesArray(Inboe);
      });
  };

  const checkUserNames = (userName) => {
    if (usernamesArray.includes(userName)) {
      setError(true);
    } else setError(false);
  };
  const handleChange = (e) => {
    setNewColleague((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
    checkUserNames(e.target.value);
  };

  let [error, setError] = useState(false);

  const AddMentor = () => {
    db.collection(
      `colleges/${props.collegeUUID}/Departments/${props.departmentUUID}/Mentors`
    )
      .doc(newColleague.userName)
      .set(newColleague)
      .then(() => window.location.reload());
  };

  useEffect(() => {
    setTimeout(() => getData(), 10);
  }, []);
  return (
    <div className={s.Contain}>
      <div className={s.NewColl}>
        <div className={s.NewCollInputBOX}>
          <input
            type="text"
            name="fullName"
            placeholder="Enter Full Name"
            onChange={handleChange}
          ></input>
          <input
            type="text"
            name="userName"
            placeholder="Enter UserName"
            onChange={handleChange}
          ></input>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
          ></input>
          <button onClick={() => AddMentor()} disabled={error}>
            Add
          </button>
          {error ? "Username Exists" : ""}
        </div>
      </div>
      <div className={s.Coll}>
        {colleaguesArray.map((person) => (
          <div className={s.ColleagueCard}>
            <div className={s.details}>
              <h1>{person.fullName}</h1>
              <h3>{person.userName}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Colleagues;
