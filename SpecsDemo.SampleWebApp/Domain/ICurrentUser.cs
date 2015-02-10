using System;
namespace SpecsDemo.SampleWebApp.Domain
{
    public interface ICurrentUser
    {
        void SetName(string name);
        string UserName { get; }
    }
}
