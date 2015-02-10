using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Mail;

namespace Mvc5TestBed.MyMvcWebApp.Models
{
    public class RegisterModel
    {

        public MailMessage Email { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public string ConfirmPassword { get; set; }
    }
}