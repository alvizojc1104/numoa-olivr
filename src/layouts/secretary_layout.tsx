import SecretaryNavbar from "../components/secretary_navbar";
import SecretarySideBar from "../components/secretary_sidebar";

export default function SecretaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <SecretaryNavbar />
      <body className="container flex flex-row mx-auto max-w-7xl px-6 flex-grow pt-5">
        <SecretarySideBar />
        {/* Add margin to respect sidebar's width */}
        <div className="ml-[250px] flex-grow h-[calc(100vh-80px)]">
          {children}
        </div>
      </body>
    </div>
  );
}
