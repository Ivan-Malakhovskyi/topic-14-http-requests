import React, { Component } from "react";
import { addUser, deleteUserById, getUsers } from "./services/serviceUsers";
import { UserList } from "./components/UserList";
import Spinner from "./components/Spinner";
import { UsersAddForm } from "./components/UsersAddForm";

export default class App extends Component {
  state = {
    users: [],
    isError: false,
    isLoading: false,
  };

  async componentDidMount() {
    try {
      this.setState({ isLoading: true, isError: false });
      const resp = await getUsers();
      this.setState({ users: resp });
    } catch (error) {
      this.setState({ isError: true });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  createUser = async (data) => {
    try {
      this.setState({ isLoading: true, isError: false });
      const newUser = await addUser(data);
      this.setState((prevState) => ({
        users: [...prevState.users, newUser],
      }));
    } catch (error) {
      this.setState({ isError: true });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  deleteUser = async (userId) => {
    try {
      this.setState({ isLoading: true });
      const deletedUser = await deleteUserById(userId);
      this.setState((prev) => ({
        users: prev.users.filter(({ id }) => id !== deletedUser.id),
      }));
    } catch (error) {
      this.setState({ isError: true });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { users, isError, isLoading } = this.state;

    return (
      <section>
        <h1>Users App</h1>

        <UsersAddForm addUser={this.createUser} />

        {isError && <p>SOmething went wrong 😢</p>}

        {isLoading && <Spinner />}

        {users.length > 0 && !isLoading && !isError && (
          <UserList users={users} onDelete={this.deleteUser} />
        )}
      </section>
    );
  }
}
