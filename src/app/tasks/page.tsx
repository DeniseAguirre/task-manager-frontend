"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PlusCircle, Loader2 } from "lucide-react";
import { getTasks, Task } from "@/lib/api";
import TaskList from "@/components/TaskList";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await getTasks();
        setTasks(data);
        setError(null);
      } catch (err) {
        setError("Error al cargar las tareas. Por favor intenta de nuevo.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleTaskDelete = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent text-2xl font-bold">
          Mis Tareas
        </h1>
        <Link
          href="/tasks/new"
          className="flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-md transition-colors"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          <span>Nueva Tarea</span>
        </Link>
      </div>

      <div className="bg-slate-800 rounded-lg shadow-md p-6">
        <div className="flex justify-end gap-2 mb-4">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                filter === "all"
                  ? "bg-pink-500 text-white"
                  : "bg-slate-900 text-white hover:bg-slate-950"
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 text-sm font-medium ${
                filter === "pending"
                  ? "bg-pink-500 text-white"
                  : "bg-slate-900 text-white hover:bg-slate-950"
              } border-l border-gray-600`}
            >
              Pendientes
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                filter === "completed"
                  ? "bg-pink-500 text-white"
                  : "bg-slate-900 text-white hover:bg-slate-950"
              } border-l border-gray-600`}
            >
              Completadas
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        ) : filteredTasks.length > 0 ? (
          <TaskList
            tasks={filteredTasks}
            onTaskUpdate={handleTaskUpdate}
            onTaskDelete={handleTaskDelete}
          />
        ) : (
          <div className="text-center py-12 text-white">
            <p>No hay tareas disponibles</p>
            {filter !== "all" && (
              <p className="mt-2">
                <button
                  onClick={() => setFilter("all")}
                  className="text-violet-500 hover:underline focus:outline-none"
                >
                  Ver todas las tareas
                </button>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
