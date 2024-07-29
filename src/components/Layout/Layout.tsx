import HeaderBar from "../HeaderBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <HeaderBar />
      {children}
    </main>
  );
}
