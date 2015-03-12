
var ObjectState = {
    Unchanged: 0,
    Added: 1,
    Modified: 2,
    Deleted: 3
}

SalesOrderViewModel = function (data) {
    var self = this;
    ko.mapping.fromJS(data, {}, self);

    self.save = function () {
        $.ajax({
            url: "/Sales/Save/",
            type: "POST",
            data: ko.toJSON(self),
            contentType: "application/json",
            success: function (data) {
                //if view model is returned directly
                //ko.mapping.fromJS(data, {}, self); 

                //return from save is an anonymous json object w/ viewmodel beneath
                if (data.salesOrderViewModel) {
                    ko.mapping.fromJS(data.salesOrderViewModel, {}, self);
                }

                if (data.newLocation != null) {
                    //redirect to new location
                    window.location = data.newLocation;
                }
            },
            error: function(xhr, status, error){
                var err=eval("("+xhr.responseText + ")");
                console.log(err.Message);
            }
        });
    }

    self.flagAsEdited = function () {
        if (self.ObjectState() != ObjectState.Added) {
            self.ObjectState(ObjectState.Modified);
            //console.log("modified!");
        }
        return true;
    }
}