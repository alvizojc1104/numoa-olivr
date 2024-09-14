import { Navbar } from "../components/navbar";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="flex w-full h-screen justify-end px-16">
        {children}
      </main>
    </div>
  );
}
