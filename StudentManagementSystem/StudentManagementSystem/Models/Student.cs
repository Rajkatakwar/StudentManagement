using System;
using System.Collections.Generic;

#nullable disable

namespace StudentManagementSystem.Models
{
    public partial class Student
    {
        public int Id { get; set; }
        public short RollNumber { get; set; }
        public string Fullname { get; set; }
        public int Attendance { get; set; }
        public short DivisionId { get; set; }
        public string Standard { get; set; }
        public decimal Gpa { get; set; }
        public DateTime DateOfBirth { get; set; }
        public bool IsActive { get; set; }

        public virtual Division Division { get; set; }
    }
}
