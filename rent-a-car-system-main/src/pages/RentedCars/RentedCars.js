import React, {useState, useEffect} from "react";
import {Table, Button} from "reactstrap";
import {Col, Form} from "react-bootstrap";
import axios from "axios";


function RentedCars(props) {
    const [count, setCount] = useState(0);

    const [listData, setListData] = useState([]);

    useEffect(() => {
        fetch('/listreservations').then(res => res.json()).then(data => {
            setListData(data.reservations);

        });

    },[]);

    function sendFilter(){
        var start_date = document.getElementById("startfilter").value;
        var end_date = document.getElementById("endfilter").value;

        axios.post('/filterreservations',{ startdate:start_date, enddate:end_date }).then(response=>setListData(response.data.reservations));
    }

    function removeFilters(){
        axios.post('/clearfilters').then(response=>setListData(response.data.reservations));

    }







    return (
        <div>

            <div>
                <Form.Group>
                        <Form.Label>Start Date</Form.Label>

                    <Form.Control required
                        id="startfilter"
                    className="my-1 w-25 mx-2 d-inline"
                    type="date"
                    placeholder="Start Date"
                    name="startdatefilter"


                />
                        <Form.Label>End Date</Form.Label>

                <Form.Control required
                    id="endfilter"
                    className="my-1 w-25 mx-2 d-inline"
                    type="date"
                    placeholder="End Date"
                    name="enddatefilter"


                />

                    <Button className="mx-2" type="submit" onClick={() => sendFilter()}>
                        Filter
                    </Button>

                     <Button className="mx-2" type="submit" onClick={() => removeFilters()}>
                        Remove Filters
                    </Button>

                </Form.Group>



            </div>
            <p>Rented Cars</p>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Car Type</th>
                    <th>Daily Price</th>
                    <th>Starting Date</th>
                    <th>Ending Date</th>
                    <th>Functions</th>
                </tr>
                </thead>
                <tbody>


                {listData.map(function (item) {
                    return (
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.type}</td>
                            <td>{item.price} TL</td>
                            <td>{item.start}</td>
                            <td>{item.end}</td>
                            <td>
                                <form method="post" action={"/deletereservation/" + item.id}>
                                    <Form.Control
                                        type="text"
                                        name="id"
                                        style={{display: 'none'}}
                                    />

                                    <Button
                                        type="submit"
                                        color="danger"
                                        className="mx-2 btn-sm"
                                    >
                                        Delete
                                    </Button>
                                </form>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </div>
    );
}

export default RentedCars;
