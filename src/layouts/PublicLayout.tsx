import { Link, Outlet } from "react-router-dom";

type PublicLayoutProps = {
  title?: string;
  subtitle?: string;
};

export default function PublicLayout({
  title = "잇츠파인",
  subtitle,
}: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky p-1 top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link to="/">
            <img
              src="/EatsfineLogo.png"
              alt="잇츠파인 로고"
              className="h-14 w-14 rounded hover:scale-110 transition"
            />
          </Link>
          <div className="p-1">
            <h1 className="text-blue-600 text-xl font-semibold">{title}</h1>
            {subtitle ? (
              <p className="text-gray-600 text-sm">{subtitle}</p>
            ) : null}
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
