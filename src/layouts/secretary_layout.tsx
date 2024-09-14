import SecretarySideBar from "../components/secretary_sidebar";

export default function SecretaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen w-screen pt-20 scrollbar-hide">
      {/* Sidebar and content container */}
      <div className="w-[1280px] mx-auto flex-gro px-5">
        {/* Sidebar in fixed position */}
        <div className="fixed min-w-fit max-w-[200px] h-full scrollbar-hide">
          <SecretarySideBar />
        </div>
        {/* Main content scrollable, adjusting for sidebar's width */}
        <div className="w-[1080] ml-[200px] flex-1 scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  );
}
