using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mvc5TestBed.MyMvcWebApp.Models.Wizard
{
    public class Step5ViewModel : StepViewModel
    {
        public Step5ViewModel(WizardViewModel parent)
            : base(parent, 5)
        {
            //StepNumber = 5;
        }

    }
}