using ParentChild.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ParentChild.Web.ViewModels
{
    public class SalesOrderViewModel : IObjectWithState
    {
        public SalesOrderViewModel()
        {
            MessageToClient = "I originated from the viewmodel, not the model";
            ObjectState = ObjectState.Added;
            Items = new List<SalesOrderItemViewModel>();
            ItemsToDelete = new List<int>();
        }

        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string PONumber { get; set; }

        public string MessageToClient { get; set; }
        public ObjectState ObjectState { get; set; }

        public List<SalesOrderItemViewModel> Items { get; set; }

        public List<int> ItemsToDelete { get; set; }

    }
}