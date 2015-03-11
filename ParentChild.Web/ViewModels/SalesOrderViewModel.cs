using ParentChild.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ParentChild.Web.ViewModels
{
    public class SalesOrderViewModel : IObjectWithState
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string PONumber { get; set; }

        public string MessageToClient { get; set; }
        public ObjectState ObjectState { get; set; }

        public SalesOrderViewModel()
        {
            MessageToClient = "I originated from the viewmodel, not the model";
            ObjectState = ObjectState.Added;
        }
        public SalesOrderViewModel(SalesOrder salesOrder) 
        {
            Id = salesOrder.Id;
            CustomerName = salesOrder.CustomerName;
            ObjectState = ObjectState.Unchanged;
            PONumber = salesOrder.PONumber;
            MessageToClient = string.Format(
               "The original value of Customer Name is {0}", salesOrder.CustomerName);
        }

        public SalesOrder CreateDomainObject()
        {
            var salesOrder = new SalesOrder();
            salesOrder.Id = this.Id;
            salesOrder.CustomerName = this.CustomerName;
            salesOrder.PONumber = this.PONumber;
            salesOrder.ObjectState = this.ObjectState;

            return salesOrder;
        }
        //public void FromExistingDomainObject(SalesOrder salesOrderDomainObj)
        //{
        //    this.Id=salesOrderDomainObj.Id;
        //    this.CustomerName=salesOrderDomainObj.CustomerName;
        //    this.PONumber=salesOrderDomainObj.PONumber;
        //    this.MessageToClient = string.Format(
        //        "The original value of Customer Name is {0}", salesOrderDomainObj.CustomerName
        //    );
        //}

    }
}