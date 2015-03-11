using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mvc5TestBed.MyMvcWebApp.Models.Wizard
{
    public class Step7ViewModel : StepViewModel
    {
        public Step7ViewModel(WizardViewModel parent)
            : base(parent, 7)
        {
           // StepNumber = 7;
        }
    }
}