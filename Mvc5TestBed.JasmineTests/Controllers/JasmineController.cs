using System;
using System.Web.Mvc;

namespace Mvc5TestBed.JavascriptTests.Controllers
{
    public class JasmineController : Controller
    {
        public ViewResult Run()
        {
            return View("SpecRunner");
        }
    }
}
