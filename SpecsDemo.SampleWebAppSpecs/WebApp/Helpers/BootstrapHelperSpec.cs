using SpecsDemo.SampleWebApp.Helpers;
using HtmlTags;
using NUnit.Framework;
using SpecsFor;
using SpecsFor.Helpers.Web.Mvc;
using Should;
using SpecsDemo.SampleWebApp.Controllers;
using SpecsDemo.SampleWebApp;
using System.Web.Routing;

namespace SpecsDemo.SampleWebAppSpecs.WebApp.Helpers
{
    public class BootstrapHelperSpec
    {
        [TestFixture]
        public class when_creating_a_bootstrap_button : SpecsFor<FakeHtmlHelper>
        {
            private HtmlTag _button;
            protected override void When()
            {
                _button = SUT.BootstrapButton("Submit!");
            }

            [Test]
            public void then_it_creates_submit_button()
            {
                _button.Attr("type").ShouldEqual("submit");
            }

            [Test]
            public void then_it_sets_the_correct_button_classes()
            {
                _button.HasClass("btn").ShouldBeTrue();
                _button.HasClass("btn-primary").ShouldBeTrue();
            }
        }

        [TestFixture]
        public class when_creating_a_bootstrap_link_button : SpecsFor<FakeHtmlHelper>
        {
            private HtmlTag _link;

            protected override void Given()
            {
                //since helper generates links, must register routes 
                // ( * NOT the best way to do this for unit tests)
                RouteConfig.RegisterRoutes(RouteTable.Routes);
            }
            protected override void When()
            {
                _link = SUT.BootstrapActionLinkButton<HomeController>(
                    c => c.SetName(), "Set Name!");
            }

            [Test]
            public void then_it_builds_a_link_tag()
            {
                _link.TagName().ShouldEqual("a");
            }
            [Test]
            public void then_it_sets_the_link_correctly()
            {
                _link.Attr("href").ShouldEqual("/Home/SetName");
            }
            [Test]
            public void then_it_has_bootstrap_classes()
            {
                _link.HasClass("btn").ShouldBeTrue();
                _link.HasClass("btn-primary").ShouldBeTrue();
            }
        }
    }
}
