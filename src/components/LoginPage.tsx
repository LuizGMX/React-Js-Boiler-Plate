import { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { LoggedUserPage } from "./LoggedUserPage";
import InputMask from "react-input-mask";
import logo from "../styles/assets/images/logo.png";
import { makeStyles } from "@material-ui/core/styles";
import "../styles/global.scss";
import CircleLoader from "react-spinners/CircleLoader";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "35ch",
      marginLeft: "4ch",
    },

    label: {
      underline: "always",
    },
  },
  textField: {
    [`& fieldset`]: {
      borderRadius: 50,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    width: "33ch",
    marginLeft: "5ch",
  },
}));

export function LoginPage(props) {
  const classes = useStyles();

  const [loading, set_loading] = useState(false);

  const username = localStorage.getItem("@sou-virtus/username");

  console.log(username);

  function handle_login() {
    let cpf = document.getElementById("cpf").value + "";

    console.log(cpf);
    let senha = document.getElementById("password").value + "";
    if (
      cpf === "" ||
      cpf === null ||
      cpf === undefined ||
      cpf.length > 50 ||
      senha === "" ||
      senha === null ||
      senha === undefined ||
      senha.length > 50
    ) {
      alert("Preencha todos os campos");
    } else {
      document.getElementById("wrapper").style.display = "none";
      document.getElementById("title").style.display = "none";

      set_loading(true);

      axios
        .get(`http://localhost:3000/login`, {
          params: {
            cpf: cpf,
            senha: senha,
          },
        })
        .then(
          (response) => {
            console.log(response);
            console.log(response.data);

            if (response.data === "login success") {
              localStorage.setItem("@sou-virtus/username", cpf);
              alert("Login realizado com sucesso");
            } else {
              alert("CPF ou senha estão incorretos");

              document.getElementById("wrapper").style.display = "block";
              document.getElementById("title").style.display = "bloack";
            }

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
            document.getElementById("title").style.display = "bloack";
          }
        );
    }
  }

  return (
    <>
      {loading ? (
        <div className="loaderDiv">
          <h1 className="h1Aguarde">Aguarde</h1>
          <CircleLoader color={"#ff8404"} loading={loading} size={150} />
        </div>
      ) : (
        <></>
      )}

      {username ? (
        <LoggedUserPage />
      ) : (
        <form className={classes.root} autoComplete="off">
          <img className="center" src={logo} width="30%" />
          <h1 id="title" className="h1">
            Entrar
          </h1>
          <section id="wrapper" className="wrapper">
            <label className="label">CPF : </label>

            <InputMask mask="999.999.999-99">
              <TextField
                className={classes.textField}
                required
                id="cpf"
                variant="outlined"
                inputProps={{ maxLength: 22 }}
              />
            </InputMask>

            <label className="label">SENHA : </label>
            <TextField
              className={classes.textField}
              required
              id="password"
              variant="outlined"
              type="password"
              inputProps={{ maxLength: 50 }}
            />

            <p>Esqueceu sua senha?</p>
            <p>Ainda não tem conta?</p>

            <Button
              variant="contained"
              style={{
                borderRadius: "50px",
                width: "50%",
                backgroundColor: "#ff8404",
                marginTop: "20px",
                marginBottom: "20px",
                marginLeft: "90px",
                color: "#fff",
              }}
              onClick={handle_login}
            >
              Entrar
            </Button>
          </section>
        </form>
      )}
    </>
  );
}
