using ParentChild.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ParentChild.Web.ViewModels
{
    public class SalesOrderItemViewModel : IObjectWithState
    {
        public int Id { get; set; }


        [Required(ErrorMessage = "Server: You cannot create a sales order item unless you supply the product code.")]
        [StringLength(15, ErrorMessage = "Server: Product Codes must be 15 characters or shorter. ")]
        [RegularExpression(@"^[A-Za-z]+$", ErrorMessage="Server: Product Codes consist of letters only.")]
        public string ProductCode { get; set; }

        [Required(ErrorMessage = "Server: You cannot create a sales order item unless you supply the quantity.")]
        [Range(1, 1000000, ErrorMessage = "Server: Quantity must be between 1 and 1,000,000")]
        public int Quantity { get; set; }

        [Required(ErrorMessage = "Server: Unit Price is a required field.")]
        [Range(0, 100000, ErrorMessage = "Server: Unit Price must be between zero and 100,000")]
        public decimal UnitPrice { get; set; }

        public int SalesOrderId { get; set; }

        public ObjectState ObjectState { get; set; }

        /// <summary>
        /// for concurrency tracking
        /// </summary>
        public byte[] RowVersion { get; set; }
    }
}