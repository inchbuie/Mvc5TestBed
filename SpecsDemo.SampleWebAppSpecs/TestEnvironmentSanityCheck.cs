using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SpecsDemo.SampleWebAppSpecs
{
    public class SanityCheckCalculator
    {
        public int Add(int x, int y)
        {
            return x+y;
        }
    }
    public class TestEnvironmentSanityCheckSpecs
    {
        [Test]
        public void then_zero_pluz_zero_is_zero()
        {
            var sut = new SanityCheckCalculator();
            var result = sut.Add(0, 0);
            Assert.That(result, Is.EqualTo(0));
        }
        [Test]
        public void then_one_plus_one_is_two()
        {
            var sut = new SanityCheckCalculator();
            var result = sut.Add(1, 1);
            Assert.That(result, Is.EqualTo(2));
        }
        [Test]
        public void then_two_plus_two_is_four()
        {
            var sut = new SanityCheckCalculator();
            var result = sut.Add(2, 2);
            Assert.That(result, Is.EqualTo(4));
        }
    }
}
