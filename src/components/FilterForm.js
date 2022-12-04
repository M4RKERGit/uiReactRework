import React from "react";
import {Col, Form, FormLabel, Row} from "react-bootstrap";

function SelectOption(num, text) {
    return (
        <option value={num}>{text}</option>
    );
}

class FilterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            internalID: '',
            externalID: '',
            statuses: [],
            partnerID: '',
            fio: '',
            date: '',
            salePointID: '',
            passport: '',
            agentID: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        console.log("Fetch");
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:9084/search/getStatuses', requestOptions)
            .then(response => response.json())
            .then(response => {
                const statuses = {};
                for (let i = 0; i < response.length; i++) {
                    statuses[i] = response[i];
                }
                this.setState({
                    statusesToShow: statuses
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
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
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
                        <select id="statuses" name="statuses" multiple="multiple" className={"selectpicker, form-control"}>
                            {}
                        </select>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default FilterForm;