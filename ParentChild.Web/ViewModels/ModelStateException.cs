using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace ParentChild.Web.ViewModels
{
    public class ModelStateException : Exception
    {
        public Dictionary<string, string> Errors { get; set; }

        public override string Message
        {
            get
            {
                if (Errors.Count > 0)
                {
                    return string.Join(" | ", Errors.Values.ToArray());
                }
                return null;
            }
        }

        public ModelStateException()
        {
            Errors = new Dictionary<string, string>();
        }

        public ModelStateException(Exception ex) : this()
        {
            string msg = string.Empty;
            if (ex is DbEntityValidationException)
            {
                var validationErrors = ((DbEntityValidationException)ex).EntityValidationErrors.ToList();
                foreach (var ve in validationErrors)
                {
                    Errors.Add(string.Empty, ve.ToString());
                }
            }
            else
            {
                msg = (ex.InnerException != null && ex.InnerException.InnerException != null)
                    ? ex.InnerException.InnerException.Message
                    : ex.Message;
                Errors.Add(string.Empty, msg);
            }
        }

        public ModelStateException(ModelStateDictionary modelState):this()
        {
            if (modelState == null)
            {
                throw new ArgumentNullException("modelState");
            }

            if (!modelState.IsValid)
            {
                StringBuilder errorStringBuilder;
                foreach (KeyValuePair<string, ModelState> state in modelState)
                {
                    if (state.Value.Errors.Any())
                    {
                        errorStringBuilder = new StringBuilder();
                        foreach (ModelError err in state.Value.Errors)
                        {
                            errorStringBuilder.AppendLine(err.ErrorMessage);
                        }
                        Errors.Add(state.Key, errorStringBuilder.ToString());
                    }
                }
            }
        }
    }
}