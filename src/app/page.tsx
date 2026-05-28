import { caller } from "@/trpc/server";

const Page = async () => {
  const users = await caller.getUsers();
  return (
    <div className="p-4 space-y-4 bg-white rounded-lg shadow flex flex-col items-center justify-center ">
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
