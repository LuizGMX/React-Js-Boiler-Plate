import "../styles/id_card.scss";

import logo from "../styles/assets/images/logo.png";

export function IdCard() {
  return (
    <>
      <div className="details">
        <img
          className="avatar_image shadow"
          width="105px"
          height="143px"
          src="https://i.pinimg.com/564x/ce/0e/2a/ce0e2a70a69678e93d43899ed6703959.jpg"
        ></img>

        <div className="personal_info">
          <p>Emilia Clarke</p>

          <p className="margin-top-20px">741.521.810-87</p>

          <p className="margin-top-20px">26/10/1986</p>
        </div>
      </div>

      <div className="id shadow">
        <img className="logo" src={logo}></img>
        <h1>Carteirinha Virtus</h1>

        <h2 className="situacao" style={{ marginTop: 50 }}>
          Situação: ativo
        </h2>

        <h3 className="margin-top-20px">
          Verifique a autenticicidade em: autenticicidade.souvirtus.com.br,
        </h3>
        <h3> ou leia o QR code abaixo:</h3>

        <h4 className="margin-top-20px">
          678feb86-b604-4635-ade6-ae3917327e04
        </h4>

        <img
          className="qrcode"
          src="https://raw.githubusercontent.com/zpao/qrcode.react/HEAD/qrcode.png"
          alt=""
        ></img>
      </div>
    </>
  );
}
