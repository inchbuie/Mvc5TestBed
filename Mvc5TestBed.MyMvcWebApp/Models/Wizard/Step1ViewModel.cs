using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mvc5TestBed.MyMvcWebApp.Models.Wizard
{
    public class Step1ViewModel : StepViewModel
    {
        public Step1ViewModel(WizardViewModel parent)
            : base(parent, 1)
        {
            //StepNumber = 1;
        }


        //public bool IsCurrent
        //{
        //    get
        //    {
        //        throw new NotImplementedException();
        //    }
        //    set
        //    {
        //        throw new NotImplementedException();
        //    }
        //}

        //public int StepNumber
        //{
        //    get
        //    {
        //        throw new NotImplementedException();
        //    }
        //    set
        //    {
        //        throw new NotImplementedException();
        //    }
        //}

        //public IStep Next()
        //{
        //    throw new NotImplementedException();
        //}

        //public IStep Back()
        //{
        //    throw new NotImplementedException();
        //}

        //public IStep Skip()
        //{
        //    throw new NotImplementedException();
        //}
    }
}