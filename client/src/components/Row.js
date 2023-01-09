import React from "react";

const Row = (props) => {
  const { id, masterId, cityId, clockId, bookingDateTime, email, repairDuration } = props;
  return (
    <tr>
      <td>{ id }</td>
      <td>{ masterId }</td>
      <td>{ cityId }</td>
      <td>{ clockId }</td>
      <td>{ bookingDateTime }</td>
      <td>{ email }</td>
      <td>{ repairDuration }</td>
    </tr>
  )
}

export default Row;
