import React, { useEffect, useState } from "react";
import StudentCardList from "./StudentCardList.jsx";
import { showAlert } from "../scripts/alert.js";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
};

export default function StudentDataManager() {
    const [students, setStudents] = useState([]);
    const [isCacheValid, setIsCacheValid] = useState(true); // Controla si la data es cacheada

    async function fetchAndCache() {
        try {
            const res = await fetch("http://localhost:3000/notas/info");
            if (res.ok) {
                const json = await res.json();
                // Agrupar la información por usuario
                const studentsMap = new Map();
                for (const row of json) {
                    if (!studentsMap.has(row.usuarioId)) {
                        studentsMap.set(row.usuarioId, {
                            id: row.usuarioId,
                            nombre: row.usuario,
                            correo: row.correo,
                            evaluaciones: []
                        });
                    }
                    studentsMap.get(row.usuarioId).evaluaciones.push({
                        id: `${row.materia}-${row.intento}`,
                        nombre: row.materia,
                        intento: row.intento,
                        puntaje: row.puntaje,
                        fecha: formatDate(row.fecha)
                    });
                }
                const data = Array.from(studentsMap.values());

                // Guardar en cache
                localStorage.setItem("notasData", JSON.stringify(data));
                localStorage.setItem("notasTimestamp", Date.now().toString());

                return data;
            } else {
                console.error("Error al obtener la información de notas:", res.status);
                return [];
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            return [];
        }
    }

    async function fetchData(forceRefresh = false) {
        const cachedData = localStorage.getItem("notasData");
        const cachedTime = localStorage.getItem("notasTimestamp");
        const oneHour = 60 * 60 * 1000; // 1 hora en ms

        let data;
        if (!forceRefresh && cachedData && cachedTime && Date.now() - Number(cachedTime) < oneHour) {
            data = JSON.parse(cachedData);
            setIsCacheValid(true); // La cache es válida
            // Mostrar la alerta para permitir actualizar sin recargar
            showAlert(() => fetchData(true));
        } else {
            data = await fetchAndCache();
            setIsCacheValid(false); // La cache no es válida
        }

        setStudents(data);
        console.log("Data actualizada:", data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return <StudentCardList students={students} />;
}
