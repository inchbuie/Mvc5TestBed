using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Mvc5TestBed.MyMvcWebApp.Models.Wizard
{
    public class StepViewModel_OLD : IStep_OLD
    {
        private WizardViewModel_OLD _parent;

        public StepViewModel_OLD()
        {
            _parent = null;
            StepNumber = -1;
        }

        public StepViewModel_OLD(WizardViewModel_OLD parent, int stepNumber)
        {
            _parent = parent;
            StepNumber = stepNumber;
        }

        [HiddenInput]
        public WizardViewModel_OLD ParentWizard
        {
            get { return _parent; }
        }

        public bool IsCurrent { get; set; }

        public int StepNumber { get; set; }

        public IStep_OLD Next()
        {
            throw new NotImplementedException();
        }

        public IStep_OLD Back()
        {
            throw new NotImplementedException();
        }

        public IStep_OLD Skip()
        {
            throw new NotImplementedException();
        }
    }
}