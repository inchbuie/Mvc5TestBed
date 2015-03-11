using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mvc5TestBed.MyMvcWebApp.Models.Wizard
{

    public interface IStep
    {
        WizardViewModel ParentWizard { get; }
        bool IsCurrent { get; set; }

        int StepNumber { get; set; }

        IStep Next();
        IStep Back();
        IStep Skip();
    }
}