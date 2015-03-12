using ParentChild.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ParentChild.Web.ViewModels
{
    public static class ViewModelHelpers
    {
        public static SalesOrderViewModel CreateSalesOrderViewModelFromSalesOrder(SalesOrder salesOrder)
        {
            var viewModel = new SalesOrderViewModel();
            viewModel.Id = salesOrder.Id;
            viewModel.CustomerName = salesOrder.CustomerName;
            viewModel.PONumber = salesOrder.PONumber;
            return viewModel;
        }
        public static SalesOrder CreateSalesOrderFromSalesOrderViewModel(SalesOrderViewModel viewModel)
        {
            var salesOrder = new SalesOrder();
            salesOrder.Id = viewModel.Id;
            salesOrder.CustomerName = viewModel.CustomerName;
            salesOrder.PONumber = viewModel.PONumber;

            return salesOrder;
        }

        public static string GetMessageToClient(ObjectState objectState, string customerName)
        {
            string msg = string.Empty;

            switch (objectState)
            {
                case ObjectState.Added:
                    msg = string.Format("{0}'s sales order has been added to the database", customerName);
                    break;
                case ObjectState.Modified:
                    msg = string.Format("{0}'s sales order has been modified", customerName);
                    break;
                case ObjectState.Deleted:
                case ObjectState.Unchanged:
                default:
                    break;
            }

            return msg;
        }
    }
}