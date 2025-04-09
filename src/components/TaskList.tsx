import { type Task, updateTask, deleteTask } from "@/lib/api";
import TaskItem from "./TaskItem";
import { confirmAction, showError, showToast } from "@/lib/swal";

interface TaskListProps {
  readonly tasks: Task[];
  readonly onTaskUpdate: (task: Task) => void;
  readonly onTaskDelete: (id: string) => void;
}

export default function TaskList({
  tasks,
  onTaskUpdate,
  onTaskDelete,
}: TaskListProps) {
  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      const updatedTask = await updateTask(id, { completed });
      onTaskUpdate(updatedTask);
      showToast(`Tarea ${completed ? "completada" : "marcada como pendiente"}`);
    } catch (error) {
      console.error("Error al actualizar el estado de la tarea:", error);
      showError("Error", "No se pudo actualizar el estado de la tarea");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = await confirmAction(
      "¿Estás seguro?",
      "Esta acción no se puede deshacer",
      "warning"
    );

    if (confirmed) {
      try {
        await deleteTask(id);
        onTaskDelete(id);
        showToast("Tarea eliminada correctamente");
      } catch (error) {
        console.error("Error al eliminar la tarea:", error);
        showError("Error", "No se pudo eliminar la tarea");
      }
    }
  };

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
