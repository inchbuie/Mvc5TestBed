using SpecsDemo.SampleWebApp.Domain;
using SpecsDemo.SampleWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SpecsDemo.SampleWebApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ICurrentUser _currentUser;

        public HomeController(ICurrentUser currentUser)
        {
            _currentUser = currentUser;
        }

        public ActionResult Index()
        {
            ViewBag.Message = string.Format("Hello, {0}!", _currentUser.UserName); ;
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult SayHello(string name)
        {
            var model = new SayHelloViewModel
            {
                Name = name
            };
            return View(model);
        }

        [HttpPost]
        public ActionResult SayHello(SayHelloForm form)
        {
            return RedirectToAction("SayHello", new { name = form.Name });
        }

        public ActionResult SetName()
        {
            return View();
        }

        [HttpPost]
        public ActionResult SetName(string name)
        {
            _currentUser.SetName(name);
            return RedirectToAction("Index");
        }
    }
}