using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using StudentManagementSystem.Models;

namespace StudentManagementSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DivisionController : ControllerBase
    {
        [HttpGet]
        [EnableCors("AllowAll")]
        public IEnumerable<Division> Get()
        {
            using (var context = new StudentManagementContext())
            {
                return context.Divisions.ToList();
            }
        }
        [HttpPost]
        [EnableCors("AllowAll")]
        public HttpResponseMessage Post([FromBody] Division d)
        {
            try
            {
                Division div = new Division();
                div.Name = d.Name;
                if (d != null)
                {
                    using (var context = new StudentManagementContext())
                    {
                        context.Divisions.Add(div);
                        context.SaveChanges();
                        return new HttpResponseMessage(HttpStatusCode.OK);
                    }
                }
                else
                {
                    return new HttpResponseMessage(HttpStatusCode.Unauthorized);
                }
            }
            catch (Exception e)
            {
                return new HttpResponseMessage(HttpStatusCode.Unauthorized);
            }
        }
    }

    }
