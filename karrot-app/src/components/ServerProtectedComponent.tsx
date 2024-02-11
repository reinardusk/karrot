import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ServerProtectedComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const cookiesStore = cookies();

  const karrot_token = cookiesStore.get("karrot-token");

  if (!karrot_token || karrot_token.value.length <= 0) {
    redirect("/login");
  }

  return <>{children}</>;
};

export default ServerProtectedComponent;
