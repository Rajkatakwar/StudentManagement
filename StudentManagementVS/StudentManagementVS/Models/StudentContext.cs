using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentManagementVS.Models
{
    public class StudentManagementEntities : DbContext
    {

        public StudentManagementEntities(DbContextOptions<StudentManagementEntities> options) : base(options)
        { }
        public virtual DbSet<Student> Students { get; set; }
        public virtual DbSet<Division> Divisions { get; set; }
    }
}
