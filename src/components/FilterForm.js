import React from "react";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import {Card, Col, Form, FormLabel, Row} from "react-bootstrap";
import 'bootstrap-select/dist/js/bootstrap-select.min.js';
import 'bootstrap-select/dist/css/bootstrap-select.min.css';
import RequestTable from "./RequestTable";

class FilterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchParams: {
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
            },
            statusesToShow: [],
            fetched: null
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.fetchRqs();
        this.fetchStatuses();
    }

    fetchStatuses() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:9084/search/getStatuses', requestOptions)
            .then(response => response.json())
            .then(response => {
                const statusOptions = [];
                if (response != null) {
                    for (let [key, value] of Object.entries(response)) {
                        statusOptions.push({value: key, label: value});
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
            .then(response => {this.setState({fetched: response})});
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let params = this.state.searchParams;
        params[name] = value;

        this.setState({
            searchParams: params
        });
    }

    handleSubmit(event) {
        this.fetchRqs(this.state.searchParams);
        event.preventDefault();
    }

    handleMultiSelectChange = (e) => {
        let value = Array.from(e, option => option.value);
        let params = this.state.searchParams;
        params['status'] = value;

        this.setState({
            searchParams: params
        });
    }

    render() {
        return (
            <div>
                <Card>
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
                                <Select styles={getStylesForSelect()} id="status" name="status" onChange={this.handleMultiSelectChange}
                                        components={makeAnimated()} isMulti={true} closeMenuOnSelect={false} options={this.state.statusesToShow}/>
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
                </Card>

                <Card>
                    <RequestTable fetched={this.state.fetched}/>
                </Card>

            </div>
        );
    }
}

function getStylesForSelect() {
    const targetHeight = 35;
    return {
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
        })
    };
}

export default FilterForm;