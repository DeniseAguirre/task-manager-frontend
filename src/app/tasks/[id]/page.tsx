"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  getTask,
  updateTask,
  deleteTask,
  UpdateTaskData,
  Task,
} from "@/lib/api";
import TaskForm from "@/components/TaskForm";
import { AlertCircle, ArrowLeft, Loader2, Trash2 } from "lucide-react";

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
        setError("Error al cargar la tarea. Por favor intenta de nuevo.");
        console.error(err);
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
      router.push("/tasks");
      router.refresh();
    } catch (err) {
      setError("Error al actualizar la tarea. Por favor intenta de nuevo.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
      try {
        setIsDeleting(true);
        await deleteTask(id);
        router.push("/tasks");
        router.refresh();
      } catch (err) {
        setError("Error al eliminar la tarea. Por favor intenta de nuevo.");
        console.error(err);
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
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Volver a la lista</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Editar Tarea</h1>
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
