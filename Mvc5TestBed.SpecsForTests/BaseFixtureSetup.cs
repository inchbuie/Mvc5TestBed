using Mvc5TestBed.MyMvcWebApp;
using NUnit.Framework;
using SpecsFor.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mvc5TestBed.SpecsForTests
{
    [SetUpFixture]
    public class BaseFixtureSetup
    {
        private SpecsForIntegrationHost _host;

        [SetUp]
        public void SetupTestRun()
        {
            var config = new SpecsForMvcConfig();

            //SpecsFor.Mvc can spin up an instance of IIS Express to host your app
            //while the specs are executing.
            config.UseIISExpress()
                //To do that, it needs to know the name of the project to test...
                .With(Project.Named("Mvc5TestBed.MyMvcWebApp"));
                //And optionally, it can apply Web.config transformations if you want it to
                //.ApplyWebConfigTransformForConfig("Test");

            //In order to leverage the strongly-typed helpers in SpecsFor.Mvc,
            //you need to tell it about your routes.  Here we are just calling
            //the infrastructure class from our MVC app that builds the RouteTable.
            config.BuildRoutesUsing(r => RouteConfig.RegisterRoutes(r));
            //SpecsFor.Mvc can use either Internet Explorer or Firefox.  Support
            //for Chrome is planned for a future release.
            config.UseBrowser(BrowserDriver.Chrome);
            //config.UseBrowser(BrowserDriver.Firefox);


            //// If you want to be authenticated for each request, 
            // // implement IHandleAuthentication
            //config.AuthenticateBeforeEachTestUsing<SampleAuthenticator>();

            //Does your application send E-mails?  Well, SpecsFor.Mvc can intercept
            //those while your specifications are executing, enabling you to write
            //tests against the contents of sent messages.
            config.InterceptEmailMessagesOnPort(50957);

            //The host takes our configuration and performs all the magic.  We
            //need to keep a reference to it so we can shut it down after all
            //the specifications have executed.
            _host = new SpecsForIntegrationHost(config);
            _host.Start();

        }

        [TearDown]
        public void TearDownTestRun()
        {
            _host.Shutdown();
        }
    }
}
