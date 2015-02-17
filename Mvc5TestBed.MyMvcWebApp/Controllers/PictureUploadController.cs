using Mvc5TestBed.MyMvcWebApp.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Mvc5TestBed.MyMvcWebApp.Controllers
{
    public class PictureUploadController : Controller
    {
        // GET: Loading
        public ActionResult Index(UploadThingy info)
        {
            //var o = new UploadThingy();
            //o.ImgUrl = imgUrl;
            return View("Index", info);
        }

        [HttpPost]
        public ActionResult Upload(IEnumerable<HttpPostedFileBase> pictureFiles)
        {
            string pathToSave=null;
            foreach (var pictureFile in pictureFiles)
            {
                if (null==pictureFile || pictureFile.ContentLength == 0)
                    continue;
                pathToSave = Path.Combine(
                   AppDomain.CurrentDomain.BaseDirectory,
                   Path.GetFileName(pictureFile.FileName));
                //pictureFile.SaveAs(pathToSave);

                //for now just do 1...
                break;
            }
            var o = new UploadThingy()
            {
                //as test, ignore path &hard-code this                
                ImgUrl = Url.Content("~/images/darth.png")
            };
            return View("Index", o);
        }
    }
}