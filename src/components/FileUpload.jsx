import { useRef, useState } from 'react';
import axios from 'axios';

import {
    Button
} from "@material-ui/core";

function FileUpload() {
    const [file, setFile] = useState(''); // storing the uploaded file    // storing the recived file from backend
    const [data, getFile] = useState({ name: "", path: "" });
    const [progress, setProgess] = useState(0); // progess bar
    const el = useRef(); // accesing input element
    const username = localStorage.getItem("@sou-virtus/username");

    const handleChange = (e) => {
        setProgess(0)
        const file = e.target.files[0]; // accesing file
        console.log(file);

        if (file) {

            console.log(file.size)
            if (file.size > 11534336) {
                alert('O arquivo pode possuir no máximo 10 Mb')
                return
            }
        }

        setFile(file); // storing file

        setTimeout(() => {
            uploadFile()
        }, 1000);
    }

    const uploadFile = () => {
        const formData = new FormData(); formData.append('file', file); // appending file
        axios.post(`http://localhost:4500/upload?username=${username}`, formData, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                    ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                console.log(progress);
                setProgess(progress);
            }
        }).then(res => {

            if (res !== 'invalid extension') {
                alert('Upload feito com sucesso')

                axios.put(`http://localhost:3000/update_pacientes?username=${username}&column=status_foto`).then(() => {
                    setProgess('upload_success')
                    console.log(res);
                    getFile({
                        name: res.data.name,
                        path: 'http://localhost:4500/upload' + res.data.path
                    })
                })

            } else if (res === 'null file name') {
                alert('Erro ao enviar a foto')
            } else {
                alert('Selecione apenas fotos com extensão png, jpg ou jpeg')
            }

        }).catch(function (err) {
            console.log(err)
            setProgess('erro')
        })
    }

    function handle_upload_button() {
        document.getElementById('upload').click()
    }

    return (
        <div>
            <div className="file-upload">
                {/* <div className="progessBar" style={{ width: progress, display: 'none' }}> */}
                <input accept=".png, .jpg, .jpeg" id="upload" style={{ display: 'none' }} type="file" ref={el} onChange={handleChange} />

                {progress !== 'erro' && progress !== 'upload_success' && progress !== 0 && progress !== '100%' ? <h4>{progress}</h4> : progress === 'upload_sucess' ? <h3>Foto enviada com sucesso</h3> : <></>}

                {progress === 'erro' ? <h4 style={{ color: 'red' }}>Erro no envio da foto, por favor tente novamente</h4> : <></>}
                {/* </div> */}
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
                    onClick={handle_upload_button}
                >
                    Selecionar foto
          </Button>
                <button style={{ display: 'none' }} onClick={uploadFile} className="upbutton">
                </button>
                {/* <hr /> */}
                {/* displaying received image*/}
                {/* {data.path && <img src={data.path} alt={data.name} />} */}
            </div>
        </div>
    );
}
export default FileUpload;