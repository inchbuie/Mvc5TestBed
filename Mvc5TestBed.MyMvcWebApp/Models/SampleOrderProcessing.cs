using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mvc5TestBed.MyMvcWebApp.Models
{
    public interface IPublisher
    {
        object Publish(OrderSubmitted orderSubmitted);
    }
    public interface IInventory
    {

        object IsQuantityAvailable(string p1, int p2);
    }
    public class OrderProcessor
    {
        public OrderResult Process(Order order)
        {
            throw new NotImplementedException();
        }
    }
    public class OrderResult
    {
        public bool WasAccepted { get; set; }

        public object OrderNumber { get; set; }
    }
    public class OrderSubmitted
    {
        public bool WasAccepted { get; set; }

        public object OrderNumber { get; set; }
    }
    public class Order
    {
        public string PartNumber { get; set; }

        public int Quantity { get; set; }
    }
}