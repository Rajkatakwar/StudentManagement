using System;
using System.Collections.Generic;

#nullable disable

namespace StudentManagementSystem.Models
{
    public partial class Division
    {
        public Division()
        {
            Students = new HashSet<Student>();
        }

        public short Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Student> Students { get; set; }
    }
}
