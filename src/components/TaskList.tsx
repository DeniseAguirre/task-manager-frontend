import { deleteTask, updateTask, Task } from "@/lib/api";

import TaskItem from "./TaskItem";

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
    } catch (error) {
      console.error("Error al actualizar el estado de la tarea:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
      try {
        await deleteTask(id);
        onTaskDelete(id);
      } catch (error) {
        console.error("Error al eliminar la tarea:", error);
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
