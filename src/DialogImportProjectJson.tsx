import React, {ChangeEvent, useState} from 'react';
import {Form, Modal, ProgressBar} from "react-bootstrap";
import axios from 'axios';
import Button from "react-bootstrap/Button";

type DialogImportProjectJsonProps = {
    show: boolean;
    onHide: () => void;
    onSubmit: () => void;
}

const DialogImportProjectJson = (props: DialogImportProjectJsonProps) => {

    const [file, setFile] = useState<File | undefined>(undefined);
    //! \todo reset progressbar
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event === null || event.target === null || event.target.files === null) {
            return;
        }
        setFile(event.target.files[0])
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()

        if (file === undefined) {
            return;
        }

        if (file.type !== 'application/json') {
            //! \todo handle error, don't use exceptions
            throw new Error('Please upload a .json file')
        }

        const fileReader = new FileReader()
        fileReader.onload = async (event) => {
            const data = event?.target?.result
            // upload the file content
            const response = await axios.post(process.env.REACT_APP_SERVICE_PROVIDER + '/upload_project', data)

            if (response.data.status === false) {
                //! \todo forward error message
                //! \todo handle error, don't use exceptions
                throw new Error("Failed to upload Project");
            }
            props.onSubmit()
        }
        fileReader.onprogress = (event) => {
            if (event.lengthComputable) {
                const progress: number = ((event.loaded / event.total) * 100);
                setUploadProgress(progress);
            }
        };
        fileReader.onerror = () => {
            //! \todo handle error, don't use exceptions
            throw new Error("There was an issue reading the file." + fileReader.error);
        };
        fileReader.readAsText(file)

        props.onHide()
    };

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Import a project from a Json file</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control type="file" onChange={handleChange}/>
                    </Form.Group>
                    <ProgressBar now={uploadProgress} />
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit">Submit</Button>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default DialogImportProjectJson;
