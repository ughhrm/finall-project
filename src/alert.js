import Swal from "sweetalert2";

export const showSuccessAlert = (message) => {
  Swal.fire({
    title: "Uğur!",
    text: message,
    icon: "success",
    confirmButtonText: "Bağla"
  });
};

export const showErrorAlert = (message) => {
  Swal.fire({
    title: "Xəta!",
    text: message,
    icon: "error",
    confirmButtonText: "Bağla"
  });
};