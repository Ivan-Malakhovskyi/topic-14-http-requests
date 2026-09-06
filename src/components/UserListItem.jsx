import React from "react";

export const UserListItem = ({ id, name, phone, email, status, onDelete }) => {
  return (
    <li key={id}>
      <h2>
        Username: <strong>{name}</strong>
      </h2>
      <p>
        Phone: <strong>{phone}</strong>
      </p>
      <p>
        Email: <strong>{email}</strong>
      </p>
      <p>
        Status: <strong>{status ? "Active" : "Non-active"}</strong>
      </p>

      <button onClick={() => onDelete(id)}>Delete</button>
    </li>
  );
};
