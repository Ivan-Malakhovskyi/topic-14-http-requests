import { UserListItem } from "./UserListItem";

export const UserList = ({ users, onDelete }) => {
  return (
    <ul>
      {users.map((user) => (
        <UserListItem key={user.id} {...user} onDelete={onDelete} />
      ))}
    </ul>
  );
};
