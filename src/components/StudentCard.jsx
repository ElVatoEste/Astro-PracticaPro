// src/components/StudentCard.jsx
export default function StudentCard({ nombre, correo, evaluaciones = [] }) {
    // Agrupar evaluaciones por materia
    const groupedEvaluations = evaluaciones.reduce((acc, evaluacion) => {
        const key = evaluacion.nombre;
        if (!acc[key]) acc[key] = [];
        acc[key].push(evaluacion);
        return acc;
    }, {});

    return (
        <div className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Cabecera de la tarjeta */}
            <header className="p-6 bg-primary text-white">
                <h2 className="text-2xl font-bold">{nombre}</h2>
                <p className="mt-2 text-sm">{correo}</p>
            </header>

            {/* Evaluaciones */}
            <section className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Evaluaciones</h3>
                {Object.entries(groupedEvaluations).map(([evaluacionNombre, attempts]) => (
                    <div key={evaluacionNombre} className="mb-6">
                        <h4 className="text-lg font-bold text-gray-700 mb-2">{evaluacionNombre}</h4>
                        <div className="space-y-3">
                            {attempts.map((attempt) => (
                                <div key={attempt.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                        <span className="font-medium text-gray-600">Intento {attempt.intento}</span>
                                        <span className="text-gray-500 text-sm">{attempt.fecha}</span>
                                    </div>
                                    <div className="mt-2 text-gray-600">
                                        Puntaje: <strong>{attempt.puntaje}</strong>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}
