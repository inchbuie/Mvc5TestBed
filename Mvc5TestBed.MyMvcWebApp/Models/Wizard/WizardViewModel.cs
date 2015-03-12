using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mvc5TestBed.MyMvcWebApp.Models.Wizard
{
    public class WizardViewModel
    {
        public WizardViewModel()
        {
            CurrentStepNumber = 1;
            StepCount = 3;
            SaveInProgress = true;
            AllowCancel = true;
            AllowSkipping=true;
        }

        public int CurrentStepNumber {  get; set; }

        public int StepCount { get; set; }

        public bool SaveInProgress { get; set; }
        public bool AllowCancel { get; set; }
        public bool AllowSkipping { get; set; }

        public string Step_1_Field_A { get; set; }
        public string Step_1_Field_B { get; set; }

        public string Step_2_Field_A { get; set; }
        public int Step_2_Field_B { get; set; }
        public string Step_2_Field_C { get; set; }
        public string Step_2_Field_D { get; set; }

        public string Step_3_Field_A { get; set; }
        public bool Step_3_Field_B { get; set; }
        public string Step_3_Field_C { get; set; }

        public bool IsOnFirstStep
        {
            get
            {
                return CurrentStepNumber == 1;
            }
        }
       
        public bool IsOnLastStep
        {
            get
            {
                return CurrentStepNumber == StepCount;
            }
        }

        public void Advance()
        {
            CurrentStepNumber++;
        }
        public void GoBack()
        {
            CurrentStepNumber--;
        }

        public void Cancel() { }
        public void Save() { }
    } 

    
}