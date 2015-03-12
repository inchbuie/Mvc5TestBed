WizardViewModel = function (data) {
    var self = this;
    ko.mapping.fromJS(data, {}, self);

    self.advance = function () {
        $.ajax({
            url: "/Wizard/Next/",
            type: "POST",
            data: ko.toJSON(self),
            contentType: "application/json",
            success: self.handleAjaxSuccess,
            error: self.handleAjaxError
        });
    }

    self.goBack = function () {

        $.ajax({
            url: "/Wizard/Back/",
            type: "POST",
            data: ko.toJSON(self),
            contentType: "application/json",
            success: self.handleAjaxSuccess,
            error: self.handleAjaxError
        });
    }

    self.cancel = function () {
        if (console) console.log("TODO: cancel");
    }

    self.save = function () {
        if (console) console.log("TODO: save");
    }

    self.complete = function () {
        if (console) console.log("TODO: complete");
    }

    self.checkVisibility = function (wizardObj) {
        if (wizardObj.CurrentStepNumber) {
            var stepNum = wizardObj.CurrentStepNumber

            //all inputs should have a name that begins like Step_1_MyProperty, Step_2_OtherProperty, etc.
            // use this to show labels & inputs for current step, hide for other steps
            $("label").not("label[for^='Step_" + stepNum + "']").hide();
            $("input").not("input[name^='Step_" + stepNum + "']").attr("type", "hidden")

            $("label[for^='Step_" + stepNum + "']").show();
            $("input[name^='Step_" + stepNum + "']").attr("type", "text");

            //are we on the 1st step?
            if (wizardObj.CurrentStepNumber < 2) {
                //hide Back button
                $("#btnBack").hide();
            } else {
                $("#btnBack").show();
            }
            //are we on the last step?
            if (wizardObj.CurrentStepNumber >= wizardObj.StepCount) {
                //hide Next button
                $("#btnNext").hide();
                $("#btnComplete").show();
            } else {
                $("#btnNext").show();
                $("#btnComplete").hide();                
            }
        }
        return true;
    }

    self.handleAjaxError = function (xhr, status, error) {
        var err = eval("(" + xhr.responseText + ")");
        if (console) console.log(err.Message);
    }

    self.handleAjaxSuccess = function (data) {
        //returned data is an anonymous json object w/ viewmodel beneath
        if (data.wizardViewModel) {
            self.checkVisibility(data.wizardViewModel);
            ko.mapping.fromJS(data.wizardViewModel, {}, self);
        }

        //was there a new url stashed in the return?
        if (data.newLocation != null) {
            //redirect to new location
            window.location = data.newLocation;
        }
    }
}
