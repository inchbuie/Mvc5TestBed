
var ObjectState = {
    Unchanged: 0,
    Added: 1,
    Modified: 2,
    Deleted: 3
}

//tell knockout how parent & child relate
var salesOrderItemMapping = {
    "Items": {
        key: function (item) {
            //unwrapObservable: if item is observable return value() else return value
            return ko.utils.unwrapObservable(item.Id)
        },
        create: function (options) {
            // tell KO what to do for each SalesOrderItem it needs to create
            // use the data passed to the mapping definition
            // options arg is passed to callback (create() function)
            return new SalesOrderItemViewModel(options.data);
        }
    }
}

SalesOrderItemViewModel = function (data) {
    var self = this;
    ko.mapping.fromJS(data, salesOrderItemMapping, self);
}

SalesOrderViewModel = function (data) {
    var self = this;
    ko.mapping.fromJS(data, salesOrderItemMapping, self);

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

    self.addSalesOrderItem = function () {
        var item = new SalesOrderItemViewModel({
            Id: 0,
            ProductCode: "",
            Quantity: 1,
            UnitPrice: 0,
            SalesOrderId: self.Id,
            ObjectState: ObjectState.Added
        });
        self.Items.push(item);
    }
}