import React from "react";
import { db } from "../Firebase.js";
import "../components/reserves/mybookings.css";
import Delete from '../images/delete.png'

const MyBookings = () => {
  const {displayName} = JSON.parse(localStorage.getItem("user") || "{}")
  const [bookings, setBookings] = React.useState([]);
  
  const filterByName = bookings.filter((booking) => booking.userName === displayName)


  React.useEffect(() => {
    const bringData = async () => {
      try {
        const data = await db.collection("bookings").orderBy("date").get();
        const arrayData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(arrayData);
      } catch (error) {
        console.log(error);
      }
    };
    bringData();
  }, []);

  const deleteBooking  = async (id) => {
    try {
      await db.collection('bookings').doc(id).delete()
      const filteredArray = bookings.filter (item => item.id !== id)
      setBookings(filteredArray)
    } catch (error){
      console.log(error);
    }
  }

  return (
    <React.Fragment>
      <div className="cuerpo">
        <div className="reservas">
          <h1 className="misReservas">Tus reservas:</h1>
          <table className="tabla" border="1px">
            <tr>
              <th>Fecha</th>
              <th>Horario</th>
              <th>Cantidad</th>
              <th>Area</th>
              <th>Cancelar</th>
            </tr>
            {filterByName.map((item) => (
              <tr key = {item.id}>
                <td> {item.date}</td>
                <td>{item.timeblock}</td>
                <td>{item.quantity}</td>
                <td>{item.area.area}</td>
                <td><img className="delete" src={Delete} alt="delete" onClick={() => deleteBooking(item.id)}></img></td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyBookings;
