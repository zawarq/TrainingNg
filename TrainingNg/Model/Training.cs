using System;
using System.Collections.Generic;

namespace TrainingNg.Model
{
    public partial class Training
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
