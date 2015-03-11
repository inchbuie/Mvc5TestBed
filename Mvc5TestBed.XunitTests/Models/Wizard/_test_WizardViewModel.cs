using Mvc5TestBed.MyMvcWebApp.Models.Wizard;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using FluentAssertions;

namespace Mvc5TestBed.XunitTests.Models.Wizard
{
    public class _test_WizardViewModel
    {
        [Fact]
        public void ShouldDefaultToHavingOneStep()
        {
            var wiz = new WizardViewModel();
            wiz.StepCount.Should().Be(1);
        }

        [Fact]
        public void ShouldInitializeOnFirstStep()
        {
            var wiz = new WizardViewModel();
            wiz.CurrentStep.Should().NotBeNull();
            wiz.CurrentStepNumber.Should().Be(1);
        }

        
        [Fact]
        public void GivenSingleStepWizard_ItShouldStartOnTheFirstAndLastStep()
        {
            var wiz = new WizardViewModel();
            wiz.IsOnFirstStep.Should().BeTrue();
            wiz.IsOnLastStep.Should().BeTrue();
        }

        [Fact]
        public void CanInitializeWithNumberOfSteps()
        {
            var wiz = new WizardViewModel(3);
            wiz.StepCount.Should().Be(3);
            wiz.Steps.Count.Should().Be(3);
        }
        [Fact]
        public void GivenThreeStepWizard_ItShouldStartOnTheFirstButNotLastStep()
        {
            var wiz = new WizardViewModel(3);
            wiz.IsOnFirstStep.Should().BeTrue();
            wiz.IsOnLastStep.Should().BeFalse();
        }

        [Fact]
        public void GivenThreeStepWizard_CanAdvanceToSecondStep()
        {
            var wiz = new WizardViewModel(3);
            wiz.Advance();
            wiz.CurrentStep.Should().NotBeNull();
            wiz.CurrentStepNumber.Should().Be(2);
        }

        [Fact]
        public void GivenThreeStepWizard_AfterAdvanceToSecondStep_ShouldNotBeFirstNorLast()
        {
            var wiz = new WizardViewModel(3);
            wiz.Advance();
            wiz.IsOnFirstStep.Should().BeFalse();
            wiz.IsOnLastStep.Should().BeFalse();
        }

        [Fact]
        public void GivenThreeStepWizard_StepNumbersShouldBeConsecutive()
        {
            var wiz = new WizardViewModel(3);
            wiz.Steps.First(s => s.StepNumber == 1).Should().NotBeNull();
            wiz.Steps.First(s => s.StepNumber == 2).Should().NotBeNull();
            wiz.Steps.First(s => s.StepNumber == 3).Should().NotBeNull();
        }
    }
}
