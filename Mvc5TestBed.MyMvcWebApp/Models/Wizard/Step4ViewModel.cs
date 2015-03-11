using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mvc5TestBed.MyMvcWebApp.Models.Wizard
{
    public class Step4ViewModel : StepViewModel
    {
        public Step4ViewModel(WizardViewModel parent)
            : base(parent, 4)
        {
            //StepNumber = 4;
        }

    }
}