using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentManagementVS.Models;

namespace StudentManagementVS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DivisionController : Controller
    {
        private StudentManagementEntities _sme;
        public DivisionController(StudentManagementEntities sme)
        {
            _sme = sme;
        }
        public IActionResult Index()
        {
            var divisions = _sme.Divisions.ToList();
            return View(divisions);
        }
    }
}
