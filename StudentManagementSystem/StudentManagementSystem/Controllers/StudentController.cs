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
    public class StudentController : ControllerBase
    {
        [HttpGet]
        [EnableCors("AllowAll")]
        public IEnumerable<Student> Get()
        {
            using (var context = new StudentManagementContext())
            {
                return context.Students.ToList();
            }
        }
        [HttpPost]
        [EnableCors("AllowAll")]
        public HttpResponseMessage Post([FromBody] Student s)
        {
            try
            {
                if (s != null)
                {
                    Student stu = new Student();
                    stu.RollNumber = s.RollNumber;
                    stu.Fullname = s.Fullname;
                    stu.Attendance = s.Attendance;
                    stu.DivisionId = s.DivisionId;
                    stu.Standard = s.Standard;
                    stu.Gpa = s.Gpa;
                    stu.DateOfBirth = s.DateOfBirth;
                    stu.IsActive = s.IsActive;
                    using (var context = new StudentManagementContext())
                    {
                        context.Students.Add(stu);
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
        [HttpGet("{id:int}")]
        [EnableCors("AllowAll")]
        public List<Student> Get(int id)
        {
            using (var context = new StudentManagementContext())
            {
                List<Student> res = new List<Student>();
                Student result = new Student(); 
                result = context.Students.Find(id);
                res.Add(result);
                if (result == null)
                    return null;
                return res;
            }
        }

        [HttpPost]
        [EnableCors("AllowAll")]
        [Route("edit")]
        public HttpResponseMessage Edit([FromBody] Student s)
        {
            using (var context = new StudentManagementContext())
            {
                try
                {
                    if (s != null)
                    {
                        Student stu = new Student();
                        stu = context.Students.Find(s.Id);
                        stu.RollNumber = s.RollNumber;
                        stu.Fullname = s.Fullname;
                        stu.Attendance = s.Attendance;
                        stu.DivisionId = s.DivisionId;
                        stu.Standard = s.Standard;
                        stu.Gpa = s.Gpa;
                        stu.DateOfBirth = s.DateOfBirth;
                        stu.IsActive = s.IsActive;
                        context.SaveChanges();
                        return new HttpResponseMessage(HttpStatusCode.OK);
                    }
                    else
                    {
                        return new HttpResponseMessage(HttpStatusCode.Unauthorized);
                    }
                }
                catch
                {
                    return new HttpResponseMessage(HttpStatusCode.Unauthorized);
                }
                
            }
            
        }
        [HttpPost]
        [EnableCors("AllowAll")]
        [Route("delete")]
        public HttpResponseMessage Delete([FromBody] int id)
        {
            using (var context = new StudentManagementContext())
            {
                Student stu = new Student();
                stu = context.Students.Find(id);
                if (stu == null)
                    return new HttpResponseMessage(HttpStatusCode.Unauthorized);
                context.Students.Remove(stu);
                context.SaveChanges();
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
        }
    }
}
