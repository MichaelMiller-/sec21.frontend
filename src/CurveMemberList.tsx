import {useState} from "react";
import {Table} from "react-bootstrap";
import {DbCurveMember} from "./DatabaseInterface";
import DialogAddCurveMember from "./DialogAddCurveMember";
import {ListProps} from "./ListProps";
import {ListItemProps} from "./ListItemProps";
import NewButton from "./ui/NewButton";
import EditButton from "./ui/EditButton";
import CopyButton from "./ui/CopyButton";
import RemoveButton from "./ui/RemoveButton";

const CurveMemberListItem = (props: ListItemProps<DbCurveMember>) => {
    return (
        <tr>
            <td>{props.item.name}</td>
            <td>{props.item.beginNode.name}</td>
            <td>{props.item.endNode.name}</td>
            <td>{props.item.crossSection.name}</td>
            <td>{props.item.systemLine}</td>
            <td><EditButton onClick={() => {
            }} disabled={true}/></td>
            <td><CopyButton onClick={() => {
            }} disabled={true}/></td>
            <td><RemoveButton onClick={() => {
                props.onDelete(props.item.id)
            }} disabled={false}/></td>
        </tr>
    )
}

const CurveMemberList = (props: ListProps<DbCurveMember>) => {
    const [showNewDialog, setShowNewDialog] = useState(false);

    return (
        <>
            <NewButton onClick={() => setShowNewDialog(true)} disabled={false} title={"Curve Members"}/>
            <Table borderless hover size="sm">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Begin node</th>
                    <th>End node</th>
                    <th>Cross Section</th>
                    <th>Systemline</th>
                </tr>
                </thead>
                <tbody>
                {props.items.map(e => (<CurveMemberListItem onDelete={props.onDelete} item={e} />))}
                </tbody>
            </Table>

            <DialogAddCurveMember
                projectId={props.projectId}
                show={showNewDialog}
                onHide={() => setShowNewDialog(false)}
                onSubmit={props.onUpdate}
            />
        </>
    )
}

export default CurveMemberList;