using System;
using NUnit.Framework;
using Mvc5TestBed.MyMvcWebApp.Models;
using Moq;
using SpecsFor;
using FluentAssertions;

namespace Mvc5TestBed.SpecsForTests
{
//BDD-Style Tests
public class SampleOrderProcessorSpecs
{
    public class given_the_item_is_available_when_processing_an_order : SpecsFor<OrderProcessor>
    {
        private OrderResult _result;
 
        protected override void Given()
        {
            GetMockFor<IInventory>()
                                .Setup(i => i.IsQuantityAvailable("TestPart", 10))
                                .Returns(true)
                                .Verifiable();
        }
 
        protected override void When()
        {
            _result = SUT.Process(new Order { PartNumber = "TestPart", Quantity = 10 });
        }
 
        [Test]
        public void then_the_order_is_accepted()
        {
            //_result.WasAccepted.ShouldBeTrue();	
            _result.WasAccepted.Should().BeTrue();	
        }
 
        [Test]
        public void then_it_checks_the_inventory()
        {
            GetMockFor<IInventory>().Verify();
        }
 
        [Test]
        public void then_it_raises_an_order_submitted_event()
        {
            GetMockFor<IPublisher>()
                .Verify(p => p.Publish(It.Is<OrderSubmitted>(o => o.OrderNumber == _result.OrderNumber)));
        }
    }
}
//...
//Old-school test methods
public class OrderProcessorSpecs : SpecsFor<OrderProcessor>
{
    [Test]
    public void Order_submitted_successfully_Tests()
    {
        GetMockFor<IInventory>()
            .Setup(i => i.IsQuantityAvailable("TestPart", 10))
            .Returns(true)
            .Verifiable();
 
        var result = SUT.Process(new Order {PartNumber = "TestPart", Quantity = 10});
 
        //result.WasAccepted.ShouldBeTrue();
        result.WasAccepted.Should().BeTrue();
 
        GetMockFor<IInventory>().Verify();
 
        GetMockFor<IPublisher>()
            .Verify(p => p.Publish(It.Is<OrderSubmitted>(o => o.OrderNumber == result.OrderNumber)));
    }
}
}
