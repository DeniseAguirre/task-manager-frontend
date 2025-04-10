"use client";

import { useState } from "react";
import Link from "next/link";
import type { Task } from "@/lib/api";
import { CheckCircle, Circle, Edit, Trash2, Loader2 } from "lucide-react";

interface TaskItemProps {
  readonly task: Task;
  readonly onToggleComplete: (id: string, completed: boolean) => Promise<void>;
  readonly onDelete: (id: string) => Promise<void>;
}

export default function TaskItem({
  task,
  onToggleComplete,
  onDelete,
}: TaskItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleComplete = async () => {
    try {
      setIsUpdating(true);
      await onToggleComplete(task.id, !task.completed);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(task.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={` rounded-lg p-4 transition-all ${
        task.completed ? "bg-slate-900" : "bg-slate-950"
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggleComplete}
          disabled={isUpdating}
          className={`mt-1 flex-shrink-0 focus:outline-none ${
            isUpdating ? "opacity-60" : "hover:text-blue-600"
          }`}
          aria-label={
            task.completed ? "Marcar como pendiente" : "Marcar como completada"
          }
        >
          {isUpdating ? (
            <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
          ) : task.completed ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <Circle className="h-5 w-5 text-gray-400" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div
            className={`font-medium ${
              task.completed ? "line-through text-gray-300" : "text-white"
            }`}
          >
            {task.title}
          </div>
          {task.description && (
            <p
              className={`mt-1 text-sm ${
                task.completed ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {task.description}
            </p>
          )}
          <div className="mt-2 text-xs text-gray-400">
            Creada: {new Date(task.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="flex flex-shrink-0 gap-2">
          <Link
            href={`/tasks/${task.id}`}
            className="p-1 text-gray-400 hover:text-purple-600 transition-colors"
            aria-label="Editar"
          >
            <Edit className="h-4 w-4" />
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`p-1 transition-colors ${
              isDeleting ? "text-gray-300" : "text-gray-400 hover:text-red-600"
            }`}
            aria-label="Eliminar"
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
