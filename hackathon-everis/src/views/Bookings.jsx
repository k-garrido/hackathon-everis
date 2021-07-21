import React, { useContext, useReducer } from "react";
import NavTop from "../components/home/NavTop";
import Date from "../components/booking/Date";
import Hour from "../components/booking/Hour";
import Workspace from "../components/booking/work-space";
import Confirm from "../components/booking/Confirm";
import { FormContext } from "../context/FormContext";

const renderCurrentPage = (step, formData, dispatch) => {
  switch (step) {
    case 1:
      return <Date dispatch={(value) => dispatch({ date: value })} />;
    case 2:
      return (
        <Hour
          dispatch={(value) => dispatch({ timeblock: value })}
          dispatch2={(value) => dispatch({ quantity: value })}
        />
      );
    case 3:
      return <Workspace dispatch={(value) => dispatch({ area: value })} />;
    case 4:
      return <Confirm data={formData} />;
    default:
      return null;
  }
};

const formReducer = (state, action) => ({ ...state, ...action });

export default function Bookings() {
  const { step } = useContext(FormContext);
  const [formData, dispatchForm] = useReducer(formReducer, {});

  return (
    <div className="booking-container">
      <NavTop />
      {renderCurrentPage(step, formData, dispatchForm)}
    </div>
  );
}
