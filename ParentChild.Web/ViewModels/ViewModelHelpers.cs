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
            var salesOrderViewModel = new SalesOrderViewModel();
            salesOrderViewModel.Id = salesOrder.Id;
            salesOrderViewModel.CustomerName = salesOrder.CustomerName;
            salesOrderViewModel.PONumber = salesOrder.PONumber;
            salesOrderViewModel.ObjectState = ObjectState.Unchanged;
            salesOrderViewModel.RowVersion = salesOrder.RowVersion;

            foreach (var item in salesOrder.Items)
            {
                var itemViewModel = new SalesOrderItemViewModel();
                itemViewModel.Id = item.Id;
                itemViewModel.ProductCode = item.ProductCode;
                itemViewModel.Quantity = item.Quantity;
                itemViewModel.UnitPrice = item.UnitPrice;
                itemViewModel.ObjectState = ObjectState.Unchanged;
                itemViewModel.SalesOrderId = item.SalesOrderId;
                salesOrderViewModel.Items.Add(itemViewModel);
            }
            return salesOrderViewModel;
        }

        public static SalesOrder CreateSalesOrderFromSalesOrderViewModel(SalesOrderViewModel orderViewModel)
        {
            var salesOrder = new SalesOrder();
            salesOrder.Id = orderViewModel.Id;
            salesOrder.CustomerName = orderViewModel.CustomerName;
            salesOrder.PONumber = orderViewModel.PONumber;
            salesOrder.ObjectState = orderViewModel.ObjectState;
            salesOrder.RowVersion = orderViewModel.RowVersion;

            //assign negative temporary PK so EF can distinguish entities (DB will disregard negatives)
            int tempItemId = -1;

            foreach (var itemViewModel in orderViewModel.Items)
            {
                var item = new SalesOrderItem();
                item.ProductCode = itemViewModel.ProductCode;
                item.Quantity = itemViewModel.Quantity;
                item.UnitPrice = itemViewModel.UnitPrice;
                item.ObjectState = itemViewModel.ObjectState;

                if (itemViewModel.ObjectState != ObjectState.Added)
                {
                    item.Id = itemViewModel.Id;
                }
                else
                {
                    item.Id = tempItemId;
                    tempItemId--;
                }
                item.SalesOrderId = itemViewModel.SalesOrderId;
                salesOrder.Items.Add(item);

            }

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