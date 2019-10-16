using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TrainingNg.Model;

namespace TrainingNg.Controllers
{
    [Route("api/[controller]")]
    public class TrainingController : Controller
    {
        private readonly trainingngContext _context;

        public TrainingController(trainingngContext context)
        {
            _context = context;
        }

        [HttpPost("[action]")]
        public async Task<int> Post([FromBody] Training t)
        {
            await _context.Training.AddAsync(t);
            return t.Duration;
        }
    }
}
