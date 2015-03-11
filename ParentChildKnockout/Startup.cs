using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ParentChildKnockout.Startup))]
namespace ParentChildKnockout
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
