using SpecsDemo.SampleWebApp.Helpers;
using HtmlTags;
using Microsoft.Web.Mvc;
using System;
using System.Web.Mvc;
using System.Linq;
using System.Linq.Expressions;

namespace SpecsDemo.SampleWebApp.Helpers
{
    public static class BootstrapHelpers
    {
        public static HtmlTag BootstrapButton( this HtmlHelper helper, string text)
        {
            return new HtmlTag("button")
                .Attr("type", "submit")
                .AddClasses("btn", "btn-primary")
                .Text(text);
        }

        public static HtmlTag BootstrapActionLinkButton<TController>(this HtmlHelper helper, 
            Expression<Action<TController>> action,
            string label) where TController:Controller
        {
            var targetUrl = helper.BuildUrlFromExpression(action);
            var tag = new HtmlTag("a");
            tag.Attr("href", targetUrl);
            tag.AddClasses("btn", "btn-primary");
            tag.Text(label);
            return tag;
        }
    }
}