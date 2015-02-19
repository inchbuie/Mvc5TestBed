using Mvc5TestBed.MyMvcWebApp.Models;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
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
        public ActionResult Index(ProfileImage img)
        {
            //var o = new UploadThingy();
            //o.ImgUrl = imgUrl;
            return View("Index", img);
        }

        private Image GetImage(HttpPostedFileBase pictureFile)
        {
            var img = Image.FromStream(pictureFile.InputStream, true, true);
            return img;
        }

        public byte[] CreateBytesForImg(Image img)
        {
            byte[] bytes;
            using (var memStream = new MemoryStream())
            {
                img.Save(memStream, ImageFormat.Jpeg);
                bytes = memStream.ToArray();
            }
            return bytes;
        }

        [HttpPost]
        public ActionResult Upload(ProfileImage img)
        {
            //save to db or whatever...
            return View("Index", img);
        }

        //[HttpPost]
        //public ActionResult Upload(IEnumerable<HttpPostedFileBase> pictureFiles)
        //{
        //    string pathToSave=null;
        //    foreach (var pictureFile in pictureFiles)
        //    {
        //        if (null==pictureFile || pictureFile.ContentLength == 0)
        //            continue;
        //        pathToSave = Path.Combine(
        //           AppDomain.CurrentDomain.BaseDirectory,
        //           Path.GetFileName(pictureFile.FileName));

        //        ViewBag.ImageBytes = CreateBytesForImg(GetImage(pictureFile));

        //        //for now just do 1...
        //        break;
        //    }
        //    return View("Index");
        //}

        public ActionResult JcropBasicDemo()
        {
            return View();
        }

        public ActionResult DragUpload(ProfileImage img)
        {
            return View(img);
        }

        [HttpPost]
        public ActionResult DragUpload(IEnumerable<HttpPostedFileBase> pictureFiles)
        {
            //TODO 
            string pathToSave = null;
            foreach (var pictureFile in pictureFiles)
            {
                if (null == pictureFile || pictureFile.ContentLength == 0)
                    continue;
                pathToSave = Path.Combine(
                   AppDomain.CurrentDomain.BaseDirectory,
                   Path.GetFileName(pictureFile.FileName));
                //pictureFile.SaveAs(pathToSave);

                //for now just do 1...
                break;
            }
            var img = new ProfileImage()
            {
                //as test, ignore path &hard-code this                
                ImageData = System.IO.File.ReadAllBytes("~/images/darth.png")
            };
            return View("DragUpload", img);
        }


        public ActionResult ClientSideCrop()
        {
            return View();
        }
    }
}