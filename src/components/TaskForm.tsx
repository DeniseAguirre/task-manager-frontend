"use client";

import { Loader2 } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";

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

const validationSchema = Yup.object({
  title: Yup.string()
    .max(80, "Máximo 80 caracteres")
    .required("El título es obligatorio"),
  description: Yup.string().max(240, "Máximo 240 caracteres"),
});

export default function TaskForm({
  initialData = { title: "", description: "", completed: false },
  onSubmit,
  isSubmitting,
  isEditing = false,
}: TaskFormProps) {
  const formik = useFormik({
    initialValues: initialData,
    validationSchema,
    onSubmit,
  });

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    formik.setFieldValue("description", e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
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
          {...formik.getFieldProps("title")}
          className={`w-full truncate overflow-hidden text-ellipsis placeholder-white text-white px-3 py-2 bg-slate-800 rounded-md shadow-sm focus:outline-none focus:ring-2 ${
            formik.errors.title && formik.touched.title
              ? "border border-red-400 focus:ring-red-400"
              : formik.values.title.length === 80
              ? "focus:ring-red-400"
              : "focus:ring-blue-500"
          }`}
          placeholder="Ingresa el título de la tarea"
          maxLength={80}
        />

        <div>
          {formik.errors.title && formik.touched.title && (
            <p className="text-red-600 text-sm">{formik.errors.title}</p>
          )}
          <p
            className={`text-gray-400 text-xs text-right py-2 ${
              formik.values.title.length === 80
                ? "text-red-500"
                : "text-gray-400"
            }`}
          >
            {formik.values.title.length}/80 caracteres
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
          {...formik.getFieldProps("description")}
          onChange={handleDescriptionChange}
          className={`w-full break-words truncate overflow-hidden text-ellipsis px-3 py-2 placeholder-white text-white bg-slate-800 rounded-md shadow-sm focus:outline-none focus:ring-2 ${
            formik.values.description.length === 240
              ? "focus:ring-red-500"
              : "focus:ring-blue-500"
          }`}
          rows={3}
          placeholder="Describe la tarea (opcional)"
          maxLength={240}
        />

        <p
          className={`text-xs text-right ${
            formik.values.description.length === 240
              ? "text-red-500"
              : "text-gray-400"
          }`}
        >
          {formik.values.description.length}/240 caracteres
        </p>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="completed"
          checked={formik.values.completed}
          onChange={(e) =>
            formik.setFieldValue("completed", e.currentTarget.checked)
          }
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
