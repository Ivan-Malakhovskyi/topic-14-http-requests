Set default url and add first handler

https://mockapi.io/projects

```js
const axiosInstance = axios.create({
  baseURL: "https://6a4e600de785c9ef536cbd48.mockapi.io/",
});

    try catch - ставимо там, де використовуємо функцію

export const getUsers = async (query) => {
  const { data } = await axiosInstance.get(`/users`);
  return data;
};

```

# Do a render collection

```jsx
export const UserList = ({ users }) => {
  return (
    <ul>
      {users.map((user) => (
        <UserListItem key={user.created_at} {...user} onDelete={onDelete} />
      ))}
    </ul>
  );
};
```

```jsx
export const UserListItem = ({ id, name, phone, gender, onDelete }) => {
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
```

aa

## Fetch Users

```jsx

  state = {
    users: [],
    isLoading: false,
  };


    async componentDidMount() {
    try {
      this.setState({ isLoading: true });
      const resp = await getUsers();
      this.setState({ users: resp });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }


    render() {
    const { users, isLoading } = this.state;

    return (
      <section>
        <h1>Users search App</h1>
        <UserSearch />

        {isLoading && <Spinner />}



    Спочатку напсиати так і показати, коли у нас там щось є, коментуючи setState() <UserList users={users} />}



      {users.length > 0 && !isLoading && <UserList users={users} />}
      </section>
    );
  }
```

**Додамо error**

```jsx
state = {
  isError: false,
};

this.setState({ isError: true });
```

```js
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
```

Чому не можна показувати статуси помикли, тексти помилок - тому що це небезпечно

### Add User

```js
export const createNewUser = async (userData) => {
  const { data } = await axiosInstance.post("/users", userData);
  return data;
};
```

```jsx
addUser = async (user) => {
  try {
    this.setState({ isLoading: true, isError: false });
    const newUser = await createNewUser(user);
    this.setState((prevState) => ({
      users: [...prevState.users, newUser],
    }));
  } catch (error) {
    this.setState({ isError: true });
  } finally {
    this.setState({ isLoading: false });
  }
};

<UsersAddForm addUser={this.addUser} />;
```

#### Delete user

```js
export const deleteUserById = async (userId) => {
  const { data } = await axiosInstance.delete(`/users/${userId}`);
  return data;
};
```

isLoafing - this.setState({ isLoading: true });

АБо зробити isLoading в кожній картці, додавши в

```jsx
state = {
  cardId: null,
};

this.setState({ cardId: id });

перед;

this.setState({ isLoading: true });
```

Далі прокинути в картку і порівняти id
І також додати скидання помилки перед запитом, щоб при натисканні наступного не було видно старої помилки

```jsx
deleteUser = async (id) => {
  try {
    this.setState({ isLoading: true, isError: false });
    const deletedUser = await this.deleteUser(id);
    this.setState((prev) => {
      console.log(prev);
      return {
        users: prev.users.filter((user) => user.id !== deletedUser.id),
      };
    });
  } catch (error) {
    this.setState({ isError: true });
  } finally {
    this.setState({ isLoading: false });
  }
};
```

```jsx

  state = {
    users: [],
    isLoading: false,
    isError: false,
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

  deleteUser = async (id) => {
    try {
      this.setState({ isLoading: true, isError: false });
      const deletedUser = await deleteUserById(id);
      this.setState((prev) => {
        console.log(prev);
        return {
          users: prev.users.filter((user) => user.id !== deletedUser.id),
        };
      });
    } catch (error) {
      this.setState({ isError: true });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  addUser = async (user) => {
    try {
      this.setState({ isLoading: true, isError: false });
      const newUser = await createNewUser(user);
      this.setState((prevState) => ({
        users: [...prevState.users, newUser],
      }));
    } catch (error) {
      this.setState({ isError: true });
    } finally {
      this.setState({ isLoading: false });
    }
  };


  render() {
    const { users, isLoading, isError } = this.state;

return (
  <section>
    <h1>Users App</h1>
    <UsersAddForm addUser={this.addUser} />

    {isLoading && <Spinner />}

    {isError && !isLoading && <p>oops some error 😢</p>}

    {users.length > 0 && !isLoading && !isError && (
      <UserList users={users} onDelete={this.deleteUser} />
    )}
  </section>
);}
```
