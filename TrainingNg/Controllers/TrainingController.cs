using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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
        public async Task<IActionResult> Post([FromBody] Training t)
        {
            await _context.Training.AddAsync(t);
            await _context.SaveChangesAsync();
            return StatusCode(Convert.ToInt32(HttpStatusCode.NoContent));
        }

        [HttpGet("[action]")]
        public Training Get()
        {
            return new Training();
        }
    }
}
