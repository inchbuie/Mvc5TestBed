using ParentChild.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ParentChild.Web.ViewModels
{
    public class SalesOrderItemViewModel : IObjectWithState
    {
        public int Id { get; set; }
        public string ProductCode { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public int SalesOrderId { get; set; }
        public ObjectState ObjectState { get; set; }

        //public SalesOrderItemViewModel()
        //{
        //    ObjectState = ObjectState.Added;
        //}
    }
}