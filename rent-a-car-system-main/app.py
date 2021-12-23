from flask import Flask, request, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy
import datetime
import json




app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret-key-goes-here'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy()
db.init_app(app)


class Rental(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(100))
    car_type = db.Column(db.String(100))
    car_price = db.Column(db.Integer)
    rental_start = db.Column(db.Date)
    rental_end = db.Column(db.Date)
    is_completed = db.Column(db.Boolean, default=False)


with app.app_context():
    db.create_all()


@app.route('/createreservation', methods=['POST'])
def create_reservation():
    name = request.form.get('name')
    startdate = request.form.get('startdate')
    enddate = request.form.get('enddate')
    type = request.form.get('car-type')
    price = request.form.get('car-price')

    start_date = datetime.datetime.strptime(startdate, '%Y-%m-%d')
    end_date = datetime.datetime.strptime(enddate, '%Y-%m-%d')

    new_rent = Rental(customer_name=name, rental_start=start_date, rental_end=end_date, is_completed=False, car_type=type,
                      car_price=price)

    db.session.add(new_rent)
    db.session.commit()

    return redirect('http://localhost:3000/')


@app.route('/listreservations')
def list_reservations():
    reservations = Rental.query.filter().all()

    rentals = {'reservations':[]}
    for idx,reservation in enumerate(reservations) :
        obj = {
            'id':reservation.id,
            'name':reservation.customer_name,
            'start':datetime.datetime.strftime(reservation.rental_start,'%Y-%m-%d'),
            'end': datetime.datetime.strftime(reservation.rental_end,'%Y-%m-%d'),
            'price': reservation.car_price,
            'type': reservation.car_type,
        }
        rentals['reservations'].append(obj)

    return rentals


@app.route('/clearfilters',methods=[ 'POST'])
def clear_filters():
    reservations = Rental.query.filter().all()

    rentals = {'reservations':[]}
    for idx,reservation in enumerate(reservations) :
        obj = {
            'id':reservation.id,
            'name':reservation.customer_name,
            'start':datetime.datetime.strftime(reservation.rental_start,'%Y-%m-%d'),
            'end': datetime.datetime.strftime(reservation.rental_end,'%Y-%m-%d'),
            'price': reservation.car_price,
            'type': reservation.car_type,
        }
        rentals['reservations'].append(obj)

    return rentals



@app.route('/filterreservations', methods=[ 'POST'])
def filter_reservations_post():
    rentals = {'reservations': []}

    data = json.loads(request.data.decode("UTF-8"))

    start_date = data['startdate']
    end_date = data['enddate']

    start_date = datetime.datetime.strptime(start_date, '%Y-%m-%d')
    end_date = datetime.datetime.strptime(end_date, '%Y-%m-%d')

    reservations = Rental.query.filter(Rental.rental_start >= start_date).filter(Rental.rental_start <= end_date)


    for idx,reservation in enumerate(reservations) :
        obj = {
            'id':reservation.id,
            'name':reservation.customer_name,
            'start':datetime.datetime.strftime(reservation.rental_start,'%Y-%m-%d'),
            'end': datetime.datetime.strftime(reservation.rental_end,'%Y-%m-%d'),
            'price': reservation.car_price,
            'type': reservation.car_type,
        }
        rentals['reservations'].append(obj)

    print(rentals)

    return rentals




@app.route('/gethistory')
def get_history():
    rentals = {'reservations': []}

    reservations = Rental.query.filter(Rental.rental_end < datetime.datetime.now())

    for idx, reservation in enumerate(reservations):
        obj = {
            'id': reservation.id,
            'name': reservation.customer_name,
            'start':datetime.datetime.strftime(reservation.rental_start,'%Y-%m-%d'),
            'end': datetime.datetime.strftime(reservation.rental_end,'%Y-%m-%d'),
            'price': reservation.car_price,
            'type': reservation.car_type,
        }
        rentals['reservations'].append(obj)


    return rentals


@app.route('/deletereservation/<id>', methods=['POST'])
def edit_reservation(id):
    get_reservation = Rental.query.filter(Rental.id == id).first()
    db.session.delete(get_reservation)
    db.session.commit()
    return redirect('http://localhost:3000/rentedcars')


if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000)
