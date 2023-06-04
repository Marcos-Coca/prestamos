import React, { useState, useEffect} from "react";

export function Form() {
    const [personas, setPersonas] = useState([]);

    useEffect(() => {
        fetch("prestamos/personas").then(res => res.json()).then((personas) => {
            setPersonas(personas);
        })
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        const targets = e.target;
        const val = {
            monto: targets.monto.value,
            idPersona: targets.idPersona.value,
            plazo: targets.plazo.value,
            tasa: targets.tasa.value,
            garantiaValor: targets.garantia.value,
            tipo: targets.tipo.value,
            tipoDocumento: targets.tipoDocumento.value,
            documento: targets.documento.value,
            idPersonaNavigation: targets.idPersona.value
        }

        console.log(val);

        fetch("prestamos", {
            method: "POST",
            body: JSON.stringify(val),
            headers: {
                "Content-Type": "application/json"
            },
        }).then(() => {
            document.getElementById("form").reset();
        })
    }

    return <div>
       <h1 className="my-5">Formulario Solicitud</h1>

        <form id="form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="IdPersona">Persona</label>
                <select className="form-control" id="idPersona">
                    {personas.map((persona) => {
                        console.log(persona.id);
                        return <option key={persona.id} value={persona.id}>{persona.nombres} {persona.apellidos}</option>
                    })}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="tipoDocumento">Tipo de Documento</label>
                <input type="text" className="form-control" id="tipoDocumento" />
            </div>
            <div className="form-group">
                <label htmlFor="documento">Documento</label>
                <input type="text" className="form-control" id="documento" />
            </div>
            <div className="form-group">
                <label htmlFor="monto">Monto</label>
                <input type="number" className="form-control" id="monto"/>
            </div>
            <div className="form-group">
                <label htmlFor="plazo">Plazo</label>
                <input type="text" className="form-control" id="plazo"/>
            </div>
            <div className="form-group">
                <label htmlFor="tasa">Tasa</label>
                <input type="number" className="form-control" id="tasa" />
            </div>
            <div className="form-group">
                <label htmlFor="garantia">Valor de la Garantia</label>
                <input type="number" className="form-control" id="garantia" />
            </div>
            <div className="form-group">
                <label htmlFor="Tasa">Tipo</label>
                <input type="text" className="form-control" id="tipo" />
            </div>
            <button type="submit" className="btn btn-primary mt-3">Submit</button>
        </form>
    </div>
}