import React from "react";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import {Col, Form, FormLabel, Row} from "react-bootstrap";
import 'bootstrap-select/dist/js/bootstrap-select.min.js';
import 'bootstrap-select/dist/css/bootstrap-select.min.css';
import RequestTable from "./RequestTable";
import Moment from "moment/moment";

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

class FilterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            internalID: '',
            externalID: '',
            partnerID: '',
            fio: '',
            dateTo: '',
            dateFrom: '',
            salePointID: '',
            passport: '',
            agentID: '',
            status: '',
            statusesToShow: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        console.log("Fetch statuses");
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:9084/search/getStatuses', requestOptions)
            .then(response => response.json())
            .then(response => {
                const statusOptions = [];
                if (response != null) {
                    for (let i = 0; i < response.length; i++) {
                        statusOptions.push({value: i, label: response[i]});
                    }
                }
                this.setState({statusesToShow: statusOptions})
            });
    }

    fetchRqs(params) {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        let paramMap = {};
        for (let i in params)
            paramMap[i] = params[i];
        delete paramMap['statusesToShow'];
        fetch('http://localhost:9084/search?' + new URLSearchParams(paramMap), requestOptions)
            .then(response => response.json())
            .then(response => {
                const tableRows = [];
                for (const el of response) {
                    tableRows.push(<RequestInfoRow data = {el}/>)
                }
                this.setState({
                    fetched: tableRows
                })
            });
    }

    handleInputChange(event) {
        console.log("handle");
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        this.fetchRqs(this.state);
        event.preventDefault();
    }

    handleMultiSelectChange = (e) => {
        let value = Array.from(e, option => option.value);
        console.log(value);
        this.setState({status: value});
    }

    render() {

        const statusOptions = this.state.statusesToShow;
        const targetHeight = 35;

        const styles = {
            control: (base) => ({
                ...base,
                minHeight: 'initial',
            }),
            valueContainer: (base) => ({
                ...base,
                height: `${targetHeight - 1 - 1}px`,
                padding: '0 8px',
            }),
            clearIndicator: (base) => ({
                ...base,
                padding: `${(targetHeight - 20 - 1 - 1) / 2}px`,
            }),
            dropdownIndicator: (base) => ({
                ...base,
                padding: `${(targetHeight - 20 - 1 - 1) / 2}px`,
            }),
        };

        return (
            <div>
                <Form name="filterForm" id="filterForm" method="get" onSubmit={this.handleSubmit}>
                    <Row>
                        <Col sm={2}>
                            <FormLabel>ID заявки банка</FormLabel>
                            <input type="text" name="internalID" id="internalID" onChange={this.handleInputChange} className="form-control" pattern="^[0-9]*$"/>
                        </Col>
                        <Col sm={2}>
                            <FormLabel>ID заявки партнера</FormLabel>
                            <input type="text" name="externalID" id="externalID" onChange={this.handleInputChange} className="form-control"/>
                        </Col>
                        <Col sm={4}>
                            <FormLabel>Статус заявок</FormLabel>
                            <Select styles={styles} id="status" name="status" onChange={this.handleMultiSelectChange} components={makeAnimated()} isMulti={true} closeMenuOnSelect={false} options={statusOptions}/>
                        </Col>
                        <Col sm={4}>
                            <FormLabel>Партнер</FormLabel>
                            <input type="text" name="partnerID" id="partnerID" onChange={this.handleInputChange} className="form-control"/>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={4}>
                            <FormLabel>ФИО Заявителя</FormLabel>
                            <input type="text" name="fio" id="fio" onChange={this.handleInputChange} className="form-control" pattern="^[A-ZА-Яa-zа-я \-]*$"/>
                        </Col>
                        <Col sm={4}>
                            <FormLabel style={{marginBottom: 3}}>Период оформления</FormLabel>
                            <div className="date-group">
                                c <input type="date" name="dateFrom" id="dateFrom" onChange={this.handleInputChange} min="2000-01-01" max="2099-12-31"/>
                                до <input type="date" name="dateTo" id="dateTo" onChange={this.handleInputChange} min="2000-01-01" max="2099-12-31"/>
                            </div>
                        </Col>
                        <Col sm={4}>
                            <FormLabel>Точка</FormLabel>
                            <input type="text" name="salePointID" id="salePointID" onChange={this.handleInputChange} className="form-control"/>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={2}>
                            <FormLabel>Паспорт (серия/номер)</FormLabel>
                            <input type="text" name="passport" id="passport" onChange={this.handleInputChange} className="form-control"/>
                        </Col>
                        <Col sm={6}/>
                        <Col sm={4}>
                            <FormLabel>ФИО Агента (УБЛ)</FormLabel>
                            <input type="text" name="agentID" id="agentID" onChange={this.handleInputChange} className="form-control"/>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={5} className="btn-group">
                            <button form="filterForm" type="submit" className="btn btn-find btn-success">Поиск</button>
                            <button form="filterForm" type="reset" className="btn btn-res">Сбросить</button>
                        </Col>
                    </Row>

                    <br/>

                </Form>
                <RequestTable fetched={this.state.fetched}/>
            </div>
        );
    }
}

export default FilterForm;