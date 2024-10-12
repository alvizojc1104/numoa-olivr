import FacultyNavbar from "@/components/FacultyNavbar";

export default function FacultyLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="relative flex flex-col h-screen">
      <FacultyNavbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-10">
        {children}
      </main>
    </div>
  );
}
