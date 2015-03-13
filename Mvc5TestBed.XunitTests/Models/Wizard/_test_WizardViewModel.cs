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
        public void ShouldDefaultToHavingThreeSteps()
        {
            var wiz = new WizardViewModel();
            wiz.StepCount.Should().Be(3);
        }

        [Fact]
        public void ShouldDefaultWithAllowCancelOptionOn()
        {
            var wiz = new WizardViewModel();
            wiz.AllowCancel.Should().BeTrue();
        }

        [Fact]
        public void ShouldDefaultWithAllowSkippingOptionOn()
        {
            var wiz = new WizardViewModel();
            wiz.AllowSkipping.Should().BeTrue();
        }

        [Fact]
        public void ShouldDefaultWithASaveInProgressOptionOn()
        {
            var wiz = new WizardViewModel();
            wiz.SaveInProgress.Should().BeTrue();
        }

        [Fact]
        public void ShouldInitializeOnFirstStep()
        {
            var wiz = new WizardViewModel();
            wiz.CurrentStepNumber.Should().Be(1);
        }

        [Fact]
        public void GivenThreeStepWizard_ItShouldStartOnTheFirstButNotLastStep()
        {
            var wiz = new WizardViewModel();
            wiz.IsOnFirstStep.Should().BeTrue();
            wiz.IsOnLastStep.Should().BeFalse();
        }

        [Fact]
        public void GivenThreeStepWizard_CanAdvanceToSecondStep()
        {
            var wiz = new WizardViewModel();
            wiz.Advance();
            wiz.CurrentStepNumber.Should().Be(2);
        }

        [Fact]
        public void GivenThreeStepWizard_CanAdvanceToLastStep()
        {
            var wiz = new WizardViewModel();
            wiz.Advance();
            wiz.Advance();
            wiz.CurrentStepNumber.Should().Be(3);
            wiz.IsOnLastStep.Should().BeTrue();
        }

        [Fact]
        public void GivenThreeStepWizard_CanGoBack()
        {
            var wiz = new WizardViewModel();
            wiz.Advance();
            wiz.GoBack();
            wiz.CurrentStepNumber.Should().Be(1);
        }

        [Fact]
        public void GivenThreeStepWizard_AfterAdvanceToSecondStep_ShouldNotBeFirstNorLast()
        {
            var wiz = new WizardViewModel();
            wiz.Advance();
            wiz.IsOnFirstStep.Should().BeFalse();
            wiz.IsOnLastStep.Should().BeFalse();
        }
    }
}
