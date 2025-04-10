"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TaskForm from "@/components/TaskForm";
import { type CreateTaskData, createTask } from "@/lib/api";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { showError, showSuccess } from "@/lib/swal";

export default function NewTaskPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (taskData: CreateTaskData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await createTask(taskData);
      await showSuccess(
        "¡Tarea creada!",
        "La tarea se ha creado correctamente"
      );
      router.push("/tasks");
      router.refresh();
    } catch (err) {
      setError("Error al crear la tarea. Por favor intenta de nuevo.");
      console.error(err);
      showError(
        "Error",
        "No se pudo crear la tarea. Por favor intenta de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="mb-6">
        <Link
          href="/tasks"
          className="inline-flex items-center text-purple-600 hover:text-purple-800"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Volver a la lista</span>
        </Link>
      </div>

      <div className="bg-slate-900 rounded-lg shadow-md p-6">
        <h1 className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent text-2xl font-bold mb-6">
          Crear Nueva Tarea
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 flex items-start">
            <AlertCircle className="w-5 h-5 mr-2 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <TaskForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
}
