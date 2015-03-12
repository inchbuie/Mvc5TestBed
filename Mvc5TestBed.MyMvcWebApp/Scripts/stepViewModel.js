
StepViewModel = function (data) {
    var self = this;
    ko.mapping.fromJS(data, {}, self);

    self.next = function () {
        $.ajax({
            url: "/Wizard/Next/",
            type: "POST",
            data: ko.toJSON(self),
            contentType: "application/json",
            success: function (data) {
                //if view model is returned directly
                //  ko.mapping.fromJS(data, {}, self); 
                //if return from save is an anonymous json object w/ viewmodel beneath
                if (data.stepViewModel) {
                    ko.mapping.fromJS(data.stepViewModel, {}, self);
                }

                if (data.newLocation != null) {
                    //redirect to new location
                    window.location = data.newLocation;
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                if (console) console.log(err.Message);
            }
        });
    }
    
    self.back = function () {
    }

    self.skip = function () {
    }
}