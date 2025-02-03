// src/components/StudentCardList.jsx
import StudentCard from "./StudentCard.jsx";

export default function StudentCardList({ students }) {
    console.log("Data recibida en StudentCardList:", students);

    return (
        <div className="flex flex-wrap gap-6 justify-center">
            {students.map((student) => (
                <div key={student.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                    <StudentCard
                        nombre={student.nombre}
                        correo={student.correo}
                        evaluaciones={student.evaluaciones || []}
                    />
                </div>
            ))}
        </div>
    );
}
