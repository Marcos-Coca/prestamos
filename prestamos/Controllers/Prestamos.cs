using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using prestamos.Models;
using prestamos.Models.DB;

namespace prestamos.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class Prestamos : ControllerBase
    {
        
        // GET: api/Prestamos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Prestamo>>> GetPrestamos()
        {
            List<Prestamo> lst = new List<Prestamo>();

            using(var db = new IntecContext())
            {
                lst = (from p in db.Prestamos
                       select new Prestamo
                       {
                           Id = p.Id,
                           Documento = p.Documento,
                           GarantiaValor = p.GarantiaValor,
                           IdPersona = p.IdPersona,
                           Monto = p.Monto,
                           Plazo = p.Plazo,
                           Tasa = p.Tasa,
                           Tipo = p.Tipo,
                           TipoDocumento = p.TipoDocumento,
                           IdPersonaNavigation = p.IdPersonaNavigation,

                       }).ToList();
            }

            return lst;
        }

        [HttpGet("personas")]
        public Task<ActionResult<IEnumerable<Persona>>> GetPersonas()
        {
            List<Persona> lst = new List<Persona>();

            using (var db = new IntecContext())
            {
                lst = (from p in db.Personas
                       select new Persona
                       {
                           Id = p.Id,
                          Nombres = p.Nombres,
                          Apellidos = p.Apellidos,
                          Documento =  p.Documento,
                          TipoDocumento = p.TipoDocumento,
                          FechaNacimiento = p.FechaNacimiento,
                          Nacionalidad = p.Nacionalidad,
                          Sexo = p.Sexo,
                       }).ToList();
            }

            return Task.FromResult<ActionResult<IEnumerable<Persona>>>(lst);
        }


        // POST: api/Prestamos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
          [HttpPost]
           public async Task<ActionResult<Prestamo>> PostPrestamo(NewPrestamo prestamo)
           {
                using(var db = new IntecContext())
            {
                var newPrestamo = new Prestamo();
                newPrestamo.Plazo = prestamo.Plazo;
                newPrestamo.Tipo = prestamo.Tipo;
                newPrestamo.TipoDocumento = prestamo.TipoDocumento;
                newPrestamo.Documento = prestamo.Documento;
                newPrestamo.GarantiaValor = prestamo.GarantiaValor;
                newPrestamo.Monto = prestamo.Monto;
                newPrestamo.IdPersona = prestamo.IdPersona;

                
                db.Prestamos.Add(newPrestamo);
                db.SaveChanges();
            }

            return StatusCode(StatusCodes.Status201Created);
           }

    }
}
