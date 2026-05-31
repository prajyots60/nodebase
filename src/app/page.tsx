"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const Page = () => {
  const { data } = authClient.useSession();
  const trpc = useTRPC();

  const testAi = useMutation(
    trpc.testAi.mutationOptions({
      onSuccess: () => {
        toast.success("AI job queued successfully!");
      },
    }),
  );

  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-2xl font-bold">Welcome to Nodebase</h1>
      <p className="text-gray-600">
        Your all-in-one platform for Node.js development
      </p>
      {data?.user ? (
        <div>
          <p className="text-green-500">Logged in as </p>
          <pre className="rounded-md bg-gray-100 p-4 text-sm text-gray-700">
            {JSON.stringify(data.user, null, 2)}
          </pre>

          <Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>
            Test Ai
          </Button>
          <Button className="" onClick={() => authClient.signOut()}>
            Log Out
          </Button>
        </div>
      ) : (
        <Button className="" onClick={() => redirect("/signup")}>
          Register
        </Button>
      )}
    </div>
  );
};

export default Page;
