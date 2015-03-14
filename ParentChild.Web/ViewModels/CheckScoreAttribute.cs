using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ParentChild.Web.ViewModels
{
    /// <summary>
    /// Simulation of expensive validation logic as a demonstration 
    ///  of server-side validation
    /// </summary>
    public class SimulatedExpenseive_CheckScore_Attribute : ValidationAttribute
    {
        private readonly decimal _minScore;
        public SimulatedExpenseive_CheckScore_Attribute(double minimumScore)
            : base("Invalid score.")
        {
            _minScore = (decimal)minimumScore;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var score = Score(value.ToString());
            if (score < _minScore)
            {
                return new ValidationResult(
                    string.Format("The name score must be at least {0} but was {1}",
                        _minScore, score));
            }
            return ValidationResult.Success;
        }

        private decimal Score(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                return 1m;

            name = name.Trim();

            int endingLen = -1;
            int startingLen = 0;
            while (startingLen > endingLen)
            {
                startingLen = name.Length;
                name = name.Replace("  ", " ");
                endingLen = name.Length;
            }

            string[] nameParts = name.Split(' ');

            int numberOfParts = nameParts.Length;
            int numberOfChars = name.Length - numberOfParts + 1;

            return (decimal)numberOfChars / (decimal)numberOfParts;
        }
    }
}