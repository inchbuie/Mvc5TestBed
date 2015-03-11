using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ParentChild.DataLayer;
using ParentChild.Model;
using ParentChild.Web.ViewModels;

namespace ParentChild.Web.Controllers
{
    public class SalesController : Controller
    {
        private SalesContext _salesContext;

        public SalesController()
        {
            _salesContext = new SalesContext();
        }

        public ActionResult Index()
        {
            // return View(_salesContext.SalesOrders.Select(so=>new SalesOrderViewModel(so)).ToList());
            return View(_salesContext.SalesOrders.ToList());
        }

        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            SalesOrder salesOrder = _salesContext.SalesOrders.Find(id);
            if (salesOrder == null)
            {
                return HttpNotFound();
            }
            var salesOrderViewModel = new SalesOrderViewModel(salesOrder);

            return View(salesOrderViewModel);
        }

        public ActionResult Create()
        {
            var viewModel = new SalesOrderViewModel();
            return View(viewModel);
        }

        public JsonResult Save(SalesOrderViewModel salesOrderViewModel)
        {
            SalesOrder salesOrder = salesOrderViewModel.CreateDomainObject();

            _salesContext.SalesOrders.Add(salesOrder);
            _salesContext.SaveChanges();

            salesOrderViewModel.MessageToClient = string.Format(
                "{0}'s sales order has been added to the database",
                salesOrderViewModel.CustomerName);

            //return anonymous JSON object, not view model directly
            return Json(new { salesOrderViewModel });
        }

        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            SalesOrder salesOrder = _salesContext.SalesOrders.Find(id);
            if (salesOrder == null)
            {
                return HttpNotFound();
            }
            var salesOrderViewModel = new SalesOrderViewModel(salesOrder);
            return View(salesOrderViewModel);
        }

        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            SalesOrder salesOrder = _salesContext.SalesOrders.Find(id);
            if (salesOrder == null)
            {
                return HttpNotFound();
            }
            var salesOrderViewModel = new SalesOrderViewModel(salesOrder);
            return View(salesOrderViewModel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _salesContext.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
