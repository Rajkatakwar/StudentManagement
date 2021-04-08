using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace StudentManagementVS.Models
{
    [DataContract]
    public class Student
    {
        [DataMember]
        public int ID { get; set; }
        [DataMember]
        public int RollNumber { get; set; }
        [DataMember]
        public string Fullname { get; set; }
        [DataMember]
        public int Attendance { get; set; }
        [DataMember]
        public int DivisionId { get; set; }
        [DataMember]
        public string Standard { get; set; }
        [DataMember]
        public double GPA { get; set; }
        [DataMember]
        public DateTime DateOfBirth { get; set; }
        [DataMember]
        public int IsActive { get; set; }

        public virtual Division Division { get; set; }
    }
}
