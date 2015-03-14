using ParentChild.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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

        [SimulatedExpenseive_CheckScore_Attribute(3.14)]
        [Required(ErrorMessage="Server: You cannot create a sales order unless you supply the customer's name.")]
        [StringLength(30, ErrorMessage = "Server: Customer names must be 30 characters or shorter. ")]
        public string CustomerName { get; set; }

        [StringLength(10, ErrorMessage = "Server: PO Numbers names must be 10 characters or shorter. ")]
        public string PONumber { get; set; }

        public string MessageToClient { get; set; }

        public ObjectState ObjectState { get; set; }

        public List<SalesOrderItemViewModel> Items { get; set; }

        public List<int> ItemsToDelete { get; set; }

    }
}