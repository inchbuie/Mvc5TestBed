using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SpecsDemo.SampleWebApp.Domain
{
    public class CurrentUser : ICurrentUser
    {
        private readonly HttpSessionStateBase _session;

        public CurrentUser(HttpSessionStateBase session)
        {
            _session = session;
        }

        public string UserName
        {
            get
            {
                return (string)(_session["name"] ?? "Unknown");
            }
        }
        public void SetName(string name)
        {
            _session["name"] = name;
        }
    }
}