using Moq;
using NUnit.Framework;
using SpecsDemo.SampleWebApp.Controllers;
using SpecsDemo.SampleWebApp.Domain;
using SpecsDemo.SampleWebApp.Models;
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
    public class HomeControllerNunitTests
    {
        [Test]
        public void index_action_returns_a_view_result()
        {
            var mockUser = new Mock<ICurrentUser>();
            var sut = new HomeController(mockUser.Object);
            var result = sut.Index();
            Assert.That(result, Is.TypeOf<ViewResult>());
        }

        [Test]
        public void index_action_says_hello_to_current_user()
        {
            var mockUser = new Mock<ICurrentUser>();
            mockUser.Setup(x => x.UserName).Returns("John Smith");
            var sut = new HomeController(mockUser.Object);
            var result = sut.Index();
            Assert.That(sut.ViewBag.Message, Is.EqualTo("Hello, John Smith!"));
        }

        [Test]
        public void say_hello_action_says_hello_to_the_specified_user()
        {
            var mockUser = new Mock<ICurrentUser>();
            var sut = new HomeController(mockUser.Object);
            var result = sut.SayHello("John Doe");
            Assert.That(result, Is.TypeOf<ViewResult>());
            Assert.That(((ViewResult)result).Model, Is.TypeOf<SayHelloViewModel>());
            Assert.That(((SayHelloViewModel)((ViewResult)result).Model).Name, Is.EqualTo("John Doe"));
        }

        [Test]
        public void say_hello_post_action_redirects_for_the_specified_user()
        {
            var mockUser = new Mock<ICurrentUser>();
            var sut = new HomeController(mockUser.Object);
            var result = sut.SayHello(new SayHelloForm { Name = "John Doe" });
            Assert.That(result, Is.TypeOf<RedirectToRouteResult>());

            var routeResult = (RedirectToRouteResult)result;
            Assert.That(routeResult.RouteValues["action"], Is.EqualTo("SayHello"));
            Assert.That(routeResult.RouteValues["name"], Is.EqualTo("John Doe"));
        }

        [Test]
        public void setting_name_changes_the_name_of_the_current_user()
        {
            var mockUser = new Mock<ICurrentUser>();
            var sut = new HomeController(mockUser.Object);
            var result = sut.SetName("Jane Doe");

            //result should be a redirect to route
            Assert.That(result, Is.TypeOf<RedirectToRouteResult>());
            var routeResult = (RedirectToRouteResult)result;
            //should redirect to Index action
            Assert.That(routeResult.RouteValues["action"], Is.EqualTo("Index"));
            //should call interface method to set name
            mockUser.Verify(x => x.SetName("Jane Doe"));
        }

        [Test]
        public void trying_to_set_an_empty_name_fails()
        {
            var mockUser = new Mock<ICurrentUser>();
            var sut = new HomeController(mockUser.Object);
            var result = sut.SetName(null);

            //should return form again, not redirect
            Assert.That(result, Is.TypeOf<ViewResult>());
            //should NOT call interface method to set name
            mockUser.Verify(x => x.SetName(It.IsAny<string>()), Times.Never);
        }
    }

}
