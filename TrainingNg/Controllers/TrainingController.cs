using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace TrainingNg.Controllers
{
    [Route("api/[controller]")]
    public class TrainingController : Controller
    {        
        [HttpPost("[action]")]
        public int Post(Training t)
        {
            return t.Duration;
        }

        [HttpGet("[action]")]
        public Training Get()
        {
            return new Training();
        }

        public class Training
        {
            public string Name { get; set; }
            public DateTime Start { get; set; }
            public DateTime End { get; set; }

            public int Duration
            {
                get
                {
                    return Convert.ToInt32((End - Start).TotalDays);
                }
            }
        }
    }
}
