import { useEffect, useState } from "react";
import "./App.css";
import { Information } from "./Information";

function App() {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(Information);
  }, []);

  const handleEdit = (id) => {
    const dt = data.filter((item) => item.id === id);
    if (dt !== undefined) {
      setIsUpdate(true);
      setId(id);
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
      setAge(dt[0].age);
    }
  };
  const handleDelet = (id) => {
    if (id > 0) {
      const dt = data.filter((item) => item.id !== id);
      setData(dt);
    }
  };

  const handleSave = (e) => {
    let error = "";
    if (firstName === "") error += "First Name is required. ";
    if (lastName === "") error += "Last Name is required. ";
    if (age <= 0) error += "Age is required. ";
    if (error === "") {
      e.preventDefault();
      const dt = [...data];
      const obj = {
        id: Information.length + 1,
        firstName: firstName,
        lastName: lastName,
        age: age,
      };
      dt.push(obj);
      setData(dt);
      setIsUpdate(false);
      setId("");
      setFirstName("");
      setLastName("");
      setAge("");
    }
    else{
      alert(error)
    }
  };

  const handleUpdate = () => {
    const index = data.map((item) => item.id).indexOf(id);

    const dt = [...data];
    dt[index].firstName = firstName;
    dt[index].lastName = lastName;
    dt[index].age = age;
    setData(dt);
    handleClear();
  };

  const handleClear = () => {
    setId(0);
    setFirstName("");
    setLastName("");
    setAge("");
    setIsUpdate(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          margin: "25px",
        }}
      >
        <div>
          <label>
            FirstName :
            <input
              type="text"
              placeholder="Enter Your First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            LastName :
            <input
              type="text"
              placeholder="Enter Your last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Age :
            <input
              type="number"
              placeholder="Enter Your Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>
        </div>
        <div>
          {!isUpdate ? (
            <button className="btn btn-primary" onClick={(e) => handleSave(e)}>
              Save
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => handleUpdate()}>
              Update
            </button>
          )}
          <button className="btn btn-danger" onClick={() => handleClear()}>
            Clear
          </button>
        </div>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <td>No</td>
            <td>Id</td>
            <td>Firstname</td>
            <td>Lastname</td>
            <td>Age</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.age}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelet(item.id)}
                  >
                    Delet
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
