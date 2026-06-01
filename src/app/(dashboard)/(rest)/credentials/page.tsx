import { requireAuth } from "@/lib/auth-utils";

const Page = async () => {
  await requireAuth();
  return <div>This is credentials page.</div>;
};

export default Page;
