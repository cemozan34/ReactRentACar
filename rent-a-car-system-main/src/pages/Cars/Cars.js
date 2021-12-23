import React, {useState} from "react";
import {Table, Button} from "reactstrap";
import CarData from "../../api/data.json";
import {Form, Row, Col} from "react-bootstrap";

function Cars(props) {
    const [count, setCount] = useState(0);

    function submitForm(car, index) {
        var username = document.getElementById(index.toString() + "name").value;
        var startdate = document.getElementById(index.toString() + "startdate")
            .value;
        var enddate = document.getElementById(index.toString() + "enddate").value;
        setCount(count + 1);
        props.addToCart(car, count, username, startdate, enddate);
    }

    return (
        <div>
            <h3>Cars</h3>
            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Type</th>
                    <th>Daily Price</th>
                    <th>Info</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {CarData.cars.map((car, index) => (
                    <tr key={car.id}>
                        <th scope="row">{car.id}</th>
                        <td>{car.type}</td>
                        <td>{car.price} TL</td>

                        <td>
                            <form method="POST" action="/createreservation">
                                <Row>
                                    <Col>
                                        <Form.Control
                                            name="car-type"
                                            value={car.type}
                                            style={{display: 'none'}}
                                        />

                                        <Form.Control
                                            name="car-price"
                                            value={car.price}
                                            style={{display: 'none'}}

                                        />

                                        <Form.Control required
                                            id={index + "name"}
                                            style={
                                                ({marginLeft: "-1px"},
                                                    {backgroundColor: "grey"},
                                                    {color: "black"})
                                            }
                                            white
                                            className="d-inline"
                                            type="text"
                                            name="name"
                                            placeholder="Name"
                                        />

                                        <Form.Control required
                                            id={index + "startdate"}
                                            className="my-1"
                                            type="text"
                                            onFocus={() =>
                                                (document.getElementById(
                                                    index.toString() + "startdate"
                                                ).type = "date")
                                            }
                                            placeholder="Start Date"
                                            name="startdate"
                                        />
                                        <Form.Control required
                                            id={index + "enddate"}
                                            className="my-1"
                                            type="text"
                                            onFocus={() =>
                                                (document.getElementById(
                                                    index.toString() + "enddate"
                                                ).type = "date")
                                            }
                                            placeholder="End Date"
                                            name="enddate"
                                        />
                                    </Col>
                                    <Col>
                                        <Button
                                            className="d-inline"
                                            type="submit"
                                            color="primary"
                                        >
                                            Add
                                        </Button>
                                    </Col>

                                </Row>
                            </form>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Cars;
