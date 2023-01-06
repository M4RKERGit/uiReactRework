import React from "react";
import {Card, Col, Row} from "react-bootstrap";

class RequestPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fetched: null
        }
    }

    componentDidMount() {
        this.fetchData(2742);
    }

    fetchData(id) {

        this.setState({
            fetched: null
        })

        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };

        fetch('http://localhost:9084/requests/' + id, requestOptions)
            .then(response => response.json())
            .then(response => {this.setState({
                fetched: response
            })});
    }

    render () {
        if (this.state.fetched === null) {
            return (
                <div>Загрузка...</div>
            );
        }
        const fetched = this.state.fetched;
        const commonData = fetched["requestProfileRs"];
        const requestedTerms = fetched["requestedTerms"];
        return (
            <Col>
                <Card>
                    <Row>
                        <Col sm={3}>
                            <p className="row-header">ID заявки (Банк)</p>
                            <p className="row-value">{commonData["requestID"]}</p>
                        </Col>
                        <Col sm={2}>
                            <p className="row-header">Статус заявки</p>
                            <p className="row-value">{commonData["status"]}</p>
                        </Col>
                        <Col sm={3}>
                            <p className="row-header">Тип кредитной схемы</p>
                            <p className="row-value">{commonData["creditSchemeType"]}</p>
                        </Col>
                        <Col sm={4}>
                            <p className="row-header">Платформа</p>
                            <p className="row-value">{commonData["platform"]}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={3}>
                            <p className="row-header">ID заявки (Партнер)</p>
                            <p className="row-value">{commonData["externalRequestID"]}</p>
                        </Col>
                        <Col sm={2}>
                            <p className="row-header"></p>
                            <p className="row-value"></p>
                        </Col>
                        <Col sm={3}>
                            <p className="row-header">Онлайн заявка</p>
                            <p className="row-value">{commonData["online"]}</p>
                        </Col>
                        <Col sm={4}>
                            <p className="row-header">Партнер</p>
                            <p className="row-value">{commonData["partnerID"]}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={3}>
                            <p className="row-header">Дата открытия</p>
                            <p className="row-value">{commonData["created"]}</p>
                        </Col>
                        <Col sm={2}>
                            <p className="row-header">Дата закрытия</p>
                            <p className="row-value">{commonData["closed"]}</p>
                        </Col>
                        <Col sm={3}>
                            <p className="row-header">Типы подписания предложенные</p>
                            <p className="row-value">{commonData["permittedSignTypes"]}</p>
                        </Col>
                        <Col sm={4}>
                            <p className="row-header">Точка</p>
                            <p className="row-value">{commonData["salePointID"]}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={3}>
                            <p className="row-header">Заявитель ID / ФИО</p>
                            <p className="row-value">
                                <a href={'/clients/' + commonData["profileID"]}>
                                    {commonData["profileID"]} / {commonData["fio"]}
                                </a>
                            </p>
                        </Col>
                        <Col sm={2}>
                            <p className="row-header"></p>
                            <p className="row-value"></p>
                        </Col>
                        <Col sm={3}>
                            <p className="row-header">Тип подписания выбранный</p>
                            <p className="row-value">{commonData["selectedSignType"]}</p>
                        </Col>
                        <Col sm={4}>
                            <p className="row-header">Агент УБЛ</p>
                            <p className="row-value">{commonData["agentID"]}</p>
                        </Col>
                    </Row>
                </Card>
                <Card>
                    <Row id="collapseOne">
                        <Row>
                            <div className="col-sm-3">
                                <p className="row-header">Кредитная схема</p>
                                <p className="row-value">{requestedTerms["creditSchemeCode"]}</p>
                            </div>
                            <div className="col-sm-3">
                                <p className="row-header">Наименование продукта</p>
                                <p className="row-value">{requestedTerms["creditSchemeName"]}</p>
                            </div>
                            <div className="col-sm-2">
                                <p className="row-header"></p>
                                <p className="row-value"></p>
                            </div>
                            <div className="col-sm-2">
                                <p className="row-header"></p>
                                <p className="row-value"></p>
                            </div>
                            <div className="col-sm-2">
                                <p className="row-header"></p>
                                <p className="row-value"></p>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-sm-3">
                                <p className="row-header">Сумма кредита</p>
                                <p className="row-value">{requestedTerms["creditAmount"]} руб.</p>
                            </div>
                            <div className="col-sm-3">
                                <p className="row-header">Первоначальный взнос</p>
                                <p className="row-value">{requestedTerms["initialPayment"]} руб.</p>
                            </div>
                            <div className="col-sm-2">
                                <p className="row-header">Срок кредита</p>
                                <p className="row-value">{requestedTerms["creditPeriod"]} мес</p>
                            </div>
                            <div className="col-sm-2">
                                <p className="row-header">% ставка по кредиту</p>
                                <p className="row-value">{requestedTerms["creditSchemePercent"]}</p>
                            </div>
                            <div className="col-sm-2">
                                <p className="row-header">Наличие страхования</p>
                                <p className="row-value">{requestedTerms["insurance"]}</p>
                            </div>
                        </Row>
                    </Row>
                    <Row/>
                </Card>
            </Col>
        );
    }
}

export default RequestPage;