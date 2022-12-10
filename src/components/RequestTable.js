import React from "react";
import {Table} from "react-bootstrap";
import Moment from "moment";

function RequestInfoRow(props) {
    const data = props.data;
    return (
        <tr key={data['id']}>
            <td>{data['id']}</td>
            <td>{data['externalID']}</td>
            <td>{Moment(data['creationDate']).format('DD-MM-YYYY HH:MM:SS')}</td>
            <td>{Moment(data['lastUpdateDate']).format('DD-MM-YYYY HH:MM:SS')}</td>
            <td>
                <p>
                    <a href={'/clients/' + data['formID']}>{data['formID'] + ' ' + data['borrowerFio']}</a>
                </p>
                <p>{data['pointID'] + ' ' + (data['salePoint']) + ', ' + data['agent']}</p>
            </td>
            <td>
                <p>{data['askedSum']}</p>
                <p>{data['givenSum']}</p>
            </td>
            <td>{data['status']}</td>
            <td><a href={"/api/v1/documents/" + data['id'] + "/downloadKOD"}><strong className="i-download"></strong></a></td>
        </tr>
    );
}

class RequestTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tableRows: props.fetched};
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.fetched != null) {
            if (this.state == null) {
                this.state = {tableRows: nextProps.fetched};
            }
            if (nextProps.fetched !== this.state.tableRows) {
                this.setState({tableRows: nextProps.fetched})
            }
        }
    }

    render() {
        if (this.state === null || this.state.tableRows === null || this.state.tableRows === 'loading') {
            return <div>Загрузка...</div>;
        }
        return (
            <Table className="table-bordered" id="req_tbl">
                <thead>
                <tr>
                    <th>ID Заявки (Банк)</th>
                    <th>ID Заявки (Партнер)</th>
                    <th>Дата создания</th>
                    <th>Дата изменения</th>
                    <th>Заявитель/Точка/Агент</th>
                    <th>Сумма</th>
                    <th>Статус</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {this.state.tableRows.map(r => <RequestInfoRow key={r.id} data = {r}/>)}
                </tbody>
            </Table>
        );
    }
}

export default RequestTable;