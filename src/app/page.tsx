import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-slate-950 bg-[url(/bg-2.png)] bg-cover bg-no-repeat bg-blend-color-burn">
      <div className="w-full space-y-8 p-8 flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-6xl font-extrabold text-transparent">
            Gestor de Tareas
          </h1>
          <p className="mt-4 font-light text-gray-100">
            Una aplicación simple para gestionar tus tareas diarias
          </p>
        </div>
        <div className="mt-8">
          <Link
            href="/tasks"
            className="flex items-center justify-center w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <span>Ver mis tareas</span>
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
