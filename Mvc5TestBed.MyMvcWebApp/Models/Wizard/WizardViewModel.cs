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
            Initialize(1);
        }
        public WizardViewModel(int numSteps=1)
        {
            Initialize(numSteps);
        }
        public void Initialize(int numSteps)
        {
            Steps = new List<StepViewModel>(numSteps);
            for (int i = 0; i < numSteps; i++)
            {
                var step = new StepViewModel(this, i + 1);
                Steps.Add(step);
            }
            //    Step1 = new Step1ViewModel(this);
            //Step2 = new Step2ViewModel(this);
            //Step3 = new Step3ViewModel(this);
            //Step4 = new Step4ViewModel(this);
            //Step5 = new Step5ViewModel(this);
            //Step6 = new Step6ViewModel(this);
            //Step7 = new Step7ViewModel(this);
            CurrentStep = GetFirstStep();
            //Steps = new List<StepViewModel> { Step1, Step2, Step3, Step4, Step5, Step6, Step7 };
        }
        //public Step1ViewModel Step1 { get; set; }
        //public Step2ViewModel Step2 { get; set; }
        //public Step3ViewModel Step3 { get; set; }
        //public Step4ViewModel Step4 { get; set; }
        //public Step5ViewModel Step5 { get; set; }
        //public Step6ViewModel Step6 { get; set; }
        //public Step7ViewModel Step7 { get; set; }

        public List<StepViewModel> Steps;

        public StepViewModel GetFirstStep()
        {
            return GetFirstStep(Steps);
        }
        public StepViewModel GetFirstStep(List<StepViewModel> steps)
        {
            return steps.Aggregate((x, y) => x.StepNumber < y.StepNumber ? x : y);
        }

        public IStep CurrentStep { get; set; }
        public int CurrentStepNumber
        {
            get
            {
                if (null != CurrentStep)
                {
                    return CurrentStep.StepNumber;
                }
                return -1;
            }
        }

        public int StepCount
        {
            get { return Steps.Count(); }
        }

        public bool IsOnFirstStep
        {
            get
            {
                return CurrentStepNumber == Steps.Min(s => s.StepNumber);
            }
        }
        public bool IsOnLastStep
        {
            get
            {
                return CurrentStepNumber == Steps.Max(s => s.StepNumber);
            }
        }

        public void Advance()
        {
            int nextStepNum = CurrentStepNumber+1;
            CurrentStep = Steps.Where(s => s.StepNumber == nextStepNum).FirstOrDefault();
            foreach(StepViewModel step in Steps.ToList())
            {
                step.IsCurrent = step.StepNumber==nextStepNum;
            }
        }
        public void GoBack()
        {
            int lastStepNum = CurrentStepNumber - 1;
            CurrentStep = Steps.Where(s => s.StepNumber == lastStepNum).FirstOrDefault();
            foreach (StepViewModel step in Steps.ToList())
            {
                step.IsCurrent = step.StepNumber == lastStepNum;
            }
        }

        public void Cancel() { }
        public void Save() { }
    } 

    
}