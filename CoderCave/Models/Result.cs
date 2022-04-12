using System.Collections.Generic;

namespace CoderCave.Models
{
    public class Result
    {
        public List<Inquire> Data { get; set; }
        public int Count { get; set; }
        public int StartValue { get; set; }
        public int EndValue { get; set; }
    }
}
