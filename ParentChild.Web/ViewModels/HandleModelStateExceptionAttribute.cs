using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace ParentChild.Web.ViewModels
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple=false)]
    public sealed class HandleModelStateExceptionAttribute : FilterAttribute, IExceptionFilter
    {
        public void OnException(ExceptionContext filterContext)
        {
            if (filterContext == null) throw new ArgumentNullException("filterContext");

            // we only care about ModelState Exceptions
            // that haven't already been handled
            if (filterContext.Exception != null 
                && typeof(ModelStateException).IsInstanceOfType(filterContext.Exception)
                && !filterContext.ExceptionHandled)
            {
                //populate filterContext with what the client-side save() error handler will need
                //  to parse & report the server-side validation errors
                filterContext.ExceptionHandled = true;
                filterContext.HttpContext.Response.Clear();
                filterContext.HttpContext.Response.ContentEncoding=Encoding.UTF8;
                filterContext.HttpContext.Response.HeaderEncoding = Encoding.UTF8;
                filterContext.HttpContext.Response.TrySkipIisCustomErrors = true;
                filterContext.HttpContext.Response.StatusCode = 400;
                filterContext.Result = new ContentResult
                {
                    //set content to property of our custom exception, 
                    // which has all validation errors concatenated into one Message
                    Content = (filterContext.Exception as ModelStateException).Message,
                    ContentEncoding = Encoding.UTF8
                };
            }
        }
    }
}