using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;

namespace Mvc5TestBed.MyMvcWebApp.Models
{
    public class Mailbox
    {
        public List<MailMessage> MailMessages { get; set; }
    }
}