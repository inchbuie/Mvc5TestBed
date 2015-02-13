using Moq;
using NUnit.Framework;
using SpecsDemo.SampleWebApp.Controllers;
using SpecsDemo.SampleWebApp.Domain;
using SpecsDemo.SampleWebApp.Models;
using SpecsFor;
using SpecsFor.Helpers.Web.Mvc;
using Should;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using SpecsDemo.SampleWebApp.Filters;

namespace SpecsDemo.SampleWebAppSpecs.WebApp.Filters
{
    [TestFixture]
    public class MattOnlyAttributeSpecs
    {        
        [TestFixture]
        public class when_the_user_is_not_matt : SpecsFor<MattOnlyAttribute>
        {
            private FakeActionExecutingContext _filterContext;
            protected override void Given()
            {
                var userMock = GetMockFor<ICurrentUser>();
                userMock.Setup(x => x.UserName).Returns("John");
                SUT.CurrentUser = userMock.Object;
            }
            protected override void When()
            {
                _filterContext = new FakeActionExecutingContext();
                SUT.OnActionExecuting(_filterContext);
            }

            [Test]
            public void then_the_filter_displays_an_unauthorzied_view()
            {
                //using SpecsFor.Helpers.Web.Mvc
                _filterContext.Result.ShouldRenderView()
                    .ViewName.ShouldEqual("YouAreNotMatt");
            }
        }
        [TestFixture]
        public class when_the_user_is_matt : SpecsFor<MattOnlyAttribute>
        {
            private FakeActionExecutingContext _filterContext;
            protected override void Given()
            {
                var userMock = GetMockFor<ICurrentUser>();
                userMock.Setup(x => x.UserName).Returns("Matt");
                SUT.CurrentUser = userMock.Object;
            }
            protected override void When()
            {
                _filterContext = new FakeActionExecutingContext();
                SUT.OnActionExecuting(_filterContext);
            }

            [Test]
            public void then_the_filter_does_not_alter_the_result()
            {
                //using SpecsFor.Helpers.Web.Mvc
                _filterContext.Result.ShouldBeNull();
            }
        }    
    }
}
