using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Mvc5TestBed.MyMvcWebApp.Models.Wizard
{
    public class StepViewModel : IStep
    {
        private WizardViewModel _parent;

        public StepViewModel()
        {
            _parent = null;
            StepNumber = -1;
        }

        public StepViewModel(WizardViewModel parent, int stepNumber)
        {
            _parent = parent;
            StepNumber = stepNumber;
        }

        [HiddenInput]
        public WizardViewModel ParentWizard
        {
            get { return _parent; }
        }

        public bool IsCurrent { get; set; }

        public int StepNumber { get; set; }

        public IStep Next()
        {
            throw new NotImplementedException();
        }

        public IStep Back()
        {
            throw new NotImplementedException();
        }

        public IStep Skip()
        {
            throw new NotImplementedException();
        }
    }
}