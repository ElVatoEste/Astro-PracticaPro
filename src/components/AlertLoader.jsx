import { useEffect } from "react";
import { showAlert } from "../scripts/alert.js";

export default function AlertLoader() {
    useEffect(() => {
        showAlert();
    }, []);

    return null; // No renderiza nada
}
