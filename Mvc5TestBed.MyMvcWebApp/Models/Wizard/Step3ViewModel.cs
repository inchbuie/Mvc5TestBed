using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mvc5TestBed.MyMvcWebApp.Models.Wizard
{
    public class Step3ViewModel : StepViewModel
    {
        public Step3ViewModel(WizardViewModel parent)
            : base(parent, 3)
        {
            //StepNumber = 3;
        }

    }
}