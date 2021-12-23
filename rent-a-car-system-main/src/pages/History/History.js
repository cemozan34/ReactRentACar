import React, {useEffect, useState} from "react";
import {cars} from "../../data";
import {Container, Row, Col, Card} from "react-bootstrap";

function History() {

    const [listData, setListData] = useState([]);

    useEffect(() => {
        fetch('/gethistory').then(res => res.json()).then(data => {
            setListData(data.reservations);

        });

    },[]);
    return (
        <Container>
            <Row>
                <Col>
                    {listData.map(function (data, index) {
                        return (
                            <Card
                                bg={"dark"}
                                text={"white"}
                                style={{width: "18rem"}}
                                className="mb-2"
                            >
                                <Card.Body>
                                    <Card.Text>
                                        <div>
                                            {data.name}
                                        </div>
                                        <div>Car Type: {data.type}</div>
                                        <div>Renting Date: {data.start}</div>
                                        <div>Till: {data.end}</div>
                                        <div>Price: {data.price}</div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </Col>
            </Row>
        </Container>
    );
}

export default History;
