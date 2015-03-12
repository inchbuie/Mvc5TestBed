using Mvc5TestBed.MyMvcWebApp.Models.Wizard;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Mvc5TestBed.MyMvcWebApp.Controllers
{
    public class WizardController : Controller
    {
        // GET: Loading
        public ActionResult Index()
        {
            var viewModel = new WizardViewModel();
            return View(viewModel);
        }

        [HttpPost]
        public ActionResult Begin(WizardViewModel viewModel)
        {
           // return View("Step1", viewModel);
            return View("Step", viewModel);
        }


        //[HttpPost]
        //[OutputCacheAttribute(VaryByParam = "*", Duration = 0, NoStore = true)]
        //public ActionResult Next(WizardViewModel viewModel)
        //{
        //    viewModel.Advance();
        //    //var step = string.Format("Step{0}", viewModel.CurrentStepNumber);
        //    //return View(step, viewModel);
        //    return View("Step", viewModel);
        //}

        public JsonResult Back(WizardViewModel wizardViewModel)
        {
            wizardViewModel.GoBack();
            return Json(new { wizardViewModel });
        }

        [HttpPost]
        [OutputCacheAttribute(VaryByParam = "*", Duration = 0, NoStore = true)]
        public ActionResult Skip(WizardViewModel viewModel)
        {
            return View("Step");
        }

        [HttpPost]
        public ActionResult Complete(WizardViewModel viewModel)
        {
            return View("Step");
        }

        public JsonResult Next(WizardViewModel wizardViewModel)
        {
            wizardViewModel.Advance();
            return Json(new { wizardViewModel });
        }
    }
}