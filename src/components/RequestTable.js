import React from "react";
import {Table} from "react-bootstrap";
import Moment from "moment";

class RequestTable extends React.Component {

    componentDidMount() {
        console.log("Fetch");
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:9084', requestOptions)
            .then(response => response.json())
            .then(response => {
                const tableRows = [];
                for (const el of response) {
                    tableRows.push(<RequestInfoRow data = {el}/>)
                }
                this.setState({
                    tableRows: tableRows
                })
            });
    }

    render() {
        let tableRows;
        if (this.state === null) {
            tableRows = "Fetching...";
        } else {
            tableRows = this.state.tableRows;
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
                {tableRows}
                </tbody>
            </Table>
        );
    }
}

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

export default RequestTable;