using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mvc5TestBed.MyMvcWebApp.Models.Wizard
{

    public interface IStep_OLD
    {
        WizardViewModel_OLD ParentWizard { get; }
        bool IsCurrent { get; set; }

        int StepNumber { get; set; }

        IStep_OLD Next();
        IStep_OLD Back();
        IStep_OLD Skip();
    }
}