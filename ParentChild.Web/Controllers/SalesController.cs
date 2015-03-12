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
using System.Data.Entity.Validation;

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
            var salesOrderViewModel = ViewModelHelpers.CreateSalesOrderViewModelFromSalesOrder(salesOrder);
            salesOrderViewModel.MessageToClient = "I originated from the viewmodel, not the model";

            return View(salesOrderViewModel);
        }

        public ActionResult Create()
        {
            var viewModel = new SalesOrderViewModel();
            return View(viewModel);
        }

        public JsonResult Save(SalesOrderViewModel salesOrderViewModel)
        {
            SalesOrder salesOrder = ViewModelHelpers.CreateSalesOrderFromSalesOrderViewModel(salesOrderViewModel);
            salesOrder.ObjectState = salesOrderViewModel.ObjectState;

            _salesContext.SalesOrders.Attach(salesOrder);
            _salesContext.ChangeTracker.Entries<IObjectWithState>().Single().State =
                ParentChild.DataLayer.DataLayerHelpers.ConvertState(salesOrder.ObjectState);
            try
            {
                _salesContext.SaveChanges();
            }
            catch (DbEntityValidationException e)
            {
                var validationErrors = e.EntityValidationErrors.ToList();
                throw;
            }

            if (salesOrder.ObjectState == ObjectState.Deleted)
            {
                //when deleting, do not return a view, tell the client to go to the Index instead
                //(we will program the client to look for this anonymous object)
                return Json(new { newLocation = "/Sales/Index/" });
            }

            salesOrderViewModel.MessageToClient = ViewModelHelpers
                .GetMessageToClient(salesOrderViewModel.ObjectState, salesOrderViewModel.CustomerName);

            salesOrderViewModel.ObjectState = ObjectState.Unchanged;
            salesOrderViewModel.Id = salesOrder.Id;
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
            var salesOrderViewModel = ViewModelHelpers.CreateSalesOrderViewModelFromSalesOrder(salesOrder);
            salesOrderViewModel.MessageToClient = string.Format(
               "The original value of Customer Name is {0}", salesOrder.CustomerName);
            salesOrderViewModel.ObjectState = ObjectState.Unchanged;

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
            var salesOrderViewModel = ViewModelHelpers.CreateSalesOrderViewModelFromSalesOrder(salesOrder);
            salesOrderViewModel.MessageToClient = "You are about to permanently delete this sales order.";
            salesOrderViewModel.ObjectState = ObjectState.Deleted;
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
