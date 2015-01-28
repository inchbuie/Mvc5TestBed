using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Mvc5TestBed.Startup))]
namespace Mvc5TestBed
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
