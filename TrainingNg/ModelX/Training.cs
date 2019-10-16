using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrainingNg.Model
{
    public partial class Training
    {
        public int Duration
        {
            get
            {
                return Convert.ToInt32((End - Start).TotalDays + 1);
            }
        }
    }
}
