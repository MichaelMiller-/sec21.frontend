import React, {useEffect, useState} from 'react';
import {Image, Spinner, Table} from "react-bootstrap";
import {DbProject} from './DatabaseInterface';
import axios from 'axios';
import Header from "./ui/Header";
import NewButton from "./ui/NewButton";
import OpenButton from "./ui/OpenButton";
import {useHistory} from "react-router-dom";
import formatDate from "./formatDate";
import RemoveButton from "./ui/RemoveButton";
import Button from "react-bootstrap/Button";
import LogPalette from './LogPalette';
import DialogAddProject from "./DialogAddProject";

type ProjectListItemProps = {
    item: DbProject;
    onDelete: (id: number) => void;
}

const ProjectListItem = (props: ProjectListItemProps) => {

    const history = useHistory();

    const onExportSAF = async () => {
        const response = await axios.get(process.env.REACT_APP_SERVICE_PROVIDER + '/export_to_saf', {params: {project: props.item.id}});
        const filename = response.data[0].data;
        window.open(process.env.REACT_APP_DOWNLOAD_URL + filename, "_blank");
    }
    const onExportJSON = async () => {
        const response = await axios.get(process.env.REACT_APP_SERVICE_PROVIDER + '/export_to_json', {params: {project: props.item.id}});
        const filename = response.data[0].data;
        window.open(process.env.REACT_APP_DOWNLOAD_URL + filename, "_blank");
    }

    return (
        <tr>
            <td><OpenButton onClick={() => (history.push("/project/" + props.item.id))} disabled={false}/></td>
            <td>{props.item.name}</td>
            <td>{props.item.title}</td>
            <td style={{color: "grey"}}>{formatDate(props.item.modifiedAt)}</td>
            <td style={{color: "grey"}}>{formatDate(props.item.createdAt)}</td>
            <td>
                <Button onClick={onExportSAF} variant="link">
                    <div className="transparentImage">
                        <Image src="logo_saf2.png" height={32}></Image>
                    </div>
                </Button>
            </td>
            <td>
                <Button onClick={onExportJSON} variant="link">
                    <div className="transparentImage">
                        <Image src="logo_json.png" height={32}></Image>
                    </div>
                </Button>
            </td>
            <td><RemoveButton onClick={() => (props.onDelete(props.item.id))}/></td>
        </tr>
    )
}

const ProjectList = () => {

    const [data, setData] = useState<DbProject[]>([])
    const [loading, setLoading] = useState(true)
    const [showNewDialog, setShowNewDialog] = useState(false);
    const [showLog, setShowLog] = useState(false)
    const [errors, setErrors] = useState<string[]>([])
    const [warnings, setWarnings] = useState<string[]>([])

    const pushError = (msg: string) => {
        errors.push(msg)
        setShowLog(true)
    }

    const getData = () => {
        axios.get(process.env.REACT_APP_BACKEND + '/projects')
            .then(response => setData(response.data))
            .finally(() => setLoading(false))
    }

    const onDelete = async (id: number) => {
        const response = await axios.delete(process.env.REACT_APP_BACKEND + '/project/' + id)
        if (response.data.success === false) {
            pushError(response.data.message)
        } else {
            getData()
        }
    }

    const onImportJSON = async () => {
    }

    useEffect(() => {
        getData()
    }, []);

    if (loading)
        return (<Spinner animation="border" role="status"></Spinner>);

    return (
        <>
            <Header onBack={() => {
            }} disabledBackButton={true} title="List of Projects"/>
            <NewButton onClick={() => setShowNewDialog(true)} disabled={false}/>
            <Button onClick={onImportJSON} variant="link">
                <div className="transparentImage">
                    <Image src="logo_json.png" height={32}></Image>
                </div>
            </Button>
            <Table borderless hover size="sm">
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Last modified</th>
                    <th>Created</th>
                    <th className="export">Export</th>
                </tr>
                </thead>
                <tbody>
                {data.map(e => (<ProjectListItem onDelete={onDelete} item={e}/>))}
                </tbody>
            </Table>

            <DialogAddProject
                show={showNewDialog}
                onHide={() => setShowNewDialog(false)}
                onSubmit={getData}
            />

            <LogPalette show={showLog} errorMessages={errors} warningMessages={warnings} onHide={() => {
                setShowLog(false)
                setErrors([])
                setWarnings([])
            }}/>
        </>
    );
}

export default ProjectList
