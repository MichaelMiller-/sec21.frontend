import React, {useState} from 'react';
import Col from "react-bootstrap/Col";
import {Form, Modal} from "react-bootstrap";
import {DbProject} from './DatabaseInterface';
import axios from 'axios';
import Button from "react-bootstrap/Button";

type DialogAddProjectProps = {
    show: boolean;
    onHide: () => void;
    onSubmit: () => void;
}

const DialogAddProject = (props: DialogAddProjectProps) => {

    const [data, setData] = useState<DbProject>({
        id: 0,
        name: "",
        title: "",
        createdAt: new Date(),
        modifiedAt: new Date()
    })

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const {name, value} = e.target;
        setData({...data, [name]: value,});
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        await axios.post(process.env.REACT_APP_BACKEND + '/projects', data)
        props.onSubmit()
        props.onHide()
    };

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Add new project</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group as={Col} controlId="validationProjectName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleInputChange}
                        />
                        <Form.Control.Feedback>Please provide a valid name.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="validationProjectTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="title"
                            value={data.title}
                            onChange={handleInputChange}
                        />
                        <Form.Control.Feedback>Please provide a valid name.</Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit">Submit</Button>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default DialogAddProject;
