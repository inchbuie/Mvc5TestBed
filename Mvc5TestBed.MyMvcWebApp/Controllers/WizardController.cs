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
        [HttpPost]
        public JsonResult Next(WizardViewModel wizardViewModel)
        {
            if (wizardViewModel.SaveInProgress)
            {
                //TODO if save-in-progress, save data from wizard
            }
            wizardViewModel.Advance();
            return Json(new { wizardViewModel });
        }

        [HttpPost]
        public JsonResult Back(WizardViewModel wizardViewModel)
        {
            if (wizardViewModel.SaveInProgress)
            {
                //TODO if save-in-progress, save data from wizard
            }
            wizardViewModel.GoBack();
            return Json(new { wizardViewModel });
        }

        [HttpPost]
        public ActionResult Skip(WizardViewModel wizardViewModel)
        {
            if (!wizardViewModel.AllowSkipping) throw new ArgumentException("not allowed to skip");
            wizardViewModel.Advance();
            return Json(new { wizardViewModel });
        }

        [HttpPost]
        public JsonResult Cancel(WizardViewModel wizardViewModel)
        {
            if (!wizardViewModel.AllowCancel) throw new ArgumentException("not allowed to cancel");
            return Json(new { newLocation = Url.Action("Index", "Home") });
        }

        [HttpPost]
        public JsonResult Complete(WizardViewModel wizardViewModel)
        {
            //TODO save data from wizard
            return Json(new { newLocation = Url.Action("Index", "Home") });
        }

    }
}