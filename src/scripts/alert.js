export async function showAlert(onConfirm) {
    const Swal = (await import("sweetalert2")).default;
    Swal.fire({
        title: "Información de último momento",
        text: "La información está cacheada. ¿Deseas actualizarla?",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Refrescar",
        cancelButtonText: "Continuar"
    }).then((result) => {
        if (result.isConfirmed && onConfirm) {
            onConfirm(); // Ejecuta la función para actualizar sin recargar la página
        }
    });
}
