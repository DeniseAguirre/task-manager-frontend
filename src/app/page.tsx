import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Gestor de Tareas</h1>
          <p className="mt-2 text-gray-600">
            Una aplicación simple para gestionar tus tareas diarias
          </p>
        </div>
        <div className="mt-8">
          <Link
            href="/tasks"
            className="flex items-center justify-center w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <span>Ver mis tareas</span>
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
