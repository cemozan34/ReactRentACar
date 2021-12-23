import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cars from "./pages/Cars/Cars.js";
import RentedCars from "./pages/RentedCars/RentedCars.js";
import History from "./pages/History/History.js";
import { Container } from "react-bootstrap";

function App() {
  const [theArray, setTheArray] = useState([]);
  const [count, setCount] = useState(1);

  const addNewCart = (car, count, name, startdate, enddate) => {
    setCount(count + 1);
    car["name"] = name;
    car["startdate"] = startdate;
    car["enddate"] = enddate;
    setTheArray((oldArray) => [...oldArray, car]);
  };

  var removeFromCart = (idx) => {
    setTheArray(theArray.filter((item, itemindx) => idx !== itemindx));
  };

  return (
    <div>
      <Router>
        <Navbar />
        <Container className="mt-5">
          <Switch className="mt-3">
            <Cars
              cars={theArray}
              addToCart={(car, idx, name, startdate, enddate) =>
                addNewCart(car, idx, name, startdate, enddate)
              }
              path="/"
              exact
              component={Cars}
            />

            <RentedCars
              removeFromCart={(id) => removeFromCart(id)}
              cart={theArray}
              path="/rentedcars"
              component={RentedCars}
            />

            <Route path="/history" component={History} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
