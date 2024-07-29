export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md bg-purple-600 p-0.5 text-white sm:p-2">
      {children}
    </div>
  );
}
