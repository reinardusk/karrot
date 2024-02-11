import ServerProtectedComponent from "@/components/ServerProtectedComponent";

export default function WishListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ServerProtectedComponent>
        <div>{children}</div>
      </ServerProtectedComponent>
    </>
  );
}
