import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  color: "#ffffff",
  background: "#1e293b",
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export const confirmAction = async (
  title: string,
  text: string,
  icon: "warning" | "error" | "success" | "info" | "question" = "warning"
): Promise<boolean> => {
  const result = await Swal.fire({
    title,
    text,
    icon,
    color: "#ffffff",
    background: "#1e293b",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, confirmar",
    cancelButtonText: "Cancelar",
  });

  return result.isConfirmed;
};

export const showError = (title: string, text?: string) => {
  return Swal.fire({
    title,
    text,
    icon: "error",
    confirmButtonColor: "#3085d6",
    color: "#ffffff",
    background: "#1e293b",
  });
};

export const showSuccess = (title: string, text?: string) => {
  return Swal.fire({
    title,
    text,
    icon: "success",
    confirmButtonColor: "#3085d6",
    color: "#ffffff",
    background: "#1e293b",
  });
};

export const showToast = (
  title: string,
  icon: "warning" | "error" | "success" | "info" | "question" = "success"
) => {
  return Toast.fire({
    icon,
    title,
    color: "#ffffff",
    background: "#1e293b",
  });
};

export default Swal;
