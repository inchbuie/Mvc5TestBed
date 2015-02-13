using SpecsDemo.SampleWebApp.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace SpecsDemo.SampleWebApp.Filters
{
    public class MattOnlyAttribute : ActionFilterAttribute
    {
        public ICurrentUser CurrentUser { get; set; }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (CurrentUser.UserName != "Matt")
            {
                filterContext.Result = new ViewResult { ViewName = "YouAreNotMatt" };
            }
        }
    }
}