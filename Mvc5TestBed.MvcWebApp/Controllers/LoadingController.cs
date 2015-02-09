using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Mvc5TestBed.MvcWebApp.Controllers
{
    public class LoadingController : Controller
    {
        // GET: Loading
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> LoadResult()
        {
            int seconds = 8;
            Task<int> longRunningTask = LongRunningOperation(seconds);
            //work independent to async task could go here

            //call long-running task asynchronously & await result
            await longRunningTask;

            return PartialView("_LoadResult", seconds);
        }

        private async Task<int> LongRunningOperation(int sec)
        {
            await Task.Delay(sec*1000); 
            return 0;
        }
        
        [HttpGet]
        public ActionResult CssLoader()
        {

            return View();
        }

        [HttpGet]
        public ActionResult AnimGifLoader1()
        {
            return View();
        }

        [HttpGet]
        public ActionResult AnimGifLoader2()
        {
            return View();
        }
    }
}