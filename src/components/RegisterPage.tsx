import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Select,
  InputLabel,
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@material-ui/core";

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

interface RegisterPageInterface {
  name: string;
  email: string;
  description: string;
  html_url: string;
}

export function RegisterPage(props) {
  const classes = useStyles();

  const [terms_conditions, set_terms_conditions] = useState(false);

  const [mask_tipo_telefone, set_mask_tipo_telefone] = useState(
    "(99) 9999-9999"
  );

  const [loading, set_loading] = useState(false);

  function handle_change() {
    set_terms_conditions(!terms_conditions);
  }

  function handle_zip_code() {
    //gets the value of the zip_code input, removes the masks then adds then count the length
    let zip_code = document.getElementById("zip_code").value;

    let zip_code_length = zip_code.replaceAll("_", "").replace("-", "").length;

    if (zip_code_length == 8) {
      console.log("deu");

      let logradouro = "";

      axios
        .get(`https://viacep.com.br/ws/${zip_code}/json/`)
        .then(function (response) {
          document.getElementById("neighborhood").value = response.data.bairro;
          document.getElementById("public_area").value =
            response.data.logradouro;
        });

      console.log(logradouro);
    }
  }

  function handle_capitalize_name() {
    let name = document.getElementById("name").value;

    name = name.toUpperCase();

    document.getElementById("name").value = name;
  }

  function validade_cpf(cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    var result = true;
    [9, 10].forEach(function (j) {
      var soma = 0,
        r;
      cpf
        .split(/(?=)/)
        .splice(0, j)
        .forEach(function (e, i) {
          soma += parseInt(e) * (j + 2 - (i + 1));
        });
      r = soma % 11;
      r = r < 2 ? 0 : 11 - r;
      if (r != cpf.substring(j, j + 1)) result = false;
    });
    return result;
  }

  function handle_cpf() {
    let cpf_value = document.getElementById("cpf").value.replace(/[^0-9]/g, "");

    let cpf_length = cpf_value.length;

    if (cpf_length == 11) {
      if (!validade_cpf(cpf_value)) {
        alert("CPF inválido");
      }
    }
  }

  function handle_tipo_telefone() {
    document.getElementById("phone").value = "";
    let tipo_telefone = document.getElementById("tipo_telefone").value;
    if (tipo_telefone === "fixo") {
      set_mask_tipo_telefone("(99) 9999-9999");
    } else {
      set_mask_tipo_telefone("(99) 9 9999-9999");
    }
  }

  function handle_phone() {
    let phone = document.getElementById("tipo_telefone").value;

    if (phone === "") {
      alert("Selecione o tipo de telefone");

      document.getElementById("phone").value = "";
    }
  }

  function handle_register() {
    const nome = document.getElementById("name").value + "";
    const cpf = document.getElementById("cpf").value + "";
    const data_nascimento = document.getElementById("birth_date").value + "";
    const tipo_telefone = document.getElementById("tipo_telefone").value + "";
    const telefone = document.getElementById("phone").value + "";
    const cep = document.getElementById("zip_code").value + "";
    const bairro = document.getElementById("neighborhood").value + "";
    const logradouro = document.getElementById("public_area").value + "";
    const complemento = document.getElementById("complement").value + "";
    const email = document.getElementById("email").value + "";
    const senha = document.getElementById("password").value + "";
    const password_confirmation = document.getElementById(
      "password_confirmation"
    ).value;

    if (
      nome === "" ||
      nome === null ||
      nome === undefined ||
      nome.length > 50 ||
      cpf === "" ||
      cpf == null ||
      cpf === undefined ||
      cpf.length > 50 ||
      data_nascimento === "" ||
      data_nascimento == null ||
      data_nascimento === undefined ||
      data_nascimento.length > 14 ||
      tipo_telefone === "" ||
      tipo_telefone == null ||
      tipo_telefone === undefined ||
      tipo_telefone.length > 8 ||
      telefone === "" ||
      telefone == null ||
      telefone === undefined ||
      telefone.length > 32 ||
      cep === "" ||
      cep == null ||
      cep === undefined ||
      cep.length > 18 ||
      bairro === "" ||
      bairro == null ||
      bairro === undefined ||
      bairro.length > 50 ||
      logradouro === "" ||
      logradouro == null ||
      logradouro === undefined ||
      logradouro.length > 50 ||
      complemento === "" ||
      complemento == null ||
      complemento === undefined ||
      complemento.length > 50 ||
      email === "" ||
      email == null ||
      email === undefined ||
      email.length > 50 ||
      senha === "" ||
      senha == null ||
      senha === undefined ||
      senha.length > 50
    ) {
      alert("Preencha todos os campos para prosseguir");
      return;
    }

    if (terms_conditions === false) {
      alert("Você deve aceitar os termos antes de prosseguir");
      return;
    }

    if (senha !== password_confirmation) {
      alert("A confirmação da senha não é igual à senha digitada");
      return;
    }

    set_loading(true);

    axios
      .post(`http://localhost:3000/insert_pacientes`, null, {
        params: {
          nome: nome,
          cpf: cpf,
          data_nascimento: data_nascimento,
          tipo_telefone: tipo_telefone,
          telefone: telefone,
          cep: cep,
          bairro: bairro,
          logradouro: logradouro,
          complemento: complemento,
          email: email,
          senha: senha,
        },
      })
      .then(
        (response) => {
          console.log(response);
          console.log(response.data);

          if (response.data === "paciente insert error") {
            alert("Erro no cadastro, por favor tente mais tarde");
          } else {
            alert("Cadastro realizado com sucesso");
          }

          setTimeout(() => {
            set_loading(false);
          }, 1000);
        },
        (error) => {
          console.log(error);

          setTimeout(() => {
            set_loading(false);
          }, 1000);
        }
      );
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

      <form className={classes.root} autoComplete="off">
        <img className="center" src={logo} width="30%" />
        <h1 className="h1">Registro</h1>
        <section className="wrapper">
          <label className="label">NOME : </label>
          <TextField
            className={classes.textField}
            required
            id="name"
            // label="Nome"
            variant="outlined"
            inputProps={{ maxLength: 50 }}
            onKeyUp={handle_capitalize_name}
          />

          <label className="label">CPF : </label>

          <InputMask mask="999.999.999-99">
            <TextField
              className={classes.textField}
              required
              id="cpf"
              // label="Nome"
              variant="outlined"
              inputProps={{ maxLength: 22 }}
              onKeyUp={handle_cpf}
            />
          </InputMask>

          <label className="label">DATA DE NASCIMENTO : </label>
          <InputMask mask="99/99/9999">
            <TextField
              className={classes.textField}
              required
              id="birth_date"
              //   label="Data de Nascimento"
              variant="outlined"
              inputProps={{ mask: "00/00/0000", maxLength: 20 }}
            />
          </InputMask>

          <label className="label">TIPO DE TELEFONE : </label>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Selecione</InputLabel>
            <Select
              native
              labelId="demo-simple-select-label"
              id="tipo_telefone"
              onChange={handle_tipo_telefone}
            >
              <option value="">Selecione</option>
              <option value="fixo">Fixo</option>
              <option value="celular">Celular</option>
            </Select>
          </FormControl>

          <label className="label">TELEFONE : </label>
          <InputMask mask={mask_tipo_telefone}>
            <TextField
              className={classes.textField}
              required
              id="phone"
              variant="outlined"
              onKeyUp={handle_phone}
              inputProps={{ inputMode: "numeric", maxLength: 32 }}
            />
          </InputMask>

          <label className="label">CEP :</label>
          <InputMask mask="99999-999" value={props.value}>
            <TextField
              className={classes.textField}
              required
              id="zip_code"
              //label="Cep"
              onKeyUp={handle_zip_code}
              variant="outlined"
              inputProps={{ inputMode: "numeric", maxLength: 18 }}
            />
          </InputMask>

          <label className="label">BAIRRO : </label>
          <TextField
            className={classes.textField}
            required
            id="neighborhood"
            // label="Endereço"
            helperText="Preenchimento automático"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />

          <label className="label">LOGRADOURO : </label>
          <TextField
            className={classes.textField}
            required
            id="public_area"
            // label="Endereço"
            helperText="Preenchimento automático"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />

          <label className="label">COMPLEMENTO : </label>
          <TextField
            className={classes.textField}
            required
            id="complement"
            //label="Complemento"
            variant="outlined"
            helperText="Exemplo: Casa 20"
            inputProps={{
              maxLength: 100,
            }}
          />

          <label className="label">E-MAIL : </label>
          <TextField
            className={classes.textField}
            required
            id="email"
            variant="outlined"
            type="email"
            inputProps={{ maxLength: 50 }}
          />

          <label className="label">SENHA : </label>
          <TextField
            className={classes.textField}
            required
            id="password"
            // label="Senha"
            variant="outlined"
            type="password"
            inputProps={{ maxLength: 50 }}
          />

          <label className="label">REPITA A SENHA : </label>
          <TextField
            className={classes.textField}
            required
            id="password_confirmation"
            // label="Repita a senha"
            variant="outlined"
            type="password"
            inputProps={{ maxLength: 50 }}
          />

          <FormGroup style={{ marginLeft: 20 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={terms_conditions}
                  onChange={handle_change}
                  name="terms_conditions"
                  style={{ color: "#6e0226" }}
                />
              }
              label="Concordo com os termos e condições"
              style={{ color: "#6e0226", textDecoration: "underline" }}
            />
          </FormGroup>

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
            onClick={handle_register}
          >
            Registrar
          </Button>
        </section>
      </form>
    </>
  );
}
