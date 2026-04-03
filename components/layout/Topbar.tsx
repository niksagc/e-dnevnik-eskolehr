export function Topbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div></div>
      <div className="flex items-center gap-4">
        <span>Korisnik</span>
        <button className="text-sm bg-gray-100 px-3 py-1 rounded">Odjava</button>
      </div>
    </header>
  );
}
