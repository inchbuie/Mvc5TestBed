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

namespace SpecsDemo.SampleWebAppSpecs.WebApp.Controllers
{
    [TestFixture]
    public class HomeControllerSpecs
    {
        [TestFixture]
        public class when_viewing_index_action : SpecsFor<HomeController>
        {
            private ActionResult _result;

            protected override void Given()
            {
                GetMockFor<ICurrentUser>()
                    .Setup(x => x.UserName)
                    .Returns("John Doe");
            }

            protected override void When()
            {
                _result = SUT.Index();
            }
            [Test]
            public void then_it_returns_a_view_result()
            {
                _result.ShouldBeType<ViewResult>();
            }
            [Test]
            public void then_it_says_hello_to_the_viewer()
            {
                string msg = ((ViewResult)_result).ViewBag.Message;
                msg.ShouldEqual("Hello, John Doe!");
            }
        }

        [TestFixture]
        public class when_saying_hello_to_a_user : SpecsFor<HomeController>
        {
            private ActionResult _result;
            protected override void When()
            {
                _result = SUT.SayHello("John Doe");
            }

            [Test]
            public void then_it_says_hello_to_the_user()
            {
                //using SpecsFor.Helpers.Web.Mvc
                _result.ShouldRenderDefaultView()
                    .WithModelLike(new SayHelloViewModel
                    {
                        Name = "John Doe"
                    }); 
            }
        }

        [TestFixture]
        public class when_setting_users_name : SpecsFor<HomeController>
        {
            private ActionResult _result;
            protected override void When()
            {
                _result = SUT.SetName("Jane Doe");
            }
                
            [Test]
            public void then_it_sets_the_name_of_the_user()
            {
                 GetMockFor<ICurrentUser>()
                    .Verify(x => x.SetName("Jane Doe"));
            }
            [Test]
            public void then_it_redirects_back_home()
            {
                //without web helpers:
                var routeResult = (RedirectToRouteResult)_result;
                routeResult.RouteValues["action"].ShouldEqual("Index");
            }
            [Test]
            public void then_it_redirects_back_home_using_web_helpers()
            {
                //with web helpers using SpecsFor.Helpers.Web.Mvc
                //only works if Web project is using Microsoft.Web.Mvc Futures
                _result.ShouldRedirectTo<HomeController>(c =>
                    c.Index());
            }
        }
        [TestFixture]
        public class when_saying_hello_with_a_form : SpecsFor<HomeController>
        {
            private ActionResult _result;
            protected override void When()
            {
                _result = SUT.SayHello(new SayHelloForm { Name = "Jane Doe" });
            }

            [Test]
            public void then_it_redirects_to_the_say_hello_action()
            {
                //only works if Web project is using Microsoft.Web.Mvc Futures
                _result.ShouldRedirectTo<HomeController>(c =>
                    c.SayHello("Jane Doe"));
            }
        }
    }
}
