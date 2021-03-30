//import "../styles/loggedUserPage.scss";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import CircleLoader from "react-spinners/CircleLoader";
import { IdCard } from "./IdCard";
import regeneratorRuntime from "regenerator-runtime";
import FileUpload from "./FileUpload";

export function LoggedUserPage(props) {
  const username = localStorage.getItem("@sou-virtus/username");
  const [loading, set_loading] = useState(false);
  const [status, set_status] = useState("");

  function check_user_status() {
    set_loading(true);
    axios
      .get(`http://localhost:3000/select_pacientes`, {
        params: {
          username: username,
        },
      })
      .then(
        (response) => {
          console.log(response);
          console.log(response.data);

          if (response.data === "pago") {
            alert("Pago");
          } else {
            alert("Não pago");

            document.getElementById("wrapper").style.display = "block";
          }

          set_status(response.data);

          setTimeout(() => {
            set_loading(false);
          }, 1000);
        },
        (error) => {
          console.log(error);

          alert("erro");

          setTimeout(() => {
            set_loading(false);
          }, 1000);

          document.getElementById("wrapper").style.display = "block";
        }
      );
  }

  function teste() {
    alert(username);
  }

  function upload_photo() {
    // var formData = new FormData();
    // var imagefile = document.querySelector("#file");
    // formData.append("image", imagefile.files[0]);

    // axios.post("http://localhost:3200/upload", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });

    var formData = new FormData();
var imagefile = document.querySelector('#file');
formData.append("image", imagefile.files[0]);
axios.post('upload_file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
})
  }  

  useEffect(() => {
    check_user_status();
  }, []);

  return (
    <>
      <div id="wrapper">
        {loading ? (
          <div className="loaderDiv">
            <h1>Aguarde</h1>
            <CircleLoader color={"#ff8404"} loading={loading} size={150} />
          </div>
        ) : (
          <></>
        )}

        {status !== "" ? (
          status === "pago" ? (
            <IdCard />
          ) : (
            <>
                 <FileUpload/>
                 
            </>
          )
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
