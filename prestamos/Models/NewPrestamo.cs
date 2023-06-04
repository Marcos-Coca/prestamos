using prestamos.Models.DB;

namespace prestamos.Models
{
    public class NewPrestamo
    {

        public string TipoDocumento { get; set; } = null!;

        public string Documento { get; set; } = null!;

        public int Monto { get; set; }

        public string Plazo { get; set; } = null!;

        public double Tasa { get; set; }

        public double GarantiaValor { get; set; }

        public string Tipo { get; set; } = null!;

        public int IdPersona { get; set; }

    }
}
