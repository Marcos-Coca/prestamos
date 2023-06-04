import React, { useState, useEffect } from 'react';


export function Home() {
    const [prestamos, setPrestamos] = useState([]);
    const [loading, setLoading] = useState(true);

    const total = prestamos.reduce((acc, { monto }) => acc + monto, 0);

    useEffect(() => {
        fetch('prestamos').then((res) => res.json()).then(setPrestamos).finally(() => {
            setLoading(false);
        })
    }, []);


    if (loading) {
        return <div>
            Cargando...
        </div>
    }

    return (
        <div>
            <h1 className="my-5">Solicitudes de Prestamo</h1>
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Persona</th>
                        <th>Monto</th>
                        <th>Plazo</th>
                        <th>Tasa</th>
                        <th>Valor de la Garantia</th>
                        <th>Tipo de Prestamo</th>
                    </tr>
                </thead>
                <tbody>
                    {prestamos.map(prestamo =>
                        <tr key={prestamo.id}>
                            <td>{prestamo.idPersonaNavigation.nombres} {prestamo.idPersonaNavigation.apellidos}</td>
                            <td>{prestamo.monto}</td>
                            <td>{prestamo.plazo}</td>
                            <td>{prestamo.tasa}%</td>
                            <td>{prestamo.garantiaValor}</td>
                            <td>{prestamo.tipo}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div>
                <div>
                    <b>Cantidad de Prestamos: </b> {prestamos.length}
                </div>
                <div>
                    <b>Monto Total: </b> {total}
                </div>
            </div>
        </div>
    );
}