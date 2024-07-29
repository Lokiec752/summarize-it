export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md bg-purple-600 p-2 text-white">{children}</div>
  );
}
