"use client";

import { useState, FormEvent } from "react";
import { Loader2 } from "lucide-react";

interface TaskFormProps {
  initialData?: {
    title: string;
    description: string;
    completed: boolean;
  };
  onSubmit: (data: {
    title: string;
    description: string;
    completed: boolean;
  }) => void;
  isSubmitting: boolean;
  isEditing?: boolean;
}

export default function TaskForm({
  initialData = { title: "", description: "", completed: false },
  onSubmit,
  isSubmitting,
  isEditing = false,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);
  const [completed, setCompleted] = useState(initialData.completed);
  const [errors, setErrors] = useState<{ title?: string }>({});

  const validate = (): boolean => {
    const newErrors: { title?: string } = {};
    if (!title.trim()) {
      newErrors.title = "El título es obligatorio";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ title, description, completed });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-300"
        >
          Título <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full placeholder-white text-white px-3 py-2 bg-slate-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.title
              ? "border border-red-400"
              : title.length === 80
              ? " bg-slate-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              : " bg-slate-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          }`}
          placeholder="Ingresa el título de la tarea"
          maxLength={80}
          required
        />
        <div>
          {errors.title && (
            <p className="text-red-600 text-sm">{errors.title}</p>
          )}
          <p
            className={`text-gray-400 text-xs text-right py-2 ${
              title.length === 80 ? "text-red-500" : "text-gray-400"
            }`}
          >
            {title.length}/80 caracteres
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-300"
        >
          Descripción
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`w-full px-3 py-2 placeholder-white text-white ${
            description.length === 240
              ? " bg-slate-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              : " bg-slate-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          }`}
          rows={3}
          placeholder="Describe la tarea (opcional)"
          maxLength={240}
        />
        <p
          className={`text-xs text-right ${
            description.length === 240 ? "text-red-500" : "text-gray-400"
          }`}
        >
          {description.length}/240 caracteres
        </p>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="h-4 w-4 accent-pink-500 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
        />
        <label htmlFor="completed" className="ml-2 block text-sm text-gray-300">
          Tarea completada
        </label>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-violet-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {isEditing ? "Guardando..." : "Creando..."}
            </>
          ) : isEditing ? (
            "Guardar Cambios"
          ) : (
            "Crear Tarea"
          )}
        </button>
      </div>
    </form>
  );
}
