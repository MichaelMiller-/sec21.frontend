import {ColumnDefinitionType} from "./ColumnDefinitionType";
import FormattedTableHeader from "./FormattedTableHeader";
import FormattedTableRows from "./FormattedTableRows";

type FormattedTableProps<T, K extends keyof T> = {
    data: Array<T>;
    columns: Array<ColumnDefinitionType<T, K>>;
}

const style = {
    borderCollapse: 'collapse'
} as const

const FormattedTable = <T, K extends keyof T>({ data, columns }: FormattedTableProps<T, K>): JSX.Element => {
    return (
        <table style={style}>
            <FormattedTableHeader columns={columns} />
            <FormattedTableRows
                data={data}
                columns={columns}
            />
        </table>
    );
};

export default FormattedTable;