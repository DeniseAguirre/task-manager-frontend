"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  getTask,
  updateTask,
  deleteTask,
  type UpdateTaskData,
  type Task,
} from "@/lib/api";
import TaskForm from "@/components/TaskForm";
import { AlertCircle, ArrowLeft, Loader2, Trash2 } from "lucide-react";
import { confirmAction, showError, showSuccess } from "@/lib/swal";

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const data = await getTask(id);
        setTask(data);
      } catch (err) {
        const errorMsg =
          "Error al cargar la tarea. Por favor intenta de nuevo.";
        setError(errorMsg);
        console.error(err);
        showError("Error", errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (taskData: UpdateTaskData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await updateTask(id, taskData);
      await showSuccess(
        "¡Tarea actualizada!",
        "La tarea se ha actualizado correctamente"
      );
      router.push("/tasks");
      router.refresh();
    } catch (err) {
      const errorMsg =
        "Error al actualizar la tarea. Por favor intenta de nuevo.";
      setError(errorMsg);
      console.error(err);
      showError("Error", errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = await confirmAction(
      "¿Estás seguro de que deseas eliminar esta tarea?",
      "Esta acción no se puede deshacer",
      "warning"
    );

    if (confirmed) {
      try {
        setIsDeleting(true);
        await deleteTask(id);
        await showSuccess(
          "Tarea eliminada",
          "La tarea se ha eliminado correctamente"
        );
        router.push("/tasks");
        router.refresh();
      } catch (err) {
        const errorMsg =
          "Error al eliminar la tarea. Por favor intenta de nuevo.";
        setError(errorMsg);
        console.error(err);
        showError("Error", errorMsg);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <div className="mb-6">
          <Link
            href="/tasks"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>Volver a la lista</span>
          </Link>
        </div>

        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <AlertCircle className="w-5 h-5 inline mr-2" />
          {error ?? "No se pudo encontrar la tarea solicitada."}
        </div>
      </div>
    );
  }

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
        <div className="flex justify-between items-center mb-6">
          <h1 className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent text-2xl font-bold">
            Editar Tarea
          </h1>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex items-center px-3 py-2 text-sm text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4 mr-2" />
            )}
            <span>Eliminar</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 flex items-start">
            <AlertCircle className="w-5 h-5 mr-2 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <TaskForm
          initialData={{
            title: task.title,
            description: task.description,
            completed: task.completed,
          }}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isEditing={true}
        />
      </div>
    </div>
  );
}
