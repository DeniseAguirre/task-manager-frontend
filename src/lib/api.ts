const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  completed?: boolean;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  completed?: boolean;
}

const handleFetchError = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage =
      errorData.message || `Error: ${response.status} ${response.statusText}`;
    throw new Error(errorMessage);
  }
  return response;
};

export async function getTasks(): Promise<Task[]> {
  try {
    const response = await fetch(`${API_URL}/tasks`);
    await handleFetchError(response);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getTasks:", error);
    throw error;
  }
}

export async function getTask(id: string): Promise<Task> {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`);
    await handleFetchError(response);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error en getTask(${id}):`, error);
    throw error;
  }
}

export async function createTask(taskData: CreateTaskData): Promise<Task> {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });
    await handleFetchError(response);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en createTask:", error);
    throw error;
  }
}

export async function updateTask(
  id: string,
  taskData: UpdateTaskData
): Promise<Task> {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });
    await handleFetchError(response);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error en updateTask(${id}):`, error);
    throw error;
  }
}

export async function deleteTask(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
    });
    await handleFetchError(response);
  } catch (error) {
    console.error(`Error en deleteTask(${id}):`, error);
    throw error;
  }
}
