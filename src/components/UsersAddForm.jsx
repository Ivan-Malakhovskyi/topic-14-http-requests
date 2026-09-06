import React, { Component } from "react";

export const UsersAddForm = ({ addUser }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    const email = form.elements.email.value;
    const name = form.elements.name.value;
    const phone = form.elements.phone.value;
    const status = form.elements.status.value;

    const data = { email, name, phone, status };

    await addUser(data);

    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" />
      <input type="email" name="email" />
      <input type="number" name="phone" />
      <select name="status" defaultValue="active">
        <option value="true">Active</option>
        <option value="false">Non-Active</option>
      </select>
      <button type="submit">Create user</button>
    </form>
  );
};
